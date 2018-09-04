// pages/tiwen/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    res: [1, 2, 3, 4, 5, 6,7,8,9,10,11,12,13,14,15],
    totalPage:1,
    currentPage:1,
  },
  lower() {
    var currentPage=this.data.currentPage;
    var totalPage=this.data.totalPage;
    if(parseInt(currentPage)+1<=totalPage){
      wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
      });
      var userOpen = wx.getStorageSync("userOpen");
      var that = this;
      wx.request({
        url: api.userAskQuestion(),
        data: { ownerid: userOpen.openid, limit: 10, page: parseInt(currentPage) + 1, type: "selectUserAllList" },
        success: function (e) {
          var oldList=that.data.list;
          var newList = e.data.list;
          var finalList = oldList.concat(newList);
          that.setData({
            list: finalList,
            totalPage: e.data.page.totalPage,
            currentPage: e.data.page.currentPage,
          });
          wx.hideLoading();
        }
      })
    }else{
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: '',
        duration: 300
      });
    }
  },
  wentixx: function (e) {
    var askId=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/huida/index?id=' + askId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //10条记录每页
    var userOpen=wx.getStorageSync("userOpen");
    var that=this;
    wx.request({
      url: api.userAskQuestion(),
      data: { ownerid: userOpen.openid, limit: 10, page: 1, type:"selectUserAllList"},
      success:function(e){
        console.log(e);
        that.setData({
          list:e.data.list,
          totalPage:e.data.page.totalPage,
          currentPage:e.data.page.currentPage,
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      title: '正在加载数据...',
    })
    var userOpen = wx.getStorageSync("userOpen");
    var that = this;
    wx.request({
      url: api.userAskQuestion(),
      data: { ownerid: userOpen.openid, limit: 10, page: 1, type: "selectUserAllList" },
      success: function (e) {
        that.setData({
          list: e.data.list,
          totalPage: e.data.page.totalPage,
          currentPage: e.data.page.currentPage,
        });
        wx.hideLoading();
        wx.showToast({
          title: '加载成功',
          icon:"success",
          duration:1000
        })
      }
    })
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