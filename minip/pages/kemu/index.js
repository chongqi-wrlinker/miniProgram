// pages/kemu/index.js
var api=require("../../api/api.js");
var common=require("../../api/common.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    yuwen:[],
    shuxue:[],
    yingyu:[],
    wuli:[],
    huaxue:[],
    shengwu:[],
    zhengzhi:[],
    lishi:[],
    dili:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var allKeMu = wx.getStorageSync("allKeMu");
    
    for(var i=0;i<allKeMu.length;i++){
      if(allKeMu[i]['lessionname']=="汉语"){
        var yuwen=new Array();
        yuwen=common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "数学") {
        var shuxue = new Array();
        shuxue = common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "英语") {
        var yingyu = new Array();
        yingyu = common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "物理") {
        var wuli = new Array();
        wuli = common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "化学") {
        var huaxue = new Array();
        huaxue = common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "生物") {
        var shengwu = new Array();
        shengwu = common.dealChildrenName(allKeMu[i]['children']);
      }else if (allKeMu[i]['lessionname'] == "政治") {
        var zhengzhi = new Array();
        zhengzhi = common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "历史") {
        var lishi = new Array();
        lishi = common.dealChildrenName(allKeMu[i]['children']);
      } else if (allKeMu[i]['lessionname'] == "地理") {
        var dili = new Array();
        dili = common.dealChildrenName(allKeMu[i]['children']);
      }
    }
    this.setData({
      "yuwen": yuwen,
      "shuxue": shuxue,
      "yingyu": yingyu,
      "wuli": wuli,
      "huaxue": huaxue,
      "shengwu": shengwu,
      "zhengzhi": zhengzhi,
      "lishi": lishi,
      "dili": dili,
    });
  },

  /**picker的方法*/
  bindPickerChange:function(e){
    var userOpen=wx.getStorageSync("userOpen");
    var kemu = e.currentTarget.dataset.msg;
    
    var index = e.detail.value;
    //通过数据获取到具体的科目id
    var allKeMu = wx.getStorageSync("allKeMu");
    for(var i=0;i<allKeMu.length;i++){
      if (allKeMu[i]['lessionname'] == kemu){
        var lessionid = allKeMu[i]['children'][index]['id'];
        break;
      }
    }
    var url = "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/dealMathJax/lessionid/" + lessionid + "/openid/" + userOpen.openid;
    wx.navigateTo({
      url: '/pages/newdati/index?url=' + url ,
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
  //跳转页面（开始答题）
  chooseMe: function (e) {
    var msg = e.currentTarget.dataset.msg;
    console.log(msg);
    //获取用户在该科目的下，可做难度的试卷列表
    var userOpen = wx.getStorageSync('userOpen');
    wx.request({
      url: 'https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserAnswerPaperList',
      data: { openid: userOpen.openid, keMu:msg},
      success: function(res) {
        console.log(res.data.questionInfo[0]);
        wx.setStorageSync('questionInfo', res.data.questionInfo[0]);
        wx.setStorageSync('userAnswerCord', res.data.userAnswerCord[0]);
        wx.navigateTo({
          url: '/pages/newdati/index?keMu=' + msg,
        })
      },
    })
  }
})