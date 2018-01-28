// pages/huxing/huxing.js
Page({
  data: {
    arr:[] ,
    page: 1,//当前页
    total_pages: 0,//总页数
    loadingAsync : false,//加载更多
    id : '',
    type : 1
  },
  onLoad (options) {
    this.setData({
      id: options.id
    });
    this.getHunxingFn();
  },
  //请求数据
  getHunxingFn () {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/'+this.data.id+'/huxings',
      data: {
        page_limit : 5,
        page: this.data.page
      },
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        if (res.statusCode == 200) {
          var obj = res.data.data;
          var arrs = that.data.arr.concat(obj.huxings);
          that.setData({
            arr: arrs,
            page: obj.page_info.current_page + 1,
            total_pages: obj.page_info.total_pages,
            loadingAsync : false
          });
        }
      }
    })
  },
  //页面上拉触底事件的处理函数
  onReachBottom  () {
    //如果显示，则不请求
    if (this.data.loadingAsync){return false;};
    //显示加载更多
    this.setData({
      loadingAsync : true
    });
    //请求数据
    if (this.data.total_pages == 0 || this.data.total_pages >= this.data.page){
      this.getHunxingFn();
    } else{
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