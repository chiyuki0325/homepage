const Fontmin = require('fontmin');

const fontmin = new Fontmin()
    .src('SmileySans-Oblique.ttf')
    .dest('build/fonts')
    .use(
        Fontmin.glyph({
            text: '一刀斩の小窝'
        })
    )
    .use(Fontmin.ttf2woff({deflate: true}))
    .use(Fontmin.ttf2woff2())
    .use(Fontmin.css({
        fontPath: 'fonts/'
    }));



fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
});
