// 轮播图
// 每个网站包括苹果都有的轮播图组件
/*
1. 写一个 div 里面有 3 个 img 标签
2. 只显示当前活动的 img 标签
3. 加 1 个按钮，点击的时候切换图片
*/
const nextIndex = function(slide, offset) {
    // 得到图片总数和当前图片下标
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    // 因为得到的是 string 类型, 所以用 parseInt 转成 number
    // 也可以用 Number() 来转
    let activeIndex = Number(slide.dataset.active)
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const bindEventSlide = function() {
    let selector = '.Six-slide-button'
    bindAll(selector, 'click', function(event) {
        let button = event.target
        // 找到 slide div
        let slide = button.parentElement
        let offset = Number(button.dataset.offset)
        // 求出下一张图片的 index
        let index = nextIndex(slide, offset)
        // 显示下一张图片
        showImageAtIndex(slide, index)
    })
}

const showImageAtIndex = function(slide, index) {
    let nextIndex = index
    // 设置父节点的 data-active
    slide.dataset.active = String(nextIndex)
    // 删除当前图片的 class 给下一张图片加上 class
    let className = 'Six-active'
    removeClassAll(className)

    let nextSelector = '#id-Siximage-' + String(nextIndex)
    let img = e(nextSelector)
    img.classList.add(className)

    // 切换小圆点
    // 1. 删除当前小圆点的 class
    removeClassAll('Six-white')
    // 2. 得到下一个小圆点的选择器
    let dotSelector = '#id-dot-' + String(nextIndex)
    let dot = e(dotSelector)
    dot.classList.add('Six-white')
}

const bindEventDot = function() {
    let selector = '.Six-slide-dot'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        let slide = self.closest('.Six-slide')
        showImageAtIndex(slide, index)
    })
}

const bindEvents = function() {
    bindEventSlide()
    bindEventDot()
}

const playNextImage = function() {
    let slide = e('.Six-slide')
    let index = nextIndex(slide, 1)
    showImageAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

const demoTimer = function() {
    // 第一个参数是定时会被调用的函数
    // 第二个参数是延迟的时间, 以毫秒为单位, 1s = 1000ms
    log('begin', new Date())
    setTimeout(function() {
        log('时间到', new Date())
    }, 2000)

    // setInterval 会无限执行函数
    // setTimeout 和 setInterval 函数都有一个返回值
    // 返回值可以用来清除定时器
    let clockId = setInterval(function() {
        log('time in interval', new Date())
    }, 2000)
    log('clockId', clockId)
}

const __main = function() {
    bindEvents()
    // demoTimer()
    autoPlay()
}

__main()
