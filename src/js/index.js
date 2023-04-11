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

const initBg = () => {
    // 加载背景图
    const bgUrl = bg[Math.floor(Math.random() * bg.length)]
    $('#bg').style.backgroundImage = `url(${bgUrl})`
}

const initHeader = () => {
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

const initRss = () => {
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
        const doc = (new DOMParser()).parseFromString(xhr.responseText, 'text/xml')
        const items = doc.querySelectorAll('entry')
        for (let i = 0; i < 6; i++) {
            const item = items[i]
            const rssElement = RssElement(
                item.querySelector('title').textContent,
                new Date(item.querySelector('updated').textContent),
                item.querySelector('link').getAttribute('href')
            )
            rssRoot.appendChild(rssElement)
        }
    }
}

const tabClick = (tabId) => {
    // 切换标签
    for (const tab of $('#tabs').children) {
        tab.classList.remove('tabActive')
    }
    for (const container of $('#containers').children) {
        container.style.display = 'none'
    }
    $(`#tab${tabId}`).classList.add('tabActive')
    const activeContainer = $(`#container${tabId}`)
    activeContainer.style.display = 'block'
}

const init = () => {
    initBg()
    initHeader()
    initRss()
}

window.onload = () => {
    init()
}