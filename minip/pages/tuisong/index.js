// pages/tuisong/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    _num: 1,
    checked:false,
    mengShow: false,
  },
  click: function (e) {
    this.setData({
      _num: e.target.dataset.num
    })
  },
  check:function(e){
    this.setData({
      mengShow: true,           //蒙层显示
      checked: true　　　　　　　　//设置动画效果为slideup
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tuisSongConfig=wx.getStorageSync('tuisSongConfig');//所有目录和内容
    var userTuiSongConfig = wx.getStorageSync('userConfigMulu');//用户的设置偏好
    //找到用户的设置目录偏好
    var fianlMuluArr=new Array();
    if(userTuiSongConfig){
      for(var i in userTuiSongConfig){
        for(var j in tuisSongConfig){
          if(tuisSongConfig[j]['id']==userTuiSongConfig[i]){
            fianlMuluArr[fianlMuluArr.length] = tuisSongConfig[j];
          }
        }
      }
    }else{
      fianlMuluArr = tuisSongConfig;
    }
    
    //找到在用户设置关键字的偏好内容
    var userConfigKeyword = wx.getStorageSync('userConfigKeyword');
    for (var j in fianlMuluArr) {
      for (var k in fianlMuluArr[j]['contentList']) {
        var flag=false;
        for (var i in userConfigKeyword) {
          if (fianlMuluArr[j]['contentList'][k]['keywordTemp'].indexOf(userConfigKeyword[i])!=-1){
            flag=true;
            break;
          }
        }
        fianlMuluArr[j]['contentList'][k]['checked']=flag;
      }
    }
    console.log(fianlMuluArr);
    this.setData({
      'content': fianlMuluArr,
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