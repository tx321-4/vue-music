<template>
<div class="suggest">
  <ul class="suggest-list">
    <li class="suggest-item" v-for="(item, index) in result" :key='index'>
      <div class="icon">
        <i :class="getIconCls(item)"></i>
      </div>
      <div class="name">
        <p class="text" v-html="getDisplayName(item)"></p>
      </div>
    </li>
  </ul>
</div>
</template>

<script type="text/ecmascript-6">
import {getSearch} from 'api/search';
import {ERR_OK} from 'api/config';
import {getMusic} from 'api/singer';
import {createSong} from 'common/js/song';
const TYPE_SINGER = 'singer';
const perpage = 20; // 抓取数据一页有多少数据

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      page: 1,
      result: [],
      zhida: {},
      searchSongs: {} // result 副本

    };
  },
  methods: {
    search () {
      this.page = 1;
      getSearch(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.zhida = res.data.zhida;
          this.searchSongs = this._normalizeSongs(res.data.song.list);
          // this.result = this._getResult(res.data);
        }
      });
    },
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine';
      } else {
        return 'icon-music';
      }
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername;
      } else {
        return `${item.name}-${item.singer}`;
      }
    },
    // _getResult (data) {
    //   let ret = [];
    //   // push 歌手进空数组
    //   if (data.zhida && data.zhida.singerid) {
    //     ret.push({...data.zhida, ...{type: TYPE_SINGER}});
    //   }
    //   if (data.song) {
    //     ret = ret.concat(this._normalizeSongs(data.song.list));
    //   }
    //   console.log(ret);
    //   return ret;
    // },
    _getResult (data, newValue) {
      let ret = [];
      // push歌手进空数组
      if (data.singerid) {
        ret.push({...this.zhida, ...{type: TYPE_SINGER}}); // es6语法，对象拓展符。等同于object.assign()新建对象
      }
      // 合并歌曲进数组
      if (newValue) {
        ret = ret.concat(newValue);
      }
      this.result = ret;
      console.log(this.result);
    },
    _normalizeSongs (list) {
      let ret = [];
      let pushIndex = 0; // 标志位 判断是否是最后一次push
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          // ret.push(createSong(musicData));
          getMusic(musicData.songmid).then((res) => {
            if (res.code === ERR_OK) {
              const songVkey = res.data.items[0].vkey;

              if (songVkey) {
                const newSong = createSong(musicData, songVkey);
                ret.push(newSong);

                // 把歌曲源数据push后判断是否异步完成
                pushIndex++;
                this.pushOver = list.length === pushIndex;
              } else {
                pushIndex++;
                this.pushOver = list.length === pushIndex;
              }
            }
          });
        }
      });
      return ret;
    }
  },
  watch: {
    query () {
      this.search();
    },
    // 监听异步问题，对数据无法操作，把值赋值出来
    searchSongs (newValue) {
      console.log(this.pushOver);
      // 判断异步完成后去合并已存在的数组和singer
      if (this.pushOver) {
        this._getResult(this.zhida, newValue);
      }
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable";
  @import "../../common/stylus/mixin";

  .suggest
    height: 100%
    overflow:hidden
    .suggest-list
      padding:0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
