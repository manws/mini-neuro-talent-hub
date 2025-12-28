export default [
  {
    "fieldCode": "Q1",
    "title": "博士、硕士研究生导师",
    "description": "博导5分、硕导3分",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "博导"
      },
      {
        "code": "1", 
        "label": "硕导"
      },
      {
        "code": "2",
        "label": "以上皆不是"
      }
    ]
  },
  {
    "fieldCode": "Q2",
    "title": "本科各级优秀课程（一流本科课程、优质本科课程、课程思政示范课等）",
    "description": "国家级 10 分/项；市级 8 分/项；校级 5 分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q2.1",
        "title": "获得国家级优秀课程数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.2", 
        "title": "获得市级优秀课程数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q2.3",
        "title": "获得校级优秀课程数目", 
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q3",
    "title": "授课学时情况，共计授课学时",
    "description": "授课1学时 1分",
    "type": "number",
    "defaultValue": "0"
  },
  {
    "fieldCode": "Q4", 
    "title": "双语授课情况，共计授课学时",
    "description": "授课1学时2分",
    "type": "number",
    "defaultValue": "0"
  },
  {
    "fieldCode": "Q5",
    "title": "理论、实践教学中学生评价中大于85%的占比",
    "description": "≥85 分者占 90%（5 分）,85%（4 分）,80%(3分),75%(2 分) ，<75%（0 分）",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "≥90%"
      },
      {
        "code": "1",
        "label": "85% - 90%"
      },
      {
        "code": "2", 
        "label": "80% - 85%"
      },
      {
        "code": "3",
        "label": "75% - 80%"
      },
      {
        "code": "4",
        "label": "<75%"
      }
    ]
  },
  {
    "fieldCode": "Q6",
    "title": "近两年参加教学比赛（创新大赛、教学基本功比赛等）获奖情况（获奖即可）",
    "description": "市级及以上 10 分；校级 8 分；院级 5 分",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "市级及以上"
      },
      {
        "code": "1",
        "label": "校级"
      },
      {
        "code": "2",
        "label": "院级"
      },
      {
        "code": "3",
        "label": "以上皆无"
      }
    ]
  },
  {
    "fieldCode": "Q7",
    "title": "本年度培养并获得博士和硕士学位人数",
    "description": "获博士学位满分 6 分，2 分/人；当年年底有未按时获学位博士减分 2 分/人。获硕士学位满分 4 分，2 分/人；当年年底有未获学位硕士减 1 分/人。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q7.1",
        "title": "获博士学位人数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q7.2",
        "title": "获硕士学位人数",
        "type": "number", 
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q7.3",
        "title": "当年年底有未按时获学位博士人数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q7.4",
        "title": "当年年底有未获学位硕士人数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q8",
    "title": "导师带教学生国家执业医师资格考核通过率",
    "description": "通过率 100% ，5 分；通过率 90-99%（含 90%），4 分；通过率 80-90%（含 80%），2 分；通过率 70-80%（含 70%），1 分；通过率小于 70% ，0 分；（本年度无考生者得平均分）",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "通过率100%"
      },
      {
        "code": "1",
        "label": "通过率90%-99%（包含90%）"
      },
      {
        "code": "2",
        "label": "通过率80%-90%（包含80%）"
      },
      {
        "code": "3",
        "label": "通过率70%-80%（包含70%）"
      },
      {
        "code": "4",
        "label": "通过率小于70%"
      },
      {
        "code": "5",
        "label": "本年度无考生者得平均分"
      }
    ]
  },
  {
    "fieldCode": "Q9",
    "title": "住培带教（包括病房带教，面向副主诊和参与带教的住院医师），完成所在病区的带教相应任务（按照月数统计）",
    "description": "按照月数计算，每月1分",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q9.1",
        "title": "是否是副主诊和参与带教的住院医师",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q9.2",
          "title": "完成所在病区的带教相应任务（完成月数）",
          "type": "number",
          "defaultValue": "0",
          "dependsOn": "Q9.1",
          "showWhenValue": "1"
        },
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
      }
    ]
  },
  {
    "fieldCode": "Q10",
    "title": "研究生教学情况",
    "description": "主讲1学时1分，助教0.5分",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q10.1",
        "title": "是否参与研究生课程的主讲和助教",
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
        "title": "主讲学时数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q10.1",
        "showWhenValue": "1"
      },
      {
        "fieldCode": "Q10.3",
        "title": "助教学时数",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q10.1",
        "showWhenValue": "1"
      }
    ]
  },
  {
    "fieldCode": "Q11",
    "title": "主持开展研究生课程（开展课程数目）",
    "description": "3分/门",
    "type": "number",
    "defaultValue": "0"
  },
  {
    "fieldCode": "Q12",
    "title": "分层递进责任教师",
    "description": "主诊和副主诊均按照月数计算，每月1分",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q12.1",
        "title": "是否为主诊和副主诊",
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
        "fieldCode": "Q12.2",
        "title": "是否完成相应工作，且未出现不良事件",
        "type": "single_choice",
        "dependsOn": "Q12.1",
        "showWhenValue": "1",
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
        "fieldCode": "Q12.3",
        "title": "工作共计多少个月",
        "type": "number",
        "defaultValue": "0",
        "dependsOn": "Q12.1",
        "showWhenValue": "1"
      }
    ]
  },
  {
    "fieldCode": "Q13",
    "title": "导师带教住院医师规范化培训结业考核通过率",
    "description": "通过率 100% ，10 分；通过率 90-99%（含 90%），8 分；通过率 80-90%（含 80%），6 分；通过率 70-80%（含 70%），5 分；通过率小于 70% ，3 分；（本年度无考生者得平均分）",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "通过率100%"
      },
      {
        "code": "1",
        "label": "通过率90%-99%（包含90%）"
      },
      {
        "code": "2",
        "label": "通过率80%-90%（包含80%）"
      },
      {
        "code": "3",
        "label": "通过率70%-80%（包含70%）"
      },
      {
        "code": "4",
        "label": "通过率小于70%"
      },
      {
        "code": "5",
        "label": "本年度无考生者得平均分"
      }
    ]
  },
  {
    "fieldCode": "Q14",
    "title": "教师带教能力",
    "description": "\"杏林医师奖\"综合考核：获奖 5分（获奖即可），准备材料参与评选2分；第一辅导人-获奖得分的一半",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q14.1",
        "title": "是否获\"杏林\"或\"基本功\"奖项",
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
        "fieldCode": "Q14.2",
        "title": "是否是获奖第一辅导人",
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
        "fieldCode": "Q14.3",
        "title": "是否参评\"杏林\"或\"基本功\"",
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
      }
    ]
  },
  {
    "fieldCode": "Q15",
    "title": "教材/课程建设（三年内部委、市级以上规划教材/课程）",
    "description": "主编，满分 10 分；副主编，满分 8 分；参编，满分 5 分",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "主编"
      },
      {
        "code": "1",
        "label": "副主编"
      },
      {
        "code": "2",
        "label": "参编"
      },
      {
        "code": "3",
        "label": "无"
      }
    ]
  },
  {
    "fieldCode": "Q16",
    "title": "教学成果（两年内获教学成果奖）",
    "description": "国家级：15 分/项；市级：10 分/项；校级：5 分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q16.1",
        "title": "国家级奖项数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q16.2",
        "title": "市级奖项数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q16.3",
        "title": "校级奖项数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q17",
    "title": "是否获得本年度校级优秀博士学位论文奖",
    "description": "获奖 2 分",
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
    "fieldCode": "Q18",
    "title": "本年度SCI、核心期刊发表教学论文",
    "description": "SCI 10分/篇，核心期刊 3 分/篇",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q18.1",
        "title": "发表SCI篇数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q18.2",
        "title": "发表核心期刊篇数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q19",
    "title": "在研教学改革课题",
    "description": "市级及以上：10 分/项；校级：5 分/项；院级：3 分/项",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q19.1",
        "title": "市级及以上改革课题数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q19.2",
        "title": "校级改革课题数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q19.3",
        "title": "院级改革课题数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  }
];