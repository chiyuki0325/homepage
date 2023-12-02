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
    "b03533fa828ba61eea59d7e00434970a314e594d",
    "1ad5ad6eddc451da8accbeddf0fd5266d01632c9",
    "8694a4c27d1ed21b08ff9cd3eb6eddc451da3fd5",
    "4ec2d5628535e5dd5c1c17e930c6a7efce1b62d0",
    "0df3d7ca7bcb0a468410390f2d63f6246b60afd2",
    "3b292df5e0fe99257021db6672a85edf8db171d3"
  ]
  const bg = `https://imgsrc.baidu.com/forum/pic/item/${bgIds[Math.floor(Math.random() * bgIds.length)]}.jpg`
  return <>
    <div id="bg" style={{backgroundImage: `url(${bg})`}}></div>
    <div id="bg-layer"></div>
  </>
}