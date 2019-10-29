// mixin: 一个对象, Vue的混合机制, 提高组件内容的复用性

import { mapGetters, mapMutations, mapActions } from 'vuex';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/util';
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted () {
    this.handlePlaylist(this.playlist);
  },
  activated () { // <keep-alive>组件切换过来时会触发activated
    this.handlePlaylist(this.playlist);
  },
  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal);
    }
  },
  methods: { // 组件中定义了 handlePlaylist, 就会覆盖整个， 否则会抛出异常
    handlePlaylist () {
      throw new Error('component must implement handlePlaylist method');
    }
  }
};

export const playerMixin = {
  computed: {
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    changeMode () {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (mode === playMode.random) {
        // console.log(this);
        list = shuffle(this.sequenceList);
      } else {
        // console.log(this);
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => { // es6语法
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },
    getFavoriteIcon (song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite';
      } else {
        return 'icon-not-favorite';
      }
    },
    toggleFavorite (song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    },
    isFavorite (song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id;
      });
      return index > -1;
    },
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAYLIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
};

export const searchMixin = {
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  data () {
    return {
      query: '',
      refreshDelay: 100
    };
  },
  methods: {
    blurInput () {
      this.$refs.searchBox.blur();
    },
    saveSearch () {
      this.saveSearchHistory(this.query);
    },
    onQueryChange (query) {
      this.query = query;
    },
    addQuery (query) {
      this.$refs.searchBox.setQuery(query);
    },
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ])
  }
};
