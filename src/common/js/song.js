import {getLyric} from 'api/song';
import {ERR_OK} from 'api/config';
import {Base64} from 'js-base64';
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  getLyric () {
    if (this.lyric) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        } else {
          reject(new Error('no lyric'));
          // reject('no lyric');
        }
      });
    });
  }
}

export function createSong (musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    // url: `http://114.80.26.156/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=908480640&vkey=${songVkey}&uin=0&fromtag=66` //歌曲播放主动暂停
    url: `http://ws.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=908480640&vkey=${songVkey}&uin=0&fromtag=66`
  });
}
export function createSongDisc (musicData, songVkey) {
  return new Song({
    id: musicData.id,
    mid: musicData.mid,
    singer: filterSinger(musicData.singer),
    name: musicData.name,
    album: musicData.album.name,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    // url: `http://114.80.26.156/amobile.music.tc.qq.com/C400${musicData.songmid}.m4a?guid=908480640&vkey=${songVkey}&uin=0&fromtag=66` //歌曲播放主动暂停
    url: `http://ws.stream.qqmusic.qq.com/C400${musicData.mid}.m4a?guid=908480640&vkey=${songVkey}&uin=0&fromtag=66`
  });
}

function filterSinger (singer) {
  let ret = [];
  if (!singer) {
    return '';
  }
  singer.forEach((s) => {
    ret.push(s.name);
  });
  return ret.join('/');
}
