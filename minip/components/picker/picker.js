// components/picker/picker.js
var api=require("../../api/api.js");
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialog: false,
    items: [],
    id: 0,
    state:true,
    url:"",//点击确定后的跳转页面,
    lessionid:"",//科目id
    openid:'',
    index:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showPicker: function (arr,url,lessionid,openid,index) {
      this.setData({
        "showDialog": true,
        "items": arr,
        'url': url,
        'lessionid':lessionid,
        'openid':openid,
        'index':index
      });
    },
    _click: function (e) {
      var id = e.currentTarget.dataset.id;
      var state=e.currentTarget.dataset.state;
      this.setData({
        "id": id,
        "state":state
      });
    },
    sure: function () {
      var that = this
      if(this.data.state){
        wx.showLoading({
          title: '数据加载中...',
        })
        that.setData({
          "showDialog": false
        });
        var lessionid=that.data.lessionid;
        var openid=that.data.openid;
        
        wx.hideLoading();
        var url = "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/dealMathJax/lessionid/" + lessionid + "/openid/" + openid;
        wx.navigateTo({
          url: '/pages/newdati/index?url=' + url,
        })
      }else{
        wx.showToast({
          title: '您还未达到该难度',
          icon: 'none',
          duration: 1000,
          mask: true
        })
      }
      

    },
    cancle: function () {
      var that = this
      that.setData({
        "showDialog": false
      });

    }
  }
})
