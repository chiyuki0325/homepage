/* eslint-disable react/prop-types */

import {useOutletContext} from "react-router-dom"
import {t} from "../i18n.js"

// 样式
import '../styles/fonts.css'
import '../styles/index.styl'
import '../styles/about.styl'

// 组件
import Gap from "../components/gap.jsx"

function Para({i18n_id}) {
  return <p dangerouslySetInnerHTML={{__html: t(i18n_id)}} className="para"/>
}

export default function About() {
  const [className, onAnimated] = useOutletContext()
  setTimeout(onAnimated, 100)
  return <div className={className} id="container-about">
    <div className="bigger">{t("main.about.about")}</div>
    <Para i18n_id="main.about.l1"/>
    <Para i18n_id="main.about.l2"/>
    <Para i18n_id="main.about.l3"/>
    <div className="bigger">{t("main.about.things_liked")}</div>
    <Para i18n_id="main.about.tl1"/>
    <Para i18n_id="main.about.tl2"/>
    <Para i18n_id="main.about.tl3"/>
    <Para i18n_id="main.about.tl4"/>
    <div className="bigger">{t("main.about.programming")}</div>
    <Para i18n_id="main.about.p1"/>
    <Para i18n_id="main.about.p2"/>
    <Para i18n_id="main.about.p3"/>
    <div className="bigger">{t("main.about.things_hated")}</div>
    <Para i18n_id="main.about.th1"/>
    <div className="bigger">{t("main.about.talk")}</div>
    <Para i18n_id="main.about.t1"/>
    <Para i18n_id="main.about.t2"/>
    <a className="smaller" href="https://icp.gov.moe/?keyword=20212688">{t("main.about.moe")}</a>
    <div className="smaller">Powered by <a href="https://reactjs.org/">React</a> & <a href="https://vitejs.dev/">Vite</a></div>
    {[...Array(6).keys()].map((i) => <Gap key={i}/>)}
  </div>
}