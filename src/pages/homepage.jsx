/* eslint-disable react/prop-types */
// 我写 js 为什么还要进行类型检查？

// 样式
import '../styles/fonts.css'
import '../styles/index.styl'
import '../styles/homepage.styl'

// 组件
import Gap from "../components/gap.jsx"
import Loading from "../components/loading.jsx"

// 函数
import {t, i18nImg} from "../i18n.js"
import {useState, useRef, useEffect} from "react"
import {useOutletContext} from "react-router-dom"

function Shields(props) {
  return <div className="para shields">
    {props.children}
  </div>
}

function Shield({url, alt}) {
  return <img src={i18nImg(url)} alt={alt}/>
}

function RssItem({title, date, link}) {
  const ref = useRef(null)
  setTimeout(() => {
    // 展示动画
    try {
      ref.current.style.transform = 'scaleY(1) translateY(0)'
    } catch (e) {
      // ignore
    }
  }, 100)
  return <div className="rss-element" ref={ref}>
    <div className="rss-title"><a href={link}>{title}</a></div>
    <div className="rss-date">{date.toLocaleDateString()}</div>
  </div>
}


function Rss() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [itemsCount, setItemsCount] = useState(0)

  useEffect(() => {
    let isMounted = true

    const fetchData = () => {
      try {
        fetch("https://blog.chyk.ink/atom.xml")
          .then(res => res.text())
          .then(text => {
            const doc = new DOMParser().parseFromString(text, "text/xml")
            const entries = doc.querySelectorAll('entry')
            let _items = []
            let count = -1

            if (isMounted) {
              // 去掉 loading 遮罩，开始展示内容
              setLoading(false)
            }

            const intervalId = setInterval(() => {
              count++
              if (count <= 5) {
                const entry = entries[count]
                const item = {
                  title: entry.querySelector('title').textContent,
                  date: new Date(entry.querySelector('updated').textContent),
                  link: entry.querySelector('link').getAttribute('href'),
                  key: count
                }
                _items.push(item)

                setItems(_items)
                setItemsCount(count)  // 为了触发组件的重新渲染
              } else {
                clearInterval(intervalId)
              }
            }, 100)
          })
      } catch (error) {
        console.error('Error fetching data:', error)
        // Handle error as needed
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false // Mark the component as unmounted during cleanup
    }
  }, []) // Empty dependency array ensures the effect runs only once

  if (loading) {
    return <div id="rss"><Loading/></div>
  } else {
    return <div id="rss" data-count={itemsCount}>
      {items.map(item => <RssItem key={item.key} {...item} />)}
    </div>
  }
}

function LeftGrid() {
  return <div id="container-home-left">
    <div className="bigger">{t("main.home.welcome")}</div>
    <div className="para">
      <div>{t("main.home.desc.l1")}</div>
      <div>{t("main.home.desc.l2")}</div>
    </div>
    <div className="para">
      <div>{t("main.home.desc.l3")}</div>
      <div>{t("main.home.desc.l4")}</div>
    </div>
    <Gap/>
    <div className="bigger">{t("main.home.contact")}</div>
    <Shields>
      <a href="https://t.me/chiyuki0325">
        <Shield url="https://img.shields.io/badge/Telegram-chiyuki0325-28a8ea?logo=telegram"
                alt="Telegram:chiyuki0325"/>
      </a>
      <a href="https://t.me/s/chiyuki_cafe">
        <Shield url="https://img.shields.io/badge/Telegram-{{channel}}-28a8ea?logo=telegram"
                alt="Telegram 频道"/>
      </a>
      <a href="https://space.bilibili.com/485832788">
        <Shield url="https://img.shields.io/badge/Bilibili-{{name}}-ff6699?logo=bilibili"
                alt="Bilibili:斬風·千雪"/>
      </a>
      <span>
      <Shield url="https://img.shields.io/badge/QQ{{group}}-920064067-faad01?logo=tencentqq"
              alt="QQ:920064067"/>
      </span>
    </Shields>
    <Shields>
      <span>
      <Shield url="https://img.shields.io/badge/Discord-chiyuki0325-5865f2?logo=discord"
              alt="Discord:chiyuki0325"/>
      </span>
      <a href="https://github.com/chiyuki0325">
        <Shield url="https://img.shields.io/badge/GitHub-chiyuki0325-fff?logo=github"
                alt="GitHub:chiyuki0325"/>
      </a>
      <a href="https://music.163.com/#/user/home?id=3392019481">
        <Shield
          url="https://img.shields.io/badge/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90-e60026?logo=youtube-music"
          alt="Music 163"/>
      </a>
    </Shields>
    <div className="bigger"></div>
  </div>
}


export default function Homepage() {
  const [className, onAnimated] = useOutletContext()
  setTimeout(onAnimated, 100)
  return <div className={className} id="container-home">
    <div id="container-home-grid">
      <LeftGrid/>
      <div id="container-home-right">
        <div className="bigger">{t("main.home.recent")}</div>
        <Rss/>
      </div>
    </div>
  </div>
}