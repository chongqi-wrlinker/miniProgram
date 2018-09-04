// pages/shezhi/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    muLus: "",
    keywords:"",
    muluSelect:"",
    keywordListSelect:"",
  },
  checkboxChange: function (e) {
    var value = e.detail.value;//选中的复选框
    this.setData({
      'muluSelect': value
    });
    var userConfigKeyword = wx.getStorageSync("userConfigKeyword");//用户本地缓存的关键字
    var mulus = this.data.muLus;
    var keywordListTemp=new Array();
    for (var i in value){
      for(var j in mulus){
        if(mulus[j]['id']==value[i]){
          for(var k in mulus[j]['contentList']){
            keywordListTemp = keywordListTemp.concat(mulus[j]['contentList'][k]['keywordTemp']);
          }
        }
      }
    }
   
    //处理关键字重复的问题
    var keywordList = new Array();
    for (var i in keywordListTemp) {
      //该元素在tmp内部不存在才允许追加
      if (keywordList.indexOf(keywordListTemp[i]) == -1) {
        keywordList.push(keywordListTemp[i]);
      }
    }
    //处理成为对象形式，判断和用户的缓存是否有相同的内容
    for(var i in keywordList){
      var flag=false;
      for (var j in userConfigKeyword){
        if (userConfigKeyword[j]==keywordList[i]){
          flag=true;
          break;
        }
      }
      keywordList[i] = { name: keywordList[i], checked: flag};
    }
    this.setData({
      'keywords': keywordList,
    });
  },

  checkboxChange1:function(e){
    console.log(e.detail.value);
    this.setData({
      'keywordListSelect': e.detail.value
    });
  },

  /**
   * 保存本地设置
   * 
  */
  saveConfig:function(e){
    if (e.currentTarget.dataset.msg==1){
      var muluSelect = this.data.muluSelect;
      wx.setStorageSync("userConfigMulu", muluSelect);
    }else{
      var keywordListSelect = this.data.keywordListSelect;
      wx.setStorageSync("userConfigKeyword", keywordListSelect);
    }
    wx.showToast({
      title: '设置成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var tuiSongConfig = wx.getStorageSync('tuisSongConfig');
    console.log(tuiSongConfig);
    for(var i=0;i<tuiSongConfig.length;i++){
      tuiSongConfig[i]['checked']=false;
    }
    var userConfigMulu=wx.getStorageSync("userConfigMulu");
    var userConfigKeyword = wx.getStorageSync("userConfigKeyword");
    var keywordList=new Array();
    if (userConfigMulu.length){
      for (var i = 0; i < tuiSongConfig.length; i++) {
        for (var j = 0; j < userConfigMulu.length;j++){
          if (tuiSongConfig[i]['id']==userConfigMulu[j]){
            tuiSongConfig[i]['checked'] = true;
            for (var k = 0; k < tuiSongConfig[i]['contentList'].length;k++){
              keywordList = keywordList.concat(tuiSongConfig[i]['contentList'][k]['keywordTemp']); 
            }
            break;
          }
        }
      }
    }

    //处理关键字重复的问题
    var tmp = new Array();
    for (var i in keywordList) {
      //该元素在tmp内部不存在才允许追加
      if (tmp.indexOf(keywordList[i]) == -1) {
        tmp.push(keywordList[i]);
      }
    }
    

    var finalKeywordList=[];
    for (var i = 0; i < tmp.length;i++){
      finalKeywordList.push({ name: tmp[i],checked:false});
    }
    for(var i=0;i<finalKeywordList.length;i++){
      for (var j = 0; j < userConfigKeyword.length;j++){
        if (finalKeywordList[i]['name'] == userConfigKeyword[j]){
          finalKeywordList[i]['checked']=true;
        }
      }
    }
  
    this.setData({
      'muLus': tuiSongConfig,
      'keywords': finalKeywordList,
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