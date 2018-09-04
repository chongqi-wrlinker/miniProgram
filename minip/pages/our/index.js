// pages/our/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zhanKai1:false,
    loginType:false,
    userInfo:{
      'nickname':"未登录",
      'email':"未登录",
      'tel':"未登录",
      'sex':"未登录",
      'address':"未登录",
      'loginname':"未登录"
    },
    imgUrl:"/image/cst.jpg",
    askCount:0,
    replyCount:0,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var loginType=wx.getStorageSync("loginType");
    loginType=loginType ? loginType : false;
    if(loginType){
      var userInfo=wx.getStorageSync("userInfo");
      this.setData({
        userInfo: userInfo,
      });
    }
    this.setData({
      loginType: loginType,
    });
    var that=this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.setData({
                imgUrl: res.userInfo.avatarUrl,
              });
            }
          })
        }else{
          wx.showToast({
            title: '点击头像替换图片',
            icon: 'none',
            duration: 2000
          })
        }
      }
    });

    //获取用户提问的条数和回答的条数
    var userOpen=wx.getStorageSync("userOpen");
    wx.request({
      url: api.getUserAskOrReplyCount(),
      data: { ownerid: userOpen.openid},
      success:function(data){
        that.setData({
          askCount: data.data.askCount,
          replyCount:data.data.replyCount
        });
      }
    })
  },

  logout:function(e){
    var that=this;
    wx.showModal({
      title: '消息提示框',
      content: '确定要登出账号',
      success:function(e){
        if(e.confirm){
          //点击确定
          wx.removeStorageSync("loginType");
          wx.removeStorageSync("userInfo");
          var loginType = wx.getStorageSync("loginType");
          loginType = loginType ? loginType : false;
          if (loginType) {
            var userInfo = wx.getStorageSync("userInfo");
            
          }else{
            var userInfo= {
              'nickname':"未登录",
              'email':"未登录",
              'tel':"未登录",
              'sex':"未登录",
              'address':"未登录",
              'loginname':"未登录"
            };
          }
          that.setData({
            userInfo: userInfo,
            loginType: loginType,
          });
        }
      }
    })
    
  },

  //用户授权
  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.showLoading({
        title: "等待数据加载..."
      });
      //授权成功（修改用户的用户名和头像信息）
      var userOpen = wx.getStorageSync('userOpen');
      var url = e.detail.userInfo.avatarUrl;
      var nickname = e.detail.userInfo.nickName;
      
      var that=this;
      wx.request({
        url: api.updateUserInfo(),
        data: { type: "updateUrl", openid: userOpen.openid, url: url, nickname: nickname },
        success: function (data) {
          wx.hideLoading();
          that.setData({
            imgUrl: url,
          });

        }
      })
    }
  },

  zhanKai: function (e) {
    var that = this;
    that.setData({
      zhanKai1: (!that.data.zhanKai1)
    })
  },
  tiwen: function (e) {
    wx.navigateTo({
      url: '/pages/tiwen/index',
    })
  },
  denglu: function (e) {
    wx.navigateTo({
      url: '/pages/denglu/index',
    })
  },
  zhuce: function (e) {
    wx.navigateTo({
      url: '/pages/zhuce/index',
    })
  },
  fabu: function (e) {
    wx.navigateTo({
      url: '/pages/fabu/index',
    })
  },
  jieda: function (e) {
    wx.navigateTo({
      url: '/pages/jieda/index',
    })
  },
  money: function (e) {
    wx.navigateTo({
      url: '/pages/money/index',
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
    //获取用户提问的条数和回答的条数
    var userOpen = wx.getStorageSync("userOpen");
    var that=this;
    wx.request({
      url: api.getUserAskOrReplyCount(),
      data: { ownerid: userOpen.openid },
      success: function (data) {
        that.setData({
          askCount: data.data.askCount,
          replyCount: data.data.replyCount
        });
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