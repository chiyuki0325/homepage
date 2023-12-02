/* eslint-disable react/prop-types */

// 库
import {Outlet} from "react-router-dom";

// 样式
import './styles/fonts.css'
import './styles/index.styl'

// 函数
import {getTitle, t} from "./i18n.js"
import {useState} from "react"

// 组件
import Background from "./components/background.jsx"
import DelayedNavLink from "./components/delayed_navlink.jsx"

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
function Tabs({onTabClick}) {
  return <div id="tabs">
    <DelayedNavLink key="home" to="/" className={navLinkClass} onClick={onTabClick}>
      {t("tabs.home")}
    </DelayedNavLink>
    <div key="blog" className="tab" onClick={Jump.blog}>
      {t("tabs.blog")}
    </div>
    <div key="files" className="tab" onClick={Jump.files}>
      {t("tabs.files")}
    </div>
    <DelayedNavLink key="comments" to="/comments" className={navLinkClass} onClick={onTabClick}>
      {t("tabs.comments")}
    </DelayedNavLink>
    <DelayedNavLink key="about" to="/about" className={navLinkClass} onClick={onTabClick}>
      {t("tabs.about")}
    </DelayedNavLink>
  </div>
}

function Header({onTabClick}) {
  return (<>
    <div id="header">
      <img src="https://q1.qlogo.cn/g?b=qq&nk=3526514925&s=640" alt="avatar" id="avatar"/>
      <div id="header-right">
        <div id="site-name">千雪的咖啡厅</div>
        <Tabs onTabClick={onTabClick}/>
      </div>
    </div>
  </>)
}

function Main() {
  const [containerClassName, setContainerClassName] = useState("container")

  function onTabClick() {
    setContainerClassName("container")
  }

  function onAnimated() {
    setContainerClassName("container container-animated")
  }

  return <>
    <div id="main-outer">
      <div id="main">
        <Header onTabClick={onTabClick}/>
        <div id="containers">
          <Outlet context={[containerClassName, onAnimated]}/>
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