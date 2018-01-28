// pages/album/album.js
Page({
  data: {
    arr:[],
    btnTextArr : [],
    btnNumArr  : [],
    btnText  : '',
    num      : 0,
    zongNum  : 0,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    id   : ''
  },
  onLoad (options) {
    this.setData({
      id: options.id
    });
    //数据
    this.getDianpingFn();
  },
  //轮播滑动
  changeList  (e) {
    let nums = e.detail.current+1,
      qianInd = 0,
      ind = 0;
    for (let i = 0; i < this.data.btnNumArr.length; i++) {
      if (nums  > qianInd || qianInd==0) {
         qianInd = qianInd + this.data.btnNumArr[i];
         ind = i;
      }
    };
    this.setData({
      num: (nums - 1) - qianInd + this.data.btnNumArr[ind],
      btnText: this.data.btnTextArr[ind]
    });
  },
  //点击事件
  clickBtnFn (e) {
    console.log(e)
    //
    this.setData({
      btnText: e.target.dataset.text
    });
  },
  //相册数据
  getDianpingFn() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/'+this.data.id+'/photos',
      data: {
        page_limit: 2,
        page: 1
      },
      success(res) {
        if (res.statusCode == 200) {
          let obj = res.data.data,
              arrs = [];
          obj.photos.map( (m,i)=>{
            if (arrs.indexOf(m.pic_type_name) == -1) {
              arrs.push(m.pic_type_name);
            }
          });
          that.setData({
            arr: obj.photos,
            btnTextArr : arrs,
            btnNumArr  : obj.count,
            btnText    : arrs[0]
          });
        }
      }
    });
  }
})