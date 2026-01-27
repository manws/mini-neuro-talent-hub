export default [
  {
    "fieldCode": "Q1",
    "title": "根据您的实际情况选择您所在的岗位",
    "description": "科室要求的任务量及出诊时间，得分=20/70*任务量完成率；急诊正副主诊、住院总医师、外派、科秘岗位本项按满分计算，其它临床岗位医师未承担临床工作按科室平均值计算。",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "院领导、知名专家团队门诊、职能部门中层干部、急诊组、监护室、住院总医师、因公外派、急诊正副主诊、脱产外派、科秘岗位"
      },
      {
        "code": "1",
        "label": "重症病房岗"
      },
      {
        "code": "2",
        "label": "普通病房岗"
      },
      {
        "code": "3",
        "label": "门/急诊岗位"
      },
      {
        "code": "4",
        "label": "其他临床岗暂未承担临床工作(如科核心组管理岗位、科研岗、身体原因暂不考核门诊量、出国、进修 超过60周岁等)"
      }
    ]
  },
  {
    "fieldCode": "Q2",
    "title": "出院数评估",
    "description": "达到科室要求任务量，得分=50*任务量完成率。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q2.1",
        "title": "您是否是病房岗",
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
        "title": "若是病床岗，请选择诊疗组",
        "type": "single_choice",
        "dependsOn": "Q2.1",
        "showWhenValue": "1",
        "codegroup": [
          {
            "code": "0",
            "label": "轮转阶段（如一阶段住院医师）"
          },
          {
            "code": "1",
            "label": "神内癫痫1组"
          },
          {
            "code": "2",
            "label": "神内癫痫2组"
          },
          {
            "code": "3",
            "label": "神内高级卒中单元"
          },
          {
            "code": "4",
            "label": "神内神经肌肉病组"
          },
          {
            "code": "5",
            "label": "神内脊髓组"
          },
          {
            "code": "6",
            "label": "神内脑静脉组"
          },
          {
            "code": "7",
            "label": "神内脑小血管病组"
          },
          {
            "code": "8",
            "label": "神内帕金森病1组"
          },
          {
            "code": "9",
            "label": "神内帕金森病2组"
          },
          {
            "code": "10",
            "label": "神内神经感染组"
          },
          {
            "code": "11",
            "label": "神内神经免疫1组"
          },
          {
            "code": "12",
            "label": "神内神经免疫2组"
          },
          {
            "code": "13",
            "label": "神经内科心身睡眠"
          },
          {
            "code": "14",
            "label": "神经内科特需病房"
          },
          {
            "code": "15",
            "label": "神内头痛组"
          },
          {
            "code": "16",
            "label": "神内头晕组"
          },
          {
            "code": "17",
            "label": "神内心脑血管病组"
          },
          {
            "code": "18",
            "label": "神内神经遗传-代谢病组"
          },
          {
            "code": "19",
            "label": "神内中西医结合组"
          },
          {
            "code": "20",
            "label": "神内中西医结合2组"
          },
          {
            "code": "21",
            "label": "神内血管重症组"
          },
          {
            "code": "22",
            "label": "神内综合重症组"
          },
          {
            "code": "23",
            "label": "神内卒中抢救中心"
          },
          {
            "code": "24",
            "label": "神经变性病与认知障碍1组"
          },
          {
            "code": "25",
            "label": "神经变性病与认知障碍2组"
          },
          {
            "code": "26",
            "label": "神经变性病与认知障碍3组"
          },
          {
            "code": "27",
            "label": "神经变性病与认知障碍4组"
          }
        ]
      }
    ]
  },
  {
    "fieldCode": "Q3",
    "title": "差错或纠纷情况",
    "description": "科室口径诊疗过错且赔付扣5分/例，纠纷扣2分/例，零差错/纠纷记10分满分。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q3.1",
        "title": "科室口径诊疗过错且赔付例数",
        "type": "number",
        "defaultValue": "0"
      },
      {
        "fieldCode": "Q3.2",
        "title": "纠纷例数",
        "type": "number",
        "defaultValue": "0"
      }
    ]
  },
  {
    "fieldCode": "Q4",
    "title": "擅长病种(填5项疾病，至少2项是疑难/危重/罕见)",
    "description": "自填报不少于5种疾病，其中疑难/危重/罕见病不少于2种；疾病数或疑难/危重/罕见病未达要求少1种减5分。（自备病案号或门诊病历佐证，不限当年）。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q4.1",
        "title": "擅长病种1描述",
        "type": "text",
        "subField": {
          "fieldCode": "Q4.2",
          "title": "是否是疑难/危重/罕见",
          "description": "",
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
      },
      {
        "fieldCode": "Q4.3",
        "title": "擅长病种2描述",
        "type": "text",
        "subField": {
          "fieldCode": "Q4.4",
          "title": "是否是疑难/危重/罕见",
          "description": "",
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
      },
      {
        "fieldCode": "Q4.5",
        "title": "擅长病种3描述",
        "type": "text",
        "subField": {
          "fieldCode": "Q4.6",
          "title": "是否是疑难/危重/罕见",
          "description": "",
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
      },
      {
        "fieldCode": "Q4.7",
        "title": "擅长病种4描述",
        "type": "text",
        "subField": {
          "fieldCode": "Q4.8",
          "title": "是否是疑难/危重/罕见",
          "description": "",
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
      },
      {
        "fieldCode": "Q4.9",
        "title": "擅长病种5描述",
        "type": "text",
        "subField": {
          "fieldCode": "Q4.10",
          "title": "是否是疑难/危重/罕见",
          "description": "",
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
      }
    ]
  },
  {
    "fieldCode": "Q5",
    "title": "开展项目情况（填3项满分包括评估、检查、操作或手术）",
    "description": "自填报不少于3种成功开展的评估技术、检查技术、操作技术或手术，填报2种得10分，填报1种得5分。（自备病案号、手术或操作记录或门诊病历佐证，不限当年）。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q5.1",
        "title": "开展项目1描述",
        "type": "text"
      },
      {
        "fieldCode": "Q5.2",
        "title": "开展项目2描述",
        "type": "text"
      },
      {
        "fieldCode": "Q5.3",
        "title": "开展项目3描述",
        "type": "text"
      }
    ]
  },
  {
    "fieldCode": "Q6",
    "title": "新技术、新业务开展情况",
    "description": "开展新技术、新业务项目: 当年申报获准开展项目每项5分；获得年终新技术、新业务评奖一等奖15分；二等奖10分；三等奖8分（奖项不累加，计算最高奖项分值），最高15分",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q6.1",
        "title": "申报获准开展项目数",
        "type": "number"
      },
      {
        "fieldCode": "Q6.2",
        "title": "获奖情况（多次获奖选择最高奖）",
        "type": "single_choice",
        "codegroup": [
          {
            "code": "0",
            "label": "获得年终新技术、新业务评奖一等奖"
          },
          {
            "code": "1",
            "label": "获得年终新技术、新业务评奖二等奖"
          },
          {
            "code": "2",
            "label": "获得年终新技术、新业务评奖三等奖"
          },
          {
            "code": "3",
            "label": "未获奖"
          }
        ]
      }
    ]
  },
  {
    "fieldCode": "Q7",
    "title": "受邀会诊情况",
    "description": "完成医务处派出院外重大会诊任务记20分；正常完成全年院内科间会诊（病房岗位三线值班/院总协调专业组派出/参加会诊中心排班）记10分；医务处组织院内或外派的危重孕产妇、重大抢救会诊任务超过一次加10分，最高20分。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q7.1",
        "title": "是否有完成医务处派出院外重大会诊任务",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q7.2",
          "title": "医务处派出院外重大会诊任务（派遣人+时间）",
          "description": "",
          "type": "text",
          "dependsOn": "Q7.1",
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
      },
      {
        "fieldCode": "Q7.3",
        "title": "是否正常完成全年院内科间会诊(病房三线岗位参加多学科会诊/院总协调派出的专业组会诊/参加会诊中心排班)",
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
        "fieldCode": "Q7.4",
        "title": "是否完成医务处组织院内的危重孕产妇、重大抢救会诊任务",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q7.5",
          "title": "医务处组织院内的危重孕产妇、重大抢救会诊任务描述（科室+时间）",
          "description": "",
          "type": "text",
          "dependsOn": "Q7.4",
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
      },
      {
        "fieldCode": "Q7.6",
        "title": "是否完成医务处外派的院外危重孕产妇救治任务",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q7.7",
          "title": "医务处外派的危重孕产妇救治任务描述（派遣人医院+时间）",
          "description": "",
          "type": "text",
          "dependsOn": "Q7.6",
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
    "fieldCode": "Q8",
    "title": "医疗保障任务",
    "description": "当年顺利完成医疗保障任务（如北京市孕产妇救治、医院或上级指派的重大医疗任务等）一次记20分，最高20分。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q8.1",
        "title": "当年是否顺利完成医疗保障任务(医院或上级指派的重大医疗任务)",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q8.2",
          "title": "医疗保障任务描述（派遣人 + 时间）",
          "description": "",
          "type": "text",
          "dependsOn": "Q8.1",
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
    "fieldCode": "Q9",
    "title": "援外支边",
    "description": "承担并完成三月及以上的（自然年内）下乡、区域中心外派得10分，六月及以上的支边、援藏援疆援青或援外任务记20分，最高20分。",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "承担并完成三月及以上的（自然年内）下乡、巡回医疗"
      },
      {
        "code": "1",
        "label": "承担并完成六月及以上的支边、援藏援疆援青或援外任务"
      },
      {
        "code": "2",
        "label": "无上述情况"
      }
    ]
  },
  {
    "fieldCode": "Q10",
    "title": "急诊工作(以结束月计算)",
    "description": "承担神内急诊一线工作每满4个月，得10分（以结束月计算），最高20分。",
    "type": "single_choice",
    "codegroup": [
      {
        "code": "0",
        "label": "完成神内急诊一线工作一轮（4个月）"
      },
      {
        "code": "1",
        "label": "完成神内急诊一线工作两轮（8个月）"
      },
      {
        "code": "2",
        "label": "未参加急诊工作，或当年未满一轮（4个月）"
      }
    ]
  },
  {
    "fieldCode": "Q11",
    "title": "获奖及评优情况",
    "description": "获院级以上个人临床相关获奖或表彰得10分；神内科室病房完成CMI等目标值的主诊组主诊、副主诊及住院医师（轮转3月以上）得10分，最高20分。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q11.1",
        "title": "是否获院级以上个人临床相关获奖或表彰",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q11.2",
          "title": "备注奖项",
          "description": "",
          "type": "text",
          "dependsOn": "Q11.1",
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
      },
      {
        "fieldCode": "Q11.3",
        "title": "是否是完成CMI等目标值的主诊组主诊、副主诊及住院医师(轮转3月以上)",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q11.4",
          "title": "备注科室病房",
          "description": "",
          "type": "text",
          "dependsOn": "Q11.3",
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
    "fieldCode": "Q12",
    "title": "参与临床管理工作情况",
    "description": "承担年度科室临床管理任务及岗位（如相关科领导、门诊/急诊组长、重症专业组组长、住院总医师、电生理专业组组长、科秘、进修医师负责人、临床助理）记20分，其它参与临床管理工作岗位记10分/项，最高20分。",
    "type": "group",
    "children": [
      {
        "fieldCode": "Q12.1",
        "title": "临床管理职务",
        "type": "single_choice",
        "subField": {
          "fieldCode": "Q12.2",
          "title": "岗位信息(如上述内容未纳入，可补充填写所承担的临床管理工作内容)",
          "description": "",
          "type": "text",
          "dependsOn": "Q12.1",
          "showWhenValue": "1"
        },
        "codegroup": [
          {
            "code": "0",
            "label": "承担年度科室临床管理任务或关键岗位（相关科领导、门诊/急诊组长、重症专业组组长、住院总医师、电生理专业组组长、科秘、进修医师负责人、临床助理）"
          },
          {
            "code": "1",
            "label": "承担临床管理相关工作岗位（临床试验负责人、GCP负责人，院感/疾控专员、医保联络员、药事联络员、医疗信息员、门诊/急诊副组长、VTE等质控工作）"
          },
          {
            "code": "2",
            "label": "未承担临床管理工作岗位"
          }
        ]
      }
    ]
  },
  {
    "fieldCode": "QR",
    "title": "有关医疗工作其他信息补充说明（评分遗漏或者建议皆可）",
    "description": "",
    "type": "text",
    "description": "",
  }
]