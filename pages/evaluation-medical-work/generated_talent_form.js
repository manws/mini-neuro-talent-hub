export default [
  {
    "fieldCode": "Q1",
    "title": "获得创新研究群体",
    "description": "国家自然科学基金创新研究群体 15 分/项 项目负责人分配分值（项目执行每年20%*项目分数）；教育部创新研究群体 10 分/项 项目负责人分配分值（项目执行每年20%*项目分数）；北京市教委创新研究群体 5 分/项 项目负责人分配分值（项目执行每年20%*项目分数）",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q1.1",
        "title": "新获国家自然科学基金创新研究群体项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.2",
        "title": "在研国家自然科学基金创新研究群体项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.3",
        "title": "新获教育部创新研究群体项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.4",
        "title": "在研教育部创新研究群体项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.5",
        "title": "新获北京市教委创新研究群体项目数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q1.6",
        "title": "在研北京市教委创新研究群体项目数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q2",
    "title": "当年新增人才项目情况",
    "description": "院士 25 分/项；一类人才项目 新增项目年度12 分/项，项目培养期内8分/项/每年度；二类人才项目 新增项目年度8 分/项、项目培养期内6分/项/每年度；三类人才项目 新增项目年度6 分/项、项目培养期内4分/项/年度；院内人才项目 新增项目年度2 分/项、项目培养期内1分/项/每年度",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q2.1",
        "title": "是否获得国家最高科学技术奖、两院院士",
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
        "fieldCode": "Q2.2",
        "title": "是否有一类人才项目（当年新增或培养期内）",
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
        "fieldCode": "Q2.3",
        "title": "一类人才项目（当年新增）",
        "type": "multiple_choice",
        "dependsOn": "Q2.2",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "国家杰青"
          },
          {
            "code": "1",
            "label": "长江学者"
          },
          {
            "code": "2",
            "label": "北京学者"
          },
          {
            "code": "3",
            "label": "国家\"千人计划\""
          },
          {
            "code": "4",
            "label": "北京市突贡专家"
          },
          {
            "code": "5",
            "label": "卫生部突贡专家"
          },
          {
            "code": "6",
            "label": "其他省市突出贡献专家"
          },
          {
            "code": "7",
            "label": "国务院政府特贴专家"
          },
          {
            "code": "8",
            "label": "人社部新世纪百千万国家级人选"
          },
          {
            "code": "9",
            "label": "市卫生系统\"215\"领军人才"
          },
          {
            "code": "10",
            "label": "国家\"万人计划\"领军人才"
          },
          {
            "code": "11",
            "label": "医管局\"使命\"计划"
          },
          {
            "code": "12",
            "label": "\"科技北京\"百名领军人才培养工程"
          },
          {
            "code": "13",
            "label": "高创计划杰出人才"
          },
          {
            "code": "14",
            "label": "国家级名老中医"
          }
        ]
      },
      {
        "fieldCode": "Q2.4",
        "title": "一类人才项目（培养期内）",
        "type": "multiple_choice",
        "dependsOn": "Q2.2",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "国家杰青"
          },
          {
            "code": "1",
            "label": "长江学者"
          },
          {
            "code": "2",
            "label": "北京学者"
          },
          {
            "code": "3",
            "label": "国家\"千人计划\""
          },
          {
            "code": "4",
            "label": "北京市突贡专家"
          },
          {
            "code": "5",
            "label": "卫生部突贡专家"
          },
          {
            "code": "6",
            "label": "其他省市突出贡献专家"
          },
          {
            "code": "7",
            "label": "国务院政府特贴专家"
          },
          {
            "code": "8",
            "label": "人社部新世纪百千万国家级人选"
          },
          {
            "code": "9",
            "label": "市卫生系统\"215\"领军人才"
          },
          {
            "code": "10",
            "label": "国家\"万人计划\"领军人才"
          },
          {
            "code": "11",
            "label": "医管局\"使命\"计划"
          },
          {
            "code": "12",
            "label": "\"科技北京\"百名领军人才培养工程"
          },
          {
            "code": "13",
            "label": "高创计划杰出人才"
          },
          {
            "code": "14",
            "label": "国家级名老中医"
          }
        ]
      },
      {
        "fieldCode": "Q2.5",
        "title": "是否有二类人才项目（当年新增或培养期内）",
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
        "fieldCode": "Q2.6",
        "title": "二类人才项目（当年新增）",
        "type": "multiple_choice",
        "dependsOn": "Q2.5",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "国自然优秀青年项目"
          },
          {
            "code": "1",
            "label": "市卫生系统\"215\"学科带头人"
          },
          {
            "code": "2",
            "label": "人社部新世纪百千万工程市级人选"
          },
          {
            "code": "3",
            "label": "教育部新世纪优秀人才支持计划"
          },
          {
            "code": "4",
            "label": "市卫生局\"十百千\"人才资助项目\"十\"层次"
          },
          {
            "code": "5",
            "label": "中组部\"万人计划\"青年拔尖项目"
          },
          {
            "code": "6",
            "label": "市医管局\"登峰\"计划"
          },
          {
            "code": "7",
            "label": "北京\"海聚工程\""
          },
          {
            "code": "8",
            "label": "北京市留学人员特别贡献奖"
          },
          {
            "code": "9",
            "label": "北京中医药薪火传承3+3工程导师入选者"
          },
          {
            "code": "10",
            "label": "北京市名老中医"
          },
          {
            "code": "11",
            "label": "高创计划百千万工程领军人才"
          },
          {
            "code": "12",
            "label": "高创计划科技创新与科技创业领军人才"
          },
          {
            "code": "13",
            "label": "市属高等院校创新团队建设计划"
          }
        ]
      },
      {
        "fieldCode": "Q2.7",
        "title": "二类人才项目（培养期内）",
        "type": "multiple_choice",
        "dependsOn": "Q2.5",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "国自然优秀青年项目"
          },
          {
            "code": "1",
            "label": "市卫生系统\"215\"学科带头人"
          },
          {
            "code": "2",
            "label": "人社部新世纪百千万工程市级人选"
          },
          {
            "code": "3",
            "label": "教育部新世纪优秀人才支持计划"
          },
          {
            "code": "4",
            "label": "市卫生局\"十百千\"人才资助项目\"十\"层次"
          },
          {
            "code": "5",
            "label": "中组部\"万人计划\"青年拔尖项目"
          },
          {
            "code": "6",
            "label": "市医管局\"登峰\"计划"
          },
          {
            "code": "7",
            "label": "北京\"海聚工程\""
          },
          {
            "code": "8",
            "label": "北京市留学人员特别贡献奖"
          },
          {
            "code": "9",
            "label": "北京中医药薪火传承3+3工程导师入选者"
          },
          {
            "code": "10",
            "label": "北京市名老中医"
          },
          {
            "code": "11",
            "label": "高创计划百千万工程领军人才"
          },
          {
            "code": "12",
            "label": "高创计划科技创新与科技创业领军人才"
          },
          {
            "code": "13",
            "label": "市属高等院校创新团队建设计划"
          }
        ]
      },
      {
        "fieldCode": "Q2.8",
        "title": "是否有三类人才项目（当年新增或培养期内）",
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
        "fieldCode": "Q2.9",
        "title": "三类人才项目（当年新增）",
        "type": "multiple_choice",
        "dependsOn": "Q2.8",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "市卫生系统\"215\"学科骨干"
          },
          {
            "code": "1",
            "label": "科技新星计划"
          },
          {
            "code": "2",
            "label": "市委组织部优秀人才资助"
          },
          {
            "code": "3",
            "label": "市卫生局\"十百千\"项目\"百\"层次"
          },
          {
            "code": "4",
            "label": "市教委人才强教项目—骨干层次"
          },
          {
            "code": "5",
            "label": "人社部留学择优资助项目"
          },
          {
            "code": "6",
            "label": "北京市留学择优资助项目"
          },
          {
            "code": "7",
            "label": "教育部留学归国科研启动基金"
          },
          {
            "code": "8",
            "label": "中医优秀临床人才研修项目"
          },
          {
            "code": "9",
            "label": "中医药125人才—学科骨干层次"
          },
          {
            "code": "10",
            "label": "北京市优秀青年知识分子"
          },
          {
            "code": "11",
            "label": "高创计划青年拔尖人才"
          },
          {
            "code": "12",
            "label": "市医管局\"青苗\"培养计划"
          }
        ]
      },
      {
        "fieldCode": "Q2.10",
        "title": "三类人才项目（培养期内）",
        "type": "multiple_choice",
        "dependsOn": "Q2.8",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "市卫生系统\"215\"学科骨干"
          },
          {
            "code": "1",
            "label": "科技新星计划"
          },
          {
            "code": "2",
            "label": "市委组织部优秀人才资助"
          },
          {
            "code": "3",
            "label": "市卫生局\"十百千\"项目\"百\"层次"
          },
          {
            "code": "4",
            "label": "市教委人才强教项目—骨干层次"
          },
          {
            "code": "5",
            "label": "人社部留学择优资助项目"
          },
          {
            "code": "6",
            "label": "北京市留学择优资助项目"
          },
          {
            "code": "7",
            "label": "教育部留学归国科研启动基金"
          },
          {
            "code": "8",
            "label": "中医优秀临床人才研修项目"
          },
          {
            "code": "9",
            "label": "中医药125人才—学科骨干层次"
          },
          {
            "code": "10",
            "label": "北京市优秀青年知识分子"
          },
          {
            "code": "11",
            "label": "高创计划青年拔尖人才"
          },
          {
            "code": "12",
            "label": "市医管局\"青苗\"培养计划"
          }
        ]
      },
      {
        "fieldCode": "Q2.11",
        "title": "是否有院内人才项目（当年新增或培养期内）",
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
        "fieldCode": "Q2.12",
        "title": "院内人才项目（当年新增）",
        "type": "multiple_choice",
        "dependsOn": "Q2.11",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "医院\"英才计划\""
          },
          {
            "code": "1",
            "label": "医院\"创新团队\"培养计划"
          },
          {
            "code": "2",
            "label": "医院\"汇智\"人才工程"
          }
        ]
      },
      {
        "fieldCode": "Q2.13",
        "title": "院内人才项目（培养期内）",
        "type": "multiple_choice",
        "dependsOn": "Q2.11",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "医院\"英才计划\""
          },
          {
            "code": "1",
            "label": "医院\"创新团队\"培养计划"
          },
          {
            "code": "2",
            "label": "医院\"汇智\"人才工程"
          }
        ]
      }
    ]
  },
  {
    "fieldCode": "Q3",
    "title": "学术团体兼职（填写职务数）",
    "description": "担任I、II类学会会长、副会长、理事长职务或直属专科分会主任委员，20 分/人次；青委会主任委员 10 分/人次；担任I、II类学会副理事长、秘书长、副秘书长职务或直属专科分会副主任委员，16 分/人次；青委会副主任委员 8 分/人次；担任I、II类学会理事职务或直属专科分会常务委员，8 分/人次；青委会常务委员 5 分/人次；担任I、II类学会直属专科分会委员，3 分/人次；青委会委员 1 分/人次；担任I、II类专科分会临床学组组长，6 分/人次；副组长 3 分/人次；学组委员 0.5 分/人次。选最高不累加，任职期内每年获得相应分值。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q3.1",
        "title": "担任I、II类学会会长、副会长、理事长职务或直属专科分会主任委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.2",
        "title": "担任青委会主任委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.3",
        "title": "担任I、II类学会副理事长、秘书长、副秘书长职务或直属专科分会副主任委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.4",
        "title": "担任青委会副主任委员",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.5",
        "title": "担任I、II类学会理事职务或直属专科分会常务委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.6",
        "title": "担任青委会常务委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.7",
        "title": "担任I、II类学会直属专科分会委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.8",
        "title": "担任青委会委员数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.9",
        "title": "担任I、II类学会专科分会临床学组组长数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.10",
        "title": "担任I、II类学会专科分会临床学组副组长数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.11",
        "title": "担任I、II类学会专科分会临床学组委员数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q4",
    "title": "担任中国科技论文统计源期刊职务(填写职务数)",
    "description": "主编 3 分/人次；副主编 1 分/人次；编委 0.3 分/人次",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q4.1",
        "title": "担任主编职务数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.2",
        "title": "担任副主编职务数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q4.3",
        "title": "担任编委职务数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q5",
    "title": "担任 SCI 期刊职务(填写职务数)",
    "description": "主编 6 分/人次；副主编 4 分/人次；编委 2 分/人次",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q5.1",
        "title": "担任主编职务数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q5.2",
        "title": "担任副主编职务数目",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q5.3",
        "title": "担任编委职务数目",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  }
];