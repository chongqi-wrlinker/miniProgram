// components/picker/picker.js

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
    showDialog: false,//是否显示弹出框
    items: [],//显示的列表
    key: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sure1: function () {
      var myEventDetail = {
        index:this.data.key
      };
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent("action", myEventDetail, myEventOption);
    },
    showPicker: function (arr, index) {
      this.setData({
        "showDialog": true,
        "items": arr,
        'key': index
      });
    },
    _click: function (e) {
      //点击某一项的方法
      var index=e.currentTarget.dataset.key;
      this.setData({
        key:index,
      });
      
    },
    sure: function (e) {
      
    },
    cancle: function () {
      var that = this
      that.setData({
        "showDialog": false
      });

    }
  }
})
