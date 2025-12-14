export default [
  {
    fieldCode: "Q1",
    title: "门诊和急诊工作量- 选择岗位（单选）",
    type: "single_choice",
    codegroup: [
      {
        code: "0",
        label: "急诊正副主诊、住院总医师、外派、科秘岗",
      },
      {
        code: "1",
        label: "重症病房岗",
      },
      {
        code: "2",
        label: "普通病房岗",
      },
      {
        code: "3",
        label: "门/急诊岗位",
      },
      {
        code: "4",
        label: "其他临床岗且未承担临床工作",
      },
    ],
  },
  {
    fieldCode: "Q2",
    title: "出院数评估",
    type: "group",
    children: [
      {
        fieldCode: "Q2.1",
        title: "是否病房岗",
        type: "single_choice",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q2.2",
        title: "若是病床岗，请选择诊疗组",
        type: "single_choice",
        dependsOn: "Q2.1", // 依赖Q2.1的选择
        showWhenValue: "1", // 当Q2.1选择"是"时显示
        codegroup: [
          {
            code: "0",
            label: "神内癫痫1组",
          },
          {
            code: "1",
            label: "神内癫痫2组",
          },
          {
            code: "2",
            label: "神内高级卒中单元",
          },
          {
            code: "3",
            label: "神内神经肌肉病组",
          },
          {
            code: "4",
            label: "神内脊髓组",
          },
          {
            code: "5",
            label: "神内脑静脉组",
          },
          {
            code: "6",
            label: "神内脑小血管病组",
          },
          {
            code: "7",
            label: "神内帕金森病1组",
          },
          {
            code: "8",
            label: "神内帕金森病2组",
          },
          {
            code: "9",
            label: "神内神经感染组",
          },
          {
            code: "10",
            label: "神内神经免疫1组",
          },
          {
            code: "11",
            label: "神内神经免疫2组",
          },
          {
            code: "12",
            label: "神经内科心身睡眠",
          },
          {
            code: "13",
            label: "神经内科特需病房",
          },
          {
            code: "14",
            label: "神内头痛组",
          },
          {
            code: "15",
            label: "神内头晕组",
          },
          {
            code: "16",
            label: "神内心脑血管病组",
          },
          {
            code: "17",
            label: "神内神经遗传-代谢病组",
          },
          {
            code: "18",
            label: "神内中西医结合组",
          },
          {
            code: "19",
            label: "神内中西医结合2组",
          },
          {
            code: "20",
            label: "神内血管重症组",
          },
          {
            code: "21",
            label: "神内综合重症组",
          },
          {
            code: "22",
            label: "神内卒中抢救中心",
          },
          {
            code: "23",
            label: "神经变性病与认知障碍1组",
          },
          {
            code: "24",
            label: "神经变性病与认知障碍2组",
          },
          {
            code: "25",
            label: "神经变性病与认知障碍3组",
          },
          {
            code: "26",
            label: "神经变性病与认知障碍4组",
          },
          {
            code: "27",
            label: "神经内科",
          },
        ],
      },
    ],
  },
  {
    fieldCode: "Q3",
    title: "差错或纠纷(填写两个数字，默认0)",
    type: "group",
    children: [
      {
        fieldCode: "Q3.1",
        title: "科室口径诊疗过错且赔付例数",
        type: "number",
        defaultValue: "0",
      },
      {
        fieldCode: "Q3.2",
        title: "纠纷例数",
        type: "number",
        defaultValue: "0",
      },
    ],
  },
  {
    fieldCode: "Q4",
    title: "擅长病种【填5项疾病，至少2项是疑难/危重/罕见】",
    type: "group",
    children: [
      {
        fieldCode: "Q4.1",
        title: "擅长病种1描述",
        type: "text_with_radio",
        textFieldPlaceholder: "请输入擅长病种描述",
        radioTitle: "是否是疑难/危重/罕见",
        radioCodes: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q4.2",
        title: "擅长病种2描述",
        type: "text_with_radio",
        textFieldPlaceholder: "请输入擅长病种描述",
        radioTitle: "是否是疑难/危重/罕见",
        radioCodes: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q4.3",
        title: "擅长病种3描述",
        type: "text_with_radio",
        textFieldPlaceholder: "请输入擅长病种描述",
        radioTitle: "是否是疑难/危重/罕见",
        radioCodes: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q4.4",
        title: "擅长病种4描述",
        type: "text_with_radio",
        textFieldPlaceholder: "请输入擅长病种描述",
        radioTitle: "是否是疑难/危重/罕见",
        radioCodes: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q4.5",
        title: "擅长病种5描述",
        type: "text_with_radio",
        textFieldPlaceholder: "请输入擅长病种描述",
        radioTitle: "是否是疑难/危重/罕见",
        radioCodes: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
    ],
  },
  {
    fieldCode: "Q5",
    title: "开展项目【填3项满分包括评估、检查、操作或手术】",
    type: "group",
    children: [
      {
        fieldCode: "Q5.1",
        title: "开展项目1描述",
        type: "text",
      },
      {
        fieldCode: "Q5.2",
        title: "开展项目2描述",
        type: "text",
      },
      {
        fieldCode: "Q5.3",
        title: "开展项目3描述",
        type: "text",
      },
    ],
  },
  {
    fieldCode: "Q6",
    title: "新技术、新业务开展情况",
    type: "group",
    children: [
      {
        fieldCode: "Q6.1",
        title: "申报获准开展项目数",
        type: "number",
      },
      {
        fieldCode: "Q6.2",
        title: "获奖情况（单选）",
        type: "single_choice",
        codegroup: [
          {
            code: "0",
            label: "获得年终新技术、新业务评奖一等奖",
          },
          {
            code: "1",
            label: "获得年终新技术、新业务评奖二等奖",
          },
          {
            code: "2",
            label: "获得年终新技术、新业务评奖三等奖",
          },
          {
            code: "3",
            label: "未获奖",
          },
        ],
      },
    ],
  },
  {
    fieldCode: "Q7",
    title: "受邀会诊",
    type: "group",
    children: [
      {
        fieldCode: "Q7.1",
        title: "是否有完成医务处派出院外重大会诊任务（单选）",
        type: "single_choice_with_text",
        hasDescription: true,
        descriptionLabel: "描述（派遣人 + 时间）",
        descriptionTriggerCode: "1",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q7.2",
        title:
          "是否完成正常完成全年院内科间会诊【病房岗位三线值班/院总协调专业组派出/参加会诊中心排班】（单选）",
        type: "single_choice",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q7.3",
        title: "医务处组织院内的危重孕产妇、重大抢救会诊任务（单选）",
        type: "single_choice_with_text",
        hasDescription: true,
        descriptionLabel: "描述（科室 + 时间）",
        descriptionTriggerCode: "1",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q7.4",
        title: "医务处外派的危重孕产妇、重大抢救会诊任务（单选）",
        type: "single_choice_with_text",
        hasDescription: true,
        descriptionLabel: "描述（医院 + 时间）",
        descriptionTriggerCode: "1",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
    ],
  },
  {
    fieldCode: "Q8",
    title: "医疗保障任务",
    type: "single_choice_with_text",
    description:
      "当年是否顺利完成医疗保障任务【医院或上级指派的重大医疗任务】（单选）",
    hasDescription: true,
    descriptionLabel: "描述（派遣人 + 时间）",
    descriptionTriggerCode: "1",
    codegroup: [
      {
        code: "0",
        label: "否",
      },
      {
        code: "1",
        label: "是",
      },
    ],
  },
  {
    fieldCode: "Q9",
    title: "援外支边（单选）",
    type: "single_choice",
    codegroup: [
      {
        code: "0",
        label: "承担并完成三月及以上的（自然年内）下乡、区域中心外派",
      },
      {
        code: "1",
        label: "承担并完成六月及以上的支边、援藏援疆援青或援外任务",
      },
      {
        code: "2",
        label: "无上述情况",
      },
    ],
  },
  {
    fieldCode: "Q10",
    title: "急诊工作【以结束月计算】（单选）",
    type: "single_choice",
    codegroup: [
      {
        code: "0",
        label: "完成神内急诊一线工作一轮（4个月）",
      },
      {
        code: "1",
        label: "完成神内急诊一线工作两轮（8个月）",
      },
      {
        code: "2",
        label: "未参加急诊工作，或当年未满一轮（4个月）",
      },
    ],
  },
  {
    fieldCode: "Q11",
    title: "获奖及评优",
    type: "group",
    children: [
      {
        fieldCode: "Q11.1",
        title: "是否获院级以上个人临床相关获奖或表彰（单选）",
        type: "single_choice_with_text",
        hasDescription: true,
        descriptionLabel: "描述（备注奖项）",
        descriptionTriggerCode: "1",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
      {
        fieldCode: "Q11.2",
        title:
          "是否是完成CMI等目标值的主诊组主诊、副主诊及住院医师【轮转3月以上】（单选）",
        type: "single_choice_with_text",
        hasDescription: true,
        descriptionLabel: "描述（科室病房）",
        descriptionTriggerCode: "1",
        codegroup: [
          {
            code: "0",
            label: "否",
          },
          {
            code: "1",
            label: "是",
          },
        ],
      },
    ],
  },
  {
    fieldCode: "Q12",
    title: "参与临床管理工作（单选）",
    type: "single_choice_with_text",
    hasDescription: true,
    descriptionLabel: "备注 + 岗位信息",
    descriptionTriggerCode: "1",
    codegroup: [
      {
        code: "0",
        label:
          "承担年度科室临床管理任务或关键岗位（相关科领导、门诊/急诊组长、重症专业组组长、住院总医师、电生理专业组组长、科秘、进修医师负责人、临床助理）",
      },
      {
        code: "1",
        label: "承担临床管理工作岗位",
      },
      {
        code: "2",
        label: "未承担临床管理工作岗位",
      },
    ],
  },
];
