// pages/jieda/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    currentPage:1,
    totalPage:1,
    list:[],
    bottom:false,
  },
  lower() {
    var currentPage=this.data.currentPage;
    var totalPage=this.data.totalPage;
    if(parseInt(currentPage)+1<=totalPage){
      wx.showLoading({
        title: '正在加载数据...',
      })
      var userOpen = wx.getStorageSync("userOpen");
      var that = this;
      wx.request({
        url: api.userReplyQuestion(),
        data: { type: "selectReplyListByUser", id: userOpen.openid, limit: 10, page: parseInt(currentPage) + 1 },
        success: function (data) {
          var oldList=that.data.list;
          var newList = data.data.replyList;
          var fianlList=oldList.concat(newList);
          that.setData({
            list: fianlList,
            totalPage: data.data.page.totalPage,
            currentPage: data.data.page.currentPage
          });
          wx.hideLoading();
        }
      })

    }else{
      this.setData({
        bottom:true
      });
    }
    
  },

  wentixx: function (e) {
    var askId = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '/pages/huida/index?id=' + askId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取第一页的内容
    var userOpen=wx.getStorageSync("userOpen");
    var that=this;
    wx.request({
      url: api.userReplyQuestion(),
      data: { type: "selectReplyListByUser", id: userOpen.openid,limit:10,page:1},
      success:function(data){
        
        that.setData({
          list:data.data.replyList,
          totalPage:data.data.page.totalPage,
          currentPage:data.data.page.currentPage
        });
      }
    })

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },
  huida: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/huida/index?id',
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
  
  }
})