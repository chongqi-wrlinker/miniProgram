// pages/dengluxx/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:"",
    password:"",
    comfirm:"",
  },
  newdenglu: function (e) {
    wx.navigateTo({
      url: '/pages/denglu/index',
    })
  },

  //获取输入框中的值
  getValue: function (e) {
    var data=this.data;
    var type = e.currentTarget.dataset.type;
    var value = e.detail.value;
    if (type == 1) {
      data.email=value;
    } else if(type==2){
      data.password=value;
    } else if(type==3){
      data.comfirm=value;
    }
    this.setData({
      email:data.email,
      password:data.password,
      comfirm:data.comfirm,
    });
  },

  //注册页面
  register:function(e){
    var email=this.data.email;
    var password=this.data.password;
    var comfirm=this.data.comfirm;
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(email);     // 得到的值为布尔型
    console.log(emailVar);
    //这里需要判断用户的输入问题
    if(email==""||password==""||comfirm==""){
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 2000
      });
    }else if(emailVar==false){
      wx.showToast({
        title: '请输入正确邮箱',
        icon: 'none',
        duration: 2000
      });
    }else if(password!=comfirm){
      wx.showToast({
        title: '请统一前后密码',
        icon: 'none',
        duration: 2000
      });
    }else{
      wx.request({
        url: api.register(),
        data: { email: email, password: password },
        success: function (data) {

          if (data.data.msg == "success") {
            wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 2000) //延迟时间 这里是2秒
          } else {
            wx.showToast({
              title: '邮箱被占用',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
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
  onShareAppMessage: function () {
  
  }
})