// pages/sale/detaile/detaile.js
var Charts = require('../../../utils/wxcharts-min.js');
Page({
  data: {
    width : 0,
    obj : {},//楼盘数据
    detaileAsync : false,//更多详情显示隐藏
    huxingObj : {
      arr : [],
      interval: 5000,//自动切换时间间隔
      duration: 1000 //滑动动画时长
    },
    dongtaiArr: [],//动态数据
    dianpingObj: {},//点评
    dianpingArr: [],//点评
    chartsAge: {},//图表
    chartsFavorites: {},//图表
    chartsTrade: {},//图表
    //地图
    mapObj : {
      markers: [
        {
          title: '天安门',
          latitude: 39.914935,
          longitude: 116.403694,
          iconPath : '/assets/images/map.png'
        }
      ]
    }
  },
  onLoad (options) {
    this.init();
  },
  init () {
    this.getWidthFn();
    //请求楼盘数据
    this.getLoupanData();
    //请求户型数据
    this.getHuxingFn();
    //请求动态
    this.getDongtaiFn();
    //点评
    this.getDianpingFn();
  },
  //请求楼盘数据
  getLoupanData() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/281500096276482',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        if (res.statusCode == 200) {
          that.setData({
            obj: res.data.data,
            chartsAge      : res.data.data.loupan_deals.age,//图表
            chartsFavorites: res.data.data.loupan_deals.favorites,//图表
            chartsTrade    : res.data.data.loupan_deals.trade
          });
          //年龄图表
          if (that.data.chartsAge.is_hidden) {
            that.chartsAgeFn();
          }
          //爱好图表
          if (that.data.chartsFavorites.is_hidden) {
            that.chartsAihaoFn();
          }
          //职业图表
          if (that.data.chartsTrade.is_hidden) {
            that.chartsTradeFn();
          }
        }
      }
    });
  },
  //请求户型数据
  getHuxingFn() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/281500096276482/house_types',
      header: {
        "Content-Type": "application/json"
      },
      success(res) {
        if (res.statusCode == 200) {
          var arr = 'huxingObj.arr';
          that.setData({
            [arr]: res.data.data
          });
        }
      }
    });
  },
  //请求动态
  getDongtaiFn() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/281500096276482/dynamics',
      data: {
        page_limit: 3,
        page: 1
      },
      success(res) {
        if (res.statusCode == 200) {
          that.setData({
            dongtaiArr: res.data.data.dynamics
          });
        }
      }
    });
  },
  //点评
  getDianpingFn() {
    let that = this;
    wx.request({
      url: 'http://webapi2.zeju.com/loupans/279884900270082/customer_comments',
      data: {
        page_limit: 2,
        page: 1
      },
      success (res) {
        if (res.statusCode == 200) {
          that.setData({
            dianpingObj: res.data.data.total_score,
            dianpingArr: res.data.data.comments
          });
        }
      }
    });
  },
  //年龄图表
  chartsAgeFn() {
    let obj = this.data.chartsAge;
    let line = {
      canvasId: 'ageCanvas', // canvas-id
      background: '#000000',
      width: this.data.width -10,
      height: 200,
      type: 'column', // 图表类型，可选值为pie, line, column, area, ring
      categories: obj.titles,
      series: [{ // 数据列表
        name: ' ',
        data: obj.contents
      }],
      yAxis: {
        min: 0,
        fontColor: '#999999'
      },
      xAxis: {
        fontColor: '#999999',
        disableGrid: true
      },
      dataLabel: false, // 是否在图表中显示数据内容值
      legend: false, // 是否显示图表下方各类别的标识
      extra: {
        column: {
          width: 24
        }
      }
    }
    new Charts(line);
  },
  //爱好图表
  chartsAihaoFn() {
    let obj = this.data.chartsFavorites;
    let line = {
      canvasId: 'aihaoCanvas', // canvas-id
      type: 'column', // 图表类型，可选值为pie, line, column, area, ring
      categories: obj.titles,
      series: [{ // 数据列表
        name: ' ',
        data: obj.contents
      }],
      yAxis: {
        min: 0,
        fontColor: '#999999'
      },
      xAxis: {
        fontColor: '#999999',
        disableGrid: true
      },
      width: this.data.width-10,
      height: 200,
      dataLabel: false, // 是否在图表中显示数据内容值
      legend: false, // 是否显示图表下方各类别的标识
      extra: {
        column: {
          width: 24
        }
      }
    }
    new Charts(line);
  },
  //职业图表
  chartsTradeFn() {
    let obj = this.data.chartsTrade;
    let line = {
      canvasId: 'tradeCanvas', // canvas-id
      type: 'column', // 图表类型，可选值为pie, line, column, area, ring
      categories: obj.titles,
      series: [{ // 数据列表
        name: ' ',
        data: obj.contents
      }],
      yAxis: {
        min: 0,
        fontColor: '#999999'
      },
      xAxis: {
        fontColor: '#999999',
        disableGrid: true
      },
      width: this.data.width - 10,
      height: 200,
      dataLabel: false, // 是否在图表中显示数据内容值
      legend: false, // 是否显示图表下方各类别的标识
      extra: {
        column: {
          width: 24
        }
      }
    }

    new Charts(line);
  },
  //更多详情显示隐藏
  detaileFn () {
    this.setData({
      detaileAsync: !this.data.detaileAsync
    });
  },
  //获取屏幕宽度
  getWidthFn () {
    var that = this;
    wx.getSystemInfo({
      success  (res) {
        that.setData({
          width: res.windowWidth
        });
      }
    })  
  }
})