/**
 * Created by Schon on 2018/9/13 0013.
 */
//设置cookie
function setCookie(key: string, value: any, len: number) {
  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * len); //保存的天数，我这里写的是100年
  //字符串拼接cookie
  window.document.cookie = key + "=" + value + ";path=/;expires=" + exdate.toUTCString();
};
//读取cookie
function getCookie(param: string) {
  var c_param = '';
  if (document.cookie.length > 0) {
    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //再次切割
      //判断查找相对应的值
      if (arr2[0] == param) {
        c_param = arr2[1];
        //保存到保存数据的地方
      }
    }
    return c_param;
  }
};
function padLeftZero(str: string) {
  return ('00' + str).substr(str.length);
};
export { getCookie, setCookie }