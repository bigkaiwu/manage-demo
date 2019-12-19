var Bmob = require('../../utils/Bmob-2.2.1.min.js');
Bmob.initialize("417c83f6e9a9c139", "352609", "738f7c87bd03db7c22572bfc5ee826da");

const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    come: false,
    user_id: 0,
    objectId: "0",
    picker: ['是', '否'],
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    console.log(objectId)
  },
  bindtapFunc(e) {
    this.setData({
      objectId: e.currentTarget.dataset.text
    })
    console.log(this.data.objectId)
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
    // 获取从预约中点击进来的id objectId
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
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  }
})