//index.js
//获取应用实例
let utils = require('../../utils/util.js')
const app = getApp()
let globalData = app.globalData
//和风天气Api的key
const key = globalData.weatherKey

Page({
  data: {
    //主页面背景图
    //bcgImg: '',
    //默认背景颜色
    //bcgColor: '#2d2225',
    //更换背景图标记
    bcgImgAreaShow: false,
    //提示信息
    //message: '天天好心情 天天好天气',
    //城市天气数据
    weatherDatas: {},
    //定位城市的图标标记
    located: true,
    //天气Icon Url
    weatherIconUrl: globalData.weatherIconUrl,
    // 当前所展示的城市
    currentLocation: '',

    detailsDic: {
      key: ['tmp', 'fl', 'hum', 'pcpn', 'wind_dir', 'wind_sc', 'wind_spd', 'vis', 'cloud', 'pres', '', ],
      val: {
        tmp: '温度(℃)',
        fl: '体感温度(℃)',
        hum: '相对湿度(%)',
        pcpn: '降水量(mm)',
        wind_dir: '风向',
        wind_sc: '风力(级)',
        wind_spd: '风速(mk/h)',
        vis: '能见度(km)',
        cloud: '紫外线指数',
        pres: '气压(mb)',
      },
    },

    lifestyleDic: {
      key: ['comf', 'drsg', 'cw', 'flu', 'sport', 'trav', 'uv', 'air', ],
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

    // 定位权限失败dialog
    dialogTitle: '定位失败',
    dialogShow: false,
    buttons: [{
      text: '确定'
    }],
    dialogContent: "请先允许“使用我的地理位置”后，再查看定位城市信息，摩根天气默认为您展示北京天气信息。",
    maskclosable: false,
    mask: true,
  },
  onLoad: function() {
    this.loadPageData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.loadPageData()
    wx.stopPullDownRefresh()
  },

  //加载页面数据
  loadPageData: function() {
    this.getCityDatas()
    this.getWeatherDatas()
  },

  // 获取city数据
  getCityDatas: function() {
    let that = this
    wx.getStorage({
      key: 'weatherDatas',
      success: function(res) {
        that.setData({
          weatherDatas: res.data
        })
      },
    })
  },

  //获取天气数据
  getWeatherDatas: function() {
    //获取天气数据的前提是先要有定位信息
    console.log("this.data.located = " + this.data.located)
    if (this.data.located) {
      this.init({})
    }
  },

  init: function(params, callback) {
    let that = this

    that.setData({
      located: true,
    })

    //获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
    wx.getLocation({
      success: function(res) {
        // console.log("坐标: "+`${res.latitude},${res.longitude}`)
        that.getWeather(`${res.latitude},${res.longitude}`)

        callback && callback()
      },
      fail: function(res) {
        that.fail(res)
        //定位失败后，弹出 dialog
        that.setData({
          dialogShow: true
        })
      },
    })
  },

  tapDialogButton: function(e) {
    console.log('dialog', e.detail)
    let that = this
    that.setData({
      dialogShow: false
    })
    //打开设置页面
    wx.openSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userLocation']) {
          that.getWeatherDatas()
        } else {
          //设置界面返回 -- 不使用 定位权限
          //这里默认返回北京天气信息
          that.getWeather('beijing')
          that.setData({
            located: false
          })
        }
      }
    })
  },

  fail: function(res) {
    console.log(res)
  },

  //根据location获取天气数据
  getWeather: function(location, callback) {
    //城市选择界面中的回调不为kong
    if (callback){
      this.setData({
        located : false
      })
    }

    var weatherUrl = `${globalData.requestUrl.weather}`
    // console.log("天气url= "+weatherUrl)
    wx.request({
      url: weatherUrl,
      data: {
        location,
        key,
      },
      success: (res) => {
        if (res.statusCode == 200) {
          //下面是和风天气的api结构
          let data = res.data.HeWeather6[0]
          console.log(data)

          if (data.status == 'ok') {
            this.success(data, location)
            callback && callback()
          } else {
            wx.showToast({
              title: '查询失败',
              icon: 'none'
            })
          }
        }
      },
      fail: () => {
        wx.showToast({
          title: '查询失败',
          icon: 'none'
        })
      },

    })
  },

  success: function(data, location) {

    wx.stopPullDownRefresh()
    let now = new Date()
    data.updateTime = now.getTime()
    data.updateTimeFormat = utils.formatTime(now)

    wx.setStorage({
      key: 'weatherDatas',
      data: data,
    })

    this.setData({
      weatherDatas: data,
    })

  },


  //生活指数 Item 
  lifestyle: function(event) {
    var datas = event.currentTarget.dataset.lifestyle
    datas = JSON.stringify(datas)
    // 页面跳转
    wx.navigateTo({
      url: '/pages/lifestyle/lifestyle?lifestyle=' + datas,
    })
  },

  //选择城市
  toCityChoose: function() {
    //页面跳转
    wx.navigateTo({
      url: '/pages/citychoose/citychoose',
    })
  },

  //dialog阻止事件冒泡
  preventTouchMove: function(e) {
    return;
  },

  //展示个人信息
  showInfo: function() {
    return;
  }

})