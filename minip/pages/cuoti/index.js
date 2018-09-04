// pages/cuoti/index.js
var api = require("../../api/api.js");
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showType:true,
    list:[],
    totalCount:"",
    totalPage:"",
    currentPage:"",
  },
  lower() {
    var page=this.data.currentPage;
    var totalPage=this.data.totalPage;
    if (parseInt(page)+1>totalPage){
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: 'success',
        duration: 300
      });
      return false;
    }else{
      wx.showLoading({ 
        title: '加载中',
        icon: 'loading',
      });
      var userOpen = wx.getStorageSync("userOpen");
      var that = this;
      wx.request({
        url: api.getWrongQuestionList(),
        data: { type: 0, openid: userOpen.openid, page: parseInt(page) + 1, limit: 10 },
        success: function (data) {
          var listRes = data.data.questionList;
          var oldList=that.data.list;
          for (let i = 0; i < listRes.length; i++) {

            WxParse.wxParse('topic' + i, 'html', listRes[i]['questionInfo'][0]['question'], that);
            if (i === listRes.length - 1) {
              WxParse.wxParseTemArray("list", 'topic', listRes.length, that)
            }
          }

          let list = that.data.list;

          list.map((item, index, arr) => {
            for (var i = 0; i < listRes.length; i++) {
              if (i == index) {
                arr[index][0].answerId = listRes[i]['id'];
                arr[index][0].lavelname = listRes[i]['questionInfo'][0]['levelInfo'][0]['levelname'];           //对应的时使用WxParse后的结构
                arr[index][0].lessionLuJu = listRes[i]['lessionLuJu'];
                arr[index][0].time = listRes[i]['time'];
                arr[index][0].state = false;
              }
            }
          });
          that.setData({
            list:oldList.concat(list),
            currentPage: parseInt(page) + 1 
          });
          setTimeout(() => {
            wx.hideLoading();
          }, 1500)
        }
      })
    }
  },
  chongzuo: function (e) {
    var answerId=e.currentTarget.dataset.id;
    //判断该题是否删除
    var that=this;
    wx.request({
      url: api.dealWrongQuestion(),
      data: { id: answerId, type:"selectExist"},
      success:function(data){
        if(data.data>0){
          wx.navigateTo({
            url: '/pages/chongzuo/index?answerId=' + answerId,
          })
        }else{
          wx.showToast({
            title: '该题已经答对了',
          })
          //删除该题
          var list=that.data.list;
          for(var i=0;i<list.length;i++){
            if (list[i][0]['answerId']==answerId){
              list[i][0]['state']=true;
              break;
            }
          }
          that.setData({
            list:list
          });
        }
      }
    })
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中',
    })
    
    wx.getSystemInfo({
      success: (list) => {
        this.setData({
          height: list.windowHeight
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
    var userOpen = wx.getStorageSync("userOpen");
    var that = this;
    wx.request({
      url: api.getWrongQuestionList(),
      data: { type: 0, openid: userOpen.openid, page: 1, limit: 10 },
      success: function (data) {
        var listRes = data.data.questionList;
        that.setData({
          'list': listRes,
          'totalPage': data.data.page.totalPage,
          'totalCount': data.data.page.totalCount,
          'currentPage': data.data.page.currentPage
        });


        for (let i = 0; i < listRes.length; i++) {

          WxParse.wxParse('topic' + i, 'html', listRes[i]['questionInfo'][0]['question'], that);
          if (i === listRes.length - 1) {
            WxParse.wxParseTemArray("list", 'topic', listRes.length, that)
          }
        }

        let list = that.data.list;

        list.map((item, index, arr) => {
          for (var i = 0; i < listRes.length; i++) {
            if (i == index) {
              arr[index][0].answerId = listRes[i]['id'];
              arr[index][0].lavelname = listRes[i]['questionInfo'][0]['levelInfo'][0]['levelname'];           //对应的时使用WxParse后的结构
              arr[index][0].lessionLuJu = listRes[i]['lessionLuJu'];
              arr[index][0].time = listRes[i]['time'];
              arr[index][0].state = false;
            }
          }
        });
        console.log(list);
        that.setData({
          list: list,
          "showType": false
        });
        setTimeout(function(){
          wx.hideLoading();
        },1000);
        wx.showToast({
          title: '数据加载完成',
          icon:"success",
          duration:1000
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