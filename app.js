//app.js

// App : 注册小程序。App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    var that = this

    //获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.systeminfo = res
        that.globalData.isIphoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {},

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {},

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {},

  /**
   * 当小程序要打开的页面不存在时触发。也可以使用 wx.onPageNotFound 绑定监听
   */
  onPageNotFound: function(res) {
    //统一处理： 跳转到首页
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },

  globalData: {
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIphoneX: false,

    //和风天气： https://www.heweather.com/
    weatherKey:"482a7ef0d22d4c0db10b0b6458900744",
    //天气图标
    weatherIconUrl:'https://cdn.heweather.com/cond_icon/',
    //天气链接
    requestUrl: {
      weather:'https://free-api.heweather.net/s6/weather/',
      hourly:'https://free-api.heweather.net/s6/weather/hourly/'
    },
  },

})