export default [
  {
    "fieldCode": "Q1",
    "title": "本年度立项科研项目数（不含横向）",
    "description": "科技部牵头30分/项，科技部课题15分/项，国自然面上、青年15分/项，国自然重点、杰青优青30分/项（在研国家级课题每年20%*课题分数）；省自然面上、青年10分/项，医院认定省部级及等同项目8分/项；局级5分/项；院级课题及其他1分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q1.1",
        "title": "科技部牵头项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.2",
        "title": "在研科技部牵头项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.3",
        "title": "科技部课题数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.4",
        "title": "在研科技部课题数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.5",
        "title": "国自然面上、青年项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.6",
        "title": "在研国自然面上、青年项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.7",
        "title": "国自然重点、杰青优青项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.8",
        "title": "在研国自然重点、杰青优青项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.9",
        "title": "获得省自然面上、青年项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.10",
        "title": "医院认定省部级及等同项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.11",
        "title": "局级项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.12",
        "title": "院级课题及其他项目数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q2",
    "title": "注册临床研究",
    "description": "GCP牵头国际多中心15分/项，牵头国内多中心10分/项，参与多中心5分/项，IIT牵头多中心5分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q2.1",
        "title": "GCP牵头国际多中心项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.2",
        "title": "牵头国内多中心项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.3",
        "title": "参与多中心项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.4",
        "title": "IIT牵头多中心项目数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q3",
    "title": "本年度立项科研项目经费总额（横向）",
    "description": "经费总额≥1000 万元，20 分；500 万元≤经费总额<1000 万元，15分；300 万元≤经费总额<500万元，10分；100 万元≤经费总额<300 万元，6分；50 万元≤经费总额<100 万元，2分；经费总额<50万元，1 分",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "经费总额≥1000 万元"
      },
      {
        "code": "1",
        "label": "500 万元≤经费总额<1000 万元"
      },
      {
        "code": "2",
        "label": "300 万元≤经费总额<500万元"
      },
      {
        "code": "3",
        "label": "100 万元≤经费总额<300 万元"
      },
      {
        "code": "4",
        "label": "50 万元≤经费总额<100 万元"
      },
      {
        "code": "5",
        "label": "经费总额<50万元"
      },
      {
        "code": "6",
        "label": "无"
      }
    ]
  },
  {
    "fieldCode": "Q4",
    "title": "SCI 论文发表数量情况（请勿重复填报。SCI 论文指标完成率）",
    "description": "Neurology 10分/篇，IF大于Neurology的中科院1区10分/篇，子刊20分/篇，顶刊50分/篇，SCI论著2分/篇，SCI其他类型1分/篇",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q4.1",
        "title": "顶刊数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.2",
        "title": "子刊数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.3",
        "title": "Neurology（或同级别）数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.4",
        "title": "IF大于Neurology的中科院1区数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.5",
        "title": "其他SCI论著数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.6",
        "title": "SCI其他类型数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q5",
    "title": "统计源论文完成情况",
    "description": "中华杂志1分/篇，其余杂志0.5分/篇",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q5.1",
        "title": "中华杂志数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q5.2",
        "title": "其余杂志数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q6",
    "title": "本年度授权的发明专利",
    "description": "第一名3 分，第二名2分，第3名1分",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q6.1",
        "title": "本年度是否授权的发明专利",
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
        "fieldCode": "Q6.2",
        "title": "发明专利第1完成人项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q6.1",
        "showWhenValue": "1"
      },
      {
        "fieldCode": "Q6.3",
        "title": "发明专利第2完成人项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q6.1",
        "showWhenValue": "1"
      },
      {
        "fieldCode": "Q6.4",
        "title": "发明专利第3完成人项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q6.1",
        "showWhenValue": "1"
      }
    ]
  },
  {
    "fieldCode": "Q7",
    "title": "专利转化金额",
    "description": "转化金额≥500 万元，30 分；300 万元≤转化金额<500 万元，25分；100 万元≤转化金额<300 万元，20分；50 万元≤转化金额＜100 万元，10 分；10 万元＜转化金额＜50 万元，5分；1万元＜转化金额＜10 万元，3分",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "转化金额≥500 万元"
      },
      {
        "code": "1",
        "label": "300 万元≤转化金额<500 万元"
      },
      {
        "code": "2",
        "label": "100 万元≤转化金额<300 万元"
      },
      {
        "code": "3",
        "label": "50 万元≤转化金额＜100 万元"
      },
      {
        "code": "4",
        "label": "10 万元≤转化金额＜50 万元"
      },
      {
        "code": "5",
        "label": "1万元≤转化金额＜10 万元"
      },
      {
        "code": "6",
        "label": "无"
      }
    ]
  },
  {
    "fieldCode": "Q8",
    "title": "学术会议情况",
    "description": "国际会议发言 3 分/人次；国际会议海报 1 分/人次；国内会议发言 1 分/人次；主办国际会议 10 分/项；主办全国会议 5 分/项；主办其他会议 2 分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q8.1",
        "title": "国际会议发言次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q8.2",
        "title": "国际会议海报次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q8.3",
        "title": "国内会议发言次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q8.4",
        "title": "主办国际会议次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q8.5",
        "title": "主办全国会议次数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q8.6",
        "title": "主办其他会议次数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q9",
    "title": "专著、译著（同一著作、多人参与情况下，按最高职责计算）",
    "description": "主编：10 分/项；副主编：5 分/项；参编：2 分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q9.1",
        "title": "专著、译著的主编数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q9.2",
        "title": "专著、译著的副主编数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q9.3",
        "title": "专著、译著的参编数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q10",
    "title": "科技获奖情况",
    "description": "国家级：第一完成单位：一等奖前5位依次为100分、80分、60分、40分、20分；二等奖前5位依次为80分、64分、48分、32分、16分。省部级：第一完成单位：一等奖前5位依次为50分、40分、30分、20分、10分；二等奖前5位依次为30分、24分、18分、12分、6分；三等奖前5位依次为10分、8分、6分、4分、2分",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q10.1",
        "title": "是否获得国家级奖项，且作为第一完成单位",
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
        "fieldCode": "Q10.2",
        "title": "获国家级奖项及完成人情况",
        "type": "single_choice",
        "dependsOn": "Q10.1",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "获得国家一等奖，第1完成人"
          },
          {
            "code": "1",
            "label": "获得国家一等奖，第2完成人"
          },
          {
            "code": "2",
            "label": "获得国家一等奖，第3完成人"
          },
          {
            "code": "3",
            "label": "获得国家一等奖，第4完成人"
          },
          {
            "code": "4",
            "label": "获得国家一等奖，第5完成人"
          },
          {
            "code": "5",
            "label": "获得国家二等奖，第1完成人"
          },
          {
            "code": "6",
            "label": "获得国家二等奖，第2完成人"
          },
          {
            "code": "7",
            "label": "获得国家二等奖，第3完成人"
          },
          {
            "code": "8",
            "label": "获得国家二等奖，第4完成人"
          },
          {
            "code": "9",
            "label": "获得国家二等奖，第5完成人"
          },
          {
            "code": "10",
            "label": "以上皆不是"
          }
        ]
      },
      {
        "fieldCode": "Q10.3",
        "title": "是否获得省部级奖项或相当于省部级奖项，且作为第一完成单位",
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
        "fieldCode": "Q10.4",
        "title": "获省部级或相当于省部级奖项及完成人情况",
        "type": "single_choice",
        "dependsOn": "Q10.3",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "省部级奖项或相当于省部级一等奖，第1完成人"
          },
          {
            "code": "1",
            "label": "省部级奖项或相当于省部级一等奖，第2完成人"
          },
          {
            "code": "2",
            "label": "省部级奖项或相当于省部级一等奖，第3完成人"
          },
          {
            "code": "3",
            "label": "省部级奖项或相当于省部级一等奖，第4完成人"
          },
          {
            "code": "4",
            "label": "省部级奖项或相当于省部级一等奖，第5完成人"
          },
          {
            "code": "5",
            "label": "省部级奖项或相当于省部级二等奖，第1完成人"
          },
          {
            "code": "6",
            "label": "省部级奖项或相当于省部级二等奖，第2完成人"
          },
          {
            "code": "7",
            "label": "省部级奖项或相当于省部级二等奖，第3完成人"
          },
          {
            "code": "8",
            "label": "省部级奖项或相当于省部级二等奖，第4完成人"
          },
          {
            "code": "9",
            "label": "省部级奖项或相当于省部级二等奖，第5完成人"
          },
          {
            "code": "10",
            "label": "省部级奖项或相当于省部级三等奖，第1完成人"
          },
          {
            "code": "11",
            "label": "省部级奖项或相当于省部级三等奖，第2完成人"
          },
          {
            "code": "12",
            "label": "省部级奖项或相当于省部级三等奖，第3完成人"
          },
          {
            "code": "13",
            "label": "省部级奖项或相当于省部级三等奖，第4完成人"
          },
          {
            "code": "14",
            "label": "省部级奖项或相当于省部级三等奖，第5完成人"
          },
          {
            "code": "15",
            "label": "以上皆不是"
          }
        ]
      },
      {
        "fieldCode": "Q10.5",
        "title": "是否参与制定国家标准或卫生行业标准、临床指南、共识",
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
        "fieldCode": "Q10.6",
        "title": "牵头标准项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q10.5",
        "showWhenValue": "1"
      },
      {
        "fieldCode": "Q10.7",
        "title": "牵头指南项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q10.5",
        "showWhenValue": "1"
      },
      {
        "fieldCode": "Q10.8",
        "title": "牵头共识项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q10.5",
        "showWhenValue": "1"
      },
      {
        "fieldCode": "Q10.9",
        "title": "参与项目数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q10.5",
        "showWhenValue": "1"
      }
    ]
  },
  {
    "fieldCode": "Q11",
    "title": "是否为高被引科学家或高被引学者",
    "description": "20 分/人",
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
    "fieldCode": "Q12",
    "title": "是否出现科研诚信事件",
    "description": "一票否决，科研分清零",
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
    "fieldCode": "QR",
    "title": "有关科研工作其他信息补充说明（评分遗漏或者建议皆可）",
    "type": "text"
  }
];