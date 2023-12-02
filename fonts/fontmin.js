import Fontmin from "fontmin"

const fontmin = new Fontmin()
    .src('fonts/SmileySans-Oblique.ttf')
    .dest('public/fonts')
    .use(
        Fontmin.glyph({
            text: '千雪的咖啡厅'
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
