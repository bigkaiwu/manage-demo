var Bmob = require('../../utils/Bmob-2.2.1.min.js');
Bmob.initialize("417c83f6e9a9c139", "352609");

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    user_id: 0,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  onLoad: function (options) {
    let current = Bmob.User.current()
    console.log(current)
    var that = this;
    const query = Bmob.Query("_User");
    query.equalTo("whoadd", "==", current.username);
    query.find().then(res => {
      var list = res;
      that.setData({
        list: list
      })
      // console.log(list)
    });

// 获取从我的预约中点击进来的id
    this.setData({
      user_id: options.user_id
    })
    // console.log(this.data.user_id)

    wx.showLoading({
      title: '正在查询',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
  },
})