// pages/newindex/newindex.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '快来答题啊',
      path: '/pages/newindex/newindex'
    }
  },
  //跳转页面（开始答题）
  kaishidati: function (e) {
    

    wx.navigateTo({
      url: '/pages/kemu/index',
    })
    /**
     * 
     * 
    */
  },

  getUserInfo:function(e){
    if (e.detail.errMsg == "getUserInfo:ok"){
      wx.showLoading({
        title:"等待数据加载..."
      });
      //授权成功（修改用户的用户名和头像信息）
      var userOpen= wx.getStorageSync('userOpen');
      var url = e.detail.userInfo.avatarUrl;
      var nickname = e.detail.userInfo.nickName;
      wx.request({
        url: api.updateUserInfo(),
        data: { type: "updateUrl", openid: userOpen.openid, url: url, nickname:nickname},
        success:function(data){
          if(data.data){
            wx.hideLoading();
            wx.navigateTo({
              url: '/pages/newpaihang/index',
            })
          }else{
            wx.showToast({
              title: '答题后才能查看',
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
          
        }
      })
    } 
  },

  //跳转页面（往期答题）
  wangqichengjiu: function (e) {
    //获取系统的所有的答题列表
    var allKeMu = wx.getStorageSync("allKeMu");
    
    if(!allKeMu){
      wx.request({
        url: api.getAllKeMu(),
        success: function (res) {
          wx.setStorageSync("allKeMu", res.data);
        }
      })
    }
    wx.navigateTo({
      url: '/pages/newlishi/index',
    })
  },
  datiguize: function (e) {
    wx.navigateTo({
      url: '/pages/guize/index',
    })
  },
  shezhi: function (e) {
    //获取所有的推送目录
    var url = api.getSystemTuiSongMulu();
    wx.request({
      url: url,
      success: function (res) {
        wx.setStorageSync('tuisSongConfig', res.data);
        wx.navigateTo({
          url: '/pages/shezhi/index',
        })
      }
    })
    
  },
  tuisong: function (e) {
    //获取用户本地设置过的推送内容
    var url = api.getSystemTuiSongMulu();
    wx.request({
      url: url,
      success: function (res) {
        wx.setStorageSync('tuisSongConfig', res.data);
        wx.navigateTo({
          url: '/pages/tuisong/index',
        })
      }
    })
    
  }
})