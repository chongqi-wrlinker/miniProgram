// pages/newlishi/index.js
var api=require("../../api/api.js");
var common = require("../../api/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [],
    multiArray:[],
    multiIndex: [0],
    zongkemu:[],
    shuxue:[],
    hanyu:[],
    yingyu:[],
    wuli:[],
    huaxue:[],
    shengwu:[],
    zhengzhi:[],
    lishi:[],
    dili:[],
  },
  lower() {
    var currentPage = this.data.currentPage;
    var totalPage = this.data.totalPage;
    if (parseInt(currentPage) + 1 <= totalPage) {
      wx.showLoading({
        title: '正在加载...',
      })
      var that = this;
      wx.request({
        url: api.getLianList(),
        data: { type: "selectAll", page: parseInt(currentPage) + 1, limit: 10 },
        success: function (data) {
          var oldList = that.data.res;
          var newList = data.data.list;
          var finalList = oldList.concat(newList);
          that.setData({
            res: finalList,
            totalPage: data.data.page.totalPage,
            currentPage: data.data.page.currentPage,
          });
          setTimeout(function () {
            wx.hideLoading();
          }, 1000);
        }
      })
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: '',
        duration: 1000
      })
    }
  },
  bindPickerChange: function (e) {
    wx.showToast({
      title: '确定了',
      icon: '',
      duration: 1000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    
    
  },
  wangqi:function(e){
    var userOpen = wx.getStorageSync("userOpen");
    var openid = userOpen.openid;
    var lessionid=e.currentTarget.dataset.lessionid;
    var levelid = e.currentTarget.dataset.levelid;
    var url = "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/dealMathJax/lessionid/"+lessionid +"/openid/" + openid + "/levelid/" + levelid;
    wx.navigateTo({
       url: '/pages/newdati/index?url=' + url, 
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
      wx.showLoading({
          title: '正在加载211...',
      })
      this.setData({
          zongkemu: [],
          shuxue: [],
          hanyu: [],
          yingyu: [],
          wuli: [],
          huaxue: [],
          shengwu: [],
          zhengzhi: [],
          lishi: [],
          dili: [],
      });

      var that = this;
      var userOpen = wx.getStorageSync("userOpen");
      wx.request({
          url: api.getLianList(),
          data: { openid: userOpen.openid },
          success: function (data) {
              var arr = data.data;
              for (var i = 0; i < arr.length; i++) {
                  var oddmath = arr[i].math;
                  var newmath = (oddmath * 100.00).toFixed(2) + "%";
                  arr[i].math = newmath;
                  if (arr[i].lessionname == "数学") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'shuxue': that.data.shuxue.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "汉语") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'hanyu': that.data.hanyu.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "英语") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'yingyu': that.data.yingyu.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "物理") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'wuli': that.data.wuli.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "化学") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'huaxue': that.data.huaxue.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "生物") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'shengwu': that.data.shengwu.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "政治") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'zhengzhi': that.data.zhengzhi.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "历史") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'lishi': that.data.lishi.concat(kemu),
                      });
                  } else if (arr[i].lessionname == "地理") {
                      var kemu = new Array();
                      var kemu = arr[i];
                      that.setData({
                          'dili': that.data.dili.concat(kemu),
                      });
                  }
              }
              var shuxue = that.data.shuxue;
              var hanyu = that.data.hanyu;
              var yingyu = that.data.yingyu;
              var wuli = that.data.wuli;
              var huaxue = that.data.huaxue;
              var zhengzhi = that.data.zhengzhi;
              var shengwu = that.data.shengwu;
              var lishi = that.data.lishi;
              var dili = that.data.dili;
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(hanyu),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(shuxue),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(yingyu),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(wuli),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(huaxue),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(shengwu),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(zhengzhi),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(lishi),
              });
              that.setData({
                  'zongkemu': that.data.zongkemu.concat(dili),
              });
              var arr = that.data.zongkemu;
              that.setData({
                  res: arr,
              });
              wx.hideLoading();
          }
      });

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