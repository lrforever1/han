

/**
 * 处理音乐
 */
~ function () {
  // 获取需要操作的元素
  var musicBox = document.querySelector('.musicBox'),
      musicAudio = document.querySelector('#musicAudio');
  // 加载页面就开始播放
  function musicPlay() {
    musicAudio.play();
    musicBox.className = 'musicBox move';
    document.removeEventListener("touchstart", musicPlay, false);
  }
  // 加载页面就开始播放：IOS手机微信端对于音乐的自动播放存在BUG（经常没有声音），我们需要单独的处理一下
  musicPlay();
  document.addEventListener("WeixinJSBridgeReady", musicPlay, false);
  document.addEventListener("touchstart", musicPlay, false);

  // 点击控制播放
  musicBox.onclick = function () {
    // 
    if (musicAudio.paused) {
      // 当前处于暂停状态：控制播放
      musicPlay();
      return;
    }
    // 当前处于播放状态：控制暂停
    musicAudio.pause();
    musicBox.className = 'musicBox';
  };
}();


/*
 * 初始化swiper，基于一些参数配置滑屏的效果
 * http://www.swiper.com.cn/api/
 * 
 */
var mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  effect: 'coverflow',
  on: {
    init: function () {
      swiperAnimateCache(this); //隐藏动画元素 
      swiperAnimate(this); //初始化完成开始动画
    },
    slideChangeTransitionEnd: function () {
      swiperAnimate(this); //每个slide切换结束时也运行当前slide动画
      //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 动画只展现一次，去除ani类名
    }
  }
});