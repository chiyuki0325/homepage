import "../styles/background.styl"

export default function Background() {
    const bgIds = [
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
    ]
    const bg = `https://imgsrc.baidu.com/forum/pic/item/${bgIds[Math.floor(Math.random() * bgIds.length)]}.jpg`
    return <>
        <div id="bg" style={{backgroundImage: `url(${bg})`}}></div>
        <div id="bg-layer"></div>
    </>
}