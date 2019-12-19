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
    var that = this;
    const query = Bmob.Query("_User");
    query.equalTo("info", "==", "发友");
    query.equalTo("jiesuan", "==", true);
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