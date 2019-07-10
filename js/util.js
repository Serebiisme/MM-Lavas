// 通用工具类
class Util {

  // 获取 cookie
  getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
    return (arr[2]);
    else
    return null;
  }
    
  // 设置 cookie,增加到 vue实例方便全局调用
  setCookie (c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
  };
    
  // 删除 cookie
  delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  };

  // 获取设备联网状态
  getOnlineStatus() {
    return navigator.onLine
  }

  // 获取地理位置定位
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        return { latitude, longitude }
      });
    } else {
      return new Error("Geolocation is not supported by this browser.");
    }
  }

}

const uitl = new Util()
export default uitl;