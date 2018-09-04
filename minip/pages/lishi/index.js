// pages/lishi/index.js
var api=require("../../api/api.js");//引入地址api文件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPaperList:"",
    _num: 1,
    checked: false,
    mengShow: false,
    selectKeMu:"",
    allKeMu:[]
  },

  //点选科目内容
  click: function (e) {
    var kemu = e.currentTarget.dataset.kemu;
    this.setData({
      _num: e.target.dataset.num,
      selectKeMu: kemu　　　　
    })
  },
  checked: function (e) {
    this.setData({
      mengShow: true,//蒙层显示
      checked: true,//设置动画效果为slideup
      　　
    })
  },
  choose: function (e) {
    var that = this;
    this.setData({
      checked: false　　　　　　//设置动画效果为slidedown
    })
    setTimeout(function () {       //延时设置蒙层的隐藏，这个定时器的时间，就是slidedown在css动画里设置的时间，这样就能实现slidedown动画完成后，蒙层才消失的效果。不设置定时器会导致动画效果看不见
      that.setData({
        mengShow: false
      })
    }, 500)
  },
  inbtn: function (e) {          //这个事件必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡，导致点击in-list这里面的元素时，点击事件冒泡到list-fix触发它的slidedown事件。
    console.log("in")
  },
  inbtns: function (e) {          //这个事件必须有，就算不做什么事情也要写上去，因为这个事件是为了防止事件冒泡，导致点击in-list这里面的元素时，点击事件冒泡到list-fix触发它的slidedown事件。
    console.log("in")
  },
  check:function(e){
    wx.showToast({ title: '请先完成激活', icon: 'succes', duration: 1000, mask: true })
  },

  /**显示难度等级的弹出框*/
  showSelectLevel:function(e){
    var userOpen=wx.getStorageSync("userOpen");
    var lessionid=e.target.dataset.lessionid;
    var index = e.target.dataset.showSelectLevel
    wx.showLoading({
      title: '数据加载中',
    })
    var that=this;
    //获取所有的难度列表
    wx.request({
      url: api.getLevelList(),
      data: { lessionid: lessionid, openid:userOpen.openid},
      success:function(res){
        wx.hideLoading();
        var url ="/pages/newdati/index";
        that.demoPicker.showPicker(res.data, url, lessionid, userOpen.openid, index);
      }
    })
    
    
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.demoPicker = this.selectComponent("#demoPicker");
    var allKeMu = wx.getStorageSync("allKeMu");
    this.setData({
      'allKeMu': allKeMu
    });
    
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