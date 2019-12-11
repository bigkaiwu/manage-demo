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
    why: '',
    tec: '',
    a: '',
    price: '',
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
    console.log(typeof (this.data.objectId))
    var a = this.data.objectId
    const query = Bmob.Query("_User");
    query.get(a).then(res => {
      console.log(res)
      res.set('come', false)
      res.save()
    }).catch(err => {
      console.log(err)
    })
  },
  formWhy: function (e) {
    this.setData({
      why: e.detail.value
    })
  },
  formTec: function (e) {
    this.setData({
      tec: e.detail.value
    })
  },
  formPrice: function (e) {
    this.setData({
      price: e.detail.value
    })
    console.log(typeof (this.data.price))
  },
  foutijiao(e) {
    this.setData({
      objectId: e.currentTarget.dataset.text
    })
    console.log(typeof (this.data.objectId))
    var a = this.data.objectId
    const query = Bmob.Query("_User");
    query.get(a).then(res => {
      console.log(res)
      res.set('why', this.data.why)
      res.save()
    }).catch(err => {
      console.log(err)
    })
  },
  shitijiao(e) {
    this.setData({
      objectId: e.currentTarget.dataset.text
    })
    console.log(typeof (this.data.objectId))
    var a = this.data.objectId
    const query = Bmob.Query("_User");
    query.get(a).then(res => {
      console.log(res)
      res.set('come', true)
      res.save()
    }).catch(err => {
      console.log(err)
    })
    query.get(a).then(res => {
      console.log(res)
      res.set('tec', this.data.tec)
      res.save()
    }).catch(err => {
      console.log(err)
    })
    query.get(a).then(res => {
      console.log(res)
      res.set('price', this.data.price)
      res.save()
    }).catch(err => {
      console.log(err)
    })
  },
  onLoad: function (options) {
    var now = new Date();
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "H+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
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
  }
})