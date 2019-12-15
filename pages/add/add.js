var Bmob = require('../../utils/Bmob-2.2.1.min.js');
Bmob.initialize("417c83f6e9a9c139", "352609");

const app = getApp();
Page({
  data: {
    username: '',
    tel: '',
    tip: '',
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['疤痕种植', '比基尼种植', "斑秃", "发际线调整", "胡须种植", "鬓角种植", "美人尖种植","胸毛种植"],
    multiIndex: [0, 1, 0],
    region: ['江苏省', '南京市', '鼓楼区'],
    imgList: [],
    modalName: null,
    textareaAValue: '',
  },
  addPatient(e){
    // 获取用户登录信息
    let current = Bmob.User.current()
    console.log(current)

    let params = {
      username: this.data.username,
      password: 'newshow2019',
      info: '发友',
      phone: this.data.tel,
      disease: this.data.picker[this.data.index],
      tip: this.data.textareaAValue,
      address: this.data.region,
      whoadd: current.username,
      come: false,
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
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张图片吗？',
      cancelText: '保留',
      confirmText: '删除',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  }
})