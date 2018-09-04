//处理科目的子节点
function dealChildrenName(data){
  var arr=new Array();
  for(var i=0;i<data.length;i++){
    arr[i]=data[i]['lessionname'];
  }
  return arr;
}

//上传多张图片的功能 
function uploadimg(data,callback) {
  var i = data.index;//当前上传的哪张图片
  var success = data.success;//上传成功的个数
  var fail = data.fail;//上传失败的个数
  wx.uploadFile({
    url: data.url,
    filePath: data.path[i],
    name: 'picture',//这里根据自己的实际情况改
    formData: data.formData,//这里是上传图片时一起上传的数据
    success: (resp) => {
      success++;//图片上传成功，图片上传成功的变量+1
      console.log(resp);
      //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
    },
    fail: (res) => {
      fail++;//图片上传失败，图片上传失败的变量+1
      
    },
    complete: () => {
      console.log(i);
      i++;//这个图片执行完上传后，开始上传下一张
      if (i == data.path.length) {   //当图片传完时，停止调用          
        console.log('执行完毕');
        console.log('成功：' + success + " 失败：" + fail);
        wx.hideLoading();
        callback("ok");
        
      } else {//若图片还没有传完，则继续调用函数
        console.log(i);
        data.index = i;
        data.success = success;
        data.fail = fail;
        uploadimg(data,callback);
        
      }
    }
  });
}




module.exports.dealChildrenName = dealChildrenName;
module.exports.uploadimg = uploadimg;