<template>
<transition name="slide">
<music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
</transition>
</template>

<script type="text/ecmascript-6">
import {getSingerDetail, getMusic} from 'api/singer';
import {ERR_OK} from 'api/config';
import {mapGetters} from 'vuex';
import {createSong} from 'common/js/song';
import MusicList from 'components/music-list/music-list';

export default {
  data () {
    return {
      songs: []
    };
  },
  computed: {
    title () {
      return this.singer.name;
    },
    bgImage () {
      return this.singer.avatar;
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail();
  },
  methods: {
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer');
        return;
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data.list);
          this.songs = this._normalizeSongs(res.data.list);
          // console.log(this.songs);
        }
      });
    },
    _normalizeSongs (list) {
      let ret = [];
      list.forEach((item) => {
        let {musicData} = item;
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
  },
  components: {
    MusicList
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable";

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
