export default [
  {
    "fieldCode": "Q1",
    "title": "宣传工作",
    "description": "院外级3分/项，院级2分/项，科室级2分/项，个人1.5分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q1.1",
        "title": "是否参与院外宣传工作",
        "type": "single_choice",
        "codegroup": [
          {
            "code": "0",
            "label": "否"
          },
          {
            "code": "1",
            "label": "是"
          }
        ]
      },
      {
        "fieldCode": "Q1.2",
        "title": "请选择参与的院外宣传工作项目",
        "type": "multiple_choice",
        "dependsOn": "Q1.1",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "电视节目"
          },
          {
            "code": "1",
            "label": "报纸杂志"
          },
          {
            "code": "2",
            "label": "新媒体文稿"
          },
          {
            "code": "3",
            "label": "新媒体短视频"
          },
          {
            "code": "4",
            "label": "新媒体直播"
          },
          {
            "code": "5",
            "label": "科普赛事"
          }
        ]
      },
      {
        "fieldCode": "Q1.3",
        "title": "是否参与院内级宣传工作",
        "type": "single_choice",
        "codegroup": [
          {
            "code": "0",
            "label": "否"
          },
          {
            "code": "1",
            "label": "是"
          }
        ]
      },
      {
        "fieldCode": "Q1.4",
        "title": "请选择参与的院内宣传工作项目",
        "type": "multiple_choice",
        "dependsOn": "Q1.3",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "科普直播"
          },
          {
            "code": "1",
            "label": "宣医电视"
          },
          {
            "code": "2",
            "label": "科普短视频"
          },
          {
            "code": "3",
            "label": "科普文稿"
          },
          {
            "code": "4",
            "label": "科普大赛演讲"
          },
          {
            "code": "5",
            "label": "科普大赛征文"
          }
        ]
      },
      {
        "fieldCode": "Q1.5",
        "title": "是否参与科室级宣传工作",
        "type": "single_choice",
        "codegroup": [
          {
            "code": "0",
            "label": "否"
          },
          {
            "code": "1",
            "label": "是"
          }
        ]
      },
      {
        "fieldCode": "Q1.6",
        "title": "请选择参与的科室宣传工作项目",
        "type": "multiple_choice",
        "dependsOn": "Q1.5",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "科普原创文章"
          },
          {
            "code": "1",
            "label": "其他类型文稿"
          },
          {
            "code": "2",
            "label": "短视频"
          },
          {
            "code": "3",
            "label": "配合宣传工作"
          }
        ]
      },
      {
        "fieldCode": "Q1.7",
        "title": "是否有个人宣传工作",
        "type": "single_choice",
        "codegroup": [
          {
            "code": "0",
            "label": "否"
          },
          {
            "code": "1",
            "label": "是"
          }
        ]
      },
      {
        "fieldCode": "Q1.8",
        "title": "请选择个人宣传工作项目",
        "type": "multiple_choice",
        "dependsOn": "Q1.7",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "微博"
          },
          {
            "code": "1",
            "label": "公众号"
          },
          {
            "code": "2",
            "label": "视频号"
          },
          {
            "code": "3",
            "label": "抖音"
          },
          {
            "code": "4",
            "label": "其他自媒体形式"
          }
        ]
      }
    ]
  },
  {
    "fieldCode": "Q2",
    "title": "党团工作（献血2分；其他经党/团支部书记讨论认定后的工作每项0.5分，3分封顶）",
    "description": "献血 1-3分不等；其他党团活动 1-3分不等",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q2.1",
        "title": "献血次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.2",
        "title": "参与党支部活动次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.3",
        "title": "参与团支部活动次数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q3",
    "title": "工会活动（参加春晚，医师节，护士节，春游，歌咏比赛，等科室组织的工会活动，具体参与情况由各分会小组长计分。积极组织或协助工会各类活动，具体活动参照上述说明，具体参与情况，由工会主席认定。）",
    "description": "参与工会活动0.5分/次，2分封顶；协助组织工会活动0.5分/次，3分封顶",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q3.1",
        "title": "填写参与工会活动次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.2",
        "title": "填写协助组织工会活动次数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q4",
    "title": "全科会签到次数",
    "description": "全科会签到表 0.5分/次",
    "type": "number",
    "defaultValue": "0"
  },
  {
    "fieldCode": "Q5",
    "title": "其他活动情况",
    "description": "大型医院巡查、质控中心、重点专科申报、科室规划梳理、招聘、华夏会等大型会议筹办、区域中心支援、智慧医疗小组、科室相关秘书及联络员（医保、临床试验、GCP等）。1-3分不等",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q5.1",
        "title": "其他活动（以科室为单位参加的活动）",
        "type": "multiple_choice",
        "codegroup": [
          {
            "code": "0",
            "label": "大型医院巡查"
          },
          {
            "code": "1",
            "label": "质控中心"
          },
          {
            "code": "2",
            "label": "重点专科申报"
          },
          {
            "code": "3",
            "label": "科室规划梳理"
          },
          {
            "code": "4",
            "label": "招聘"
          },
          {
            "code": "5",
            "label": "华夏会等大型会议筹办"
          },
          {
            "code": "6",
            "label": "区域中心支援"
          },
          {
            "code": "7",
            "label": "智慧医疗小组"
          },
          {
            "code": "8",
            "label": "科室相关秘书及联络员（医保、临床试验、GCP等）"
          },
          {
            "code": "9",
            "label": "其他活动（由核心组讨论通过的科室公共事务）"
          }
        ]
      },
      {
        "fieldCode": "Q5.2",
        "title": "其他活动形式描述",
        "type": "text"
      }
    ]
  }
];