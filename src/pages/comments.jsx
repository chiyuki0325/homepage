import {useOutletContext} from "react-router-dom"
import Loading from "../components/loading.jsx"

// 样式
import '../styles/fonts.css'
import '../styles/index.styl'
import '../styles/comments.styl'

// 组件
import Gap from "../components/gap.jsx"

export default function Comments() {
  const [className, onAnimated] = useOutletContext()
  setTimeout(onAnimated, 100)

  function loadWalineAssets(fn) {
    if (document.getElementById("waline-script") !== null) {
      document.getElementById("waline-script").remove()
      document.getElementById("waline-style").remove()
    }

    const scriptWaline = document.createElement('script')
    scriptWaline.src = 'https://ydz-cos.zyglq.cn/blog-static/js/waline.umd.js?v=3'
    scriptWaline.setAttribute("id", "waline-script")

    const styleWaline = document.createElement('link')
    styleWaline.rel = 'stylesheet'
    styleWaline.href = 'https://ydz-cos.zyglq.cn/blog-static/css/waline.css'
    styleWaline.setAttribute("id", "waline-style")

    document.head.appendChild(styleWaline)
    document.body.appendChild(scriptWaline)

    scriptWaline.onload = fn
  }

  function loadWaline() {
    loadWalineAssets(() => {
      Waline.init({
        serverURL: 'https://comments-v2.chyk.ink',
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
    })
  }

  loadWaline()

  return <div className={className} id="container-comments">
    <div id="waline">
      <Loading/>
    </div>
    {[...Array(6).keys()].map((i) => <Gap key={i}/>)}
  </div>
}