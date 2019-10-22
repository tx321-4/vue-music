<template>
<transition name="slide">
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '@/components/music-list/music-list';
import {mapGetters} from 'vuex';
import {getSongList} from '@/api/recommend';
import {ERR_OK} from '@/api/config';
import {createSongDisc} from '@/common/js/song';
import {getMusic} from '@/api/singer';

export default {
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.disc.dissname;
    },
    bgImage () {
      return this.disc.imgurl;
    },
    ...mapGetters([
      'disc'
    ])
  },
  data () {
    return {
      songs: []
    };
  },
  created () {
    this._getSongList();
  },
  methods: {
    _getSongList () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend');
        return;
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs((res.cdlist[0]).songlist);
          // console.log(this.songs);
        }
      });
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach((musicData) => {
        if (musicData.id && musicData.album) {
          getMusic(musicData.mid).then((res) => {
            if (res.code === ERR_OK) {
              // const songVkey = res.req_0.data.midurlinfo[0].vkey; // QQ音乐自己的
              const songVkey = res.data.items[0].vkey; // github 上面找的
              if (songVkey) {
                // console.log(songVkey);
                const newSong = createSongDisc(musicData, songVkey);
                ret.push(newSong);
              }
            }
          });
        }
      });
      return ret;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable';
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transfrom: translate3d(100%, 0 0)
</style>
