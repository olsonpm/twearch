'use strict';


//---------//
// Imports //
//---------//

const Koa = require('koa')
  , koaCompress = require('koa-compress')
  , koaRouter = require('koa-router')
  , koaStatic = require('koa-static')
  , path = require('path')
  ;


//------//
// Init //
//------//

const app = new Koa()
  , releaseDir = __dirname
  ;

let router = koaRouter();


//------//
// Main //
//------//

const getApp = letsEncryptStaticDir => {
  app.use(koaCompress())
    .use(koaStatic(path.join(releaseDir, 'static')));

  if (letsEncryptStaticDir) {
    app.use(koaStatic(letsEncryptStaticDir, { hidden: true }));
  }

  router = setupRoutes(router);

  app.use(router.routes())
    .use(router.allowedMethods());

  return app;
};


//-------------//
// Helper Fxns //
//-------------//

function setupRoutes(router) {
  router.get('/', ctx => {
    ctx.body = getIndexHtml();
  });

  return router;
}

function getIndexHtml() {
  return (
`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Twearch</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">


  <meta name="twearch/config/environment" content="%7B%22modulePrefix%22%3A%22twearch%22%2C%22environment%22%3A%22production%22%2C%22rootURL%22%3A%22/%22%2C%22locationType%22%3A%22auto%22%2C%22EmberENV%22%3A%7B%22FEATURES%22%3A%7B%7D%2C%22EXTEND_PROTOTYPES%22%3A%7B%22Date%22%3Afalse%7D%7D%2C%22APP%22%3A%7B%22name%22%3A%22twearch%22%2C%22version%22%3A%220.0.0+f5015840%22%7D%2C%22exportApplicationGlobal%22%3Afalse%7D" />

      <link rel="stylesheet" href="/assets/vendor-d41d8cd98f00b204e9800998ecf8427e.css" integrity="sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU= sha512-z4PhNX7vuL3xVChQ1m2AB9Yg5AULVxXcg/SpIdNs6c5H0NE8XYXysP+DGNKHfuwvY7kxvUdBeoGlODJ6+SfaPg==" >
      <link rel="stylesheet" href="/assets/twearch-d11861172a0223fbe507dabc7269b893.css" integrity="sha256-vsukrEUYx+VAfIoHym5tvbed3/yLOv+fgZLa3J3KJWc= sha512-x1g1Dp/ojCOQ1u3+li3Okc4kihGi4bctRIsylEAKi7SF7lNDCG4bQSyUlA+nh//mXKy9oK6FvgvHSpCHcT2rYA==" >


    </head>
    <body>


      <script src="/assets/vendor-7f68c45ca24b86c5ca999829faf6bd31.js" integrity="sha256-7L4TnegUZ/VXr/hI8xEaluS+awl4WNOBZZGjuG6uacY= sha512-GZnToY4KNtkd90RbHXoobPoT/EL1c0wZZk6iFh8sy2EkcvqzPt4rOJVUB4Yh06lHmeD7mpbAcPFIYKvdogAVGw==" ></script>
      <script src="/assets/twearch-5d6d9e21026150de8dfc0bb787cb36bb.js" integrity="sha256-muhHodXI6+Bgo0yGEgzEy6HMEMeL7bYsHqq3qSImkFY= sha512-gDzxSABbdaZqSQjAcBS3fr3Wip4D/tHTV2//bkmNUDS1a7c4UpEhmEvJGt1kf6CImwjBud3EUy8JRGNTljMCyA==" ></script>


    </body>
  </html>`);
}


//---------//
// Exports //
//---------//

module.exports = { getApp };
