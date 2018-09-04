// pages/newdati/index.js
var WxParse = require('../../wxParse/wxParse.js');
var api = require("../../api/api.js");
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:"", 
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(1);
    this.setData({
      "url": options.url,
    });
    wx.showLoading({
      title: '数据加载中',
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading();
    console.log(2);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    wx.hideLoading();
    console.log(3);
  },



  onlaunch:function(){
    wx.hideLoading();
    console.log(4);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.hideLoading();
    console.log(5);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.hideLoading();
    console.log(6);
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
  jiexi: function (e) {
    wx.navigateTo({
      url: '/pages/newjiexi/index',
    })
  }
})