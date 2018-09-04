// pages/denglu/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginname:"",
    password:"",
  },
  newzhuce: function (e) {
    wx.navigateTo({
      url: '/pages/zhuce/index',
    })
  },

  //获取input中的值
  getValue:function(e){
    var type=e.currentTarget.dataset.type;
    var value=e.detail.value;
    if(type=="name"){
      this.setData({
        loginname: value
      });
      
    }else{
      this.setData({
        password: value
      });
    }
  },

  //登陆的方法
  doLogin:function(e){
    var loginname = this.data.loginname;
    var password = this.data.password;
    var reg = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$');
    var emailVar = reg.test(loginname);     // 得到的值为布尔型
    var reg1 = new RegExp('^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$');
    var phoneVar = reg1.test(loginname);     // 得到的值为布尔型
    var reg2 = new RegExp('[0-9]', 'g');//判断用户输入的是否为数字
    var regNum = reg2.test(loginname);
    console.log(phoneVar);
    console.log(regNum);
    if(this.data.loginname && this.data.password){
      if (regNum == true && loginname.length=="7")
         //提交入后台进行匹配
        var type=1;//1:沃仁号登陆，2：电话登陆，3：邮箱登陆
      else if (phoneVar==true){
        var type = 2;
      } else if (emailVar==true){
        var type=3;
      }
      wx.request({
        url: api.login(),
        data: { type:type,loginname:loginname,password:password},
        success:function(data){
          
          if(data.data.code=="success"){
            
            //设置登陆状态
            wx.setStorageSync("loginType",true);
            //个人信息
            var tempData=data.data.userInfo;
            var userInfo={
              'nickname': tempData.nickname,
              'email':tempData.email,
              'tel':tempData.tel,
              'sex':tempData.sex,
              'address':tempData.address,
              'loginname':tempData.loginname
            }
            wx.setStorageSync("userInfo", userInfo);
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 2000
            })
            console.log("登陆成功");
            //自动跳转到our页面
            var pages = getCurrentPages();
            var prePage = pages[pages.length - 2];
            prePage.setData({
              loginType: true,
              userInfo: userInfo,
            });
            wx.navigateBack({
              delta: 1
            })
          }else{
            wx.showToast({
              title: '用户名和密码不匹配',
              icon: 'none',
              duration: 2000
            })
            //登陆失败
            console.log("用户名和密码不匹配");
          }
        }
      })

    }else{
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 2000
      })
      //错误，用户名和密码不能为空
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