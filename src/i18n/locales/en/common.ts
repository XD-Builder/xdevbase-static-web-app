const messages = {
  // Landing
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
        description: "Enhance your real estate management ",
        feature1: "Create and manage up to 5 properties with automation",
        feature2: "Connect up to 10 managers to your property",
        feature3: "24/7 Customer Support",
        extraBenefits: "Everything in Basic plan, plus",
      },
      enterprise: {
        name: "Enterprise",
        price: "Contact Us",
        yearlyPrice: "Contact Us",
        description: "Manage all your properties with ease",
        feature1: "Higher limit on properties and managers",
        feature2: "AI powered analytics and insights",
        feature3: "Dedicated 24/7 support",
        extraBenefits: "Everything in Pro plan, plus",
      },
    },
  },

  // Logins
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

  // Shared
  common: {
    avatarLabel: "Avatar",
    userNameLabel: "Username",
    fullNameLabel: "Full Name",
    avatarUrlLabel: "Avatar URL",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordConfirmLabel: "Confirm password",
    submitButton: "Submit",
    address1Label: "Address",
    address2Label: "Address Line 2",
    cityLabel: "City",
    stateLabel: "State",
    zipCodeLabel: "Zip Code",
    countryLabel: "Country",
    resetButton: "Reset",
    continueButton: "Continue",
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
    zipCodeValidation: "Zip code must be a valid US zip code",
  },
  commonValidation: {
    required: "This field is required",
    email: "This field must be a valid email address",
    passwordConfirm: "Passwords must match",
    userMustBeLoggedIn: "User is not logged in.",
  },

  // ====== Authenticated Pages ========
  // Side Nav
  dashboardSidenav: {
    affiliates: "Affiliates",
    settings: "Settings",
    profile: "Profile",
    billing: "Billing",
    account: "Account",
  },
  userAccountNav: {
    dashboard: "Dashboard",
    settings: "Settings",
    billing: "Billing",
    logout: "Logout",
  },

  // Main Nav
  navbar: {
    login: "Login",
    inbox: "Inbox",
    properties: "Properties",
    automation: "Automation",
    marketplace: "Marketplace",
  },

  // Update Profile Page
  updateProfile: {
    title: "Update Profile",
    description: "Update your public profile information",
    profileUpdatedSuccessfully: "Profile updated successfully",
  },
  profileValidation: {
    usernameLengthValidation: "Username must be between 6 and 20 characters",
    usernameAlphaNumericValidation: "Username must be alphanumeric",
    avatarUrlValidation: "Avatar URL must be a valid URL",
    fullNameLengthValidation: "Full name must be between 6 and 40 characters",
    avatarFileSizeValidation: "Avatar file size must be less than 5 MB",
    avatarFileTypeValidation:
      "Avatar file type must be JPG, JPEG, PNG or WEBP extensions",
  },
  trpcError: {
    usernameAlreadyExists: "Username already exists",
    invalidGeocodingResponse: "Invalid response from geocoding service",
  },

  // Properties Page
  propertiesPage: {
    createProperties: "Create Properties",
    enterAddress: "Autofill address and verify via the minimap.",
    properties: "Properties",
    propertiesList: "Properties List",
    propertiesListDescription: "List of properties",
    propertiesListEmpty: "No properties found",
    propertiesListEmptyDescription: "You haven't created any properties yet",
    propertyDescriptionLengthExceeded:
      "You have exceeded property description length of 40,000",
  },
  address: {
    propertyName: "Property Name",
    propertyNamePlaceHolder: "A memorable name for your property",
    propertyDescription: "Property Description",
    propertyDescriptionPlaceHolder:
      "A descriptive statement about your property to allow others to view and share.",
    addressLine1: "Address",
    addressLine2: "Address Line 2",
    city: "City",
    state: "State",
    zip: "Zip",
    country: "Country",
  },

  // Dashboard Page
  dashboard: {
    title: "Dashboard",
    headingText: "Create or view your properties dashboards and metrics",
    createDashboard: "Create Dashboard",
    noDashboardCreated: "No Dashboards Created",
    noDashboardCreatedDescription: "You haven't created any dashboard yet",
  },
  settingsPage: {
    headerDescription: "Manage your account settings",
  },
  profilePage: {
    headerDescription: "Manage your profile settings",
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
    successTitle: "Success",
    successDescription: "Your changes have been saved",
    errorTitle: "Error",
    errorDescription: "Something went wrong",
    errorAddressAutofill: "Please autofill the address",
    errorMissingAddressFields: "Please fill in all address fields",
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
    subscriptionDescription: "Allowing customers ",
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
