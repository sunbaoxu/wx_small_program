// pages/sale/sale.js
Page({
  data: {
    nameArr: [
      { value: '-1', label: '全部楼盘', active: true, name: 'index' },
      { value: '0', label: '近期开盘', active: false, name: 'recent_kaipan' },
      { value: '1', label: '热门楼盘', active: false, name: 'hot' },
      { value: '2', label: '热销楼盘', active: false, name: 'sellwell' },
      { value: '3', label: '即将开盘', active: false, name: 'unkaipaned' },
      { value: '4', label: '精品楼盘', active: false, name: 'jingpin' },
      { value: '5', label: '精选楼盘', active: false, name: 'jingxuan' },
      { value: '6', label: '小户型推荐', active: false, name: 'xiaohuxing' }
      // {value :'5',  label: '品牌馆'   ,active : false,name : 'brand'},
      // {value :'6',  label: '特卖房源' ,active : false,name : 'temai'}
    ],
    navName : 'all',
    statusName : '疯抢中',//分类，状态
    itemArr: [], //楼盘列表
    page: 1,//当前页
    total_pages: 0,//总页数
    loadingAsync: false,//加载更多
    type: 1
  },
  onLoad  () {
    this.getLoupanData();
  },
  //请求楼盘数据
  getLoupanData () { 
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans',
      data: {
        action_name: 'jingxuan',
        city_abbr: 'bj', 
        page_limit: 5,
        page: this.data.page
      },
      success  (res) {
        if(res.statusCode == 200){
          let obj = res.data.data;
          let arr = that.data.itemArr.concat(obj.loupans);
          that.setData({
            itemArr: arr,
            page: obj.page_info.current_page + 1,
            total_pages: obj.page_info.total_pages,
            loadingAsync: false
          });
        }
      }
    })
  },
  //点击当前楼盘名
  clickNavMame(e) {
    this.setData({
      navName: e.target.dataset.label
    });
  },
  //点击当前楼盘名
  clickStatus (e) {
    this.setData({
      statusName: e.target.dataset.label
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
      this.getLoupanData();
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