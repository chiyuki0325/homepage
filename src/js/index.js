// backgrounds
const bg = [
    "77c6a7efce1b9d16f8efebbdb6deb48f8d5464c5",
    "b2de9c82d158ccbf4c97c4e65cd8bc3eb03541c6",
    "f9dcd100baa1cd114e9203fcfc12c8fcc2ce2dc1",
    "f3d3572c11dfa9ec2a0927cb27d0f703908fc1c3",
    "0ff41bd5ad6eddc46157e3387cdbb6fd53663344",
    "7e3e6709c93d70cf2352fdcebddcd100bba12b4c",
    "d01373f082025aafed942908beedab64024f1a4a",
    "fd039245d688d43faf0bc631381ed21b0ff43b56",
    "9825bc315c6034a8ab70ef428e13495408237667",
    "b03533fa828ba61eea59d7e00434970a314e594d"
].map(id=>`https://imgsrc.baidu.com/forum/pic/item/${id}.jpg`)

if (!window.$) {
    window.$ = (selector) => document.querySelector(selector)
}

function showBody() {
    $('#mainOuter').style.opacity = '1'
}

function initBg() {
    // 加载背景图
    const bgUrl = bg[Math.floor(Math.random() * bg.length)]
    $('#bg').style.backgroundImage = `url(${bgUrl})`
}

function initHeader() {
    // 头像点击事件
    $('#avatar').addEventListener('click', function () {
        if (this.getAttribute('data-rotating') === 'true') {
            return
        }
        this.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        this.style.transform = 'rotate(360deg)'
        this.setAttribute('data-rotating', 'true')
        setTimeout(() => {
            this.style.transition = ''
            this.style.transform = ''
            this.setAttribute('data-rotating', 'false')
        }, 701)
    })
}

function initRss() {
    const RssElement = (title, date, link) => {
        const new_ = (tagName, classNames, props, functions, childs) => {
            const el = document.createElement(tagName)
            for (const cls of classNames) {
                el.classList.add(cls)
            }
            for (const child of childs) {
                el.appendChild(child)
            }
            for (const key in props) {
                el[key] = props[key]
            }
            for (const key in functions) {
                el[key](...functions[key])
            }
            return el
        }
        return new_('div', ['rssElement'], {}, {}, [
            new_('div', ['rssTitle'], {
                textContent: title
            }, {
                addEventListener: ['click', () => {
                    window.open(link)
                }]
            }, []),
            new_('div', ['rssDate'], {
                textContent: date.toLocaleDateString()
            }, {}, [])
        ])
    }
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://blog.yidaozhan.top/atom.xml')
    xhr.send()
    xhr.onload = () => {
        const rssRoot = $('#rss')
        rssRoot.innerHTML = ''
        const doc = (new DOMParser()).parseFromString(xhr.responseText, 'text/xml')
        const items = doc.querySelectorAll('entry')
        const loadRssItem = (i) => {
            const item = items[i]
            const rssElement = RssElement(
                item.querySelector('title').textContent,
                new Date(item.querySelector('updated').textContent),
                item.querySelector('link').getAttribute('href')
            )
            rssRoot.appendChild(rssElement)
            setTimeout(
                () => {
                    rssElement.style.transform = 'scaleY(1) translateY(0)'
                },
                100
            )
        }
        let count = -1
        const intervalId = setInterval(() => {
            count++
            if (count <= 5) {
                loadRssItem(count)
            } else {
                clearInterval(intervalId);
            }
        }, 100);
    }
}

function initComment() {
    if ($('#containerComments').getAttribute('data-loaded') === 'true') return

    const scriptWaline = document.createElement('script')
    scriptWaline.src = 'https://ydz-cos.zyglq.cn/blog-static/js/waline.js'

    const styleWaline = document.createElement('link')
    styleWaline.rel = 'stylesheet'
    styleWaline.href = 'https://ydz-cos.zyglq.cn/blog-static/css/waline.css'

    document.head.appendChild(styleWaline)
    document.body.appendChild(scriptWaline)

    scriptWaline.onload = () => {
        Waline.init({
            serverURL: 'https://comments.yidaozhan.top',
            placeholder: "📨 快发条评论吧 (`･ω･´)ฅ",
            requiredFields: ["nick", "mail"],
            enableQQ: false,
            recordIP: true,
            avatar: "robohash",
            pageSize: 10,
            lang: "zh-cn",
            highlight: true,
            mathJax: false,
            tagMeta: ["博主", "小伙伴", "访客"],
            metaPlaceholder: {
                nick: "📋️ 昵称/QQ",
                mail: "📪 邮箱",
                link: "🔗 网址(https://)"
            },
            meta: ["nick", "mail"],
            el: "#waline",
            path: "homepage"
        })
        $('#containerComments').setAttribute('data-loaded', 'true')
    }
}

function tabClick(tabId) {
    // 切换标签
    for (const tab of $('#tabs').children) {
        tab.classList.remove('tabActive')
    }
    for (const container of $('#containers').children) {
        container.style.opacity = '0'
        setTimeout(() => {
            container.style.display = 'none'
        }, 100)
    }
    $(`#tab${tabId}`).classList.add('tabActive')
    const activeContainer = $(`#container${tabId}`)
    setTimeout(() => {
        activeContainer.style.display = 'block'
        setTimeout(() => {

            activeContainer.style.opacity = '1'
        }, 100)
    }, 100)
}

function jumpToBlog() {
    window.open('https://blog.yidaozhan.top')
}

function jumpToFiles() {
    window.open('https://file.yidaozhan.top')
}

function init() {
    showBody()
    initBg()
    initHeader()
    initRss()
}

window.addEventListener('load', () => {
    init()
})
