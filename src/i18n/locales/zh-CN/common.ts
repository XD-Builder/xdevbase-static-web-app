import { type Resources } from "@/i18n/locales/types";

const messages: Resources["common"] = {
  // Landing
  landingPage: {
    backgroundAlt: "首页背景图",
    section1: {
      header: "房地产租赁和管理",
      headerHighlight: "市场平台",
      headerSuffix: "适合每个人",
      description:
        "免费建立和管理您的家庭、联排别墅或公寓！只为您需要的服务付费。",
      getStarted: "开始使用",
      learnMore: "了解更多",
      featuredOn: "推荐于",
      productHunt: "产品猎手",
      heroImageAlt: "英雄图片",
      credit: "制作人",
    },
    section2: {
      showcaseAlt: "展示图片",
      featuresTitle: "我们的创新解决方案...",
      businessSuccess: "您的投资成功！",
      discoverWhy: "发现为什么我们的平台非常适合您的房地产业务。",
      heading1: "创建和自动化您的",
      heading1Suffix: "物业管理",
      heading1Description:
        "在我们的管理应用程序下创建属性，使用我们的自动化工具，邀请您的团队或从我们的市场平台聘请某人，以使您的业务变得高效。",
      heading2: "跟踪您的财务并按时收款",
      heading2Suffix: "",
      heading2Description:
        "我们的支付处理系统将使交易无缝进行，让您及时收到款项。我们致力于提供设计精美的仪表板和发票，以备税务目的。",
    },
    pricing: {
      toggle: {
        monthly: "每月",
        annually: "每年",
      },
      basic: {
        name: "基础版",
        description: "自动化房地产管理。",
        feature1: "使用自动化创建和管理1个物业",
        feature2: "将最多三名经理连接到您的物业",
        feature3: "使用免费自动化和管理市场",
        extraBenefits: "基础计划包括",
      },
      pro: {
        name: "专业版",
        price: "$5.99",
        yearlyPrice: "$49.99",
        description: "提升您的房地产管理",
        feature1: "使用自动化创建和管理最多5个物业",
        feature2: "将最多10名经理连接到您的物业",
        feature3: "24/7客户支持",
        extraBenefits: "基础版中的所有功能，以及",
      },
      enterprise: {
        name: "企业版",
        price: "联系我们",
        yearlyPrice: "联系我们",
        description: "轻松管理您的所有属性",
        feature1: "物业和经理的限额更高",
        feature2: "AI 动力分析和见解",
        feature3: "专门的24/7支持",
        extraBenefits: "专业版中的所有功能，以及",
      },
    },
  },
  // Logins
  login: {
    title: "登录",
    emailLabel: "邮箱",
    passwordLabel: "密码",
    submitButton: "登录",
    forgotPasswordButton: "忘记密码？",
    registerButton: "注册",
  },
  register: {
    title: "注册",
    submitButton: "注册",
    loginButton: "登录",
    checkYourEmailForConfirmation: "请查看您的电子邮件以确认",
  },
  resetPassword: {
    title: "重置密码",
    emailLabel: "邮箱",
    resetButton: "重置",
    checkYourEmailToReset: "请查看您的电子邮件以重置您的密码",
    checkYourEmail: "请查看您的电子邮件",
    passwordChangedSuccessfully: "密码已成功更改",
  },

  // Shared
  common: {
    avatarLabel: "头像",
    userNameLabel: "用户名",
    fullNameLabel: "全名",
    avatarUrlLabel: "头像URL",
    emailLabel: "电子邮件",
    passwordLabel: "密码",
    passwordConfirmLabel: "确认密码",
    submitButton: "提交",
    address1Label: "地址",
    address2Label: "地址行2",
    cityLabel: "城市",
    stateLabel: "州",
    zipCodeLabel: "邮政编码",
    countryLabel: "国家",
    resetButton: "重置",
    continueButton: "继续",
    backButton: "返回",
    noTranslation: "无翻译",
    passwordSpecialCharacterValidation: "密码必须包含特殊字符",
    passwordLengthValidation: "密码长度必须至少为8个字符",
    passwordUppercaseValidation: "密码必须包含大写字母",
    passwordLowercaseValidation: "密码必须包含小写字母",
    passwordNumberValidation: "密码必须包含数字",
    passwordConfirmationValidation: "密码必须匹配",
    confirmYourEmail: "确认你的电子邮件",
    zipCodeValidation: "邮政编码必须是有效的美国邮政编码",
  },
  commonValidation: {
    required: "此字段为必填项",
    email: "此字段必须是有效的电子邮件地址",
    passwordConfirm: "密码必须匹配",
    userMustBeLoggedIn: "用户未登录",
  },

  // ====== Authenticated Pages ========
  // Side Nav
  dashboardSidenav: {
    affiliates: "附属机构",
    settings: "设置",
    profile: "个人资料",
    billing: "账单",
    account: "账户",
  },
  userAccountNav: {
    dashboard: "仪表板",
    settings: "设置",
    billing: "账单",
    logout: "退出登录",
  },

  // Main Nav
  navbar: {
    login: "登录",
    inbox: "收件箱",
    properties: "房产",
    automation: "自动化",
    marketplace: "市场",
  },

  // Update Profile Page
  updateProfile: {
    title: "更新个人资料",
    description: "更新您的公开个人资料信息",
    profileUpdatedSuccessfully: "个人资料更新成功",
  },
  profileValidation: {
    usernameLengthValidation: "用户名必须在6到20个字符之间",
    usernameAlphaNumericValidation: "用户名必须为字母数字",
    avatarUrlValidation: "头像URL必须是有效的URL",
    fullNameLengthValidation: "全名必须在6到40个字符之间",
    avatarFileSizeValidation: "头像文件大小必须小于1MB",
    avatarFileTypeValidation:
      "头像文件类型必须是 JPG、JPEG、PNG 或 WEBP 扩展名",
  },
  trpcError: {
    usernameAlreadyExists: "用户名已存在",
    invalidGeocodingResponse: "地理编码服务无效响应",
  },

  // Properties Page
  propertiesPage: {
    createProperties: "创建属性",
    enterAddress: "自动填写地址并通过小地图验证。",
    properties: "属性",
    propertiesList: "属性列表",
    propertiesListDescription: "属性列表",
    propertiesListEmpty: "未找到属性",
    propertiesListEmptyDescription: "您还没有创建任何属性",
    propertyDescriptionLengthExceeded: "您已超过属性描述的长度限制40,000",
  },
  address: {
    propertyName: "属性名称",
    propertyDescription: "属性描述",
    addressLine1: "地址",
    addressLine2: "地址行2",
    city: "城市",
    state: "州",
    zip: "邮政编码",
    country: "国家",
  },

  // Dashboard Page
  dashboard: {
    title: "仪表板",
    headingText: "创建或查看您的属性仪表板和指标",
    createDashboard: "创建仪表板",
    noDashboardCreated: "未创建仪表板",
    noDashboardCreatedDescription: "您还没有创建任何仪表板",
  },
  settingsPage: {
    headerDescription: "管理您的账户设置",
  },
  profilePage: {
    headerDescription: "管理您的个人资料设置",
  },
  languageSelector: {
    saved: "已保存",
    changesSaved: "更改已保存",
    save: "保存",
  },
  sidebar: {
    menu: "菜单",
    restaurant: "餐厅",
    QRMenu: "QR菜单",
    edit: "编辑",
  },
  languageToggle: {
    toggleLanguage: "切换语言",
  },
  imageUploadInput: {
    restore: "恢复",
  },
  cropImageModal: {
    adjustImage: "调整图像",
    close: "关闭",
  },
  colorModeToggle: {
    toggleTheme: "切换主题",
    light: "明亮",
    dark: "深色",
    system: "系统",
  },
  defaultLanguageSelector: {
    changeSavedTitle: "已保存",
    changeSavedDescription: "更改已保存",
    save: "保存",
  },
  notFound: {
    title: "页面未找到",
    goBack: "返回主页",
  },
  errorPage: {
    title: "出现错误",
    description: "我们很抱歉！如果问题仍然存在，请通过以下联系方式与我们联系",
    tryAgain: "重试",
    goBack: "返回主页",
  },
  tags: {
    keto: "生酮",
    vegan: "纯素",
    vegetarian: "素食",
    glutenFree: "无麸质",
    lactoseFree: "无乳糖",
    lowCarb: "低碳水化合物",
    highProtein: "高蛋白",
    lowFat: "低脂",
    highFiber: "高纤维",
    sugarFree: "无糖",
    organic: "有机",
  },
  globalMetadata: {
    title: "XDevBase",
    description: "设置您的家庭管理系统，轻松管理您的家。",
    keywords: "租赁管理，房地产，家庭管理，家庭自动化软件，家庭自动化解决方案",
    category: "餐厅",
    openGraph: {
      title: "XDevBase",
      description: "设置您的家庭管理系统，轻松管理您的家。",
      type: "website",
      siteName: "XDevBase - 设置您的家庭管理系统",
      locale: "zh-CN",
    },
    twitter: {
      title: "XDevBase",
      description: "设置您的家庭管理系统，轻松管理您的家。",
    },
  },
  socialMediaForm: {
    title: "社交媒体",
    facebookPlaceholder: "Facebook 链接",
    instagramPlaceholder: "Instagram 链接",
    googlePlaceholder: "Google 评论链接",
    save: "保存",
    description: "添加社交媒体链接以扩大您餐厅的影响力",
    updatedToastTitle: "社交媒体链接已更新",
    updatedToastDescription: "您的社交媒体链接已成功更新",
  },
  toastCommon: {
    successTitle: "成功",
    successDescription: "您的更改已保存",
    errorTitle: "错误",
    errorDescription: "出了些问题",
    errorAddressAutofill: "请自动填写地址",
    errorMissingAddressFields: "请填写所有地址字段",
  },
  billing: {
    heading: "账单",
    description: "管理您的账单信息和订阅计划",
    cancel: "取消",
    areYouSureYouWantToCancelSubscription: "您确定要取消订阅吗？",
    sadToSeeYouGo:
      "很遗憾看到您离开 :( 如果您有任何有助于我们改进的反馈，请发送邮件至：support@xdevbase.com",
    continue: "继续",
    subscriptionPlan: "订阅计划",
    subscriptionDescription: "为客户提供在线菜单和可扫描的 QR 码",
    youAreCurrentlyOn: {
      firstPart: "您的计划：",
      premium: "高级",
      basic: "基础",
    },
    customerPortal: {
      goTo: "转到您的客户门户以管理订阅",
      description: "查看付款记录、下载发票，并管理订阅和付款方式",
      title: "客户门户",
    },
  },
  contactUsCard: {
    title: `立即设置您的物业或加入物业组。`,
    subtitle:
      "我们提供全面的解决方案，以简化房地产租赁管理，提供一站式购物体验。此外，我们正在开发一个市场，以满足您所有的物业需求。我们的专业团队随时准备协助您解答任何疑问。请随时与我们联系。",
    contactUs: "联系我们：",
  },
  affiliates: {
    title: "推广联盟",
    description: "管理您的推广联盟系统",
    comingSoon: "即将推出！",
  },
  notifications: {
    menuNotFound: "未找到菜单",
    subscriptionCancelled: "订阅已取消",
    subscriptionCancelledDescription:
      "欢迎向我们提供如何改进的反馈！support@xdevbase.com",
    somethingWentWrong: "发生了错误",
    tryAgainLater: "稍后重试",
  },
};

export default messages;
