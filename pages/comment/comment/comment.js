// pages/comment/comment/comment.js
Page({
  data: {
    arr : [],
    obj : {},
    page :1,
    loadingAsync : false,
    id : ''
  },
  onLoad(options) {
    this.setData({
      id: options.id
    });
    this.getDianpingFn();
  },
  //点评
  getDianpingFn () {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/'+this.data.id+'/customer_comments',
      data: {
        page_limit:10,
        page: this.data.page
      },
      success(res) {
        if (res.statusCode == 200) {
          var obj = res.data.data;
          var arr = that.data.arr.concat(obj.comments);
          that.setData({
            obj: res.data.data.total_score,
            arr,
            loadingAsync: false,
            page: obj.page_info.current_page + 1,
            total_pages: obj.page_info.total_pages,
          });
        }
      }
    });
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
      this.getDianpingFn();
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