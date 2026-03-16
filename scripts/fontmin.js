// deluxe rating font builder

const Fontmin = require('fontmin');

const fontmin = new Fontmin()
    .src('LXGWWenKaiMono-Bold.ttf')
    .dest('public/fonts/')
    .use(
        Fontmin.glyph({
            text: '1234567890'
        })
    )
    .use(Fontmin.ttf2woff({deflate: true}))
    .use(Fontmin.css({
        fontPath: 'fonts/'
    }));



fontmin.run(function (err, files) {
    if (err) {
        throw err;
    }

    console.log(files[0]);
});
