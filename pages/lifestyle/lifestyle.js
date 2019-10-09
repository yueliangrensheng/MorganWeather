// pages/lifestyle/lifestyle.js
Page({

  /**
   * Page initial data
   */
  data: {
    lifestyleDatas:{},

    lifestyleDic: {
      key: ['comf', 'drsg', 'cw', 'flu', 'sport', 'trav', 'uv', 'air',],
      val: {
        comf: "舒适度指数",
        drsg: '穿衣指数',
        cw: '洗车指数',
        flu: '感冒指数',
        sport: '运动指数',
        trav: '旅游指数',
        uv: '紫外线指数',
        air: '空气污染扩散',
      }
    },
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    
    console.log(JSON.parse(options.lifestyle))
    var dataJsons = JSON.parse(options.lifestyle)
    this.setData({
      lifestyleDatas: dataJsons
    })

    wx.setNavigationBarTitle({
      title: this.data.lifestyleDic.val[dataJsons.type],
    })
    
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})