// pages/huida/index.js
var api=require("../../api/api.js");
var common=require("../../api/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askQuestionInfo:[],
    askPhotoList:[],
    chooseImageList:[],
    
    content: "",
    askReplyList:[],
    totalPage:1,
    totalCount:"",
    currentPage:1,
    selectAnswerId:0,
    ownerStata:false,
    wanjie:false,
    answer:[1,2,3,4],
    res:[1,2,3,4,5,6]
  },
  lower:function(e) {
    var id = this.data.askQuestionInfo.id;
    var currentPage=this.data.currentPage;
    var totalPage=this.data.totalPage;
    
    if (parseInt(currentPage) + 1 <= totalPage){
      wx.showLoading({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
        title: '加载中',
        icon: 'loading',
      });
      var that=this;
      wx.request({
        url: api.userReplyQuestion(),
        data: { type: "selectReplyList", id: id, page: parseInt(currentPage) + 1 },
        success: function (data) {
          var res=data.data;
          var askReplyList = that.data.askReplyList;
          that.setData({
            currentPage:res.page.currentPage,
            askReplyList: askReplyList.concat(res.replyList),
          });
          wx.hideLoading();
        }
      })
    }else{
      wx.showToast({ //如果全部加载完成了也弹一个框
        title: '我也是有底线的',
        icon: 'success',
        duration: 300
      });
      return false;
    }
    
  },
  //删除图片
  deleteImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片吗？',
      success: function (res) {
        if (res.confirm) {
          var chooseImageList = that.data.chooseImageList;
          chooseImageList.splice(index, 1);
          that.setData({
            chooseImageList: chooseImageList
          });
        } else if (res.cancel) {
          return false;
        }
      }
    })
  },
  //点击添加图片出现的弹出框
  chooseimage: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }

    })
  },
  //选择图片后执行的方法
  chooseWxImage: function (type) {
    var that = this;
    var chooseImageList = that.data.chooseImageList;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        var finalImageList = chooseImageList.concat(res.tempFilePaths);
        if (finalImageList.length <= 9) {
          that.setData({
            chooseImageList: finalImageList
          });
        } else {
          wx.showToast({
            title: '图片不能超过9张',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //图片的预览（上传图片的地方）功能
  previewImage1: function (e) {
    var current = e.currentTarget.dataset.src;
    var urls = this.data.chooseImageList;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取一条记录详细信息（包含解答内容）
    wx.showLoading({
      title: '正在加载数据...',
      
    })
    var that=this;
    wx.request({
      url: api.userAskQuestion(),
      data:{id:options.id,type:"getOneRowInfo",limit:10},
      success:(res)=>{
        var userOpen=wx.getStorageSync("userOpen");

        //判断是否为自己发布的提问（用来显示回答按钮）
        if (res.data[0]['ownerid'] == userOpen.openid){
          var ownerStata=true;
        }else{
          var ownerStata=false;
        }
        if (res.data[0]['state'] == 1) {
          var wanjie = true;
        } else {
          var wanjie = false;
        }
        that.setData({
          askQuestionInfo:res.data[0],
          askPhotoList: res.data[0]['photoInfo'],
          askReplyList: res.data[0]['replyList'],
          totalPage:res.data[0]['page']['totalPage'],
          totalCount: res.data[0]['page']['totalCount'],
          currentPage: res.data[0]['page']['currentPage'],
          ownerStata: ownerStata,
          wanjie: wanjie
        });
        setTimeout(function(){
          wx.hideLoading();
        },1000);
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.windowHeight);
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },

  //提交回答的方法
  submitReply:function(e){
    wx.showLoading({
      title: '正在上传，请稍等..',
      mask:true
    })
    var content=this.data.content;
    var askid = this.data.askQuestionInfo.id;
    var userOpen=wx.getStorageSync("userOpen");
    var chooseImageList = this.data.chooseImageList;
    var that= this;
    wx.request({
      url: api.userReplyQuestion(),
      data:{type:"add",askid:askid,ownerid:userOpen.openid,content:content},
      success:(res)=>{
        //把数据添加到

        
        wx.request({
          url: api.userAskQuestion(),
          data: { id: askid, type: "getOneRowInfo", limit: 10 },
          success: (res) => {
            console.log(res);
            that.setData({
              askQuestionInfo: res.data[0],
              askPhotoList: res.data[0]['photoInfo'],
              askReplyList: res.data[0]['replyList'],
              totalPage: res.data[0]['page']['totalPage'],
              totalCount: res.data[0]['page']['totalCount'],
              currentPage: res.data[0]['page']['currentPage'],
            });
            setTimeout(function () {
              wx.hideLoading();
            }, 1000);
          }
        })
        setTimeout(function(){
          wx.hideLoading();
        },1000);
      },
      complete: function (e) {
        if (chooseImageList.length > 0) {
          //执行上传图片的功能
          var data = {
            'index': 0,
            'success': 0,
            'fail': 0,
            'url': api.uploadImage(),
            'path': chooseImageList,
            'formData': {
              ownerID: e.data.code,
              'type': 7,
              userType: 34
            }
          };
          common.uploadimg(data, function (flag) {
            wx.hideLoading();
            wx.showToast({
              title: '数据保存成功',
              icon: 'success',
              duration: 2000
            })
            //清空数据
            that.setData({
              content: "",
              chooseImageList: []
            });
          });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '数据保存成功',
            icon: 'success',
            duration: 2000
          })
          //清空数据
          that.setData({
            content: "",
            chooseImageList: []
          });
        }

      }
    })
  },
  
  //显示操作的弹出框
  showModel:function(e){
    var selectAnswerId=e.currentTarget.dataset.id;
    this.setData({
      selectAnswerId: selectAnswerId
    });
    var list=['设为最佳','谢谢帮助','无关回答'];
    this.selectComponent("#demoPicker").showPicker(list,0);
  },
  //弹出框点击确定的方法
  sure: function (e){
    wx.showLoading({
      title: '正在处理',
    })
    var state = parseInt(e.detail.index)+1;
    var id = this.data.selectAnswerId;
    var askid = this.data.askQuestionInfo.id;
    wx.request({
      url: api.userReplyQuestion(),
      data: { id: id, state: state, type: "updateState", askid: askid},
      success: function (data) {
        wx.showToast({
          title: '处理成功',
          icon:"success",
          duration:2000,
          success:function(){
            wx.switchTab({
              url: '/pages/stady/index',
            })
          }
        })
        
      }
    })
    this.selectComponent("#demoPicker").cancle();
  },
  

  //textarea的keyup事件
  getValue: function (e) {
    this.setData({
      content: e.detail.value
    });
  },

  //预览问题中的图片
  previewImage:function(e){
    var current=e.currentTarget.dataset.url;
    var urls=new Array();
    var allObj = this.data.askPhotoList;
    for(var i=0;i<allObj.length;i++){
      urls[i] = allObj[i]['photosrc'];
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  //预览答案中的图片
  previewImages: function (e) {
    
    var current = e.currentTarget.dataset.src;
    var replyId = e.currentTarget.dataset.replyid;
    
    //获取所有的图片列表
    var urls = new Array();
    var replyList = this.data.askReplyList;
    for(var i=0;i<replyList.length;i++){
      if (replyList[i]['id']==replyId){
        var photoList=replyList[i]['photoList'];
        for(var j=0;j<photoList.length;j++){
          urls[j] = photoList[j]['photosrc'];
        }
        break;
      }
    }
    
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
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
  onShow: function (e) {
    
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
