// 库
import {NavLink, Outlet} from "react-router-dom";

// 样式
import './styles/fonts.css'
import './styles/index.styl'

// 函数
import {getTitle, t} from "./i18n.js"

// 组件
import Background from "./components/background.jsx"

// 函数
function navLinkClass({isActive, _}) {
  return isActive ? "tab tab-active" : "tab"
}

const Jump = {
  jump(link) {
    window.open(link, "_blank")
  },
  blog() {
    Jump.jump("https://blog.chyk.ink")
  },
  files() {
    Jump.jump("https://file.chyk.ink")
  }
}

// 组件
function Tabs() {
  return <div id="tabs">
    <NavLink key="home" to="/" className={navLinkClass}>
      {t("tabs.home")}
    </NavLink>
    <div key="blog" className="tab" onClick={Jump.blog}>
      {t("tabs.blog")}
    </div>
    <div key="files" className="tab" onClick={Jump.files}>
      {t("tabs.files")}
    </div>
    <NavLink key="comments" to="/comments" className={navLinkClass}>
      {t("tabs.comments")}
    </NavLink>
    <NavLink key="about" to="/about" className={navLinkClass}>
      {t("tabs.about")}
    </NavLink>
  </div>
}

function Header() {
  return (<>
    <div id="header">
      <img src="https://q1.qlogo.cn/g?b=qq&nk=3526514925&s=640" alt="avatar" id="avatar"/>
      <div id="header-right">
        <div id="site-name">千雪的咖啡厅</div>
        <Tabs/>
      </div>
    </div>
  </>)
}

function Main() {
  return <>
    <div id="main-outer">
      <div id="main">
        <Header/>
        <div id="containers">
          <Outlet/>
        </div>
      </div>
    </div>
  </>
}

export default function HomepageRoot() {
  document.title = getTitle()
  return (
    <>
      <Background/>
      <Main/>
    </>
  )
}