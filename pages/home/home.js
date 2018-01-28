const {util} = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '注册会员，享受专属顾问、免费专车全程服务',
    keyText: '获取验证码',
    arr: [
      { title: '【全程手续代办】', text: '让整个职业手续流程效率最高，省心省力入住称心好房' },
      { title: '【1V1买房顾问】', text: '政策解读、楼盘资讯、VIP带看、房源跟踪、物业分析' },
      { title: '【免费看房专车】', text: '全程免费接送上门、1户1车、买方顾问全程服务' }
    ],
    phone : '',//手机号
    keyAsync : false,//获取验证码按钮
    btnAsync : false,//提交按钮
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  //手机号校验
  phoneFn() {
    let reg = /^1[3|4|5|8][0-9]\d{4,8}$/;

    console.log(this,'aaa')
    if (this.data.phone.length == 11 && reg.test(this.data.phone)) {
      //验证码btn，可点击
      this.setData({
        keyAsync: true
      })
      //判断提交是否可以点击
      if (this.data.key.length == 4) {
        this.setData({
          btnAsync: true
        })
      }
    } else {
      //验证码btn，置灰.,不可提交
      this.setData({
        btnAsync: false,
        btnAsync: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
   
  }
})