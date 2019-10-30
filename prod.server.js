var express =  require('express');
var config = require('./config/index');
var axios = require('axios');

var port = process.env.PORT || config.build.port;

var app = express();

var apiRoutes =express.Router();

app.get('/api/getDiscList', function(req, res){
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=> {
    res.json(response.data);
  }).catch((e)=>{
    console.log(e);
  })
});
app.get('/api/music', function(req, res) {
  // const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'; QQ音乐自己的
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';  // github 上面找的
  axios.get(url,{
    headers: {
      referer: 'https://y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data);
  }).catch((e)=>{
    console.log(e);
  })
});
app.get('/api/lyric', function(req, res) {
  
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url,{
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    res.json(response.data);
  }).catch((e)=>{
    console.log(e);
  })
});
app.get('/api/getSongList', function (req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
}),
app.get('/api/getSearch', function (req, res) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e);
  })
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if(err) {
    console.log(err);
    return ;
  }
  console.log('Listening at http://localhost:' + port + '\n');
})