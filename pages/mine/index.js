import * as echarts from '../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: [
        { name: '医疗工作\n130分', max: 130 },
        { name: '教学工作\n58分', max: 130 },
        { name: '科研工作\n58分', max: 130 },
        { name: '人才培养\n78分', max: 130 },
        { name: '公益工作\n78分', max: 130 }
      ],
      shape: 'polygon',
      radius: '65%',
      center: ['50%', '50%'],
      splitNumber: 1,
      axisName: {
        color: '#333333',
        fontSize: 16
      },
      splitLine: {
        lineStyle: {
          color: '#7FDBCA',
          width: 1
        }
      },
      splitArea: {
        show: true
      },
      axisLine: {
        lineStyle: {
          color: '#1BAF95',
          width: 1
        }
      }
    },
    series: [{
      name: '评分',
      type: 'radar',
      data: [{
        value: [130, 58, 58, 78, 78],
        name: '我的评分',
        symbol: 'none',
        itemStyle: {
          color: '#008C73'
        },
        areaStyle: {
          color: '#008C73'
        },
        lineStyle: {
          color: '#7FDBCA',
          width: 4
        }
      }]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  data: {
    userInfo: {},
    ec: {
      onInit: initChart
    }
  },
  onLoad(options) {
    this.setData({
      userInfo: wx.getStorageSync("userInfo").userInfo,
    });
  },
  onShow() {},
});
