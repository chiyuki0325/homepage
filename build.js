#!/usr/bin/env node
import fs from 'fs'
import {minify} from 'minify'
import UglifyJS from 'uglify-js'

const config = {
    uglify: [
        'index.js',
        'i18n.js',
    ],
    minify: [
        'index.html',
        'css/index.css',
        'css/fonts.css',
        'css/colors.css',
        'css/valine.css'
    ]
}

// 创建目录
for (const dir of ['public', 'public/js', 'public/css', 'public/fonts']) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}

// 复制字体
for (const file of fs.readdirSync('fonts')) {
    fs.copyFileSync(`fonts/${file}`, `public/fonts/${file}`);
}

// Minify HTML / CSS
const minifyOptions = {
    html: {
        removeAttributeQuotes: false,
        removeOptionalTags: false,
    },
    css: {
        compatibility: '*'
    }
}

for (const file of config.minify) {
    minify(`src/${file}`, minifyOptions).then((data) => {
        fs.writeFileSync(`public/${file}`, data)
    })
}

// Minify JavaScript
for (const file of config.uglify) {
    const minified = UglifyJS.minify(
        fs.readFileSync(`src/js/${file}`, 'utf8')
    )
    fs.writeFileSync(`public/js/${file}`, minified.code)
}

console.log('Build complete.')