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
    // 获取用户登录信息
    let current = Bmob.User.current()
    // console.log(current)
    // 根据whoadd字段查询列表
    var that = this;
    const query = Bmob.Query("_User");
    query.equalTo("whoadd", "==", current.username);
    query.equalTo("come", "==", false);
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
  }
})