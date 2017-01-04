// 开启插件
fis.config.set('modules.postpackager', 'simple');

// 忽略的目录
fis.set('project.ignore', ['.cache/**', 'output/**','product/**', 'node_modules/**', '**.sh','**.txt', '**.less', '**.rar', 'fis-conf.js', '.svn/**', '*bak*']);
fis.media('test')
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: '/Users/donghongyan/.fis3-tmp/www'
        }),
        domain: "."
    })
    // .match('*', {
    //     deploy: fis.plugin('local-deliver', {
    //         to: './output/'
    //     }),
    //     domain: "http://test.static.yizhibo.com/wap_live"
    // })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
    }).match('static/**.{js,css,png}', {
        useHash: true
    })
    .match('static/img/live/**', {
        useHash: false
    })
    .match('::package', {
        spriter: fis.plugin('csssprites')
    })
    .match('css/live/*.css', {
        optimizer: fis.plugin('clean-css'),
        useSprite: true
    })
    .match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置，只是为了减少图片大小
        optimizer: fis.plugin('png-compressor')
    }).match('html/store/*.html', {
        rExt: '.tpl',
        // $0是所有的匹配内容，这里连着目录结构文件名字都输送过去，tpl_yizhibo_com/html/两个tpl文件
        release: './tpl/$0',
    });
    // .match('html/(*.html)', {
    //     rExt: '.tpl',
    // $1是第一个'括号'匹配的内容,..$9是第九个'括号'匹配内容，tpl_yizhibo_com/两个tpl文件，这就是第一个括号匹配的内容
    //     release: './tpl_yizhibo_com/$1'
    // });


fis.media('prod')
    .match('*', {
        deploy: fis.plugin('local-deliver', {
            to: './output/'
        }),
        domain: "http://test.static.yizhibo.com/wap_live"
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
    }).match('static/**.{js,css,png}', {
        useHash: true
    })
    .match('static/img/live/**', {
        useHash: false
    })
    .match('::package', {
        spriter: fis.plugin('csssprites')
    })
    .match('css/live/*.css', {
        optimizer: fis.plugin('clean-css'),
        useSprite: true
    })
    .match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置，只是为了减少图片大小
        optimizer: fis.plugin('png-compressor')
    }).match('html/(*.html)', {
        rExt: '.tpl',
        //$1是第一个'括号'匹配的内容,..$9是第九个'括号'匹配内容，tpl_yizhibo_com/两个tpl文件，这就是第一个括号匹配的内容
        release: './tpl_yizhibo_com/$1'
    });