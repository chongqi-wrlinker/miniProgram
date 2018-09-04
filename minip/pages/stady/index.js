// pages/stady/index.js
var app = getApp();
var api=require("../../api/api.js");
var common=require("../../api/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseImageList:[],
    multiArray: [],
    multiIndex:0,
    content:"",
    res:[],
    totalPage:1,
    currentPage:1,
  },
  lower() {
    var currentPage=this.data.currentPage;
    var totalPage=this.data.totalPage;
    if(parseInt(currentPage)+1<=totalPage){
      wx.showLoading({
        title: '正在加载...',
      })
      var that=this;
      wx.request({
        url: api.userAskQuestion(),
        data: { type: "selectAll", page: parseInt(currentPage) + 1, limit: 10 },
        success: function (data) {
          var oldList=that.data.res;
          var newList=data.data.list;
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
    }else{
      wx.showToast({
        title: '已经到底了',
        icon: '',
        duration: 1000
      })
    }
  },


  huida: function (e) {
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/huida/index?id='+id,
    })
  },
  //删除图片
  deleteImage: function (e) {
    var index=e.currentTarget.dataset.index;
    var that=this;
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
        if (finalImageList.length<=9){
          that.setData({
            chooseImageList: finalImageList
          });
        }else{
          wx.showToast({
            title: '图片不能超过9张',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //图片的预览功能
  previewImage:function(e){
    var current=e.currentTarget.dataset.src;
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
    wx.showLoading({
      title: '正在加载数据请稍后...',
      mask:true
    })
    //获取所有目录的值
    var allKeMu = wx.getStorageSync("allKeMu");
    var firArray=new Array();
    var secArray=new Array();
    for(var i=0;i<allKeMu.length;i++){
      firArray[i]=allKeMu[i]['lessionname'];
    }
    var lessionId = allKeMu[0]['children'][0]['id'];
    console.log(lessionId);
    for(var j=0;j<allKeMu[0]['children'].length;j++){
      secArray[j] = allKeMu[0]['children'][j]['lessionname'];
    }
    this.setData({
      multiArray: [firArray, secArray],
    });

    var that=this;
    //查询第一页的提问
    wx.request({
      url: api.userAskQuestion(),
      data: { type:"selectAll",page:1,limit:10},
      success:function(data){
        that.setData({
          res: data.data.list,
          totalPage:data.data.page.totalPage,
          currentPage:data.data.page.currentPage,
        });
        setTimeout(function(){
          wx.hideLoading();
        },1000);
      }
    })

    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },

  //picker绑定值出现改变执行的方法
  bindMultiPickerColumnChange:function(e){
    var column=e.detail.column;
    var value=e.detail.value;
    var allKeMu = wx.getStorageSync("allKeMu");
    if(column<1){
      //修改次级目录的内容
      var secArray=new Array();
      var objArr=allKeMu[value];
      
      for(var i=0;i<objArr['children'].length;i++){
        secArray[i] = objArr['children'][i]['lessionname'];
      }
      var multiArray = this.data.multiArray;
      this.setData({
        multiArray:[multiArray[0],secArray],
      });
    }
  },
  //picker点击确定后执行的方法
  bindMultiPickerChange:function(e){
    var content = this.data.content;
    console.log(content.length);
    if(content.length>0){
      wx.showLoading({
        title: '正在保存数据...',
      })
      var allKeMu = wx.getStorageSync("allKeMu");
      var userOpen = wx.getStorageSync("userOpen");
      var column = e.detail.value[0];
      var rowlumn = e.detail.value[1];
      var lessionId = allKeMu[column]['children'][rowlumn]['id'];

      var that = this;
      var chooseImageList = that.data.chooseImageList;
      wx.request({
        url: api.userAskQuestion(),
        data: { type: "add", ownerId: userOpen.openid, lessionId: lessionId, content: content },
        success: function (e) {
          wx.request({
            url: api.userAskQuestion(),
            data: { type: "selectAll", page: 1, limit: 10 },
            success: function (data) {
              that.setData({
                res: data.data.list,
                totalPage: data.data.page.totalPage,
                currentPage: data.data.page.currentPage,
              });
              
            }
          })
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
                'type': 6,
                userType: 32
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
    }else{
      wx.showToast({
        title: '内容不能为空',
        icon: 'none',
        duration: 1000
      })
    }
    
  },
  //textarea的keyup事件
  getValue:function(e){
    this.setData({
      content:e.detail.value
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
      title: '正在加载数据',
    });
    var that = this;
    //查询第一页的提问
    wx.request({
      url: api.userAskQuestion(),
      data: { type: "selectAll", page: 1, limit: 10 },
      success: function (data) {
        that.setData({
          res: data.data.list,
          totalPage: data.data.page.totalPage,
          currentPage: data.data.page.currentPage,
        });
        setTimeout(function () {
          wx.hideLoading();
        }, 1000);
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
    console.log(1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})