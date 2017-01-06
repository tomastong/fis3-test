fis.config.set('modules.spriter', 'csssprites');


fis.set('project.ignore', ['.cache/**','output/**','source/**','node_modules/**','src/**','bak/**','fe_api/**','.git/**','App_Data/**','.vs/**','**.sh','**.less','**.rar','fis-conf.js','.svn/**','*bak*']);
  fis.media('test')    // 测试、压缩
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'./../../live_h5'
      }),
      domain: "http://test1.static.yizhibo.com/html/live_h5"
  })
  .match('::package', {
    postpackager: fis.plugin('loader', {
      allInOne: true
    })
  })
  .match('static/**.{css,js,png}', {
      useHash: true
  })
  .match('lib**/**',{
      useHash:false
  })
  .match("static/img/**",{
      useHash:false
  })
  .match('::package', {
      spriter: fis.plugin('csssprites')
  })
  .match('**.css',{
      optimizer: fis.plugin('clean-css'),
        useHash: true,
      useSprite: true
  })
  .match('**.js',{
      optimizer: fis.plugin('uglify-js'),
      useHash: true
  })
  .match('html/**/(**).html', {
      rExt: '.tpl',
      release: './../../../tpl_yizhibo_com/default/www/live/$1.tpl'
  });



  fis.media('www')
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'./../../live_h5'
      }),
      domain: "http://test1.static.yizhibo.com/html/live_h5"
  })
  .match('static/**.{css,js,png}', {
      useHash: true
  })
  .match('lib**/**',{
      useHash:false
  })
  .match("static/img/**",{
      useHash:false
  })
  .match('::package', {
      spriter: fis.plugin('csssprites')
  })
  .match('**.css',{
      // optimizer: fis.plugin('clean-css'),
        useHash: true,
      useSprite: true
  })
  .match('**.js',{
      // optimizer: fis.plugin('uglify-js'),
      useHash: true
  })
  .match('html/**/(**).html', {
      rExt: '.tpl',
      release: './../../../tpl_yizhibo_com/default/www/live/$1.tpl'
  });



  fis.media('prod')   // 正式
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'./../../live_h5'
      }),
      domain: "http://static.yizhibo.com/html/live_h5"
  })
  .match('::package', {
    postpackager: fis.plugin('loader', {
      allInOne: true
    })
  })
  .match('static/**.{css,js,png}', {
      useHash: true
  })
  .match('lib**/**',{
      useHash:false
  })
  .match("static/img/**",{
      useHash:false
  })
  .match('::package', {
      spriter: fis.plugin('csssprites')
  })
  .match('**.css',{
      optimizer: fis.plugin('clean-css'),
        useHash: true,
      useSprite: true
  })
  .match('**.js',{
      optimizer: fis.plugin('uglify-js'),
      useHash: true
  })
  .match('html/**/(**).html', {
      rExt: '.tpl',
      release: './../../../tpl_yizhibo_com/default/www/live/$1.tpl'
  });

