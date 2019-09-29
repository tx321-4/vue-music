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
}

export function createSong (musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,

    //    url: `http://isure.stream.qqmusic.qq.com/${musicData.songid}.m4a?guid=908480640&vkey=4B2973FB1B8D7CFFCB1761B1045631E72B92DE96AE249C1042D131A9E265DFB27B43CFAFAE0F2CE921E26DD67CA4204294B3E315B8D3DBF3&uin=7469&fromtag=66` // 自己的key
    url: `http://114.80.26.145/amobile.music.tc.qq.com/C400002FoSOe0Aqz8y.m4a?guid=908480640&vkey=4DF80AA0328C81BB91F93EF59605DB4B3BA194A4EBCF504E60992941AA584D8A3744CB86A36FAA4E94F317A73AFDD852061268F05AFECC88&uin=0&fromtag=66`
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
