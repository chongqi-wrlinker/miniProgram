// pages/newpaihang/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ribang: true,
    yuebang:false,
    zhoubang:false,
    zongbang:false,
    dayData:"",
    weekData:"",
    monthData:"",
    allData:"",
    myOpenid:"",
  },
  ribang: function () {
    this.setData({
      ribang:true,
      yuebang: false,
      zhoubang: false,
      zongbang: false,
    })
  },
  zhoubang: function () {
    this.setData({
      ribang: false,
      yuebang: false,
      zhoubang: true,
      zongbang: false,
    })
  },
  yuebang: function () {
    this.setData({
      ribang:false,
      yuebang: true,
      zhoubang: false,
      zongbang: false,
    })
  },
  zongbang: function () {
    this.setData({
      ribang: false,
      yuebang: false,
      zhoubang: false,
      zongbang: true,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户的排行榜内容
    var that=this;
    var userOpen = wx.getStorageSync('userOpen');
    
    wx.request({
      url: api.getMemcaheRank(),
      data: { openid: userOpen.openid},
      success:function(res){
        
        that.setData({
          'dayData':res.data.day,
          'weekData': res.data.week,
          'monthData': res.data.month,
          'allData': res.data.allData,
          'myOpenid': userOpen.openid
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  
})