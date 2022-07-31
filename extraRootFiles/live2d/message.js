/**
 * 为 live2d 添加 message 交互
 * 下面的内容是对 github 上某处代码的引用，并做了一些修改，使用原生 js
 * https://github.com/galnetwen/Live2D/blob/master/live2d/js/message.js
 */

(function live2dMessage() {
  let timing = ''; // showMessage setTimeout
  let timingInterval = '' // 求 star 轮播
  const showMessage = (msg, showTime) => {
    if (timing) {
      clearTimeout(timing)
      timingInterval && clearInterval(timingInterval)
    }
    this.messageEl.innerHTML = `<span>${msg}</span>`
    this.messageEl.classList.add('msg')
    showTime && (timing = setTimeout(() => {
      this.messageEl.innerHTML = ''
      this.messageEl.classList.remove('msg')
      showTipsAllTime()
    }, showTime))
  }

  window.addEventListener('load', () => {
    this.messageEl = document.querySelector('#live2dMessage')
    showWelcome()
  })

  window.addEventListener('copy', () => {
    showMessage('你都复制了些什么呀，转载要记得加上出处哦~~', 5000);
  });

  document.addEventListener('visibilitychange', (event) => {
    !document.hidden && showMessage('你又回来了呀，开心 ~~', 5000);
  }, false)

  function showTipsAllTime() {
    timingInterval = setInterval(() => {
      showMessage('在忙吗? 帮我在 GitHub 上点个 Star 吧 ~~', 5000);
    }, 5000)
  }

  function showWelcome() {
    var text;
    // if (window.location.host == `www.zuo11.com`) { //主页URL判断，需要斜杠结尾
    var now = (new Date()).getHours();
    if (now > 23 || now <= 5) {
      text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？';
    } else if (now > 5 && now <= 7) {
      text = '早上好！一日之计在于晨，美好的一天就要开始了！';
    } else if (now > 7 && now <= 11) {
      text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
    } else if (now > 11 && now <= 14) {
      text = '中午了，工作了一个上午，现在是午餐时间！';
    } else if (now > 14 && now <= 17) {
      text = '午后很容易犯困呢，今天的运动目标完成了吗？';
    } else if (now > 17 && now <= 19) {
      text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~';
    } else if (now > 19 && now <= 21) {
      text = '晚上好，今天过得怎么样？';
    } else if (now > 21 && now <= 23) {
      text = '已经这么晚了呀，早点休息吧，晚安~~';
    } else {
      text = '嗨~ 快来逗我玩吧！';
    }
    // }
    showMessage(text, 5000);
  };
})()
