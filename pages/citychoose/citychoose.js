// pages/citychoose/citychoose.js
let cityDatas = require('../../data/staticData.js')

Page({

  /**
   * Page initial data
   */
  data: {
    //热门城市
    hotCityDatas: ["北京市", "上海市", "广州市", "深圳市", "西安市", "杭州市", "武汉市", "成都市"],
    //热门城市中 被选中的标记
    hotcitySelection: false,

    //全部城市
    allCityDatas: [],
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {

    let cities = this.getSortedCity(cityDatas.cities || [])
    //对城市数据进行排序处理

    this.setData({
      allCityDatas: cities
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

  },

  //选择热门城市和选择定位
  selectHotCity: function(event) {
    var cityName = event.currentTarget.dataset.cityname
    console.log("选择的城市是： " + cityName)

    let pages = getCurrentPages() //wx的方法：获取当前页面栈。数组中第一个元素为首页，最后一个元素为当前页面。

    let delta = pages.length
    let backPage = pages[delta - 2] // 代表要返回的页面Page //这里 2 表示返回 2级

    if (cityName) {
      this.setData({
        hotcitySelection: true
      })
      //这里其实是调用的是 index页面的 getWeather方法
      backPage.getWeather(cityName, () => {
        wx.navigateBack({})
      })

    } else {
      //选择的是定位
      this.setData({
        hotcitySelection: false
      })
      //这里其实是调用的是 index页面的 init方法
      backPage.init({}, () => {
        wx.navigateBack({})
      })
    }
  },

  //对城市数据排序: 按照字母顺序
  getSortedCity: function(cityDatas) {

    cityDatas = cityDatas.sort((a, b) => {
      if (a.letter > b.letter) {
        return 1;
      }
      if (a.letter < b.letter) {
        return -1;
      }
      return 0;
    })


    let obj = {}

    for (let i = 0, len = cityDatas.length; i < len; i++) {
      let item = cityDatas[i]//{ "letter": "B", "name": "北京市" }
      delete item.districts
      let letter = item.letter

      if(!obj[letter]){
        obj[letter] = []
      }

      obj[letter].push(item)

    }

    return obj

  },

})