// pages/dongtai/dongtai.js
Page({
  data: {
    dongtaiArr: [],
    page: 1,//当前页
    total_pages: 0,//总页数
    loadingAsync: false,//加载更多
    id: ''
  },
  onLoad(options) {
    this.setData({
      id: options.id
    });
    //动态数据
    this.getDongtaiFn();
  },
  //请求数据
  getDongtaiFn() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/'+this.data.id+'/dynamics',
      data: {
        page_limit: 10,
        page: this.data.page
      },
      success(res) {
        if (res.statusCode == 200) {
          var obj = res.data.data;
          var arrs = that.data.dongtaiArr.concat(obj.dynamics);
          that.setData({
            dongtaiArr: arrs,
            page: obj.page_info.current_page + 1,
            total_pages: obj.page_info.total_pages,
            loadingAsync: false
          });
        }
      }
    })
  },
  //页面上拉触底事件的处理函数
  onReachBottom() {
    //如果显示，则不请求
    if (this.data.loadingAsync) { return false; };
    //显示加载更多
    this.setData({
      loadingAsync: true
    });
    //请求数据
    if (this.data.total_pages == 0 || this.data.total_pages >= this.data.page) {
      this.getDongtaiFn();
    } else {
      this.setData({
        type: 1
      });
      setTimeout(() => {
        this.setData({
          type: 2
        });
      }, 2000);
      setTimeout(() => {
        this.setData({
          loadingAsync: false
        });
      }, 3000);
    }
  }
})