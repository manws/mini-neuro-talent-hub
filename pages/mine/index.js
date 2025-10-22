import * as echarts from "../../ec-canvas/echarts";

const app = getApp();
let pageInstance = null; // 保存页面实例

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr,
  });
  canvas.setChart(chart);

  // 保存图表实例到页面（避免使用setData防止递归）
  if (pageInstance) {
    pageInstance.chartInstance = chart;
  }

  var option = {
    backgroundColor: "transparent",
    radar: {
      indicator: [
        { name: "医疗工作\n0分", max: 100 },
        { name: "教学工作\n0分", max: 100 },
        { name: "科研工作\n0分", max: 100 },
        { name: "人才培养\n0分", max: 100 },
        { name: "公益工作\n0分", max: 100 },
      ],
      shape: "polygon",
      radius: "60%",
      center: ["50%", "50%"],
      splitNumber: 1,
      axisName: {
        color: "#333333",
        fontSize: 14,
        distance: 15,
      },
      splitLine: {
        lineStyle: {
          color: "#7FDBCA",
          width: 1,
        },
      },
      splitArea: {
        show: true,
      },
      axisLine: {
        lineStyle: {
          color: "#1BAF95",
          width: 1,
        },
      },
    },
    series: [
      {
        name: "评分",
        type: "radar",
        data: [
          {
            value: [0, 0, 0, 0, 0],
            name: "我的评分",
            symbol: "none",
            itemStyle: {
              color: "#008C73",
            },
            areaStyle: {
              color: "#008C73",
            },
            lineStyle: {
              color: "#7FDBCA",
              width: 4,
            },
          },
        ],
      },
    ],
  };

  chart.setOption(option);

  pageInstance.getData()
  return chart;
}

Page({
  data: {
    userInfo: {},
    ec: {
      onInit: initChart,
    },
    chart: null, // 保存图表实例
  },
  onLoad(options) {
    pageInstance = this; // 保存页面实例
    this.setData({
      userInfo: wx.getStorageSync("userInfo").userInfo,
    });
  },
  async onShow() {
    this.getData()
  },
  async getData() {
    const {
      ts01,
      ts02,
      ts03,
      ts04,
      ts05,
      ts01Total,
      ts02Total,
      ts03Total,
      ts04Total,
      ts05Total,
      tsAll,
    } = await wx.API.userScoreRadar();
    // 更新雷达图数据
    this.updateRadarChart({
      ts01,
      ts02,
      ts03,
      ts04,
      ts05,
      ts01Total,
      ts02Total,
      ts03Total,
      ts04Total,
      ts05Total,
    });
  },

  // 更新雷达图数据的方法
  updateRadarChart(scoreData) {
    const { ts01, ts02, ts03, ts04, ts05, ts01Total, ts02Total, ts03Total, ts04Total, ts05Total } = scoreData;

    // 如果图表实例存在，直接更新数据
    if (this.chartInstance) {
      const option = {
        radar: {
          indicator: [
            { name: `医疗工作\n${ts01}分`, max: ts01Total},
            { name: `教学工作\n${ts02}分`, max: ts02Total},
            { name: `科研工作\n${ts03}分`, max: ts03Total},
            { name: `人才培养\n${ts04}分`, max: ts04Total},
            { name: `公益工作\n${ts05}分`, max: ts05Total},
          ],
          shape: "polygon",
          radius: "60%",
          center: ["50%", "50%"],
          splitNumber: 1,
          axisName: {
            color: "#333333",
            fontSize: 14,
            distance: 15,
          },
          splitLine: {
            lineStyle: {
              color: "#7FDBCA",
              width: 1,
            },
          },
          splitArea: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              color: "#1BAF95",
              width: 1,
            },
          },
        },
        series: [
          {
            name: "评分",
            type: "radar",
            data: [
              {
                value: [ts01, ts02, ts03, ts04, ts05],
                name: "我的评分",
                symbol: "none",
                itemStyle: {
                  color: "#008C73",
                },
                areaStyle: {
                  color: "#008C73",
                },
                lineStyle: {
                  color: "#7FDBCA",
                  width: 4,
                },
              },
            ],
          },
        ],
      };

      this.chartInstance.setOption(option);
    }
  },
  changePwd() {
    wx.navigateTo({
      url: "/pages/changepwd/index",
    });
  },
  logout() {
    wx.showModal({
      title: '提示',
      content: '退出登录后将会清空本地缓存数据并跳转到登录界面，是否继续？',
      confirmText: "退出登录",
      confirmColor: "#01549C",
      complete: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.reLaunch({
            url: '/pages/login/index',
          })
        }
      }
    })
  }
});
