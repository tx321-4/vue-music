<template>
<transition name="slide">
  <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</transition>
</template>

<script type="text/ecmascript-6">
import MusicList from '@/components/music-list/music-list';
import {mapGetters} from 'vuex';
import {getMusicList} from '@/api/rank';
import {ERR_OK} from '@/api/config';
import {getMusic} from '@/api/singer';
import {createSong} from '@/common/js/song';

export default {
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.topList.topTitle;
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return this.topList.picUrl;
    },
    ...mapGetters([
      'topList'
    ])
  },
  data () {
    return {
      songs: [],
      rank: true
    };
  },
  created () {
    this._getMusicList();
  },
  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank');
        return;
      };
      getMusicList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist);
        // console.log(res.songlist);
        }
      });
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach((item) => {
        // console.log(item.data);
        const musicData = item.data;
        if (musicData.songid && musicData.albummid) {
          getMusic(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              // const songVkey = res.req_0.data.midurlinfo[0].vkey; // QQ音乐自己的
              const songVkey = res.data.items[0].vkey; // github 上面找的
              if (songVkey) {
                // console.log(songVkey);
                const newSong = createSong(musicData, songVkey);
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
  .top-list
    posiiton: fixed
    z-index: 100
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0);
</style>
