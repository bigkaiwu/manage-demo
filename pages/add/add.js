var Bmob = require('../../utils/Bmob-2.2.1.min.js');
Bmob.initialize("417c83f6e9a9c139", "352609");
var a = '';
const app = getApp();
Page({
  data: {
    username: '',
    tel: '',
    tip: '',
    images:'',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['疤痕种植', '比基尼种植', "斑秃", "发际线调整", "胡须种植", "鬓角种植", "美人尖种植","胸毛种植"],
    multiIndex: [0, 1, 0],
    region: ['江苏省', '南京市', '鼓楼区'],
    imgList: [],
    modalName: null,
    textareaAValue: ''
  },
  upImg: function () {
    wx.chooseImage({
      success: function (res) {
        console.log(res)
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          console.log('itemn', item)
          file = Bmob.File('abc.jpg', item);
        }
        file.save().then(res => {

          console.log(res.length);
          console.log(res);
          console.log(res[0].url);
          a = res[0].url;
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 1000
          })
        })
      }
    })
  },
  addPatient(e){
    // 获取用户登录信息
    let current = Bmob.User.current()
    console.log(current)

    let params = {
      username: this.data.username,
      password: 'newshow2019',
      info: '发友',
      images: a,
      phone: this.data.tel,
      disease: this.data.picker[this.data.index],
      tip: this.data.textareaAValue,
      address: this.data.region,
      whoadd: current.username,
      come: false,
      jiesuan: false,
      why:'请耐心等待院方对您的预约信息邀约处理'
    }
    Bmob.User.register(params).then(res => {
      wx.showLoading({
        title: '提交成功',
      })
      setTimeout(function () {
        wx.hideLoading()
        wx.navigateTo({
          url: '../mine/mine',
        })
      }, 1000)
    }).catch(err => {
      wx.showLoading({
        title: '提交失败',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 2000)
    });
  },
  formName: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  formTel: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  RegionChange: function (e) {
    console.log(e);
    this.setData({
      region: e.detail.value
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
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