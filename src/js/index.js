// backgrounds
const bg = [
    "https://imgsrc.baidu.com/forum/pic/item/77c6a7efce1b9d16f8efebbdb6deb48f8d5464c5.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/b2de9c82d158ccbf4c97c4e65cd8bc3eb03541c6.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/f9dcd100baa1cd114e9203fcfc12c8fcc2ce2dc1.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/f3d3572c11dfa9ec2a0927cb27d0f703908fc1c3.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/0ff41bd5ad6eddc46157e3387cdbb6fd53663344.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/7e3e6709c93d70cf2352fdcebddcd100bba12b4c.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/d01373f082025aafed942908beedab64024f1a4a.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/fd039245d688d43faf0bc631381ed21b0ff43b56.jpg",
    "https://imgsrc.baidu.com/forum/pic/item/9825bc315c6034a8ab70ef428e13495408237667.jpg"
]

// fake jq
const $ = (selector) => document.querySelector(selector)

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
        const cA = (tagName) => document.createElement(tagName)
        document.createElement('div')
        const rssElement = cA('div')
        rssElement.classList.add('rssElement')
        const rssTitle = cA('div')
        rssTitle.classList.add('rssTitle')
        rssTitle.textContent = title
        rssTitle.addEventListener('click', () => {
            window.open(link)
        })
        const rssDate = cA('div')
        rssDate.classList.add('rssDate')
        rssDate.textContent = date.toLocaleDateString()
        rssElement.appendChild(rssTitle)
        rssElement.appendChild(rssDate)
        return rssElement
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
    const scriptLeanCloud = document.createElement('script')
    scriptLeanCloud.src = 'https://blog.yidaozhan.top/cdn/js/av-min.js'
    const scriptValine = document.createElement('script')
    scriptValine.src = 'https://blog.yidaozhan.top/cdn/js/Valine.mod.js'
    const styleValine = document.createElement('link')
    styleValine.rel = 'stylesheet'
    styleValine.href = '/css/valine.css'
    document.body.appendChild(scriptLeanCloud)
    scriptLeanCloud.onload = () => {
        document.head.appendChild(styleValine)
        styleValine.onload = () => {
            document.body.appendChild(scriptValine)
            scriptValine.onload = () => {
                const getEmojiMaps = () => {
                    let i;

                    function emoji(path, idx, ext) {
                        return path + "/" + path + "-" + idx + "." + ext;
                    }

                    const emojiMaps = {};
                    for (i = 1; i <= 54; i++) {
                        emojiMaps['tieba-' + i] = emoji('tieba', i, 'png');
                    }
                    for (i = 1; i <= 101; i++) {
                        emojiMaps['qq-' + i] = emoji('qq', i, 'gif');
                    }
                    for (i = 1; i <= 4; i++) {
                        emojiMaps['weibo-' + i] = emoji('weibo', i, 'png');
                    }
                    return emojiMaps;
                }
                (() => {
                    (new Valine).init(Object.assign({
                        js: "https://blog.yidaozhan.top/cdn/js/Valine.mod.js",
                        appId: "zoX8kazyGBliRB8slCeYbOMI-MdYXbMMI",
                        appKey: "ayoqJFfEYQj3teSHqfK03JJo",
                        placeholder: "📨 快发条评论吧 (`･ω･´)ฅ",
                        requiredFields: ["nick", "mail"],
                        enableQQ: !0,
                        recordIP: !1,
                        avatar: "robohash",
                        pageSize: 10,
                        lang: "zh-cn",
                        highlight: !0,
                        mathJax: !1,
                        tagMeta: ["博主", "小伙伴", "访客"],
                        metaPlaceholder: {
                            nick: "📋️ 昵称/QQ",
                            mail: "📪 邮箱",
                            link: "🔗 网址(https://)"
                        },
                        master: ["6783037F2DF30EAB99F9FC256157D875"],
                        friends: ["6783037F2DF30EAB99F9FC256157D875"],
                        meta: ["nick", "mail"],
                        serverURLs: "https://valine-api.yidaozhan.top"
                    }, {
                        el: "#valine",
                        path: "homepage",
                        placeholder: "📨 快发条评论吧 (`･ω･´)ฅ",
                        emojiCDN: "https://blog.yidaozhan.top/cdn/emoji/",
                        emojiMaps: getEmojiMaps()
                    }))
                })()
                $('#containerComments').setAttribute('data-loaded', 'true')
            }
        }
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

window.onload = () => {
    init()
}
