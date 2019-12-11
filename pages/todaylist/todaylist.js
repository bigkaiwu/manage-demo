var Bmob = require('../../utils/Bmob-2.2.1.min.js');
Bmob.initialize("417c83f6e9a9c139", "352609");
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    index: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  onLoad: function (options) {
    var now = new Date();
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, 
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3), 
        "S": this.getMilliseconds() 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
    var time2 = new Date().Format("yyyy-MM-dd 00:00:00");

    var that = this;
    const query = Bmob.Query("_User");
    query.equalTo("info", "==", "发友");
    query.equalTo("createdAt", ">", time2);
    query.find().then(res => {
      var list = res;
      that.setData({
        list: list
      })
      console.log(list)
    });


    wx.showLoading({
      title: '正在查询',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
})