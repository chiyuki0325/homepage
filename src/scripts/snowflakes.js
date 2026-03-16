// 源代码：https://github.com/peachananr/let_it_snow/blob/master/jquery.let_it_snow.js
// 使用 Gemini 移植到现代 JavaScript

export default class LetItSnow {
  constructor(canvasSelector, options = {}) {
    this.canvas = document.querySelector(canvasSelector)
    if (!this.canvas) return

    this.ctx = this.canvas.getContext("2d")

    // 合并默认配置
    this.settings = {
      speed: 0,
      size: 2,
      count: 200,
      opacity: 0,
      color: "#ffffff",
      windPower: 0,
      ...options,
    }

    this.flakes = []

    this.init()
  }

  // 将十六进制转为 RGB 字符串，处理了 #fff 和 #ffffff
  getRGB(hex) {
    let s = hex.replace(/^#/, "")
    if (s.length === 3) {
      s = s
        .split("")
        .map((c) => c + c)
        .join("")
    }
    const r = parseInt(s.substring(0, 2), 16)
    const g = parseInt(s.substring(2, 4), 16)
    const b = parseInt(s.substring(4, 6), 16)
    return `${r},${g},${b}`
  }

  async init() {
    this.resize()
    this.rgb = this.getRGB(this.settings.color)

    // 初始化雪花粒子
    for (let i = 0; i < this.settings.count; i++) {
      this.flakes.push(this.createFlake(true))
    }

    // 事件监听
    window.addEventListener("resize", () => this.resize())
    this.snow()
  }

  createFlake(isInitial = false) {
    const { canvas, settings } = this
    const speed = Math.random() * 1 + settings.speed
    return {
      x: Math.floor(Math.random() * canvas.width),
      y: isInitial ? Math.floor(Math.random() * canvas.height) : -10,
      size: Math.random() * 3 + settings.size,
      speed: speed,
      velY: speed,
      velX: 0,
      opacity: Math.random() * 0.5 + settings.opacity,
      stepSize: Math.random() / 30,
      step: 0,
    }
  }

  resetFlake(flake) {
    const { canvas, settings } = this
    const wp = settings.windPower

    if (!wp || wp === 0) {
      flake.x = Math.floor(Math.random() * canvas.width)
      flake.y = -10
    } else {
      // 如果有风，从侧边或顶部随机生成，模拟吹入感
      if (wp > 0) {
        const fromLeft = Math.random() > 0.5
        flake.x = fromLeft ? -10 : Math.floor(Math.random() * canvas.width)
        flake.y = fromLeft ? Math.floor(Math.random() * canvas.height) : -10
      } else {
        const fromRight = Math.random() > 0.5
        flake.x = fromRight
          ? canvas.width + 10
          : Math.floor(Math.random() * canvas.width)
        flake.y = fromRight ? Math.floor(Math.random() * canvas.height) : -10
      }
    }

    flake.size = Math.random() * 3 + settings.size
    flake.speed = Math.random() * 1 + settings.speed
    flake.velY = flake.speed
    flake.velX = 0
    flake.opacity = Math.random() * 0.5 + settings.opacity
  }

  resize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  snow() {
    const { ctx, canvas, settings, flakes } = this
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < flakes.length; i++) {
      const flake = flakes[i]

      flake.velX *= 0.98
      if (flake.velY <= flake.speed) flake.velY = flake.speed

      // 风力逻辑
      if (!settings.windPower || settings.windPower === 0) {
        flake.velX += Math.cos((flake.step += 0.05)) * flake.stepSize
      } else {
        flake.velX += 0.01 + settings.windPower / 100
      }

      flake.y += flake.velY
      flake.x += flake.velX

      // 边界检测
      if (
        flake.y >= canvas.height ||
        flake.y < -20 ||
        flake.x >= canvas.width ||
        flake.x < -20
      ) {
        this.resetFlake(flake)
      }

      // 绘制
      ctx.fillStyle = `rgba(${this.rgb}, ${flake.opacity})`
      ctx.beginPath()
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
      ctx.fill()
    }
    requestAnimationFrame(() => this.snow())
  }
}
