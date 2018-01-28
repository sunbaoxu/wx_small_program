//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    arr: [],
    page: 1,//当前页
    total_pages: 0,//总页数
    loadingAsync: false,//加载更多
    type: 1,
    leiAsync: false,//分类
    leiText: '全部楼盘',
    leiName: 'index',
    cityText : '北京',
    cityName : 'bj',
    backAsync: false,//背景遮罩
    cityAsync : false,//城市box
    loupanNum : 0,
    leiArr: [
      { value: '-1', label: '全部楼盘', active: true, name: 'index' },
      { value: '0', label: '近期开盘', active: false, name: 'recent_kaipan' },
      { value: '1', label: '热门楼盘', active: false, name: 'hot' },
      { value: '2', label: '热销楼盘', active: false, name: 'sellwell' },
      { value: '3', label: '即将开盘', active: false, name: 'unkaipaned' },
      { value: '4', label: '精品楼盘', active: false, name: 'jingpin' },
      { value: '5', label: '精选楼盘', active: false, name: 'jingxuan' },
      { value: '6', label: '小户型推荐', active: false, name: 'xiaohuxing' },
      // {value :'5',  label: '品牌馆'   ,active : false,name : 'brand'},
      // {value :'7',  label: '特卖房源' ,active : false,name : 'temai'}
    ],
    cityArr: [
      { label: '北京', name: 'bj' },
      { label: '长春', name: 'cc' },
      { label: '长沙', name: 'cs' },
      { label: '苏州', name: 'suzhou' },
      { label: '天津', name: 'tj' }
    ]
  },
  onLoad () {
    //请求数据
    this.getdataFn();
  },
  //请求数据
  getdataFn() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans',
      data: {
        page_limit: 5,
        page: this.data.page,
        city_abbr: this.data.cityName,
        action_name: this.data.leiName
      },
      success(res) {
        if (res.statusCode == 200) {
          var obj = res.data.data;
          var arrs = that.data.arr.concat(obj.loupans);
          that.setData({
            arr: arrs,
            page: obj.page_info.current_page + 1,
            total_pages: obj.page_info.total_pages,
            loadingAsync: false,
            loupanNum : obj.page_info.total_count
          });
        }
      }
    })
  },
  //点击分类btn
  clickLeiFn (){
    this.setData({
      leiAsync: !this.data.leiAsync,
      backAsync: !this.data.leiAsync,
      cityAsync: false
    });
  },
  //点击分类 选项
  cliLeiListFn (e) {
    this.setData({
      leiAsync: false,
      backAsync:false,
      leiText: e.target.dataset.text,
      leiName: e.target.dataset.name,
      cityAsync : false,
      arr: [],
      page: 1,
      total_pages: 0
    });
    //请求数据
    this.getdataFn();
  },
  //点击城市btn
  cityBtnFn () {
    this.setData({
      cityAsync: !this.data.cityAsync,
      backAsync: !this.data.cityAsync,
      leiAsync : false
    });
  },
  //点击城市菜单
  cliCityFn (e) {
    this.setData({
      cityAsync: false,
      backAsync: false,
      leiAsync: false,
      cityText: e.target.dataset.text,
      cityName: e.target.dataset.name,
      arr: [],
      page: 1,
      total_pages: 0
    });
    //请求数据
    this.getdataFn();
  },
  //加载更多
  reachBottom () {
    //如果显示，则不请求
    if (this.data.loadingAsync) { return false; };
    //显示加载更多
    this.setData({
      loadingAsync: true
    });
    //请求数据
    if (this.data.total_pages == 0 || this.data.total_pages >= this.data.page) {
      this.getdataFn();
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
