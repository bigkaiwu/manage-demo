var Bmob = require('../../utils/Bmob-2.2.1.min.js');
Bmob.initialize("417c83f6e9a9c139", "352609");

Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    username: '',
    password: ''
  },
  formName: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  formPwd: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  // 判断登录条件
  login: function (e) {
    let params = {
      username: this.data.username,
      password: this.data.password
    }
    Bmob.User.register(params).then(res => {
      console.log(res)
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../indexroot/indexroot',
        })
      }, 1000)
    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '注册失败',
        icon: 'none',
        duration: 1000
      })
    });
  }
})