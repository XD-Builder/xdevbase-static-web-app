// TODO: Fix messages
const messages = {
  login: {
    title: "Log in",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButton: "Log in",
    forgotPasswordButton: "Forgot your password?",
    registerButton: "Register",
  },
  register: {
    title: "Register",
    submitButton: "Register",
    loginButton: "Log in",
    checkYourEmailForConfirmation: "Check your email for confirmation",
  },
  resetPassword: {
    title: "Reset Password",
    emailLabel: "Email",
    resetButton: "Reset",
    checkYourEmailToReset: "Check your email to reset your password",
    checkYourEmail: "Check your email",
    passwordChangedSuccessfully: "Password changed successfully",
  },
  commonValidation: {
    required: "This field is required",
    email: "This field must be a valid email address",
    passwordConfirm: "Passwords must match",
  },
  common: {
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordConfirmLabel: "Confirm password",
    backButton: "Back",
    noTranslation: "No translation",
    passwordSpecialCharacterValidation:
      "Password must contain a special character",
    passwordLengthValidation: "Password must be at least 8 characters long",
    passwordUppercaseValidation: "Password must contain an uppercase letter",
    passwordLowercaseValidation: "Password must contain a lowercase letter",
    passwordNumberValidation: "Password must contain a number",
    passwordConfirmationValidation: "Passwords must match",
    confirmYourEmail: "Confirm your email",
  },
  dashboard: {
    title: "Dashboard",
    headingText: "Create or view your properties dashboards and metrics",
    createDashboard: "Create Dashboard",
    noDashboardCreated: "No Dashboards Created",
    noDashboardCreatedDescription: "You haven't created any dashboard yet",
  },
  dashboardSidenav: {
    menus: "Menu",
    billing: "Billing",
    affiliates: "Affiliates",
    settings: "Settings",
  },
  settingsPage: {
    headerDescription: "Manage your account settings",
  },
  createMenu: {
    header: "Create",
    title: "Create your Restaurant",
  },
  editMenu: {
    header: "Edit",
    title: "Edit your Restaurant",
  },
  menuOperations: {
    editMenu: "Edit Menu",
    deleteMenu: "Delete Menu",
    areYouSureYouWantToDeleteThisMenu:
      "Are you sure you want to delete this menu?",
    itCannotBeUndone: "This operation cannot be undone",
    cancel: "Cancel",
    delete: "Delete",
    open: "Open",
    menuDeleted: "Menu Deleted",
    menuDeletedDescription: "Your menu has been deleted successfully",
  },
  addCategoryButton: {
    addCategory: "Add Category",
    editCategory: "Edit Category",
    edit: "Edit",
  },
  addDishButton: {
    addDish: "Add Dish",
    editDish: "Edit Dish",
    edit: "Edit",
  },
  categoryForm: {
    save: "Save",
  },
  deleteDishButton: {
    delete: "Delete",
    deleteDish: "Delete Dish",
    areYouSureYouWantToDeleteThisDish:
      "Are you sure you want to delete this dish",
    cancel: "Cancel",
  },
  deleteVariantButton: {
    delete: "Delete",
    deleteVariant: "Delete Variant",
    areYouSureYouWantToDeleteThisVariant:
      "Are you sure you want to delete this variant",
    cancel: "Cancel",
  },
  dishForm: {
    descriptionPlaceholder: "Ruskie dumplings with fried onions and bacon.",
    dishName: "Dish Name",
    dishDescription: "Dish Description",
    priceInPLN: "Price (PLN)",
    dishPhoto: "Dish Photo",
    categoryLabel: "Category",
    macronutrientsButton: "Macronutrients",
    calories: "Calories",
    protein: "Protein (g)",
    carbs: "Carbs (g)",
    fat: "Fat (g)",
    weight: "Weight (g)",
    macronutrientsDescription:
      "These fields are optional. Users would appreciate it!",
    tagsLabel: "Tags",
  },
  menuForm: {
    save: "Save",
    menuLogoImage: "Restaurant Logo",
    backgroundImage: "Restaurant Background Image",
    nameOfRestaurant: "Restaurant Name",
    city: "City",
    streetAndNumber: "Street and Building Number",
    phoneNumber: "Phone Number",
  },
  userAccountNav: {
    dashboard: "Dashboard",
    settings: "Settings",
    billing: "Billing",
    logout: "Logout",
  },
  navbar: {
    login: "Login",
    inbox: "Inbox",
    properties: "Properties",
    automation: "Automation",
    marketplace: "Marketplace",
  },
  menuCreator: {
    changeLanguage: "Change Language",
    noDishes: "No Dishes",
    noDishesDescription:
      "You haven't created any dishes for this category yet.",
    AddDishesToCategory: "Add Dishes to Category",
    noCategory: "No Category",
    dishesList: "Dish List",
    categoryNotTranslated: "Category not translated",
    dishNotTranslated:
      "Dish not translated. Please add translations for all languages before publishing the menu.",
    variantsNotTranslated: "One of the variants is not translated",
    variantNotTranslated: "Variant is not translated",
    variants: "Variants",
  },
  menuPdfGenerator: {
    menu: "MENU",
    generatePDFToPrint: "Generate PDF for Printing",
  },
  languageSelector: {
    saved: "Saved",
    changesSaved: "Changes have been saved",
    save: "Save",
  },
  sidebar: {
    menu: "Menu",
    restaurant: "Restaurant",
    QRMenu: "QR Menu",
    edit: "Edit",
  },
  restaurantDashboard: {
    menuNotFound: "Menu Not Found",
    restaurant: "Restaurant",
    publish: "Publish",
    unpublish: "Unpublish",
    manageMenu: "Manage Menu Card",
    settings: "Settings",
    availableLanguages: "Available Menu Languages:",
    yourQRCode: "Your QR Code",
    menuPreview: "Menu Preview",

    menuPublished: "published",
    menuNotPublished: "not published",
    defaultLanguage: "Default menu language",
    upgradeAccount: "Subscribe to a plan to activate your menu",
    menuUnpublishedNotification: "Menu has been unpublished",
    menuUnpublishedNotificationDescription:
      "Your menu has been unpublished. Users will not be able to see your menu.",
    menuPublishedNotification: "Menu has been published",
    menuPublishedNotificationDescription:
      "Your menu has been published. Users will be able to see your menu.",
  },
  languageToggle: {
    toggleLanguage: "Toggle Language",
  },
  imageUploadInput: {
    restore: "Restore",
  },
  cropImageModal: {
    adjustImage: "Adjust Image",
    close: "Close",
  },
  colorModeToggle: {
    toggleTheme: "Toggle Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  landingPage: {
    backgroundAlt: "Landing background image",
    section1: {
      header: "Real Estate Rental & Management",
      headerHighlight: "MarketPlace",
      headerSuffix: "For Everyone",
      description:
        "Set up and manage your home, townhouse or apartment for free! Only pay for the services you need.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      featuredOn: "Featured on",
      productHunt: "Product Hunt",
      heroImageAlt: "Hero image",
      credit: "Made by",
    },
    section2: {
      showcaseAlt: "Showcase image",
      featuresTitle: "Our Innovative Solution...",
      businessSuccess: "Your Investment Success!",
      discoverWhy:
        "Discover why our platform is perfect for your real estate business.",
      heading1: "Create and automate your",
      heading1Suffix: "property management",
      heading1Description:
        "Create properties under our management app, use our automation tools, invite your teams or hire someone from our marketplace to streamline your business.",
      heading2: "Track your finance and get paid ",
      heading2Suffix: "on time",
      heading2Description:
        "Our payment processing system will facilitate transactions seamless so you can get paid on time. We are working to provide beautifully designed dashboards and invoices for tax purposes.",
    },
    pricing: {
      toggle: {
        monthly: "Monthly",
        annually: "Yearly",
      },
      basic: {
        name: "Basic",
        description: "Automate real estate management.",
        feature1: "Create and manage 1 property with automation",
        feature2: "Connect up to three managers to your property",
        feature3: "Use Free Automation and Management Marketplace",
        extraBenefits: "Basic plan includes",
      },
      pro: {
        name: "Pro",
        price: "$5.99",
        yearlyPrice: "$49.99",
        description:
          "Enhance your real estate management ",
        feature1: "Create and manage up to 5 properties with automation",
        feature2: "Connect up to 10 managers to your property",
        feature3: "24/7 Customer Support",
        extraBenefits: "Everything in Basic plan, plus",
      },
      enterprise: {
        name: "Enterprise",
        price: "Contact Us",
        yearlyPrice: "Contact Us",
        description:
          "Manage all your properties with ease",
        feature1: "Higher limit on properties and managers",
        feature2: "AI powered analytics and insights",
        feature3: "Dedicated 24/7 support",
        extraBenefits: "Everything in Pro plan, plus",
      },
    },
  },
  defaultLanguageSelector: {
    changeSavedTitle: "Saved",
    changeSavedDescription: "Changes have been saved",
    save: "Save",
  },
  notFound: {
    title: "Page not found",
    goBack: "Go back to main page",
  },
  errorPage: {
    title: "An Error Occurred",
    description: "We apologize! If the problem persists, please contact us at",
    tryAgain: "Try Again",
    goBack: "Go back to the main page",
  },
  tags: {
    keto: "Keto",
    vegan: "Vegan",
    vegetarian: "Vegetarian",
    glutenFree: "Gluten Free",
    lactoseFree: "Lactose Free",
    lowCarb: "Low Carb",
    highProtein: "High Protein",
    lowFat: "Low Fat",
    highFiber: "High Fiber",
    sugarFree: "Sugar Free",
    organic: "Organic",
  },
  dishVariantForm: {
    variantName: "Variant Name",
    variantDescription: "Variant Description",
    priceInPLN: "Price (PLN)",
    variantNamePlaceholder: "Combo box",
    variantDescriptionPlaceholder: "Combo box includes fries and a drink.",
  },
  addDishVariantButton: {
    edit: "Edit",
    addVariant: "Add Variant",
    editVariant: "Edit Variant",
  },
  globalMetadata: {
    title: "XDevBase",
    description:
      "Set up your home management system and start managing your home with ease.",
    keywords:
      "rental management, real estate, home management, home automation software, home automation solution",
    category: "Restaurant",
    openGraph: {
      title: "XDevBase",
      description:
        "Set up your home management system and start managing your home with ease.",
      type: "website",
      siteName: "XDevBase - Set up your home management system",
      locale: "en",
    },
    twitter: {
      title: "XDevBase",
      description:
        "Set up your home management system and start managing your home with ease.",
    },
  },
  googleReviewGuideModal: {
    title: "How to add a Google review link to your menu?",
    step: "Step {step}",
    description:
      "NA",
    googleMaps: {
      name: "Google Maps",
      step1: "1. Find your restaurant on Google Maps",
      step2: "2. Click on 'Write a review'",
      step3:
        "3. Copy the link from the address bar and paste it in the 'Google Review Link' field in the 'Restaurant' tab of the menu editor",
    },
    googleDashboard: {
      name: "Google My Business Dashboard",
      step1: "Go to Google My Business dashboard",
      step2:
        "If you have multiple locations, select the location you want to add a review link to.",
      step3: "Click on 'Home' in the left menu",
      step4: "Click on 'Get more reviews'",
      step5: "Copy the link from the address bar. ",
      step6:
        "Paste the link in the 'Google Review Link' field in the 'Restaurant' tab of the menu editor",
    },
    ready: "Ready!",
  },
  socialMediaForm: {
    title: "Social Media",
    facebookPlaceholder: "Facebook Link",
    instagramPlaceholder: "Instagram Link",
    googlePlaceholder: "Google Review Link",
    save: "Save",
    description:
      "Add links to your social media to increase the reach of your restaurant.",
    updatedToastTitle: "Social media links updated",
    updatedToastDescription:
      "Your social media links have been updated successfully",
  },
  toastCommon: {
    errorTitle: "Error",
    errorDescription: "Something went wrong",
  },
  menuPrintCreator: {
    title: "QR Code Card Creator",
    socialMediaLabel: "Social Media",
    socialMediaDescription:
      "Add your social media handles to your menu to increase your followers.",
    instagramHandlePlaceholder: "Instagram Handle",
    facebookHandlePlaceholder: "Facebook Handle",
    wifiPasswordLabel: "Wifi Password",
    wifiPasswordDescription:
      "If you have a wifi password, add it to your menu to make it easier for your customers to connect.",
    wifiPasswordPlaceholder: "Your wifi password",
    restaurantNameLabel: "Add Restaurant Name",
    qrCodeEnabledLabel: "Include Logo in QR Code",
  },
  billing: {
    heading: "Billing",
    description: "Manage your billing information and subscription plan.",
    cancel: "Cancel",
    areYouSureYouWantToCancelSubscription:
      "Are you sure you want to cancel your subscription?",
    sadToSeeYouGo:
      "We are sad to see you go :(, if you have any feedback that can help us improve, please write to us at: support@xdevbase.com",
    continue: "Continue",
    subscriptionPlan: "Subscription Plan",
    subscriptionDescription:
      "Allowing customers ",
    youAreCurrentlyOn: {
      firstPart: "Your plan: ",
      premium: "premium",
      basic: "basic",
    },
    customerPortal: {
      goTo: "Go to your customer portal to manage your subscription.",
      description:
        "View payment history, download invoices, and manage subscriptions and payment methods.",
      title: "Customer portal",
    },
  },
  contactUsCard: {
    title: `Set up your properties or join a property group now.`,
    subtitle:
      "We offer a comprehensive solution for streamlined real estate rental management, providing a one-stop shop experience. Additionally, we're developing a marketplace to cater to all your property needs. Our dedicated team is available to assist with any inquiries you may have. Don't hesitate to get in touch with us.",
    contactUs: "Contact us:",
  },
  affiliates: {
    title: "Affiliates",
    description: "Manage your affiliates system",
    comingSoon: "Coming soon!",
  },
  notifications: {
    menuNotFound: "Menu not found",
    subscriptionCancelled: "Subscription cancelled",
    subscriptionCancelledDescription:
      "Feel free to give us feedback on how can we improve! support@xdevbase.com",
    somethingWentWrong: "Something went wrong.",
    tryAgainLater: "Try again later.",
  },
};

export default messages;
