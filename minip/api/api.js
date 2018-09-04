//修改用户答题的信息
function updateUserInfo(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/updateUserInfo";
}

//给用户在当前目录下升级到下一个难度
function shengjiLevel(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/shengjiLevel";
}

//获取用户答题所有试卷答题情况列表
function getUserDoTestList(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserDoTestList";
}

//通过用户的openid和paperid获取用户答题记录情况
function getUserDoTestList1(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserDoTestList1";
}

//通过历史记录进入答题页面获取用户的答题记录
function getUserDoTestList2(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserDoTestList2";
}

//获取所有用户的排行榜信息
function getMemcaheRank(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getMemcaheRank";
}

//获取系统设置的所有推送目录
function getSystemTuiSongMulu(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getSystemTuiSongMulu";
}

//获取用户设置过的推送信息
function getUserTuiSongContent(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserTuiSongContent";
}


//---------------新的方法
function getAllKeMu(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getAllKeMu";
}

//获取用的openid
function getUserOpen(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserOpen";
}

//获取用户的在某个科目下的最高等级的最高难度等级
function getUserDoTestHighLevel(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserDoTestHighLevel";
}

//用户升级的操作
function userShengJi(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/userShengJi";
}

//获取系统的难度等级列表
function getLevelList(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getLevelList";
}

//添加一条报错记录
function addOneBaoCuoCorde(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/addOneBaoCuoCorde";
}

//获取用户的错题集合
function getWrongQuestionList(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getWrongQuestionList";
}

//用户的登陆操作方法
function login(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/login";
}

//用户的注册操作方法
function register() {
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/register";
}

//用户处理提问的方法
function userAskQuestion(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/userAskQuestion";
}

//上传图片的方法
function uploadImage(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/wxMiniProgramUploadImage";
}

//用户处理回答的方法
function userReplyQuestion(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/userReplyQuestion";

}


//用户重做错题的页面
function dealCuoTi(answerId,openid){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/dealCuoTi/answerId/" + answerId+"/openid/"+openid;
}

//处理错题的方法
function dealWrongQuestion(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/dealWrongQuestion";
}

//查询用户的提问条数和回答条数
function getUserAskOrReplyCount(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getUserAskOrReplyCount";
}

//获取当前用户以答题的链数据
function getLianList(){
  return "https://wrlinkeradmin.applinzi.com/thinkphp/index.php/Home/MiniProgram/getLianList";

}



module.exports.updateUserInfo = updateUserInfo;
module.exports.shengjiLevel = shengjiLevel;
module.exports.getUserDoTestList = getUserDoTestList;
module.exports.getUserDoTestList1 = getUserDoTestList1;
module.exports.getUserDoTestList2 = getUserDoTestList2;
module.exports.getMemcaheRank = getMemcaheRank;
module.exports.getSystemTuiSongMulu = getSystemTuiSongMulu;
module.exports.getUserTuiSongContent = getUserTuiSongContent;

//----------------------
module.exports.getAllKeMu = getAllKeMu;
module.exports.getUserOpen = getUserOpen;
module.exports.getUserDoTestHighLevel = getUserDoTestHighLevel;
module.exports.userShengJi = userShengJi;
module.exports.getLevelList = getLevelList;
module.exports.addOneBaoCuoCorde = addOneBaoCuoCorde;
module.exports.getWrongQuestionList = getWrongQuestionList;
module.exports.login=login;
module.exports.register = register;
module.exports.userAskQuestion = userAskQuestion;
module.exports.uploadImage = uploadImage;
module.exports.userReplyQuestion = userReplyQuestion;
module.exports.dealCuoTi = dealCuoTi;
module.exports.dealWrongQuestion = dealWrongQuestion;
module.exports.getUserAskOrReplyCount = getUserAskOrReplyCount;
module.exports.getLianList = getLianList;