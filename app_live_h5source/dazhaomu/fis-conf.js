fis.config.set('modules.spriter', 'csssprites');


fis.set('project.ignore', ['.cache/**','output/**','source/**','node_modules/**','src/**','bak/**','fe_api/**','.git/**','App_Data/**','.vs/**','**.sh','**.less','**.rar','fis-conf.js','.svn/**','*bak*','gulpfile.js']);
  fis.media('test')    // 测试、压缩
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'./../../html/app/dazhaomu'
      }),
      domain: "//test.static.yizhibo.com/html/app/dazhaomu"
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
      useHash:true
  })
  .match("static/img/rank/{*-*,f*}.png",{
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
  .match('/(**).html', {
      rExt: '.html',
      release: './../../../../tpl_yizhibo_com/html/dazhaomu/$1.html'
  });



  fis.media('dev')    // 测试、压缩
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'./../../html/app/dazhaomu'
      }),
      domain: "//dev.static.yizhibo.com/html/app/dazhaomu"
  })
  .match('::package', {
    postpackager: fis.plugin('loader', {
      allInOne: true
    })
  })
  .match('static/**.{css,js,png}', {
      // useHash: true
  })
  .match('lib**/**',{
      // useHash:false
  })
  .match("static/img/**",{
      // useHash:true
  })
  .match("static/img/rank/{*-*,f*}.png",{
      // useHash:false
  })
  .match('::package', {
      spriter: fis.plugin('csssprites')
  })
  .match('**.css',{
      optimizer: fis.plugin('clean-css'),
        // useHash: true,
      useSprite: true
  })
  .match('**.js',{
      optimizer: fis.plugin('uglify-js'),
      // useHash: true
  })
  .match('(**).html', {
      rExt: '.html',
      release: './../../../../tpl_yizhibo_com/html/dazhaomu/$1.html'
  });         


  fis.media('local')    // 逆向代理
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'/Users/donghongyan/hongyan/dazhaomu'
      }),
      domain: "//hongyan.com/dazhaomu"
  })
  .match('static/**.{css,js,png}', {
      useHash: false
  })
  .match('lib**/**',{
      useHash:false
  })
  .match("static/img/**",{
      useHash:false
  })
  .match("static/img/rank/{*-*,f*}.png",{
      useHash:false
  });
  // .match('(**).html', {
  //     rExt: '.html',
  //     release: './../../tpl_yizhibo_com/admin/dazhaomu/$1.tpl'
  // });


  fis.media('prod')   // 正式
  .match('*', {
      deploy: fis.plugin('local-deliver', {
        to:'./../../html/app/dazhaomu'
      }),
      domain: "//static.yizhibo.com/html/app/dazhaomu"
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
      useHash:true
  })
  .match("static/img/rank/{*-*,f*}.png",{
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
  .match('(**).html', {
      rExt: '.html',
      release: './../../../tpl_yizhibo_com/html/dazhaomu/$1.html'
  });

