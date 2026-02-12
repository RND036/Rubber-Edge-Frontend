// Translation strings for the app
export type Language = 'en' | 'si' | 'ta';

export interface Translations {
  // Common
  common: {
    continue: string;
    cancel: string;
    logout: string;
    delete: string;
    discard: string;
    clear: string;
    success: string;
    error: string;
    ok: string;
    yes: string;
    no: string;
    or: string;
    loading: string;
    save: string;
    submit: string;
    back: string;
    next: string;
    skip: string;
    done: string;
    search: string;
    noData: string;
    retry: string;
    seeAll: string;
    readMore: string;
    pleaseEnter: string;
  };
  
  // Language Selection Screen
  languageSelection: {
    title: string;
    subtitle: string;
    english: string;
    sinhala: string;
    tamil: string;
  };

  // Onboarding
  onboarding: {
    title1: string;
    desc1: string;
    title2: string;
    desc2: string;
    title3: string;
    desc3: string;
    skipNow: string;
    getStarted: string;
  };

  // Tabs
  tabs: {
    home: string;
    diagnose: string;
    support: string;
    settings: string;
    welcome: string;
  };

  // Home Screen
  home: {
    loadingCarousel: string;
    recentEvents: string;
    noEvents: string;
    createEvent: string;
    latestNews: string;
    noNews: string;
    cancelled: string;
    ended: string;
  };

  // Create Event Screen
  createEvent: {
    headerTitle: string;
    eventImage: string;
    eventImageOptional: string;
    eventTitle: string;
    eventTitleRequired: string;
    eventTitlePlaceholder: string;
    description: string;
    descriptionRequired: string;
    descriptionPlaceholder: string;
    eventDate: string;
    eventDateRequired: string;
    eventTime: string;
    eventTimeRequired: string;
    location: string;
    locationOptional: string;
    locationPlaceholder: string;
    contactNumber: string;
    contactNumberOptional: string;
    contactNumberPlaceholder: string;
    maxParticipants: string;
    maxParticipantsOptional: string;
    maxParticipantsPlaceholder: string;
    eventStatus: string;
    eventIsActive: string;
    activeEventsVisible: string;
    eventIsCancelled: string;
    cancelledEventsCannot: string;
    createEventButton: string;
    errorTitle: string;
    enterEventTitle: string;
    enterEventDescription: string;
    eventDateMustBeFuture: string;
    invalidStatusTitle: string;
    invalidStatusMessage: string;
    conflictingStatusTitle: string;
    conflictingStatusMessage: string;
    cancelledEventWarningTitle: string;
    cancelledEventWarningDesc: string;
    successTitle: string;
    successMessage: string;
    permissionDenied: string;
    permissionDeniedMessage: string;
    failedToCreateEvent: string;
    warningInactiveOnly: string;
    warningCancelledOnly: string;
    warningBothInactiveAndCancelled: string;
  };

  // Event Details Screen
  eventDetails: {
    title: string;
    loadingEvent: string;
    eventNotFound: string;
    eventNotFoundDesc: string;
    description: string;
    organizedBy: string;
    interested: string;
    person: string;
    people: string;
    maxCapacity: string;
    youAre: string;
    registerInterest: string;
    unregister: string;
    unregisterConfirm: string;
    unregisterConfirmText: string;
    eventCancelled: string;
    eventEnded: string;
    registerSuccess: string;
    unregisterSuccess: string;
    viewAttendeeList: string;
  };

  // Diagnose Screen
  diagnose: {
    detectDisease: string;
    detectDiseaseDesc: string;
    qualityCheck: string;
    qualityCheckDesc: string;
    weatherForecast: string;
    weatherForecastDesc: string;
    growthForecast: string;
    growthForecastDesc: string;
    marketPrice: string;
    marketPriceDesc: string;
    buyersPrices: string;
    buyersPricesDesc: string;
  };

  // Disease Detail Screen
  diseaseDetail: {
    confidence: string;
    about: string;
    recommendation: string;
    chatWithAI: string;
    diseaseNotFound: string;
    noDiseaseInfo: string;
    goBack: string;
    // Disease descriptions and treatments
    healthy: {
      name: string;
      description: string;
      treatment: string;
    };
    abnormalLeafFall: {
      name: string;
      description: string;
      treatment: string;
    };
    birdEyeSpot: {
      name: string;
      description: string;
      treatment: string;
    };
    corynesporaLeafFall: {
      name: string;
      description: string;
      treatment: string;
    };
    powderyMildew: {
      name: string;
      description: string;
      treatment: string;
    };
    phytophthoraLeafFall: {
      name: string;
      description: string;
      treatment: string;
    };
  };

  // Support Screen
  support: {
    howCanWeHelp: string;
    chooseOption: string;
    chatWithAI: string;
    chatWithAIDesc: string;
    faqs: string;
    faqsDesc: string;
    contactUs: string;
    contactUsDesc: string;
    contactOfficer: string;
    contactOfficerDesc: string;
    userGuide: string;
    userGuideDesc: string;
    learningCenter: string;
    learningCenterDesc: string;
    quickContact: string;
    callUs: string;
    emailUs: string;
  };

  // Notifications Screen
  notifications: {
    title: string;
    clearAll: string;
    noNotificationsYet: string;
    noNotificationsDesc: string;
    new: string;
    earlier: string;
  };

  // Auth screens
  auth: {
    // Sign In
    welcomeBack: string;
    enterPhoneToContine: string;
    phoneNumber: string;
    phonePlaceholder: string;
    keepMeSignedIn: string;
    invalidPhone: string;
    invalidPhoneMessage: string;
    newToRubberEdge: string;
    createAccount: string;
    termsAgreement: string;
    
    // Sign Up
    signUp: string;
    createNewAccount: string;
    fullName: string;
    fullNamePlaceholder: string;
    accountType: string;
    farmer: string;
    buyer: string;
    officer: string;
    nicNumber: string;
    nicPlaceholder: string;
    district: string;
    selectDistrict: string;
    selectDistrictFirst: string;
    farmLocation: string;
    selectFarmLocation: string;
    landArea: string;
    landAreaPlaceholder: string;
    companyName: string;
    companyNamePlaceholder: string;
    businessRegNumber: string;
    businessRegPlaceholder: string;
    employeeId: string;
    employeeIdPlaceholder: string;
    department: string;
    departmentPlaceholder: string;
    alreadyHaveAccount: string;
    signIn: string;
    fillAllFarmerDetails: string;
    fillAllBuyerDetails: string;
    fillAllOfficerDetails: string;
    enterFullName: string;
    
    // Verify OTP
    verifyLogin: string;
    verifyAccount: string;
    enterOtpCode: string;
    otpSentTo: string;
    verifyAndLogIn: string;
    verifyAndSignUp: string;
    didntReceiveCode: string;
    resendOtp: string;
    resendIn: string;
    otpResent: string;
    enterSixDigitOtp: string;
    loginFailed: string;
    registrationFailed: string;
    registrationSuccess: string;
    pleaseSignIn: string;
    failedToSendOtp: string;
    failedToResendOtp: string;
    
    // Edit Profile
    personalInformation: string;
    changePhoto: string;
    nicNumberCannotBeChanged: string;
    phoneNumberCannotBeChanged: string;
    farmInformation: string;
    notSet: string;
    setLocationOnMap: string;
    updateLocationOnMap: string;
    requiredFields: string;
    landAreaMustBeNumber: string;
    profileUpdateSuccess: string;
    failedToUpdateProfile: string;
    sessionExpired: string;
    invalidData: string;
    profileNotFound: string;
    serverError: string;
    discardChanges: string;
    discardChangesMessage: string;
    continueEditing: string;
  };

  // Settings Screen
  settings: {
    // Profile
    farmer: string;
    buyer: string;
    officer: string;
    noPhoneNumber: string;
    
    // Access Control
    accessDenied: string;
    accessDeniedMessage: string;
    
    // Language Changed Messages
    languageChangedToEnglish: string;
    languageChangedToSinhala: string;
    languageChangedToTamil: string;
    
    // Section Headers
    account: string;
    appSettings: string;
    preferences: string;
    supportAndAbout: string;
    dangerZone: string;
    
    // Account Settings
    editProfile: string;
    editProfileSubtitle: string;
    farmLocation: string;
    farmLocationSubtitle: string;
    
    // App Settings
    language: string;
    languageSubtitle: string;
    locationServices: string;
    locationServicesSubtitle: string;
    weatherAlerts: string;
    weatherAlertsSubtitle: string;
    
    // Support & About
    helpCenter: string;
    helpCenterSubtitle: string;
    termsOfService: string;
    privacyPolicy: string;
    aboutApp: string;
    aboutAppSubtitle: string;
    
    // Danger Zone
    logoutTitle: string;
    logoutConfirm: string;
    deleteAccount: string;
    deleteAccountConfirm: string;
    deleteAccountWarning: string;
    deleteAccountFinal: string;
    deleteForever: string;
    accountDeleted: string;
    
    // Footer
    madeWithLove: string;
    madeWithLoveRubber: string;
    
    // Alerts
    enableLocation: string;
    enableLocationMessage: string;
    permissionDenied: string;
    locationPermissionRequired: string;
    failedToEnableLocation: string;
    cacheClearedSuccess: string;
    failedToClearCache: string;
    clearCache: string;
    clearCacheConfirm: string;
    comingSoon: string;
    languageComingSoon: string;
    changeLanguage: string;
    selectLanguage: string;
    languageChanged: string;
    
    // Blockchain Section
    blockchain: string;
    walletSettings: string;
    walletSettingsSubtitle: string;
    blockchainHistory: string;
    blockchainHistorySubtitle: string;
    verifyTransaction: string;
    verifyTransactionSubtitle: string;
  };

  // Privacy Policy
  privacyPolicy: {
    title: string;
    lastUpdated: string;
    yourPrivacyMatters: string;
    yourPrivacyMattersDesc: string;
    informationWeCollect: string;
    personalInformation: string;
    iotSensorData: string;
    agriculturalData: string;
    transactionData: string;
    howWeUseYourInformation: string;
    howWeUseItem1: string;
    howWeUseItem2: string;
    howWeUseItem3: string;
    howWeUseItem4: string;
    howWeUseItem5: string;
    howWeUseItem6: string;
    howWeUseItem7: string;
    howWeUseItem8: string;
    informationSharing: string;
    sharingText: string;
    withAgriculturalOfficers: string;
    withAgriculturalOfficersDesc: string;
    withBuyers: string;
    withBuyersDesc: string;
    withRegulatoryAuthorities: string;
    withRegulatoryAuthoritiesDesc: string;
    researchInstitutions: string;
    researchInstitutionsDesc: string;
    serviceProviders: string;
    serviceProvidersDesc: string;
    neverSell: string;
    dataSecurity: string;
    yourRights: string;
    yourRightsIntro: string;
    contactUsText: string;
    dataRetention: string;
    childrenPrivacy: string;
    changesPolicy: string;
    contactUs: string;
    contactUsSubtitle: string;
    email: string;
    phone: string;
    dataProtectionOfficer: string;
    institute: string;
  };

  // Buyer screens
  buyer: {
    // Layout / Navigation
    dashboard: string;
    market: string;
    settings: string;
    buyerDashboard: string;
    marketRates: string;
    buyerTutorials: string;
    profileAndSettings: string;
    
    // Dashboard
    currentMarketPrice: string;
    availableStock: string;
    pendingOrders: string;
    fromSuppliers: string;
    readyForPickup: string;
    upcomingEvents: string;
    seeAll: string;
    latestNews: string;
    readMore: string;
    noEventsScheduled: string;
    checkBackLater: string;
    
    // Market Screen
    marketOpen: string;
    updatedJustNow: string;
    myMarketRates: string;
    ratesSetByYou: string;
    loadingRates: string;
    noRatesSet: string;
    useUpdateRates: string;
    marketActions: string;
    viewMarketTrends: string;
    viewMarketTrendsDesc: string;
    viewOtherBuyers: string;
    viewOtherBuyersDesc: string;
    updateMyRates: string;
    updateMyRatesDesc: string;
    perKg: string;
    previousPrice: string;
    ratesProvidedBy: string;
    otherBuyersPrices: string;
    close: string;
    
    // Update Rates Screen
    updateRatesTitle: string;
    setTodaysPrices: string;
    effectivePeriod: string;
    from: string;
    to: string;
    validFor: string;
    days: string;
    rubberGrades: string;
    enterBuyingPrices: string;
    rss3: string;
    tsr20: string;
    latex: string;
    crepe: string;
    customGrades: string;
    yourCustomRubberGrades: string;
    gradeNameExample: string;
    addCustomGrade: string;
    addOtherRubberTypes: string;
    additionalNotesOptional: string;
    addSpecialConditions: string;
    clearAll: string;
    updatePrices: string;
    updatedPricesVisible: string;
    confirmPriceUpdate: string;
    sureUpdatePrices: string;
    visibleToFarmersImmediately: string;
    willBecomeActiveOnStartDate: string;
    loadingYourPrices: string;
    failedToLoadPrices: string;
    failedToUpdatePrices: string;
    pleaseEnterAtLeastOnePrice: string;
    pleaseCompleteAllCustomGradeFields: string;
    invalidDate: string;
    endDateMustBeAfterStartDate: string;
    selectStartDate: string;
    selectEndDate: string;
    pricesUpdatedSuccessfully: string;
    cancel: string;
    done: string;
    
    // Tutorials
    allTutorials: string;
    buying: string;
    quality: string;
    processing: string;
    learningCenter: string;
    masterBuyerSkills: string;
    totalGuides: string;
    categories: string;
    expertTips: string;
    results: string;
    steps: string;
    markAsComplete: string;
    noTutorialsFound: string;
    tryDifferentCategory: string;
    showAll: string;
    beginner: string;
    intermediate: string;
    advanced: string;
    tutorials: {
      tutorial1: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial2: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial3: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial4: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial5: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial6: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial7: {
        title: string;
        description: string;
        steps: string[];
      };
      tutorial8: {
        title: string;
        description: string;
        steps: string[];
      };
    };
  };

  // Officer screens
  officer: {
    // Layout / Navigation
    dashboard: string;
    farmers: string;
    tutorials: string;
    settings: string;
    officerDashboard: string;
    farmerManagement: string;
    tutorialsGuides: string;
    profileSettings: string;
    // Farmers Screen
    farmerDirectory: string;
    farmerDirectoryDesc: string;
    createEvent: string;
    createEventDesc: string;
    viewEvents: string;
    viewEventsDesc: string;
    marketPrice: string;
    marketPriceDesc: string;
    totalFarmers: string;
    totalEvents: string;
    upcoming: string;
    total: string;
    event: string;
    events: string;
    newEvent: string;
    livePrices: string;
    errorLoadingData: string;
    // Tutorials Screen
    learningModulesAvailable: string;
    topics: string;
    whatYoullLearn: string;
    availableResources: string;
    watchOnYoutube: string;
    visitOfficialWebsite: string;
    close: string;
    unableToOpenLink: string;
    checkInternetConnection: string;
    video: string;
    docs: string;
    reference: string;
    tutorial1Title: string;
    tutorial1Desc: string;
    tutorial1Content: string[];
    tutorial2Title: string;
    tutorial2Desc: string;
    tutorial2Content: string[];
    tutorial3Title: string;
    tutorial3Desc: string;
    tutorial3Content: string[];
    tutorial4Title: string;
    tutorial4Desc: string;
    tutorial4Content: string[];
    tutorial5Title: string;
    tutorial5Desc: string;
    tutorial5Content: string[];
    tutorial6Title: string;
    tutorial6Desc: string;
    tutorial6Content: string[];
    tutorial7Title: string;
    tutorial7Desc: string;
    tutorial7Content: string[];
    tutorial8Title: string;
    tutorial8Desc: string;
    tutorial8Content: string[];
    // Dashboard Screen
    goodMorning: string;
    goodAfternoon: string;
    goodEvening: string;
    officer: string;
    loadingCarousel: string;
    recentEvents: string;
    viewAll: string;
    noEventsFound: string;
    createFirstEvent: string;
    cancelled: string;
    ended: string;
    latestRubberNews: string;
    noRubberNewsAvailable: string;
    readMore: string;
  };

  // Learning Center
  learningCenter: {
    title: string;
    all: string;
    planting: string;
    tapping: string;
    diseaseControl: string;
    fertilizers: string;
    watchVideo: string;
    openInYoutube: string;
    video: string;
    article: string;
    guide: string;
    noMaterialsFound: string;
    // Learning Items
    item1: {
      title: string;
      description: string;
      longDescription: string;
    };
    item2: {
      title: string;
      description: string;
      longDescription: string;
    };
    item3: {
      title: string;
      description: string;
      longDescription: string;
    };
    item4: {
      title: string;
      description: string;
      longDescription: string;
    };
    item5: {
      title: string;
      description: string;
      longDescription: string;
    };
    item6: {
      title: string;
      description: string;
      longDescription: string;
    };
    item7: {
      title: string;
      description: string;
      longDescription: string;
    };
    item8: {
      title: string;
      description: string;
      longDescription: string;
    };
    item9: {
      title: string;
      description: string;
      longDescription: string;
    };
    item10: {
      title: string;
      description: string;
      longDescription: string;
    };
    item11: {
      title: string;
      description: string;
      longDescription: string;
    };
    item12: {
      title: string;
      description: string;
      longDescription: string;
    };
  };

  // FAQ Screen
  faq: {
    title: string;
    subtitle: string;
    general: string;
    disease: string;
    quality: string;
    market: string;
    account: string;
    stillNeedHelp: string;
    stillNeedHelpDesc: string;
    contactSupport: string;
    
    // General Questions
    whatIsRubberEdge: string;
    whatIsRubberEdgeAns: string;
    whoCanUse: string;
    whoCanUseAns: string;
    isFree: string;
    isFreeAns: string;
    offlineUsage: string;
    offlineUsageAns: string;
    
    // Disease Detection Questions
    diseaseAccuracy: string;
    diseaseAccuracyAns: string;
    detectedDisease: string;
    detectedDiseaseAns: string;
    whichDiseases: string;
    whichDiseasesAns: string;
    
    // Latex Quality Questions
    qualityMeasured: string;
    qualityMeasuredAns: string;
    qualityAccuracy: string;
    qualityAccuracyAns: string;
    viewHistory: string;
    viewHistoryAns: string;
    
    // Market & Pricing Questions
    pricesDetermined: string;
    pricesDeterminedAns: string;
    sellDirectly: string;
    sellDirectlyAns: string;
    blockchainTraceability: string;
    blockchainTraceabilityAns: string;
    
    // Account & Settings Questions
    updateProfile: string;
    updateProfileAns: string;
    changePassword: string;
    changePasswordAns: string;
    multiplePlantations: string;
    multiplePlantationsAns: string;
  };

  // Help & Support Screen
  helpSupport: {
    title: string;
    selectYourRole: string;
    frequentlyAskedQuestions: string;
    contactSupport: string;
    callSupport: string;
    emailSupport: string;
    whatsAppSupport: string;
    farmer: string;
    officer: string;
    buyer: string;
    
    // Farmer FAQs
    farmerQ1: string;
    farmerA1: string;
    farmerQ2: string;
    farmerA2: string;
    farmerQ3: string;
    farmerA3: string;
    farmerQ4: string;
    farmerA4: string;
    farmerQ5: string;
    farmerA5: string;
    
    // Officer FAQs
    officerQ1: string;
    officerA1: string;
    officerQ2: string;
    officerA2: string;
    officerQ3: string;
    officerA3: string;
    officerQ4: string;
    officerA4: string;
    
    // Buyer FAQs
    buyerQ1: string;
    buyerA1: string;
    buyerQ2: string;
    buyerA2: string;
    buyerQ3: string;
    buyerA3: string;
    buyerQ4: string;
    buyerA4: string;
  };

  // Contact Us Page
  contactPage: {
    headerTitle: string;
    heroInfoTitle: string;
    heroInfoSubtitle: string;
    quickContact: string;
    sendUsMessage: string;
    yourName: string;
    yourNamePlaceholder: string;
    emailAddress: string;
    emailAddressPlaceholder: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    messageSent: string;
    messageSentDesc: string;
    fillAllFields: string;
    invalidEmail: string;
    officeHours: string;
    mondayFriday: string;
    saturday: string;
    sunday: string;
    weHereToHelp: string;
    supportTeam: string;
  };

  // Farmer Directory Page
  farmerDirectory: {
    headerTitle: string;
    searchPlaceholder: string;
    loadingFarmers: string;
    noFarmersFound: string;
    noFarmersDesc: string;
    tryAdjustingSearch: string;
    farmer: string;
    farmers: string;
    failedToLoadFarmers: string;
  };

  // Officer Directory Page
  officerDirectory: {
    headerTitle: string;
    loadingOfficers: string;
    noOfficersAvailable: string;
    noOfficersDesc: string;
    retry: string;
    tapToViewDetails: string;
    officer: string;
    officers: string;
    failedToLoadOfficers: string;
  };

  // Officer Detail Page
  officerDetail: {
    headerTitle: string;
    loadingOfficerDetails: string;
    officerNotFound: string;
    phone: string;
    employeeId: string;
    department: string;
    role: string;
    verified: string;
    joined: string;
    yes: string;
    no: string;
    callOfficer: string;
    startChat: string;
    failedToLoadOfficerDetails: string;
    failedToStartChat: string;
  };

  // Chat Screen
  chatScreen: {
    online: string;
    connecting: string;
    noMessagesYet: string;
    startConversation: string;
    noConversationSelected: string;
    roleMismatch: string;
    goBack: string;
    messagePlaceholder: string;
  };

  // User Guide Page
  userGuide: {
    headerTitle: string;
    welcomeTitle: string;
    welcomeSubtitle: string;
    howToUse: string;
    gettingStarted: string;
    diseaseDetection: string;
    monitoringLatexQuality: string;
    marketAndSelling: string;
    weatherForecasts: string;
    gettingHelp: string;
    usingOffline: string;
    needMoreHelp: string;
    needMoreHelpSubtitle: string;
    chatWithAI: string;
    contactUs: string;
    // Getting Started steps
    createAccountTitle: string;
    createAccountDesc: string;
    setUpProfileTitle: string;
    setUpProfileDesc: string;
    exploreDashboardTitle: string;
    exploreDashboardDesc: string;
    // Disease Detection steps
    takePhotoTitle: string;
    takePhotoDesc: string;
    waitForAnalysisTitle: string;
    waitForAnalysisDesc: string;
    viewResultsTitle: string;
    viewResultsDesc: string;
    getTreatmentTitle: string;
    getTreatmentDesc: string;
    // Latex Quality steps
    viewRealTimeDataTitle: string;
    viewRealTimeDataDesc: string;
    understandMetricsTitle: string;
    understandMetricsDesc: string;
    setQualityAlertsTitle: string;
    setQualityAlertsDesc: string;
    improveQualityTitle: string;
    improveQualityDesc: string;
    // Market steps
    checkMarketPricesTitle: string;
    checkMarketPricesDesc: string;
    compareBuyersTitle: string;
    compareBuyersDesc: string;
    connectWithBuyersTitle: string;
    connectWithBuyersDesc: string;
    trackTransactionsTitle: string;
    trackTransactionsDesc: string;
    // Weather steps
    viewCurrentWeatherTitle: string;
    viewCurrentWeatherDesc: string;
    sevenDayForecastTitle: string;
    sevenDayForecastDesc: string;
    weatherAlertsTitle: string;
    weatherAlertsDesc: string;
    // Support steps
    aiChatAssistantTitle: string;
    aiChatAssistantDesc: string;
    contactOfficersTitle: string;
    contactOfficersDesc: string;
    learningCenterTitle: string;
    learningCenterDesc: string;
    faqsTitle: string;
    faqsDesc: string;
    // Offline steps
    offlineModeTitle: string;
    offlineModeDesc: string;
    cachedDataTitle: string;
    cachedDataDesc: string;
    autoSyncTitle: string;
    autoSyncDesc: string;
  };

  // Buyers Screen
  buyersScreen: {
    headerTitle: string;
    headerSubtitle: string;
    searchPlaceholder: string;
    filterAll: string;
    currentPrices: string;
    best: string;
    lkr: string;
    perKg: string;
    additionalInfo: string;
    contactBuyer: string;
    error: string;
    failedToLoadPrices: string;
    noPhoneAvailable: string;
    callError: string;
    buyers: string;
    listings: string;
    verified: string;
    noPricesAvailable: string;
    noBuyersPosted: string;
    tryAdjustingFilters: string;
    loadingPrices: string;
  };

  // Other Buyers Prices Screen
  otherBuyersPricesScreen: {
    headerTitle: string;
    headerSubtitle: string;
    noBuyersAvailable: string;
    noBuyersDesc: string;
    unableToLoad: string;
    tryAgain: string;
    buyers: string;
    prices: string;
    cities: string;
    loadingPrices: string;
    pleaseWait: string;
    verified: string;
    pricesLabel: string;
    updated: string;
    lkr: string;
  };

  // Weather Screen
  weatherScreen: {
    loadingWeather: string;
    feelsLike: string;
    todaysTappingConditions: string;
    excellent: string;
    good: string;
    fair: string;
    poor: string;
    notRecommended: string;
    bestTappingWindow: string;
    optimalLatexFlow: string;
    expectedLatexQuality: string;
    qualityGrade: string;
    estDrc: string;
    humidity: string;
    wind: string;
    uvIndex: string;
    pressure: string;
    high: string;
    low: string;
    normal: string;
    hourlyForecast: string;
    sevenDayForecast: string;
    tappingScore: string;
    rubberFarmingTips: string;
    highRainProbability: string;
    avoidTappingRain: string;
    highHumidity: string;
    highHumidityDesc: string;
    highTemperature: string;
    highTemperatureDesc: string;
    optimalTappingTime: string;
    optimalTappingDesc: string;
    checkTrees: string;
    checkTreesDesc: string;
    today: string;
    tomorrow: string;
    weatherDataBy: string;
    now: string;
    // Weather conditions
    clearSky: string;
    mainlyClear: string;
    partlyCloudy: string;
    overcast: string;
    foggy: string;
    rimeFog: string;
    lightDrizzle: string;
    drizzle: string;
    denseDrizzle: string;
    lightRain: string;
    rain: string;
    heavyRain: string;
    lightSnow: string;
    snow: string;
    heavySnow: string;
    rainShowers: string;
    moderateShowers: string;
    heavyShowers: string;
    thunderstorm: string;
    severeStorm: string;
    unknown: string;
    // Quality levels
    moderate: string;
    // Recommendation texts
    excellentRecommendation: string;
    goodRecommendation: string;
    fairRecommendation: string;
    poorRecommendation: string;
    notRecommendedRecommendation: string;
  };

  // Growth Screen
  growthScreen: {
    headerTitle: string;
    headerSubtitle: string;
    measureTreeGrowth: string;
    useCameraOrManual: string;
    camera: string;
    manual: string;
    latestMeasurement: string;
    allMeasurements: string;
    noMeasurements: string;
    startMeasuringTrees: string;
    records: string;
    loading: string;
    requiredField: string;
    pleaseEnterTreeId: string;
    pleaseEnterGirth: string;
    invalidValue: string;
    pleaseEnterValidGirth: string;
    pleaseEnterValidHeight: string;
    measurementSaved: string;
    deleteMeasurement: string;
    deleteConfirmation: string;
    deleteRecord: string;
    howToMeasure: string;
    positionReferenceCard: string;
    holdCard: string;
    markCardWidth: string;
    tapLeftRight: string;
    markTrunkDiameter: string;
    tapTwoPoints: string;
    saveMeasurement: string;
    onceCalculated: string;
    treeReadyForTapping: string;
    typicallyYears: string;
    bestAccuracy: string;
    holdPhoneParallel: string;
    gotIt: string;
    manualEntry: string;
    enterMeasurements: string;
    treeId: string;
    eg: string;
    girthCm: string;
    circumference: string;
    heightCm: string;
    optional: string;
    location: string;
    egBlockA: string;
    notes: string;
    observations: string;
    readyForTapping: string;
    almostReady: string;
    growingWell: string;
    earlyStage: string;
    tapCardPoints: string;
    tapTrunkPoints: string;
    measurementComplete: string;
    tapTrunkPoints2: string;
    reset: string;
    longPressDelete: string;
    requestingCamera: string;
    permissionRequired: string;
    cameraAccessNeeded: string;
    failedToSaveMeasurement: string;
  };
  marketScreen: {
    rubberMarket: string;
    liveLocationPrices: string;
    updated: string;
    loadingMarketData: string;
    fetchingPrices: string;
    oops: string;
    tryAgain: string;
    failedToLoadPrices: string;
    currentPrice: string;
    weeklyChange: string;
    sixMonthTrend: string;
    rss3Grade: string;
    marketStatistics: string;
    weekHigh: string;
    weekLow: string;
    monthHigh: string;
    monthLow: string;
    noHistoricalData: string;
    statsUnavailable: string;
    allRubberGrades: string;
    tapToSelect: string;
    dataSource: string;
    viewOfficialPrices: string;
    cannotOpenLink: string;
    unableToOpenWebsite: string;
    failedToOpenWebsite: string;
    rss1Desc: string;
    rss2Desc: string;
    rss3Desc: string;
    rss4Desc: string;
    rss5Desc: string;
    latexDesc: string;
    tsr20Desc: string;
    crepeDesc: string;
  };

  // Farm Location Screen
  farmLocation: {
    loading: string;
    updateYourLocation: string;
    pinOnMap: string;
    searchPlaceholder: string;
    noLocationsFound: string;
    searchUnavailable: string;
    checkInternet: string;
    tryDifferentTerm: string;
    instruction: string;
    locationSelected: string;
    locationRequired: string;
    selectLocationMessage: string;
    updateSuccess: string;
    updateError: string;
    saveButton: string;
  };

  // Terms of Service Screen
  termsOfServicePage: {
    headerTitle: string;
    lastUpdated: string;
    section1Title: string;
    section1Content: string;
    section2Title: string;
    section2Content: string;
    section2Item1: string;
    section2Item2: string;
    section2Item3: string;
    section2Item4: string;
    section3Title: string;
    section3Content: string;
    section3Item1: string;
    section3Item2: string;
    section3Item3: string;
    section3Item4: string;
    section4Title: string;
    section4Content: string;
    section5Title: string;
    section5Content: string;
    section5Item1: string;
    section5Item2: string;
    section5Item3: string;
    section5Item4: string;
    section6Title: string;
    section6Content: string;
    section7Title: string;
    section7Content: string;
    section8Title: string;
    section8Content: string;
    section9Title: string;
    section9Content: string;
    section10Title: string;
    section10Content: string;
    questionsAboutTerms: string;
    emailContact: string;
    phoneContact: string;
  };

  // About Screen
  aboutScreen: {
    appName: string;
    appSubtitle: string;
    appDescription: string;
    missionTitle: string;
    missionContent: string;
    visionTitle: string;
    visionContent: string;
    featuresTitle: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
    statsTitle: string;
    stat1Label: string;
    stat2Label: string;
    stat3Label: string;
    stat4Label: string;
    researchTitle: string;
    researchPara1: string;
    researchPara2: string;
    researchHighlight: string;
    teamTitle: string;
    researcher: string;
    supervisor: string;
    assessor: string;
    contributionsTitle: string;
    problemDomain: string;
    problemItem1: string;
    problemItem2: string;
    problemItem3: string;
    problemItem4: string;
    researchDomain: string;
    researchItem1: string;
    researchItem2: string;
    researchItem3: string;
    researchItem4: string;
    impactTitle: string;
    impactIntro: string;
    impact1: string;
    impact2: string;
    impact3: string;
    impact4: string;
    impact5: string;
    impact6: string;
    contactTitle: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    footerText: string;
    footerSubtext: string;
  };

  // Wallet Settings Screen
  walletSettings: {
    headerTitle: string;
    headerSubtitle: string;
    wallet: string;
    networkSettings: string;
    activeNetwork: string;
    testnet: string;
    mainnet: string;
    rpcUrl: string;
    chainId: string;
    dataSync: string;
    pendingRecords: string;
    records: string;
    syncNow: string;
    syncing: string;
    autoSync: string;
    security: string;
    exportPrivateKey: string;
    biometricLock: string;
    comingSoon: string;
    biometricComingSoonDesc: string;
    quickActions: string;
    transactionHistory: string;
    verifyTransaction: string;
    blockExplorer: string;
    dangerZone: string;
    disconnectWallet: string;
    footerPoweredBy: string;
    footerVersion: string;
    // Alerts
    noPendingData: string;
    allDataSynced: string;
    walletNotConnected: string;
    connectWalletToSync: string;
    syncComplete: string;
    syncedRecords: string;
    failedRecords: string;
    syncFailed: string;
    syncFailedDesc: string;
    exportPrivateKeyTitle: string;
    exportPrivateKeyWarning: string;
    export: string;
    privateKeyTitle: string;
    contactSupportForExport: string;
    disconnectWalletTitle: string;
    disconnectWalletWarning: string;
    disconnect: string;
  };

  // Verify Transaction Screen
  verifyTransaction: {
    headerTitle: string;
    headerSubtitle: string;
    transactionHash: string;
    enterTxHashPlaceholder: string;
    verifyOnBlockchain: string;
    recordVerified: string;
    notFoundLocally: string;
    recordedOnBlockchain: string;
    notFoundLocallyDesc: string;
    priceRecord: string;
    transactionRecord: string;
    supplyChainBatch: string;
    grade: string;
    price: string;
    recorded: string;
    recorder: string;
    farmerId: string;
    buyerId: string;
    amount: string;
    totalValue: string;
    status: string;
    location: string;
    timestamp: string;
    viewOnBlockchainExplorer: string;
    howToVerify: string;
    howToVerifyDesc: string;
    exampleTxHash: string;
    // Alerts
    error: string;
    enterTxHash: string;
    invalidHash: string;
    invalidHashDesc: string;
    verificationFailed: string;
    verificationFailedDesc: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      continue: 'Continue',
      cancel: 'Cancel',
      logout: 'Logout',
      delete: 'Delete',
      discard: 'Discard',
      clear: 'Clear',
      success: 'Success',
      error: 'Error',
      ok: 'OK',
      yes: 'Yes',
      no: 'No',
      or: 'OR',
      loading: 'Loading...',
      save: 'Save',
      submit: 'Submit',
      back: 'Back',
      next: 'Next',
      skip: 'Skip',
      done: 'Done',
      search: 'Search',
      noData: 'No data available',
      retry: 'Retry',
      seeAll: 'View All',
      readMore: 'Read more',
      pleaseEnter: 'Please enter',
    },
    languageSelection: {
      title: 'Select Language',
      subtitle: 'Choose your preferred language',
      english: 'English',
      sinhala: 'Sinhala',
      tamil: 'Tamil',
    },
    onboarding: {
      title1: 'Grow Healthier Rubber Trees',
      desc1: 'Detect rubber tree diseases early with the power of AI. Simply capture a photo of your trees, and our system instantly analyzes it to spot signs of infections or abnormalities. Along with detection, you\'ll receive practical treatment suggestions and preventive tips so your plantation stays strong and healthy.',
      title2: 'Track & Improve Your Yield',
      desc2: 'Stay in control of your rubber plantation with smart growth tracking and updates. Get timely reminders weather alerts, and expert advice tailored to your location. Monitor each stage of your trees\' development and use personalized insights to boost productivity and ensure consistent yields.',
      title3: 'Sell With Confidence!',
      desc3: 'Turn your hard work into profit with our built-in marketplace. Connect directly with trusted buyers, showcase your rubber products, and secure the best prices. With blockchain-based traceability and safe transactions, you can sell with transparency, trust, and confidence every time.',
      skipNow: 'Skip Now',
      getStarted: 'Get Started',
    },
    tabs: {
      home: 'Home',
      diagnose: 'Diagnose',
      support: 'Support',
      settings: 'Settings',
      welcome: 'Welcome, Farmer',
    },
    home: {
      loadingCarousel: 'Loading carousel...',
      recentEvents: 'Recent Events',
      noEvents: 'No events found',
      createEvent: 'Create your first event!',
      latestNews: 'Latest Rubber News',
      noNews: 'No rubber news available',
      cancelled: 'Cancelled',
      ended: 'Ended',
    },
    createEvent: {
      headerTitle: 'Create Event',
      eventImage: 'Add Event Image (Optional)',
      eventImageOptional: 'Add Event Image (Optional)',
      eventTitle: 'Event Title *',
      eventTitleRequired: 'Please enter event title',
      eventTitlePlaceholder: 'e.g., Rubber Tapping Workshop',
      description: 'Description *',
      descriptionRequired: 'Please enter event description',
      descriptionPlaceholder: 'Describe the event details...',
      eventDate: 'Event Date *',
      eventDateRequired: 'Event date must be in the future',
      eventTime: 'Event Time *',
      eventTimeRequired: 'Please select event time',
      location: 'Location (Optional)',
      locationOptional: 'Location (Optional)',
      locationPlaceholder: 'e.g., Kegalle Community Hall',
      contactNumber: 'Contact Number (Optional)',
      contactNumberOptional: 'Contact Number (Optional)',
      contactNumberPlaceholder: 'e.g., 077 123 4567',
      maxParticipants: 'Max Participants (Optional)',
      maxParticipantsOptional: 'Max Participants (Optional)',
      maxParticipantsPlaceholder: 'e.g., 50',
      eventStatus: 'Event Status',
      eventIsActive: 'Event is Active',
      activeEventsVisible: 'Active events are visible to farmers and can accept registrations',
      eventIsCancelled: 'Event is Cancelled',
      cancelledEventsCannot: 'Cancelled events cannot accept new registrations',
      createEventButton: 'Create Event',
      errorTitle: 'Error',
      enterEventTitle: 'Please enter event title',
      enterEventDescription: 'Please enter event description',
      eventDateMustBeFuture: 'Event date must be in the future',
      invalidStatusTitle: 'Invalid Status',
      invalidStatusMessage: 'An inactive event should be marked as cancelled. Please check the event status settings.',
      conflictingStatusTitle: 'Conflicting Status',
      conflictingStatusMessage: 'An event cannot be both active and cancelled. Please adjust the status.',
      cancelledEventWarningTitle: 'Cancelled Event',
      cancelledEventWarningDesc: 'You are creating a cancelled event. Are you sure you want to proceed?',
      successTitle: 'Success',
      successMessage: 'Event created successfully!',
      permissionDenied: 'Permission needed',
      permissionDeniedMessage: 'Please grant camera roll permissions',
      failedToCreateEvent: 'Failed to create event',
      warningInactiveOnly: 'This event will be created as inactive',
      warningCancelledOnly: 'This event will be created as cancelled',
      warningBothInactiveAndCancelled: 'This event will be created as inactive and cancelled',
    },
    eventDetails: {
      title: 'Event Details',
      loadingEvent: 'Loading event...',
      eventNotFound: 'Event not found',
      eventNotFoundDesc: 'The event you\'re looking for doesn\'t exist or has been removed.',
      description: 'Description',
      organizedBy: 'Organized by',
      interested: 'interested',
      person: 'person',
      people: 'people',
      maxCapacity: 'Max capacity',
      youAre: 'You are',
      registerInterest: 'Register Interest',
      unregister: 'Unregister',
      unregisterConfirm: 'Unregister',
      unregisterConfirmText: 'Are you sure you want to unregister from this event?',
      eventCancelled: 'This event has been cancelled',
      eventEnded: 'This event has ended',
      registerSuccess: 'You have registered for this event!',
      unregisterSuccess: 'You have unregistered from this event',
      viewAttendeeList: 'View attendee list and manage this event from your dashboard',
    },
    diagnose: {
      detectDisease: 'Detect Disease',
      detectDiseaseDesc: "Check your plant's diseases",
      qualityCheck: 'Quality Check',
      qualityCheckDesc: 'Check your latex quality',
      weatherForecast: 'Weather Forecast',
      weatherForecastDesc: 'Check weather status of your area',
      growthForecast: 'Growth Forecast',
      growthForecastDesc: 'Forecast your plant growth',
      marketPrice: 'Market Price',
      marketPriceDesc: 'Check daily market prices',
      buyersPrices: 'Buyers Prices',
      buyersPricesDesc: 'Check buyers prices',
    },
    diseaseDetail: {
      confidence: 'Confidence',
      about: 'About',
      recommendation: 'Recommendation',
      chatWithAI: 'Chat with AI Agent',
      diseaseNotFound: 'Disease information not found',
      noDiseaseInfo: 'No detailed information available for this disease',
      goBack: 'Go Back',
      healthy: {
        name: 'Healthy',
        description: 'The leaf appears healthy with no signs of disease.',
        treatment: 'Continue regular maintenance and monitoring.',
      },
      abnormalLeafFall: {
        name: 'Abnormal Leaf Fall',
        description: 'Premature leaf drop caused by environmental stress, nutrient deficiency, or weak pathogenic factors.',
        treatment: 'Improve drainage, ensure proper nutrition with balanced fertilizer, and manage irrigation.',
      },
      birdEyeSpot: {
        name: 'Bird Eye Spot',
        description: 'Fungal disease (Phyllachora heveae) causing circular spots with target-like rings on rubber leaves.',
        treatment: 'Apply copper fungicides or Bordeaux mixture at early stages and remove infected leaves.',
      },
      corynesporaLeafFall: {
        name: 'Corynespora Leaf Fall',
        description: 'Severe fungal disease (Corynespora cassiicola) causing significant leaf defoliation and yield loss.',
        treatment: 'Apply systemic fungicides every 10-14 days during wet season, improve ventilation, and prune heavily.',
      },
      powderyMildew: {
        name: 'Powdery Mildew',
        description: 'Fungal disease causing white powdery coating on young rubber leaves.',
        treatment: 'Apply sulfur fungicides, improve tree spacing for air circulation, and reduce nitrogen.',
      },
      phytophthoraLeafFall: {
        name: 'Phytophthora Leaf Fall',
        description: 'Water mold pathogen (Phytophthora palmivora) causing rapid leaf and branch dieback in wet conditions.',
        treatment: 'Improve soil drainage, apply phosphonate fungicides, and avoid waterlogging conditions.',
      },
    },
    support: {
      howCanWeHelp: 'How can we help you?',
      chooseOption: 'Choose from the options below or contact us directly',
      chatWithAI: 'Chat with AI',
      chatWithAIDesc: 'Get instant answers from our AI assistant',
      faqs: 'FAQs',
      faqsDesc: 'Find answers to common questions',
      contactUs: 'Contact Us',
      contactUsDesc: 'Get in touch with our support team',
      contactOfficer: 'Contact Officer',
      contactOfficerDesc: 'Reach out to your assigned support officer',
      userGuide: 'User Guide',
      userGuideDesc: 'Learn how to use the app effectively',
      learningCenter: 'Learning Center',
      learningCenterDesc: 'Educational resources for rubber farming',
      quickContact: 'Quick Contact',
      callUs: 'Call Us',
      emailUs: 'Email Us',
    },
    notifications: {
      title: 'Notifications',
      clearAll: 'Clear',
      noNotificationsYet: 'No notifications yet',
      noNotificationsDesc: 'When you get notifications, they\'ll show up here',
      new: 'New',
      earlier: 'Earlier',
    },
    auth: {
      welcomeBack: 'Welcome Back',
      enterPhoneToContine: 'Enter your phone number to continue',
      phoneNumber: 'Phone Number',
      phonePlaceholder: '7X XXX XXXX',
      keepMeSignedIn: 'Keep me signed in',
      invalidPhone: 'Invalid Phone',
      invalidPhoneMessage: 'Please enter a valid phone number (07XXXXXXXX)',
      newToRubberEdge: 'New to Rubber Edge?',
      createAccount: 'Create Account',
      termsAgreement: 'By continuing, you agree to our Terms & Privacy Policy',
      
      signUp: 'Sign Up',
      createNewAccount: 'Create your new account',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      accountType: 'Account Type',
      farmer: 'Farmer',
      buyer: 'Buyer',
      officer: 'Officer',
      nicNumber: 'NIC Number',
      nicPlaceholder: 'Enter NIC number',
      district: 'District',
      selectDistrict: 'Select District',
      selectDistrictFirst: 'Select District First',
      farmLocation: 'Farm Location',
      selectFarmLocation: 'Select Farm Location',
      landArea: 'Land Area',
      landAreaPlaceholder: 'Land Area (hectares)',
      companyName: 'Company Name',
      companyNamePlaceholder: 'Enter company name',
      businessRegNumber: 'Business Registration Number',
      businessRegPlaceholder: 'Enter registration number',
      employeeId: 'Employee ID',
      employeeIdPlaceholder: 'Enter employee ID',
      department: 'Department',
      departmentPlaceholder: 'Enter department',
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      fillAllFarmerDetails: 'Please fill all farmer details',
      fillAllBuyerDetails: 'Please fill all buyer details',
      fillAllOfficerDetails: 'Please fill all officer details',
      enterFullName: 'Please enter your full name',
      
      verifyLogin: 'Verify Login',
      verifyAccount: 'Verify Account',
      enterOtpCode: 'Enter the 6-digit code sent to',
      otpSentTo: 'OTP sent to',
      verifyAndLogIn: 'Verify & Log In',
      verifyAndSignUp: 'Verify & Sign Up',
      didntReceiveCode: "Didn't receive the code?",
      resendOtp: 'Resend OTP',
      resendIn: 'Resend in',
      otpResent: 'OTP resent to your phone',
      enterSixDigitOtp: 'Please enter 6-digit OTP',
      loginFailed: 'Login Failed',
      registrationFailed: 'Registration Failed',
      registrationSuccess: 'Registration successful! Please sign in.',
      pleaseSignIn: 'Please sign in',
      failedToSendOtp: 'Failed to send OTP',
      failedToResendOtp: 'Failed to resend OTP',
      
      // Edit Profile
      personalInformation: 'Personal Information',
      changePhoto: 'Change Photo',
      nicNumberCannotBeChanged: 'NIC number cannot be changed',
      phoneNumberCannotBeChanged: 'Phone number cannot be changed',
      farmInformation: 'Farm Information',
      notSet: 'Not set',
      setLocationOnMap: 'Set Location on Map',
      updateLocationOnMap: 'Update Location on Map',
      requiredFields: 'Required fields',
      landAreaMustBeNumber: 'Land area must be a valid number',
      profileUpdateSuccess: 'Profile updated successfully!',
      failedToUpdateProfile: 'Failed to update profile. Please try again.',
      sessionExpired: 'Session expired. Please login again.',
      invalidData: 'Invalid data provided.',
      profileNotFound: 'Profile not found. Please contact support.',
      serverError: 'Server error. Please try again later.',
      discardChanges: 'Discard Changes',
      discardChangesMessage: 'Are you sure you want to discard your changes?',
      continueEditing: 'Continue Editing',
    },
    settings: {
      farmer: 'Farmer',
      buyer: 'Buyer',
      officer: 'Officer',
      noPhoneNumber: 'No phone number',
      
      accessDenied: 'Access Denied',
      accessDeniedMessage: 'This page is only for officers',
      
      languageChangedToEnglish: 'Language changed to English',
      languageChangedToSinhala: 'භාෂාව සිංහල බවට වෙනස් විය',
      languageChangedToTamil: 'மொழி தமிழாக மாற்றப்பட்டது',
      
      account: 'Account',
      appSettings: 'App Settings',
      preferences: 'Preferences',
      supportAndAbout: 'Support & About',
      dangerZone: 'Danger Zone',
      
      editProfile: 'Edit Profile',
      editProfileSubtitle: 'Update your personal information',
      farmLocation: 'Farm Location',
      farmLocationSubtitle: 'Change your farm location',
      
      language: 'Language',
      languageSubtitle: 'Change app language',
      locationServices: 'Location Services',
      locationServicesSubtitle: 'Allow app to access location',
      weatherAlerts: 'Weather Alerts',
      weatherAlertsSubtitle: 'Receive weather notifications',
      
      helpCenter: 'Help Center',
      helpCenterSubtitle: 'Get help and support',
      termsOfService: 'Terms of Service',
      privacyPolicy: 'Privacy Policy',
      aboutApp: 'About RubberEdge',
      aboutAppSubtitle: 'Version 1.0.0',
      
      logoutTitle: 'Logout',
      logoutConfirm: 'Are you sure you want to logout?',
      deleteAccount: 'Delete Account',
      deleteAccountConfirm: 'This action cannot be undone. All your data will be permanently deleted.',
      deleteAccountWarning: 'Are you sure you want to permanently delete your account? This action cannot be undone and all your data will be permanently removed.',
      deleteAccountFinal: 'This is your last chance. Do you really want to delete your account permanently?',
      deleteForever: 'Yes, Delete Forever',
      accountDeleted: 'Your account has been deleted successfully.',
      
      madeWithLove: 'Made with ❤️ for farmers',
      madeWithLoveRubber: 'Made with ❤️ for the rubber industry',
      
      enableLocation: 'Enable Location',
      enableLocationMessage: 'Do you want to turn on location services? This will allow the app to access your device location.',
      permissionDenied: 'Permission Denied',
      locationPermissionRequired: 'Location permission is required to enable location services.',
      failedToEnableLocation: 'Failed to enable location services.',
      cacheClearedSuccess: 'Cache cleared successfully!',
      failedToClearCache: 'Failed to clear cache',
      clearCache: 'Clear Cache',
      clearCacheConfirm: 'Are you sure you want to clear the cache?',
      comingSoon: 'Coming Soon',
      languageComingSoon: 'Language selection is coming soon!',
      changeLanguage: 'Change Language',
      selectLanguage: 'Select your preferred language',
      languageChanged: 'Language changed to English',
      
      // Blockchain Section
      blockchain: 'Blockchain',
      walletSettings: 'Wallet Settings',
      walletSettingsSubtitle: 'Manage your blockchain wallet',
      blockchainHistory: 'Blockchain History',
      blockchainHistorySubtitle: 'View all on-chain records',
      verifyTransaction: 'Verify Transaction',
      verifyTransactionSubtitle: 'Check transaction authenticity',
    },

    privacyPolicy: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: December 2025',
      yourPrivacyMatters: 'Your Privacy Matters',
      yourPrivacyMattersDesc: 'We are committed to protecting your personal information and plantation data. This policy explains how we collect, use, and safeguard your information.',
      informationWeCollect: '1. Information We Collect',
      personalInformation: 'Personal Information:',
      iotSensorData: 'IoT Sensor Data:',
      agriculturalData: 'Agricultural Data:',
      transactionData: 'Transaction Data:',
      howWeUseYourInformation: '2. How We Use Your Information',
      howWeUseItem1: 'Provide real-time monitoring and analytics for your plantation',
      howWeUseItem2: 'Generate AI-powered disease alerts and growth predictions',
      howWeUseItem3: 'Enable blockchain-based supply chain traceability',
      howWeUseItem4: 'Facilitate transactions between farmers and buyers',
      howWeUseItem5: 'Provide agricultural advisory services',
      howWeUseItem6: 'Improve our AI models through anonymized data analysis',
      howWeUseItem7: 'Ensure EUDR compliance reporting',
      howWeUseItem8: 'Conduct research to enhance rubber cultivation practices',
      informationSharing: '3. Information Sharing',
      sharingText: 'We share your information only in these circumstances:',
      withAgriculturalOfficers: 'With Agricultural Officers:',
      withAgriculturalOfficersDesc: 'Disease alerts and advisory recommendations',
      withBuyers: 'With Buyers:',
      withBuyersDesc: 'Quality certification data for verified transactions (with your consent)',
      withRegulatoryAuthorities: 'With Regulatory Authorities:',
      withRegulatoryAuthoritiesDesc: 'EUDR compliance data as required by law',
      researchInstitutions: 'Research Institutions:',
      researchInstitutionsDesc: 'Anonymized, aggregated data for agricultural research',
      serviceProviders: 'Service Providers:',
      serviceProvidersDesc: 'Cloud hosting (AWS), IoT connectivity (Dialog), but never for marketing',
      neverSell: 'We never sell your personal information to third parties.',
      dataSecurity: '4. Data Security',
      yourRights: '5. Your Rights',
      yourRightsIntro: 'You have the right to:',
      contactUsText: 'To exercise these rights, contact us at privacy@rubberedge.lk',
      dataRetention: '6. Data Retention',
      childrenPrivacy: '7. Children\'s Privacy',
      changesPolicy: '8. Changes to This Policy',
      contactUs: '9. Contact Us',
      contactUsSubtitle: 'For privacy-related questions or concerns:',
      email: 'Email: privacy@rubberedge.lk',
      phone: 'Phone: +94 11 234 5678',
      dataProtectionOfficer: 'Data Protection Officer: Ravishka Dissanayaka',
      institute: 'Rubber Research Institute of Sri Lanka',
    },

    buyer: {
      // Layout / Navigation
      dashboard: 'Dashboard',
      market: 'Market',
      settings: 'Settings',
      buyerDashboard: 'Buyer Dashboard',
      marketRates: 'Market Rates',
      buyerTutorials: 'Buyer Tutorials',
      profileAndSettings: 'Profile & Settings',
      
      // Dashboard
      currentMarketPrice: 'Current Market Price',
      availableStock: 'Available Stock',
      pendingOrders: 'Pending Orders',
      fromSuppliers: 'From suppliers',
      readyForPickup: 'Ready for pickup',
      upcomingEvents: 'Upcoming Events',
      seeAll: 'See All',
      latestNews: 'Latest News',
      readMore: 'Read more',
      noEventsScheduled: 'No events scheduled',
      checkBackLater: 'Check back later for updates',
      
      // Market Screen
      marketOpen: 'Market Open',
      updatedJustNow: 'Updated just now',
      myMarketRates: 'My Market Rates',
      ratesSetByYou: 'Market Rates Set By You',
      loadingRates: 'Loading rates...',
      noRatesSet: 'No rates set yet.',
      useUpdateRates: 'Use "Update My Rates" to add your prices.',
      marketActions: 'Market Actions',
      viewMarketTrends: 'View Market Trends',
      viewMarketTrendsDesc: 'Analyze price movements and market data',
      viewOtherBuyers: 'View Other Buyers\' Prices',
      viewOtherBuyersDesc: 'Compare your rates with other buyers',
      updateMyRates: 'Update My Rates',
      updateMyRatesDesc: 'Set or update your buying prices',
      perKg: 'per kg',
      previousPrice: 'Previous:',
      ratesProvidedBy: 'Rates provided by Ceylon Rubber Traders Association',
      otherBuyersPrices: 'Other Buyers\' Prices',
      close: 'Close',
      
      // Update Rates Screen
      updateRatesTitle: 'Update Your Buying Rates',
      setTodaysPrices: 'Set today\'s prices for your suppliers',
      effectivePeriod: 'Effective Period',
      from: 'From',
      to: 'To',
      validFor: 'Valid for',
      days: 'days',
      rubberGrades: 'Rubber Grades',
      enterBuyingPrices: 'Enter your buying prices in LKR per kilogram',
      rss3: 'RSS3',
      tsr20: 'TSR20',
      latex: 'Latex 60%',
      crepe: 'Crepe',
      customGrades: 'Custom Grades',
      yourCustomRubberGrades: 'Your custom rubber grades and prices',
      gradeNameExample: 'Grade name (e.g., RSS1, Custom Mix)',
      addCustomGrade: 'Add Custom Grade',
      addOtherRubberTypes: 'Add other rubber types or custom mixes',
      additionalNotesOptional: 'Additional Notes (Optional)',
      addSpecialConditions: 'Add any special conditions or notes for your suppliers...',
      clearAll: 'Clear All',
      updatePrices: 'Update Prices',
      updatedPricesVisible: 'Updated prices will be visible to all farmers immediately',
      confirmPriceUpdate: 'Confirm Price Update',
      sureUpdatePrices: 'Are you sure you want to update these prices?',
      visibleToFarmersImmediately: 'They will be visible to farmers immediately.',
      willBecomeActiveOnStartDate: 'These prices will become active on the start date.',
      loadingYourPrices: 'Loading your prices...',
      failedToLoadPrices: 'Failed to load your previous prices',
      failedToUpdatePrices: 'Failed to update prices. Please try again.',
      pleaseEnterAtLeastOnePrice: 'Please enter at least one price to update.',
      pleaseCompleteAllCustomGradeFields: 'Please complete all custom grade fields or remove empty ones.',
      invalidDate: 'Invalid Date',
      endDateMustBeAfterStartDate: 'End date must be after start date',
      selectStartDate: 'Select Start Date',
      selectEndDate: 'Select End Date',
      pricesUpdatedSuccessfully: 'Your prices have been updated successfully!',
      cancel: 'Cancel',
      done: 'Done',
      
      // Tutorials
      allTutorials: 'All Tutorials',
      buying: 'Buying',
      quality: 'Quality',
      processing: 'Processing',
      learningCenter: 'Learning Center',
      masterBuyerSkills: 'Master your buyer skills with expert guides',
      totalGuides: 'Total Guides',
      categories: 'Categories',
      expertTips: 'Expert Tips',
      results: 'results',
      steps: 'Steps',
      markAsComplete: 'Mark as Complete',
      noTutorialsFound: 'No tutorials found',
      tryDifferentCategory: 'Try a different category',
      showAll: 'Show All',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      tutorials: {
        tutorial1: {
          title: 'Getting Started as a Rubber Buyer',
          description: 'Learn the fundamentals of rubber purchasing and how to use this app effectively.',
          steps: [
            'Create your buyer profile with company details',
            'Set up your preferred rubber grades (RSS1, RSS2, etc.)',
            'Configure your buying regions and districts',
            'Set your initial purchase prices for each grade',
            'Enable notifications for price updates and farmer requests',
          ],
        },
        tutorial2: {
          title: 'Setting Competitive Purchase Prices',
          description: 'Master the art of setting prices that attract farmers while maintaining profitability.',
          steps: [
            'Check current market rates on the Market tab',
            'Research competitor prices using "Other Buyers" feature',
            'Factor in your transportation and processing costs',
            'Consider quality premiums for higher grades',
            'Set prices that offer fair value to farmers',
            'Update prices regularly based on market conditions',
          ],
        },
        tutorial3: {
          title: 'Understanding Rubber Grades',
          description: 'Learn to identify and differentiate between various rubber sheet grades.',
          steps: [
            'RSS1 (Ribbed Smoked Sheet Grade 1): Premium quality, light amber color, no defects',
            'RSS2: Good quality with minor color variations allowed',
            'RSS3: Standard grade with some imperfections permitted',
            'RSS4: Lower grade with visible defects but still usable',
            'RSS5: Lowest grade, significant defects present',
            'Crepe Rubber: Unsmoked, processed differently from RSS',
          ],
        },
        tutorial4: {
          title: 'Quality Assessment Techniques',
          description: 'Professional methods to evaluate rubber quality before purchase.',
          steps: [
            'Visual inspection: Check color uniformity and transparency',
            'Texture test: Feel for smoothness and absence of foreign particles',
            'Smell test: Fresh rubber has distinct, non-foul odor',
            'Moisture check: Proper drying is essential for quality',
            'Check for mold, bubbles, or contamination',
            'Verify proper ribbing pattern in RSS grades',
            'Document quality findings for price negotiation',
          ],
        },
        tutorial5: {
          title: 'Market Analysis & Trends',
          description: 'Track and analyze rubber market trends to make informed buying decisions.',
          steps: [
            'Monitor global rubber commodity prices (SICOM, TOCOM)',
            'Track seasonal price patterns (low during monsoon)',
            'Analyze supply-demand dynamics in your region',
            'Watch for weather events affecting production',
            'Follow government policies on rubber trade',
            'Use historical data to predict price movements',
          ],
        },
        tutorial6: {
          title: 'Building Farmer Relationships',
          description: 'Develop strong, long-term relationships with rubber farmers.',
          steps: [
            'Offer fair and transparent pricing',
            'Maintain consistent buying schedules',
            'Provide timely payments to build trust',
            'Communicate clearly about quality requirements',
            'Offer guidance on improving rubber quality',
            'Be accessible and responsive to farmer queries',
          ],
        },
        tutorial7: {
          title: 'Rubber Processing Knowledge',
          description: 'Understand how rubber is processed from latex to finished sheets.',
          steps: [
            'Latex collection: Fresh latex from rubber trees',
            'Coagulation: Adding acid to form rubber lumps',
            'Sheet pressing: Rolling into thin sheets',
            'Ribbing: Creating pattern for even drying',
            'Smoking/Drying: Preserving and coloring the sheets',
            'Grading: Sorting by quality standards',
            'Storage: Proper conditions to maintain quality',
          ],
        },
        tutorial8: {
          title: 'Logistics & Transportation',
          description: 'Best practices for collecting and transporting rubber efficiently.',
          steps: [
            'Plan collection routes for efficiency',
            'Use proper packaging to prevent contamination',
            'Maintain appropriate vehicle temperature',
            'Document weight and quality at collection',
            'Handle rubber carefully to avoid damage',
            'Schedule regular collection days with farmers',
            'Track inventory and maintain records',
          ],
        },
      },
    },

    officer: {
      // Layout / Navigation
      dashboard: 'Home',
      farmers: 'Farmers',
      tutorials: 'Tutorials',
      settings: 'Settings',
      officerDashboard: 'Officer Dashboard',
      farmerManagement: 'Farmer Management',
      tutorialsGuides: 'Tutorials & Guides',
      profileSettings: 'Settings',
      // Farmers Screen
      farmerDirectory: 'Farmer Directory',
      farmerDirectoryDesc: 'Browse and manage farmer profiles',
      createEvent: 'Create Event',
      createEventDesc: 'Schedule new farming events',
      viewEvents: 'View Events',
      viewEventsDesc: 'Manage upcoming events',
      marketPrice: 'Market Price',
      marketPriceDesc: 'View current rubber prices',
      totalFarmers: 'Total Farmers',
      totalEvents: 'Total Events',
      upcoming: 'Upcoming',
      total: 'Total',
      event: 'Event',
      events: 'Events',
      newEvent: 'New Event',
      livePrices: 'Live Prices',
      errorLoadingData: 'Failed to load dashboard data. Please try again.',
      // Tutorials Screen
      learningModulesAvailable: 'Learning Modules Available',
      topics: 'Topics',
      whatYoullLearn: "What You'll Learn",
      availableResources: 'Available Resources',
      watchOnYoutube: 'Watch on YouTube',
      visitOfficialWebsite: 'Visit Official Website',
      close: 'Close',
      unableToOpenLink: 'Unable to Open Link',
      checkInternetConnection: 'Please check your internet connection or try again later.',
      video: 'VIDEO',
      docs: 'DOCS',
      reference: 'Reference',
      tutorial1Title: 'Getting Started',
      tutorial1Desc: 'Complete guide to using the Rubber Officer Dashboard',
      tutorial1Content: [
        'Introduction to Rubber Edge Rubber Management System',
        'Navigating the Officer Dashboard and main features',
        'Managing farmer directory and profiles',
        'Using disease detection and diagnosis tools',
        'Market prices and update features',
        'Event creation and management',
        'Chat and communication with farmers',
      ],
      tutorial2Title: 'Rubber Tapping Techniques',
      tutorial2Desc: 'Modern and traditional rubber tapping methods',
      tutorial2Content: [
        'When to start tapping - Trees at 6-7 years with 50cm girth',
        'Proper tapping time - Early morning 3-6 AM',
        'Half-spiral cutting at 30° angle downward',
        'Maintaining 1-1.5mm bark thickness',
        'Sharp knife maintenance and techniques',
        'Alternate day vs daily tapping systems',
        'Latex collection and cup placement',
        'Preventing tapping panel dryness (TPD)',
      ],
      tutorial3Title: 'Diseases & Pest Management',
      tutorial3Desc: 'Identifying and controlling rubber tree diseases',
      tutorial3Content: [
        'Leaf diseases - Secondary leaf fall control',
        'Root diseases - Purple and white root disease',
        'Panel diseases - Black stripe and mouldy rot',
        'Powdery mildew and copper spray treatment',
        "Bird's eye spot in nurseries",
        'Common pests - Termites, mites, mealybugs',
        'Integrated pest management strategies',
        'Chemical control and fungicide application',
      ],
      tutorial4Title: 'Plantation Management',
      tutorial4Desc: 'Best practices for rubber plantation operations',
      tutorial4Content: [
        'Site selection and land preparation',
        'Proper spacing - 375 trees per hectare',
        'Nursery management and seedling selection',
        'Budding and grafting high-yield clones',
        'Fertilizer and soil nutrition management',
        'Cover crops and intercropping',
        'Weed control and maintenance',
        'Water management and irrigation',
      ],
      tutorial5Title: 'Processing & Quality Control',
      tutorial5Desc: 'Latex processing and quality standards',
      tutorial5Content: [
        'Latex collection and field coagulation',
        'Anti-coagulants and preservatives',
        'Sheet rubber production and smoking',
        'Technically Specified Rubber (TSR) grades',
        'Dry rubber content (DRC) testing',
        'Tensile strength testing (ASTM D412)',
        'ISO 9001 quality management',
        'Export quality requirements',
      ],
      tutorial6Title: 'Market Management & Schemes',
      tutorial6Desc: 'Marketing strategies and government programs',
      tutorial6Content: [
        'Global rubber market trends and pricing',
        'Local market dynamics',
        'Government subsidy schemes',
        'Rubber Board support programs',
        'Price stabilization and minimum support',
        'Export opportunities',
        'Cooperative societies marketing',
        'Insurance and credit facilities',
      ],
      tutorial7Title: 'Official RRISL Resources',
      tutorial7Desc: 'Government handbooks and technical publications',
      tutorial7Content: [
        'RRISL Handbook - Complete agronomic recommendations',
        'RDD Publications - Soil conservation and land preparation',
        'Advisory Circulars - Disease management protocols',
        'Technical Guides - Fertilizer application schedules',
        'Processing Standards - Quality control guidelines',
        'Rubber-Based Farming Systems documentation',
        'Latest research updates and innovations',
        'Contact information for advisory services',
      ],
      tutorial8Title: 'Sri Lankan Rubber Authority Links',
      tutorial8Desc: 'Direct access to government rubber institutes',
      tutorial8Content: [
        'Rubber Research Institute of Sri Lanka (RRISL) - www.rrisl.gov.lk',
        'Rubber Development Department (RDD) - www.rubberdev.gov.lk',
        'Downloadable handbooks and technical manuals',
        'Advisory circulars for plantation management',
        'Rain guard application techniques',
        'Intercropping strategy guides',
        'White root disease management protocols',
        'RSS manufacture and latex processing standards',
      ],
      // Dashboard Screen
      goodMorning: 'Good Morning',
      goodAfternoon: 'Good Afternoon',
      goodEvening: 'Good Evening',
      officer: 'Officer',
      loadingCarousel: 'Loading carousel...',
      recentEvents: 'Recent Events',
      viewAll: 'View All',
      noEventsFound: 'No events found',
      createFirstEvent: 'Create your first event!',
      cancelled: 'Cancelled',
      ended: 'Ended',
      latestRubberNews: 'Latest Rubber News',
      noRubberNewsAvailable: 'No rubber news available',
      readMore: 'Read more',
    },

    learningCenter: {
      title: 'Learning Center',
      all: 'All',
      planting: 'Planting',
      tapping: 'Tapping',
      diseaseControl: 'Disease Control',
      fertilizers: 'Fertilizers',
      watchVideo: 'Watch Video',
      openInYoutube: 'Open in YouTube App',
      video: 'Video',
      article: 'Article',
      guide: 'Guide',
      noMaterialsFound: 'No learning materials found',
      // Learning Items
      item1: {
        title: 'Introduction to Rubber Farming',
        description: 'Learn the basics of rubber cultivation and best practices for beginners.',
        longDescription: `Rubber farming is a long-term agricultural investment that requires correct planning from the first day. This lesson explains the full foundation of rubber cultivation in a step-by-step, beginner-friendly way that is also useful for field officers and buyers who want to understand how plantations are managed.

You will learn:
• Where rubber grows best (rainfall, temperature, altitude, wind conditions)  
• How to choose land and why drainage matters for rubber roots  
• Soil basics (texture, pH, organic matter) and why soil testing is important  
• Rubber plantation life-cycle: nursery → field planting → immature stage → tappable stage  
• Proper spacing, shade control, weed control, and early maintenance  
• Common mistakes that reduce survival rate and future latex yield  

This content is designed to help new farmers avoid costly errors, improve tree survival, and establish plantations that can produce consistent latex for many years. If you are starting a new field or planning replanting, use this as your first reference before moving into detailed lessons like soil preparation, clone selection, and nursery management.`,
      },
      item2: {
        title: 'Proper Tapping Techniques',
        description: 'Master the art of rubber tapping to maximize yield while maintaining tree health.',
        longDescription: `Tapping is the most important operation in rubber production because it directly affects latex yield and the lifespan of the tree. A good tapping cut produces strong latex flow while protecting the cambium so the bark can regenerate properly.

This lesson covers:
• Correct tapping angle and why it matters for latex flow  
• Safe tapping depth (how to avoid cambium damage)  
• Tapping length and positioning of the cut  
• Knife handling, sharpening, and consistency for daily tapping  
• Tapping frequency (e.g., d/2, d/3 systems) and resting periods  
• Mistakes to avoid: over-tapping, rough bark scraping, repeated deep cuts  
• How poor tapping reduces yield and shortens productive life  

By following correct technique, farmers can improve daily collection, reduce bark injuries, and maintain stable production for many years. This lesson is recommended for new tappers, farm supervisors, and anyone training field staff.`,
      },
      item3: {
        title: 'Identifying Common Rubber Tree Diseases',
        description: 'Learn to identify and treat common diseases affecting rubber trees.',
        longDescription: `Diseases can reduce latex yield, weaken trees, and spread rapidly if not detected early. This lesson helps farmers and officers identify common rubber tree diseases using field symptoms and simple observation methods.

You will learn:
• Early warning signs: yellowing leaves, leaf fall, poor flushing, dieback  
• Fungal leaf diseases and seasonal patterns  
• Stem and bark diseases: lesions, cracking, abnormal sap flow  
• Root problems: wilting, poor growth, root smell, and decay signs  
• Field hygiene practices that reduce disease spread  
• Safe management: pruning, sanitation, drainage correction, and targeted treatments  
• When to contact agriculture officers and how to report outbreaks  

This guide is built for practical use in the field. If you can identify disease early, you can often protect the plantation at low cost compared to late-stage control.`,
      },
      item4: {
        title: 'Soil Preparation for Rubber Plantation',
        description: 'Complete guide on preparing soil for optimal rubber tree growth.',
        longDescription: `Soil preparation decides how well rubber trees establish their roots and how they perform in the first 3 years. Poor soil preparation causes waterlogging, nutrient loss, and weak root development.

This lesson explains:
• Land clearing and correct field layout planning  
• Soil testing basics (pH, organic matter, NPK and micro nutrients)  
• Pit preparation: recommended pit size and correct filling  
• Adding compost/organic matter to improve structure and moisture balance  
• Drainage channels and contour lines for sloping lands  
• Mulching methods to reduce weeds and maintain moisture  
• How to prepare soil for best survival and fast early growth  

This guide is especially useful before planting season. It can reduce seedling death, improve uniform growth, and reduce future fertilizer wastage.`,
      },
      item5: {
        title: 'Fertilizer Application Schedule',
        description: 'Learn when and how to apply fertilizers for maximum rubber yield.',
        longDescription: `Rubber trees need balanced nutrition to develop strong trunks, healthy leaves, and stable latex production. A proper fertilizer schedule improves yield while reducing waste and unnecessary cost.

This lesson covers:
• Nutrient needs by growth stage: immature vs mature tapping stage  
• How to choose NPK types and why soil tests matter  
• Application methods: ring application, split-dose approach, timing with rainfall  
• How to avoid fertilizer burn and root damage  
• Cost-saving techniques: compost + correct chemical timing  
• Signs of nutrient deficiency: leaf color changes, poor flushing, stunted growth  
• Record keeping for consistent results across the field  

If you follow a proper schedule and apply correctly, you'll get healthier trees, stronger bark regeneration, and better latex performance over time.`,
      },
      item6: {
        title: 'Tapping Panel Management',
        description: 'Effective strategies for managing tapping panels over the tree lifecycle.',
        longDescription: `Tapping panel management is a long-term strategy that protects bark, ensures regeneration, and supports consistent harvesting over the productive life of rubber trees.

You will learn:
• What a tapping panel is and how panel rotation works  
• When to open a new panel and when to rest a panel  
• How to monitor bark thickness and regeneration  
• How to reduce panel dryness and bark consumption issues  
• Best practices for planning tapping systems across years  
• Importance of record keeping and supervision on estates  
• Practical tips to keep trees productive for longer with stable yield  

This content is ideal for supervisors, estate managers, and experienced farmers managing tapping teams.`,
      },
      item7: {
        title: 'Preventing White Root Disease',
        description: 'Prevention and treatment methods for white root disease in rubber trees.',
        longDescription: `White root disease is one of the most damaging rubber plantation diseases because it destroys the root system and can spread between trees through soil contact.

This lesson explains:
• What causes white root disease and how it spreads  
• Field symptoms: leaf wilting, sudden yellowing, reduced latex, root decay  
• High-risk conditions: waterlogging, old stumps, poor drainage  
• Prevention: stump removal, field sanitation, and proper drainage  
• Early treatment options and how to isolate affected trees  
• Long-term strategies for replanting and soil management  
• How to report and manage outbreaks with officers  

Early detection saves large sections of the field. This lesson is critical for both smallholders and estate-level management.`,
      },
      item8: {
        title: 'Clonal Selection for Planting',
        description: 'Guide to selecting the right rubber clones for your plantation.',
        longDescription: `The clone you plant decides your plantation's future yield, disease resistance, and adaptability to local climate. Selecting the wrong clone can lead to poor performance even if farm management is good.

This lesson covers:
• What "rubber clones" mean and why they are important  
• Key selection factors: yield potential, disease resistance, growth rate  
• Matching clones to local rainfall, temperature, and soil type  
• Nursery sourcing: how to ensure genuine, healthy clone material  
• Avoiding mixed/unknown clones and poor planting materials  
• Practical decision checklist for farmers and officers  

This guide supports farmers in making safer planting decisions that improve long-term productivity and reduce disease risk.`,
      },
      item9: {
        title: 'Rainy Season Tapping Tips',
        description: 'Techniques for effective tapping during the rainy season.',
        longDescription: `Rainy seasons reduce tapping days and can cause bark infections if tapping is done incorrectly. This lesson explains practical methods to keep collections stable while protecting trees.

You will learn:
• Rain guarding methods and when to install guards  
• Adjusting tapping time based on rainfall patterns  
• Preventing fungal infections on wet tapping panels  
• Safe latex collection and cup hygiene during wet days  
• Handling water contamination in latex  
• Protecting tappers' safety in slippery conditions  

These tips help farmers maintain productivity without increasing damage risk during heavy rain periods.`,
      },
      item10: {
        title: 'Organic Fertilizers for Rubber',
        description: 'Benefits and application of organic fertilizers in rubber farming.',
        longDescription: `Organic fertilizers improve long-term soil health and reduce dependence on chemical inputs. For rubber plantations, organic matter supports better moisture holding, stronger root systems, and healthier microbial activity.

This lesson covers:
• Types of organic inputs: compost, manure, green manure, mulch, bio-fertilizers  
• Benefits to soil structure and nutrient cycling  
• How to apply organic fertilizer effectively (timing + placement)  
• Combining organic and chemical fertilizers safely  
• Low-cost organic sources farmers can use locally  
• Mistakes to avoid: applying fresh manure too close to roots, improper composting  

This is recommended for farmers who want sustainable farming and improved soil condition over time.`,
      },
      item11: {
        title: 'Managing Leaf Diseases',
        description: 'Identification and control of common rubber leaf diseases.',
        longDescription: `Leaf diseases reduce photosynthesis, weaken trees, and lower latex yield. When leaf disease becomes frequent, plantations can suffer long-term decline.

This lesson explains:
• Common leaf diseases and how to identify them in the field  
• Seasonal risk periods and how weather affects disease spread  
• Field hygiene: pruning, removing infected leaves, managing shade  
• Preventive spray timing and safe application practices  
• Resistant clones as a long-term protection strategy  
• Monitoring plan: how often to check and what to record  

This guide helps farmers take action early and reduce plantation-wide spread.`,
      },
      item12: {
        title: 'Nursery Management',
        description: 'Setting up and managing a rubber tree nursery.',
        longDescription: `A healthy nursery creates strong planting materials and directly improves field survival rate. Poor nursery practices produce weak seedlings that struggle after planting and may carry pests or diseases.

This lesson covers:
• Seed selection and germination basics  
• Polybag preparation, soil mix, drainage and shade management  
• Watering schedule and avoiding overwatering  
• Pest and disease prevention in nursery stage  
• Hardening process before field planting  
• Selecting the best seedlings: stem thickness, leaf health, root development  
• Nursery records and timing for transplanting  

This is ideal for farmers, cooperatives, and agricultural training programs producing high-quality rubber plants.`,
      },
    },

    faq: {
      title: 'FAQs',
      subtitle: 'Find answers to the most common questions about RubberEdge',
      general: 'General',
      disease: 'Disease Detection',
      quality: 'Latex Quality',
      market: 'Market & Pricing',
      account: 'Account & Settings',
      stillNeedHelp: 'Still have questions?',
      stillNeedHelpDesc: 'Our support team is here to help you',
      contactSupport: 'Contact Support',
      
      // General Questions
      whatIsRubberEdge: 'What is RubberEdge?',
      whatIsRubberEdgeAns: 'RubberEdge is a comprehensive mobile application designed to help rubber farmers manage their plantations, monitor latex quality, detect diseases, and connect with buyers and agricultural officers.',
      whoCanUse: 'Who can use this app?',
      whoCanUseAns: 'The app is designed for rubber farmers, agricultural officers, and latex buyers. Each user type has access to features tailored to their needs.',
      isFree: 'Is the app free to use?',
      isFreeAns: 'Yes, the basic features of RubberEdge are free to use. Some premium features may require a subscription in the future.',
      offlineUsage: 'Can I use the app offline?',
      offlineUsageAns: 'Yes! The app stores data locally and syncs when connectivity is restored. Critical alerts and recent data remain accessible offline.',
      
      // Disease Detection Questions
      diseaseAccuracy: 'How accurate is the disease detection?',
      diseaseAccuracyAns: 'Our AI-powered disease detection system uses MobileNet-YOLOv8 model and provides 99.43% accuracy in identifying common rubber tree diseases including CLSD.',
      detectedDisease: 'What should I do if a disease is detected?',
      detectedDiseaseAns: 'When a disease is detected, the app will provide recommended treatment plans. You can also contact agricultural officers directly through the app for expert guidance.',
      whichDiseases: 'Which diseases can the app detect?',
      whichDiseasesAns: 'The app can detect various rubber tree diseases including Corynespora Leaf Spot Disease (CLSD), Powdery Mildew, Anthracnose, and other common fungal infections.',
      
      // Latex Quality Questions
      qualityMeasured: 'How is latex quality measured?',
      qualityMeasuredAns: 'Latex quality is measured using IoT sensors that monitor pH levels, turbidity, DRC (Dry Rubber Content), temperature, and humidity in real-time.',
      qualityAccuracy: 'How accurate is the quality assessment?',
      qualityAccuracyAns: 'Our IoT system provides 98.7% accuracy in latex quality monitoring using calibrated sensors. This reduces rejection rates from 30% to below 7%.',
      viewHistory: 'Can I view quality history?',
      viewHistoryAns: 'Yes, you can view detailed quality history and trends by tapping on any metric in the Dashboard. Historical data helps you track improvements over time.',
      
      // Market & Pricing Questions
      pricesDetermined: 'How are latex prices determined?',
      pricesDeterminedAns: 'Latex prices are updated daily based on market conditions. The app shows current prices from multiple buyers, allowing you to compare and choose the best offers.',
      sellDirectly: 'Can I sell directly through the app?',
      sellDirectlyAns: 'Yes, you can connect with verified buyers and initiate sales directly through the app. All transactions are recorded for transparency.',
      blockchainTraceability: 'What is blockchain traceability?',
      blockchainTraceabilityAns: 'Using Hyperledger Fabric, every batch is tracked from farm to factory. This provides EUDR compliance, reduces fraud, and ensures transparent pricing.',
      
      // Account & Settings Questions
      updateProfile: 'How do I update my profile?',
      updateProfileAns: 'Go to Settings > Edit Profile to update your personal information, contact details, and plantation details.',
      changePassword: 'How do I change my password?',
      changePasswordAns: 'Navigate to Settings > Security > Change Password. You will need to enter your current password and then your new password twice to confirm.',
      multiplePlantations: 'Can I add multiple plantations?',
      multiplePlantationsAns: 'Yes, you can manage multiple plantations from a single account. Go to Settings > Plantations > Add New Plantation to register additional properties.',
    },
    helpSupport: {
      title: 'Help & Support',
      selectYourRole: 'Select Your Role',
      frequentlyAskedQuestions: 'Frequently Asked Questions',
      contactSupport: 'Contact Support',
      callSupport: 'Call Support',
      emailSupport: 'Email',
      whatsAppSupport: 'WhatsApp',
      farmer: 'Farmer',
      officer: 'Officer',
      buyer: 'Buyer',
      
      // Farmer FAQs
      farmerQ1: 'How do I read sensor data from my plantation?',
      farmerA1: 'Navigate to the Dashboard and select your plantation. The IoT sensors will display real-time data for pH, turbidity, DRC, temperature, and humidity. Tap any metric to see detailed history and trends.',
      farmerQ2: 'What should I do if I receive a disease alert?',
      farmerA2: 'Disease alerts appear immediately when CLSD is detected. Follow the recommended treatment plan provided in the alert. You can also contact agricultural officers directly through the app for expert guidance.',
      farmerQ3: 'How accurate is the latex quality assessment?',
      farmerA3: 'Our IoT system provides 98.7% accuracy in latex quality monitoring using calibrated pH, turbidity, and DRC sensors. This reduces rejection rates from 30% to below 7%.',
      farmerQ4: 'Can I access the app without internet?',
      farmerA4: 'Yes! The app stores data locally and syncs when connectivity is restored. Critical alerts and recent data remain accessible offline.',
      farmerQ5: 'How do I connect my IoT sensors?',
      farmerA5: 'Go to Settings > Devices > Add New Sensor. Follow the pairing instructions for your ESP32-based sensor kit. Contact support if you need technical assistance.',
      
      // Officer FAQs
      officerQ1: 'How do I monitor multiple plantations?',
      officerA1: 'Your officer dashboard provides an overview of all registered plantations in your jurisdiction. Use filters to view by region, disease status, or quality metrics.',
      officerQ2: 'How can I send recommendations to farmers?',
      officerA2: 'Select any farmer\'s profile and use the \'Send Advisory\' feature. You can provide disease management guidance, cultivation tips, or quality improvement recommendations.',
      officerQ3: 'What reports can I generate?',
      officerA3: 'Generate regional disease outbreak reports, yield predictions, quality assessment summaries, and compliance reports for EU Deforestation-Free Regulation (EUDR).',
      officerQ4: 'How do I validate disease detection results?',
      officerA4: 'The MobileNet-YOLOv8 model provides 99.43% accuracy. You can review detection images, confidence scores, and historical patterns before confirming diagnoses.',
      
      // Buyer FAQs
      buyerQ1: 'How can I verify latex quality before purchase?',
      buyerA1: 'Each batch includes verified IoT sensor readings (pH, turbidity, DRC) stored on the blockchain. View complete quality history and certification status before placing orders.',
      buyerQ2: 'What is blockchain traceability?',
      buyerA2: 'Using Hyperledger Fabric, every batch is tracked from farm to factory. This provides EUDR compliance, reduces fraud, and ensures transparent pricing.',
      buyerQ3: 'How do I place orders through the app?',
      buyerA3: 'Browse available latex batches, review quality metrics, check supplier ratings, and place orders directly. All transactions are recorded on the blockchain.',
      buyerQ4: 'Can I track shipment status?',
      buyerA4: 'Yes! Real-time tracking shows pickup, processing, and delivery status. Blockchain records provide immutable proof of quality throughout the supply chain.',
    },
    contactPage: {
      headerTitle: 'Contact Us',
      heroInfoTitle: "We're Here to Help",
      heroInfoSubtitle: 'Get in touch with our support team and we\'ll respond as soon as possible',
      quickContact: 'Quick Contact',
      sendUsMessage: 'Send Us a Message',
      yourName: 'Your Name',
      yourNamePlaceholder: 'Enter your name',
      emailAddress: 'Email Address',
      emailAddressPlaceholder: 'Enter your email',
      subject: 'Subject',
      subjectPlaceholder: 'What is this about?',
      message: 'Message',
      messagePlaceholder: 'Type your message here...',
      sendMessage: 'Send Message',
      sending: 'Sending...',
      messageSent: 'Message Sent!',
      messageSentDesc: 'Thank you for contacting us. We will get back to you within 24-48 hours.',
      fillAllFields: 'Please fill in all fields',
      invalidEmail: 'Please enter a valid email address',
      officeHours: 'Office Hours',
      mondayFriday: 'Monday - Friday: 8:00 AM - 5:00 PM',
      saturday: 'Saturday: 9:00 AM - 1:00 PM',
      sunday: 'Sunday: Closed',
      weHereToHelp: "We're Here to Help",
      supportTeam: 'Get in touch with our support team',
    },
    farmerDirectory: {
      headerTitle: 'Farmer Directory',
      searchPlaceholder: 'Search farmers...',
      loadingFarmers: 'Loading farmers...',
      noFarmersFound: 'No farmers found',
      noFarmersDesc: 'No farmers registered yet',
      tryAdjustingSearch: 'Try adjusting your search terms',
      farmer: 'Farmer',
      farmers: 'Farmers',
      failedToLoadFarmers: 'Failed to load farmers. Please try again.',
    },
    officerDirectory: {
      headerTitle: 'Support Officers',
      loadingOfficers: 'Loading officers...',
      noOfficersAvailable: 'No Officers Available',
      noOfficersDesc: 'There are currently no support officers in the system.',
      retry: 'Retry',
      tapToViewDetails: 'Tap to view details',
      officer: 'Officer',
      officers: 'Officers',
      failedToLoadOfficers: 'Failed to load officers. Please try again.',
    },
    officerDetail: {
      headerTitle: 'Officer Details',
      loadingOfficerDetails: 'Loading officer details...',
      officerNotFound: 'Officer not found',
      phone: 'Phone',
      employeeId: 'Employee ID',
      department: 'Department',
      role: 'Role',
      verified: 'Verified',
      joined: 'Joined',
      yes: 'Yes',
      no: 'No',
      callOfficer: 'Call Officer',
      startChat: 'Start Chat',
      failedToLoadOfficerDetails: 'Failed to load officer details.',
      failedToStartChat: 'Failed to start chat with officer.',
    },
    chatScreen: {
      online: 'Online',
      connecting: 'Connecting...',
      noMessagesYet: 'No messages yet',
      startConversation: 'Start the conversation with {name}!',
      noConversationSelected: 'No conversation selected',
      roleMismatch: 'Role mismatch detected',
      goBack: 'Go Back',
      messagePlaceholder: 'Message {name}...',
    },
    userGuide: {
      headerTitle: 'User Guide',
      welcomeTitle: 'Welcome to RubberEdge',
      welcomeSubtitle: 'Learn how to use all the features of the app to manage your rubber plantation effectively',
      howToUse: 'How to Use',
      gettingStarted: 'Getting Started',
      diseaseDetection: 'Disease Detection',
      monitoringLatexQuality: 'Monitoring Latex Quality',
      marketAndSelling: 'Market & Selling',
      weatherForecasts: 'Weather Forecasts',
      gettingHelp: 'Getting Help',
      usingOffline: 'Using Offline',
      needMoreHelp: 'Need More Help?',
      needMoreHelpSubtitle: 'Contact our support team or chat with our AI assistant',
      chatWithAI: 'Chat with AI',
      contactUs: 'Contact Us',
      // Getting Started steps
      createAccountTitle: 'Create Your Account',
      createAccountDesc: 'Sign up with your phone number and verify using OTP. Fill in your basic details like name, location, and plantation information.',
      setUpProfileTitle: 'Set Up Your Profile',
      setUpProfileDesc: 'Complete your profile by adding your farm details, contact information, and selecting your preferred language.',
      exploreDashboardTitle: 'Explore the Dashboard',
      exploreDashboardDesc: 'Your dashboard shows real-time latex quality metrics, weather updates, market prices, and important notifications.',
      // Disease Detection steps
      takePhotoTitle: 'Take a Photo',
      takePhotoDesc: 'Go to the Diagnose tab and tap the camera button. Take a clear photo of the affected rubber leaf.',
      waitForAnalysisTitle: 'Wait for Analysis',
      waitForAnalysisDesc: 'Our AI will analyze the image and identify any diseases within seconds using advanced machine learning.',
      viewResultsTitle: 'View Results',
      viewResultsDesc: 'See the detected disease, confidence level, and detailed information about symptoms and causes.',
      getTreatmentTitle: 'Get Treatment',
      getTreatmentDesc: 'Follow the recommended treatment plan and prevention tips. You can also contact an agricultural officer for expert advice.',
      // Latex Quality steps
      viewRealTimeDataTitle: 'View Real-time Data',
      viewRealTimeDataDesc: 'Check your dashboard for live readings of pH, DRC, temperature, humidity, and turbidity from IoT sensors.',
      understandMetricsTitle: 'Understand Metrics',
      understandMetricsDesc: 'Tap on any metric card to see detailed explanations, optimal ranges, and historical trends.',
      setQualityAlertsTitle: 'Set Quality Alerts',
      setQualityAlertsDesc: 'Configure notifications to alert you when any metric falls outside the optimal range.',
      improveQualityTitle: 'Improve Quality',
      improveQualityDesc: 'Follow AI-powered recommendations to improve your latex quality and get better prices.',
      // Market steps
      checkMarketPricesTitle: 'Check Market Prices',
      checkMarketPricesDesc: 'Go to the Market tab to view current latex prices from different buyers in your area.',
      compareBuyersTitle: 'Compare Buyers',
      compareBuyersDesc: 'Compare prices, ratings, and terms from multiple buyers to get the best deal.',
      connectWithBuyersTitle: 'Connect with Buyers',
      connectWithBuyersDesc: 'Tap on a buyer to view their profile and initiate a conversation or sale request.',
      trackTransactionsTitle: 'Track Transactions',
      trackTransactionsDesc: 'All your sales are recorded with blockchain technology for complete transparency.',
      // Weather steps
      viewCurrentWeatherTitle: 'View Current Weather',
      viewCurrentWeatherDesc: 'Check real-time weather conditions for your plantation including temperature, humidity, and wind speed.',
      sevenDayForecastTitle: '7-Day Forecast',
      sevenDayForecastDesc: 'Plan your tapping schedule using the detailed 7-day weather forecast.',
      weatherAlertsTitle: 'Weather Alerts',
      weatherAlertsDesc: 'Receive notifications about rain, storms, or extreme weather conditions.',
      // Support steps
      aiChatAssistantTitle: 'AI Chat Assistant',
      aiChatAssistantDesc: 'Ask our AI assistant any question about rubber farming. Available 24/7 for instant help.',
      contactOfficersTitle: 'Contact Officers',
      contactOfficersDesc: 'Browse the officer directory and contact agricultural officers for expert guidance.',
      learningCenterTitle: 'Learning Center',
      learningCenterDesc: 'Access educational videos, articles, and guides about rubber cultivation best practices.',
      faqsTitle: 'FAQs',
      faqsDesc: 'Find quick answers to common questions in our comprehensive FAQ section.',
      // Offline steps
      offlineModeTitle: 'Offline Mode',
      offlineModeDesc: 'The app works offline! Your data is stored locally and syncs when you reconnect to the internet.',
      cachedDataTitle: 'Cached Data',
      cachedDataDesc: 'Recent quality readings, prices, and weather data remain accessible even without internet.',
      autoSyncTitle: 'Auto Sync',
      autoSyncDesc: 'When connectivity is restored, all your data automatically syncs with the server.',
    },

    // Buyers Screen
    buyersScreen: {
      headerTitle: 'Buyer Prices',
      headerSubtitle: 'View prices from registered buyers',
      searchPlaceholder: 'Search by name or city...',
      filterAll: 'All Grades',
      currentPrices: 'Current Prices',
      best: 'Best',
      lkr: 'LKR',
      perKg: 'per kg',
      additionalInfo: 'Additional Information',
      contactBuyer: 'Contact Buyer',
      error: 'Error',
      failedToLoadPrices: 'Failed to load prices',
      noPhoneAvailable: 'No phone number available',
      callError: 'Unable to make the call',
      buyers: 'Buyers',
      listings: 'Listings',
      verified: 'Verified',
      noPricesAvailable: 'No Prices Available',
      noBuyersPosted: 'No buyers have posted prices yet',
      tryAdjustingFilters: 'Try adjusting your filters',
      loadingPrices: 'Loading prices...',
    },

    // Other Buyers Prices Screen
    otherBuyersPricesScreen: {
      headerTitle: 'Other Buyer Prices',
      headerSubtitle: 'Compare prices across different buyers',
      noBuyersAvailable: 'No Buyers Available',
      noBuyersDesc: 'Unable to find other buyers at this time',
      unableToLoad: 'Unable to Load Data',
      tryAgain: 'Try Again',
      buyers: 'Buyers',
      prices: 'Prices',
      cities: 'Cities',
      loadingPrices: 'Loading prices...',
      pleaseWait: 'Please wait...',
      verified: 'Verified',
      pricesLabel: 'prices',
      updated: 'Updated',
      lkr: 'LKR',
    },

    // Weather Screen
    weatherScreen: {
      loadingWeather: 'Loading Weather...',
      feelsLike: 'Feels like',
      todaysTappingConditions: "Today's Tapping Conditions",
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor',
      notRecommended: 'Not Recommended',
      bestTappingWindow: 'Best Tapping Window',
      optimalLatexFlow: 'Optimal latex flow during this period',
      expectedLatexQuality: 'Expected Latex Quality',
      qualityGrade: 'Quality Grade',
      estDrc: 'Est. DRC',
      humidity: 'Humidity',
      wind: 'Wind',
      uvIndex: 'UV Index',
      pressure: 'Pressure',
      high: 'High',
      low: 'Low',
      normal: 'Normal',
      hourlyForecast: 'Hourly Forecast',
      sevenDayForecast: '7-Day Forecast',
      tappingScore: 'Tapping Score',
      rubberFarmingTips: 'Rubber Farming Tips',
      highRainProbability: 'High rain probability',
      avoidTappingRain: 'Avoid tapping to prevent latex dilution and bark damage.',
      highHumidity: 'High humidity',
      highHumidityDesc: 'High humidity may slow latex coagulation. Use ammonia preservation if needed.',
      highTemperature: 'High temperature',
      highTemperatureDesc: 'Tap early morning for best latex flow and quality.',
      optimalTappingTime: 'Optimal tapping time',
      optimalTappingDesc: 'Optimal tapping time is 30 minutes before sunrise when turgor pressure is highest.',
      checkTrees: 'Check trees',
      checkTreesDesc: 'Check your trees for panel dryness before tapping. Dry panels need rest periods.',
      today: 'Today',
      tomorrow: 'Tomorrow',
      weatherDataBy: 'Weather data by Open-Meteo.com',
      now: 'Now',
      // Weather conditions
      clearSky: 'Clear Sky',
      mainlyClear: 'Mainly Clear',
      partlyCloudy: 'Partly Cloudy',
      overcast: 'Overcast',
      foggy: 'Foggy',
      rimeFog: 'Rime Fog',
      lightDrizzle: 'Light Drizzle',
      drizzle: 'Drizzle',
      denseDrizzle: 'Dense Drizzle',
      lightRain: 'Light Rain',
      rain: 'Rain',
      heavyRain: 'Heavy Rain',
      lightSnow: 'Light Snow',
      snow: 'Snow',
      heavySnow: 'Heavy Snow',
      rainShowers: 'Rain Showers',
      moderateShowers: 'Moderate Showers',
      heavyShowers: 'Heavy Showers',
      thunderstorm: 'Thunderstorm',
      severeStorm: 'Severe Storm',
      unknown: 'Unknown',
      // Quality levels
      moderate: 'Moderate',
      // Recommendation texts
      excellentRecommendation: 'Perfect conditions for rubber tapping. Expect high quality latex yield.',
      goodRecommendation: 'Good conditions for tapping. Proceed with normal operations.',
      fairRecommendation: 'Moderate conditions. Consider delaying if possible for better yield.',
      poorRecommendation: 'Unfavorable conditions. Tapping may result in lower quality latex.',
      notRecommendedRecommendation: 'Do not tap today. Weather conditions will significantly affect latex quality.',
    },

    // Growth Screen
    growthScreen: {
      headerTitle: 'Growth Measurement',
      headerSubtitle: 'Track your rubber tree development',
      measureTreeGrowth: 'Measure Tree Growth',
      useCameraOrManual: 'Use camera measurement or enter values manually',
      camera: 'Camera',
      manual: 'Manual',
      latestMeasurement: 'Latest Measurement',
      allMeasurements: 'All Measurements',
      noMeasurements: 'No Measurements Yet',
      startMeasuringTrees: 'Start measuring your rubber trees using the camera',
      records: 'records',
      loading: 'Loading...',
      requiredField: 'Required Field',
      pleaseEnterTreeId: 'Please enter a Tree ID',
      pleaseEnterGirth: 'Please enter the Girth measurement',
      invalidValue: 'Invalid Value',
      pleaseEnterValidGirth: 'Please enter a valid girth measurement',
      pleaseEnterValidHeight: 'Please enter a valid height measurement',
      measurementSaved: 'Measurement saved!',
      deleteMeasurement: 'Delete Measurement',
      deleteConfirmation: 'Are you sure you want to delete this measurement?',
      deleteRecord: 'Delete',
      howToMeasure: 'How to Measure',
      positionReferenceCard: 'Position Reference Card',
      holdCard: 'Hold a standard credit/debit card (8.56cm width) next to the tree trunk at 120cm height from ground.',
      markCardWidth: 'Mark Card Width',
      tapLeftRight: 'Tap on the LEFT edge of the card, then tap on the RIGHT edge. This sets the measurement scale.',
      markTrunkDiameter: 'Mark Trunk Diameter',
      tapTwoPoints: 'Tap on one side of the trunk, then tap on the opposite side. The app calculates the girth automatically.',
      saveMeasurement: 'Save Measurement',
      onceCalculated: 'Once calculated, tap Save to record with tree ID and location.',
      treeReadyForTapping: 'Trees are ready for tapping when girth reaches 50cm at 120cm height',
      typicallyYears: '(typically 5-7 years).',
      bestAccuracy: 'For best accuracy, hold the phone parallel to the trunk with good lighting.',
      holdPhoneParallel: 'Hold the phone parallel to the trunk',
      gotIt: 'Got it!',
      manualEntry: 'Manual Entry',
      enterMeasurements: 'Enter measurements taken with a tape measure',
      treeId: 'Tree ID',
      eg: 'e.g., T-001, Block-A-15',
      girthCm: 'Girth (cm)',
      circumference: 'Circumference at 120cm height',
      heightCm: 'Height (cm)',
      optional: 'Optional',
      location: 'Location',
      egBlockA: 'e.g., Block A, Row 5',
      notes: 'Notes',
      observations: 'Any observations (health, bark condition, etc.)...',
      readyForTapping: 'Ready for Tapping',
      almostReady: 'Almost Ready',
      growingWell: 'Growing Well',
      earlyStage: 'Early Stage',
      tapCardPoints: 'Tap 2 points on CARD WIDTH',
      tapTrunkPoints: 'Tap 2 points across TRUNK DIAMETER',
      measurementComplete: 'Measurement complete! Tap Save to record.',
      tapTrunkPoints2: 'Tap 2 points across TRUNK DIAMETER',
      reset: 'Reset',
      longPressDelete: 'Long press to delete a record',
      requestingCamera: 'Requesting camera permission...',
      permissionRequired: 'Permission Required',
      cameraAccessNeeded: 'Camera access is needed',
      failedToSaveMeasurement: 'Failed to save measurement',
    },
    marketScreen: {
      rubberMarket: 'Rubber Market',
      liveLocationPrices: 'Sri Lanka • Live Prices',
      updated: 'Updated',
      loadingMarketData: 'Loading Market Data',
      fetchingPrices: 'Fetching latest rubber prices...',
      oops: 'Oops!',
      tryAgain: 'Try Again',
      failedToLoadPrices: 'Failed to load market prices. Please try again.',
      currentPrice: 'Current Price',
      weeklyChange: 'Weekly change from last period',
      sixMonthTrend: '6-Month Price Trend',
      rss3Grade: 'RSS3 Grade',
      marketStatistics: 'Market Statistics',
      weekHigh: 'Week High',
      weekLow: 'Week Low',
      monthHigh: 'Month High',
      monthLow: 'Month Low',
      noHistoricalData: 'No historical data available',
      statsUnavailable: 'Market statistics unavailable',
      allRubberGrades: 'All Rubber Grades',
      tapToSelect: 'Tap to select',
      dataSource: 'Data sourced from Colombo Rubber Traders Association (CRTA) auctions held twice weekly at the Ceylon Chamber of Commerce.',
      viewOfficialPrices: 'View Official CRTA Prices →',
      cannotOpenLink: 'Cannot Open Link',
      unableToOpenWebsite: 'Unable to open the CRTA website. Please visit www.crtasl.org manually.',
      failedToOpenWebsite: 'Failed to open the website.',
      rss1Desc: 'Ribbed Smoked Sheet Grade 1',
      rss2Desc: 'Ribbed Smoked Sheet Grade 2',
      rss3Desc: 'Ribbed Smoked Sheet Grade 3',
      rss4Desc: 'Ribbed Smoked Sheet Grade 4',
      rss5Desc: 'Ribbed Smoked Sheet Grade 5',
      latexDesc: 'Centrifuged Latex',
      tsr20Desc: 'Technically Specified Rubber',
      crepeDesc: 'Pale Crepe Rubber',
    },

    // Farm Location Screen
    farmLocation: {
      loading: 'Loading farm location...',
      updateYourLocation: 'Update your farm location',
      pinOnMap: 'Pin your farm on the map',
      searchPlaceholder: 'Search for your location...',
      noLocationsFound: '🔍 No locations found',
      searchUnavailable: '⚠️ Search unavailable. Try again later.',
      checkInternet: 'Check your internet connection',
      tryDifferentTerm: 'Try a different search term',
      instruction: '👆 Search or tap anywhere on the map to set your location',
      locationSelected: 'Location Selected',
      locationRequired: 'Location Required',
      selectLocationMessage: 'Please select your farm location on the map or search for an address.',
      updateSuccess: 'Your farm location has been updated successfully!',
      updateError: 'Failed to update farm location. Please try again.',
      saveButton: 'Save Farm Location',
    },

    // Terms of Service Screen
    termsOfServicePage: {
      headerTitle: 'Terms of Service',
      lastUpdated: 'Last Updated: December 2025',
      section1Title: 'Acceptance of Terms',
      section1Content: 'By accessing and using Rubber Edge, you accept and agree to be bound by these Terms of Service. This platform integrates IoT sensors, AI-powered analytics, and blockchain technology to support rubber cultivation in Sri Lanka.',
      section2Title: 'User Accounts',
      section2Content: 'You agree to:',
      section2Item1: 'Provide accurate registration information',
      section2Item2: 'Maintain the security of your account credentials',
      section2Item3: 'Notify us immediately of any unauthorized access',
      section2Item4: 'Use the platform in accordance with your designated role (Farmer, Officer, or Buyer)',
      section3Title: 'IoT Sensor Data',
      section3Content: 'Regarding sensor data:',
      section3Item1: 'Data accuracy is dependent on proper sensor calibration and maintenance',
      section3Item2: 'You are responsible for the physical security of IoT devices installed on your property',
      section3Item3: 'We provide technical support but do not guarantee uninterrupted sensor operation',
      section3Item4: 'Sensor readings are for advisory purposes; farming decisions remain your responsibility',
      section4Title: 'AI Predictions & Disease Detection',
      section4Content: 'Our AI models (LSTM for growth prediction, MobileNet-YOLOv8 for disease detection) provide advisory information based on historical data and current conditions. While our models achieve high accuracy rates (93.4% for growth prediction, 99.43% for disease detection), they should be used as decision-support tools alongside professional agricultural advice.',
      section5Title: 'Blockchain Transactions',
      section5Content: 'For supply chain transparency:',
      section5Item1: 'All quality data and transactions are recorded on Hyperledger Fabric blockchain',
      section5Item2: 'Blockchain records are immutable and cannot be altered once confirmed',
      section5Item3: 'You authorize the recording of your plantation data for traceability purposes',
      section5Item4: 'EUDR compliance data is shared with relevant regulatory authorities',
      section6Title: 'Intellectual Property',
      section6Content: 'Rubber Edge and all related technology, including IoT sensor designs, AI models, and software, are protected by intellectual property rights. You may not copy, modify, or reverse engineer any part of the system.',
      section7Title: 'Limitation of Liability',
      section7Content: 'We provide this platform as-is. While we strive for accuracy and reliability, we are not liable for crop losses, financial damages, or other consequences resulting from reliance on sensor data, AI predictions, or system downtime.',
      section8Title: 'Termination',
      section8Content: 'We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or misuse the platform. You may terminate your account at any time by contacting support.',
      section9Title: 'Changes to Terms',
      section9Content: 'We may update these Terms of Service periodically. Significant changes will be communicated via email or in-app notification. Continued use after changes constitutes acceptance of updated terms.',
      section10Title: 'Governing Law',
      section10Content: 'These terms are governed by the laws of Sri Lanka. Any disputes shall be resolved in the courts of Sri Lanka.',
      questionsAboutTerms: 'Questions About Terms?',
      emailContact: 'Email: legal@rubberedge.lk',
      phoneContact: 'Phone: +94 11 234 5678',
    },

    aboutScreen: {
      appName: 'Rubber Edge',
      appSubtitle: 'IoT, AI & Blockchain for Smart Rubber Cultivation',
      appDescription: 'Revolutionizing Sri Lanka\'s rubber industry through integrated technology solutions that empower smallholder farmers with real-time insights, predictive analytics, and transparent market access.',
      missionTitle: 'Our Mission',
      missionContent: 'To enhance productivity, quality, and income for Sri Lankan rubber farmers through affordable, scalable technology that addresses real-world challenges in latex quality monitoring, disease management, and supply chain transparency.',
      visionTitle: 'Our Vision',
      visionContent: 'A thriving, sustainable rubber industry in Sri Lanka where every farmer has access to cutting-edge technology, fair market opportunities, and the knowledge to maximize their plantation\'s potential while meeting global sustainability standards.',
      featuresTitle: 'Technology Features',
      feature1Title: 'IoT Sensor Network',
      feature1Desc: 'Real-time monitoring with 98.7% accuracy using ESP32-based sensors for pH, turbidity, DRC, temperature, and humidity.',
      feature2Title: 'AI Growth Prediction',
      feature2Desc: 'LSTM models predict tree height and latex yield with 93.4% accuracy, optimizing tapping schedules.',
      feature3Title: 'Disease Detection',
      feature3Desc: 'MobileNet-YOLOv8 detects CLSD 14 days before symptoms with 99.43% accuracy, reducing yield loss from 60% to 8.2%.',
      feature4Title: 'Blockchain Traceability',
      feature4Desc: 'Hyperledger Fabric ensures supply chain transparency and EUDR compliance, reducing rejection rates from 40% to 6%.',
      statsTitle: 'Performance Metrics',
      stat1Label: 'Latex Quality Accuracy',
      stat2Label: 'Growth Prediction Accuracy',
      stat3Label: 'Disease Detection Accuracy',
      stat4Label: 'Rejection Rate (down from 30%)',
      researchTitle: 'Research Background',
      researchPara1: 'Rubber Edge is the result of comprehensive research conducted at the Rubber Research Institute of Sri Lanka (RRISL) to address systemic challenges faced by smallholder farmers.',
      researchPara2: 'This platform integrates IoT sensor networks with AI-powered predictive analytics and blockchain traceability to solve fragmented technological systems in agriculture. The research addresses critical gaps in quality assurance, disease management, and market access through accurate, affordable, real-time decision support.',
      researchHighlight: 'B.Eng (Hons) in Software Engineering - Level 6 Research Project',
      teamTitle: 'Research Team',
      researcher: 'Researcher',
      supervisor: 'Supervisor',
      assessor: 'Assessor',
      contributionsTitle: 'Key Contributions',
      problemDomain: 'Problem Domain',
      problemItem1: 'Reduced rejection rates from 30% to 6.8% through real-time latex quality monitoring',
      problemItem2: 'Disease detection 14 days before symptom onset, reducing yield loss from 60% to 8.2%',
      problemItem3: 'LSTM-based growth prediction with 93.4% accuracy for optimized resource management',
      problemItem4: 'Blockchain traceability ensuring EUDR compliance and transparent supply chains',
      researchDomain: 'Research Domain',
      researchItem1: 'Novel integration of IoT, AI, and blockchain for tree crop management',
      researchItem2: 'Edge computing deployment for real-time processing in low-connectivity environments',
      researchItem3: 'Context-specific AI models for Sri Lankan rubber cultivation conditions',
      researchItem4: 'Scalable framework for smallholder adoption in developing countries',
      impactTitle: 'Impact on Rubber Industry',
      impactIntro: 'Rubber Edge addresses the urgent need for modernization in Sri Lanka\'s rubber sector, where traditional methods have led to declining productivity and market competitiveness. By providing smallholder farmers with enterprise-grade technology at affordable costs, the platform:',
      impact1: 'Improves latex quality consistency and pricing power',
      impact2: 'Enables early disease intervention and prevention',
      impact3: 'Provides data-driven insights for resource optimization',
      impact4: 'Ensures compliance with international sustainability standards',
      impact5: 'Creates transparent, fraud-resistant supply chains',
      impact6: 'Bridges the digital divide in rural agricultural communities',
      contactTitle: 'Get In Touch',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      website: 'Website',
      footerText: '© 2025 Rubber Edge. All rights reserved.',
      footerSubtext: 'Developed in collaboration with Rubber Research Institute of Sri Lanka',
    },
    walletSettings: {
      headerTitle: 'Blockchain Settings',
      headerSubtitle: 'Manage your wallet and network',
      wallet: 'Wallet',
      networkSettings: 'Network Settings',
      activeNetwork: 'Active Network',
      testnet: 'Testnet',
      mainnet: 'Mainnet',
      rpcUrl: 'RPC URL',
      chainId: 'Chain ID',
      dataSync: 'Data Sync',
      pendingRecords: 'Pending Records',
      records: 'records',
      syncNow: 'Sync Now',
      syncing: 'Syncing...',
      autoSync: 'Auto Sync',
      security: 'Security',
      exportPrivateKey: 'Export Private Key',
      biometricLock: 'Biometric Lock',
      comingSoon: 'Coming Soon',
      biometricComingSoonDesc: 'Biometric lock will be available in a future update.',
      quickActions: 'Quick Actions',
      transactionHistory: 'Transaction History',
      verifyTransaction: 'Verify Transaction',
      blockExplorer: 'Block Explorer',
      dangerZone: 'Danger Zone',
      disconnectWallet: 'Disconnect Wallet',
      footerPoweredBy: 'Powered by Polygon Network',
      footerVersion: 'RubberEdge Blockchain v1.0.0',
      noPendingData: 'No Pending Data',
      allDataSynced: 'All data is already synced to the blockchain.',
      walletNotConnected: 'Wallet Not Connected',
      connectWalletToSync: 'Please connect your wallet to sync data.',
      syncComplete: 'Sync Complete',
      syncedRecords: 'Synced',
      failedRecords: 'Failed',
      syncFailed: 'Sync Failed',
      syncFailedDesc: 'Failed to sync data. Please try again.',
      exportPrivateKeyTitle: 'Export Private Key',
      exportPrivateKeyWarning: 'Are you sure you want to export your private key? Anyone with access to your private key can control your wallet.',
      export: 'Export',
      privateKeyTitle: 'Private Key',
      contactSupportForExport: 'For security, please contact support to export your private key securely.',
      disconnectWalletTitle: 'Disconnect Wallet',
      disconnectWalletWarning: 'Are you sure you want to disconnect? Make sure you have backed up your private key.',
      disconnect: 'Disconnect',
    },
    verifyTransaction: {
      headerTitle: 'Verify Transaction',
      headerSubtitle: 'Check blockchain records',
      transactionHash: 'Transaction Hash',
      enterTxHashPlaceholder: 'Enter transaction hash (0x...)',
      verifyOnBlockchain: 'Verify on Blockchain',
      recordVerified: 'Record Verified!',
      notFoundLocally: 'Not Found Locally',
      recordedOnBlockchain: 'This record has been recorded on the blockchain.',
      notFoundLocallyDesc: 'This hash was not found in local records. You can check the blockchain explorer for details.',
      priceRecord: '💰 Price Record',
      transactionRecord: '🤝 Transaction Record',
      supplyChainBatch: '📦 Supply Chain Batch',
      grade: 'Grade',
      price: 'Price',
      recorded: 'Recorded',
      recorder: 'Recorder',
      farmerId: 'Farmer ID',
      buyerId: 'Buyer ID',
      amount: 'Amount',
      totalValue: 'Total Value',
      status: 'Status',
      location: 'Location',
      timestamp: 'Timestamp',
      viewOnBlockchainExplorer: 'View on Blockchain Explorer',
      howToVerify: 'How to Verify',
      howToVerifyDesc: 'Enter a transaction hash to verify that a price, transaction, or supply chain record exists on the blockchain. The hash should start with "0x" and be 66 characters long.',
      exampleTxHash: 'Example Transaction Hash:',
      error: 'Error',
      enterTxHash: 'Please enter a transaction hash',
      invalidHash: 'Invalid Hash',
      invalidHashDesc: 'Please enter a valid transaction hash (0x...)',
      verificationFailed: 'Verification Failed',
      verificationFailedDesc: 'Failed to verify transaction. Please try again.',
    },
  },
  
  si: {
    common: {
      continue: 'ඉදිරියට යන්න',
      cancel: 'අවලංගු කරන්න',
      logout: 'පිටවීම',
      delete: 'මකන්න',
      discard: 'අවලංගු කරන්න',
      clear: 'හිස් කරන්න',
      success: 'සාර්ථකයි',
      error: 'දෝෂයක්',
      ok: 'හරි',
      yes: 'ඔව්',
      no: 'නැත',
      or: 'හෝ',
      loading: 'පූරණය වෙමින්...',
      save: 'සුරකින්න',
      submit: 'ඉදිරිපත් කරන්න',
      back: 'ආපසු',
      next: 'ඊළඟ',
      skip: 'මඟ හරින්න',
      done: 'අවසන්',
      search: 'සොයන්න',
      noData: 'දත්ත නොමැත',
      retry: 'නැවත උත්සාහ කරන්න',
      seeAll: 'සියල්ල බලන්න',
      readMore: 'තවත් කියවන්න',
      pleaseEnter: 'කරුණාකර ඇතුළු කරන්න',
    },
    languageSelection: {
      title: 'භාෂාව තෝරන්න',
      subtitle: 'ඔබට අවශ්‍ය භාෂාව තෝරන්න',
      english: 'ඉංග්‍රීසි',
      sinhala: 'සිංහල',
      tamil: 'දෙමළ',
    },
    onboarding: {
      title1: 'සෞඛ්‍ය සම්පන්න රබර් ගස් වගා කරන්න',
      desc1: 'AI හි බලය සමඟ රබර් ගස් රෝග කලින් හඳුනා ගන්න. ඔබේ ගස්වල ඡායාරූපයක් ගෙන, අපගේ පද්ධතිය ක්ෂණිකව විශ්ලේෂණය කර ආසාදන හෝ අසාමාන්‍යතා හඳුනා ගනී. ප්‍රතිකාර යෝජනා සහ වැළැක්වීමේ උපදෙස් ද ඔබට ලැබේ.',
      title2: 'ඔබේ අස්වැන්න නිරීක්ෂණය කර වැඩිදියුණු කරන්න',
      desc2: 'ස්මාර්ට් වර්ධන නිරීක්ෂණය සහ යාවත්කාලීන කිරීම් සමඟ ඔබේ රබර් වගාව පාලනය කරන්න. ඔබේ ස්ථානයට සරිලන කාලගුණ ඇඟවීම් සහ විශේෂඥ උපදෙස් ලබා ගන්න.',
      title3: 'විශ්වාසයෙන් විකුණන්න!',
      desc3: 'අපගේ ගොඩනඟන ලද වෙළඳපොළ සමඟ ඔබේ වෙහෙස ලාභයක් බවට පත් කරන්න. විශ්වාසදායක ගැනුම්කරුවන් සමඟ සෘජුව සම්බන්ධ වන්න, ඔබේ රබර් නිෂ්පාදන ප්‍රදර්ශනය කර හොඳම මිල සුරක්ෂිත කරන්න.',
      skipNow: 'දැන් මඟ හරින්න',
      getStarted: 'ආරම්භ කරන්න',
    },
    tabs: {
      home: 'ගෙදර',
      diagnose: 'රෝග විනිශ්චය',
      support: 'සහාය',
      settings: 'සැකසුම්',
      welcome: 'ආයුබෝවන්, ගොවියා',
    },
    home: {
      loadingCarousel: 'කැරෝසෙල් පූරණය වෙමින්...',
      recentEvents: 'මෑතකාල සිදුවීම්',
      noEvents: 'සිදුවීම් හමු නොවීය',
      createEvent: 'ඔබේ පළමු සිදුවීම සාදන්න!',
      latestNews: 'නවතම රබර් පුවත්',
      noNews: 'რბუერ් පුවත් ලබා ගත නොහැක',
      cancelled: 'අවලංගු කරන ලදි',
      ended: 'අවසන් වූ',
    },
    createEvent: {
      headerTitle: 'සිදුවීම සෑදුම්',
      eventImage: 'සිදුවීම් රූපය එක් කරන්න (වෛකල්‍ප)',
      eventImageOptional: 'සිදුවීම් රූපය එක් කරන්න (වෛකල්‍ප)',
      eventTitle: 'සිදුවීම් සිරස්තල *',
      eventTitleRequired: 'කරුණාකර සිදුවීම් සිරස්තල ඇතුළු කරන්න',
      eventTitlePlaceholder: 'උදා: රබර් තට්ටු කිරීම් සඳහා සාමාජිකයින් පුහුණුවීම',
      description: 'විස්තරණය *',
      descriptionRequired: 'කරුණාකර සිදුවීම විස්තරණය ඇතුළු කරන්න',
      descriptionPlaceholder: 'සිදුවීම් විස්තර පැහැදිලි කරන්න...',
      eventDate: 'සිදුවීම් දිනය *',
      eventDateRequired: 'සිදුවීම් දිනය ඉදිරියේ තිබිය යුතුය',
      eventTime: 'සිදුවීම් වේලාව *',
      eventTimeRequired: 'කරුණාකර සිදුවීම් වේලාව තෝරන්න',
      location: 'ස්ථානය (වෛකල්‍ප)',
      locationOptional: 'ස්ථානය (වෛකල්‍ප)',
      locationPlaceholder: 'උදා: කෙගල්ල සම්මතයි ශාලාව',
      contactNumber: 'සම්බන්ධතා අංකය (වෛකල්‍ප)',
      contactNumberOptional: 'සම්බන්ධතා අංකය (වෛකල්‍ප)',
      contactNumberPlaceholder: 'උදා: 077 123 4567',
      maxParticipants: 'උපරිම සහභාගිකයින් (වෛකල්‍ප)',
      maxParticipantsOptional: 'උපරිම සහභාගිකයින් (වෛකල්‍ප)',
      maxParticipantsPlaceholder: 'උදා: 50',
      eventStatus: 'සිදුවීම් තත්ත්වය',
      eventIsActive: 'සිදුවීම ක්‍රියාකාරී ය',
      activeEventsVisible: 'ක්‍රියාකාරී සිදුවීම් ගොවිබදුවුන්ට දක්වා දෘශ්‍ය වන අතර ලියාපදිංගු කිරීම් පිළිගනු ලබයි',
      eventIsCancelled: 'සිදුවීම අවලංගු කරන ලදි',
      cancelledEventsCannot: 'අවලංගු කරන ලද සිදුවීම් නව ලියාපදිංගු කිරීම් පිළිගත නොහැක',
      createEventButton: 'සිදුවීම සෑදුම්',
      errorTitle: 'දෝෂයක්',
      enterEventTitle: 'කරුණාකර සිදුවීම් සිරස්තල ඇතුළු කරන්න',
      enterEventDescription: 'කරුණාකර සිදුවීම විස්තරණය ඇතුළු කරන්න',
      eventDateMustBeFuture: 'සිදුවීම් දිනය ඉදිරියේ තිබිය යුතුය',
      invalidStatusTitle: 'අවලංගු තත්ත්වය',
      invalidStatusMessage: 'අක්‍රිය සිදුවීමක් අවලංගු ලෙස සලකුණු කළ යුතුය. කරුණාකර සිදුවීම් තත්ත්ව සැකසුම් පරීක්ෂා කරන්න.',
      conflictingStatusTitle: 'ගැටුම් තත්ත්වය',
      conflictingStatusMessage: 'සිදුවීමක් ක්‍රියාකාරී සහ අවලංගු දෙකම විය නොහැක. කරුණාකර තත්ත්වය අපගේ කරන්න.',
      cancelledEventWarningTitle: 'අවලංගු සිදුවීම',
      cancelledEventWarningDesc: 'ඔබ අවලංගු සිදුවීමක් සාදමින් සිටින්න. ඔබ ඉදිරියට යාමට අවශ්‍යද?',
      successTitle: 'සාර්ථකයි',
      successMessage: 'සිදුවීම සාර්ථකව ඉදිරිපත් කරන ලදී!',
      permissionDenied: 'අවසරයක් අවශ්‍ය',
      permissionDeniedMessage: 'කරුණාකර ក්‍රැමරා රෝල් අවසර දෙන්න',
      failedToCreateEvent: 'සිදුවීම සෑදීම අසාර්ථක විය',
      warningInactiveOnly: 'මෙම සිදුවීම අක්‍රිය ලෙස ඉදිරිපත් කරන ලබයි',
      warningCancelledOnly: 'මෙම සිදුවීම අවලංගු ලෙස ඉදිරිපත් කරන ලබයි',
      warningBothInactiveAndCancelled: 'මෙම සිදුවීම අක්‍රිය සහ අවලංගු ලෙස ඉදිරිපත් කරන ලබයි',
    },

    eventDetails: {
      title: 'සිදුවීම් විස්තර',
      loadingEvent: 'සිදුවීම පූරණය වෙමින්...',
      eventNotFound: 'සිදුවීම හමු නොවීය',
      eventNotFoundDesc: 'ඔබ සොයන සිදුවීම නොමැත හෝ ඉවත් කරන ලදී.',
      description: 'විස්තරණය',
      organizedBy: 'විසින් සංවිධානය කර ඇත',
      interested: 'උනන්දුවක්',
      person: 'පුද්ගලයා',
      people: 'මිතුරු',
      maxCapacity: 'උපරිම ධාරිතා',
      youAre: 'ඔබ සිටින්නේ',
      registerInterest: 'උනන්දුව ලියාපදිංගු කරන්න',
      unregister: 'ලියාපදිංගු කිරීම ඉවත් කරන්න',
      unregisterConfirm: 'ලියාපදිංගු කිරීම ඉවත් කරන්න',
      unregisterConfirmText: 'ඔබ මෙම සිදුවීමෙන් ලියාපදිංගු කිරීම ඉවත් කිරීමට අවශ්‍යද?',
      eventCancelled: 'මෙම සිදුවීම අවලංගු කරන ලදී',
      eventEnded: 'මෙම සිදුවීම අවසන් වූ',
      registerSuccess: 'ඔබ මෙම සිදුවීමට ලියාපදිංගු කර ඇත!',
      unregisterSuccess: 'ඔබ මෙම සිදුවීමෙන් ලියාපදිංගු කිරීම ඉවත් කර ඇත',
      viewAttendeeList: 'සහභාගිවන්නන්ගේ ලැයිස්තුව බලන්න සහ ඔබේ ඩැෂ්බෝර්ඩ්වෙතින් මෙම සිදුවීම',
    },
    diagnose: {
      detectDisease: 'රෝග විනිශ්චය',
      detectDiseaseDesc: 'ඔබේ ශාකයේ රෝග පරීක්ෂා කරන්න',
      qualityCheck: 'ගුණාත්මක පරීක්ෂණ',
      qualityCheckDesc: 'ඔබේ රබර් කිරි ගුණත්වය පරීක්ෂා කරන්න',
      weatherForecast: 'කාලගුණ පෙනුම',
      weatherForecastDesc: 'ඔබේ ප්‍රදේශයේ කාලගුණ තත්ත්වය පරීක්ෂා කරන්න',
      growthForecast: 'වර්ධන පෙනුම',
      growthForecastDesc: 'ඔබේ ශාකයේ වර්ධනය පෙනුම් කරන්න',
      marketPrice: 'වෙළඳ දාමය',
      marketPriceDesc: 'දෛනික වෙළඳ දාම පරීක්ෂා කරන්න',
      buyersPrices: 'ගැනුම්කරුවන්ගේ දාම',
      buyersPricesDesc: 'ගැනුම්කරුවන්ගේ දාම පරීක්ෂා කරන්න',
    },
    diseaseDetail: {
      confidence: 'විශ්වාසය',
      about: 'පිළිබඳව',
      recommendation: 'නිර්දේශනය',
      chatWithAI: 'AI ඒජන්ට සමඟ කතා කරන්න',
      diseaseNotFound: 'රෝග තොරතුරු හමු නොවීය',
      noDiseaseInfo: 'මෙම රෝගය සඳහා විස්තරිත තොරතුරු නොමැත',
      goBack: 'ආපසු ගිය',
      healthy: {
        name: 'සුස්ථ',
        description: 'කොළය සුස්ථ ප්‍රකාශිතයි සහ කිසිදු රෝග ලක්ෂණ නොමැත.',
        treatment: 'සාමාන්‍ය නඩත්තුව සහ අනුගමනය දිගටම කරන්න.',
      },
      abnormalLeafFall: {
        name: 'අසාමාන්‍ය කොළ ගිණුම',
        description: 'පරිසර ආතති, පෝෂක හිඟකම, හෝ දුර්বල ව්‍යාධිජන්ක සාරාංශ කිරීම නිසා කලින්ම කොළ ගිණුම.',
        treatment: 'নිකුතිකරණ වැඩි කරන්න, සමතුලිත පොහොසන සමඟ සුවිධ පෝෂණ নිෂ්පාදනය සහ ජල පිරිපහատු කරන්න.',
      },
      birdEyeSpot: {
        name: 'පක්ෂි ඇස් ස්ථාන',
        description: 'දඩුවම් රෝග (Phyllachora heveae) රබර් කොළ වල ඉලක්කය වැනි වළලුවලින් චක්රාකාර තිත් ඇතිකිරීම।',
        treatment: 'පුරාණ අවස්ථාවල තඹ ගලා අයිනය හෝ බોර්ඩෝ මිශ්‍රණ යෙදවීම සහ সংක්‍රමිත කොළ ඉවත් කිරීම।',
      },
      corynesporaLeafFall: {
        name: 'Corynespora කොළ ගිණුම',
        description: 'දඩුවම් (Corynespora cassiicola) සhumant පතනයට සහ අස්වැන්න පාඩුවට කారණයවන දැඩි දඩුවම් රෝගය।',
        treatment: 'ගිම්හාන වරුන්ට සෙසු දිනට දිනට ක්‍රමිතත්ව වැඩි සේවකයෙකු ශුද්ධිකරණ පයිටිසීඩ යෙදවීම, සුවිමේ වැඩි කිරීම සහ දුෂ්ඨ කසර කිරීම।',
      },
      powderyMildew: {
        name: 'උණු දඩුවම',
        description: 'තරුණ රබර් කොළ වල සුදු පිටි උස්සාවක් ඇතිකරන දඩුවම් රෝගය.',
        treatment: 'සල්ෆර් දඩුවම් නිශ්චයිතය යෙදවීම, ගස් දුරකතනය වාතාශ්‍රය වැඩි කිරීම සහ නයිට්‍රජන් අඩු කිරීම।',
      },
      phytophthoraLeafFall: {
        name: 'Phytophthora කොළ ගිණුම',
        description: 'තෙතමුසු තත්ත්වවල ශාඛා සහ කිරි දුෂ්ඨ අඩුපාඩු ඇතිකරන ජල මෝල්ඩ් ව්‍යාධිජන්ක (Phytophthora palmivora).',
        treatment: 'පස නිකුතිකරණ වැඩි කරන්න, ෆොස්ෆොනේට දඩුවම් නිශ්චයිතය යෙදවීම සහ ජල සංසඳන තත්ත්ව වළකින්න.',
      },
    },
    support: {
      howCanWeHelp: 'අපි ඔබට උදවු කිරීමට පුළුවන්ද?',
      chooseOption: 'පහතින් විකල්පයන් තෝරන්න හෝ අපට කෙලින්ම සම්බන්ධ වන්න',
      chatWithAI: 'AI සමඟ කතා කරන්න',
      chatWithAIDesc: 'අපගේ AI සහිතයා වෙතින් ඉතාම ඉක්මන් පිළිතුරු ලබන්න',
      faqs: 'නිතර අසන ප්‍රශ්න',
      faqsDesc: 'සාමාන්‍ය ප්‍රශ්නවලට පිළිතුරු සොයා ගන්න',
      contactUs: 'අපට සම්බන්ධ වන්න',
      contactUsDesc: 'අපගේ සහාය කණ්ඩායම සමඟ සම්බන්ධ වන්න',
      contactOfficer: 'නිලධාරීට සම්බන්ධ වන්න',
      contactOfficerDesc: 'ඔබේ පැවරුණු සහාය නිලධාරීට අවි කරන්න',
      userGuide: 'පරිශීලක මාර්ගෝපදේශ',
      userGuideDesc: 'යෙදුම কার්යকරව භාවිතා කරන්න ඉගෙන ගන්න',
      learningCenter: 'ඉගෙනුම් කේන්දර',
      learningCenterDesc: 'රබර් වගාව සඳහා අධ්‍යාපනීය සම්පත්',
      quickContact: 'ඉතාම ඉක්මන් සම්බන්ධතාව',
      callUs: 'අපට ඇමතින්න',
      emailUs: 'අපට ඉ-තැපෙල් කරන්න',
    },
    notifications: {
      title: 'දැනුම්දීම්',
      clearAll: 'සබඳු කරන්න',
      noNotificationsYet: 'තවමත් දැනුම්දීම් නැත',
      noNotificationsDesc: 'ඔබට දැනුම්දීම් ලැබුවහොත්, ඒවා මෙහි පෙන්වනු ඇත',
      new: 'නව',
      earlier: 'කලින්',
    },
    auth: {
      welcomeBack: 'නැවත සාදරයෙන් පිළිගනිමු !!',
      enterPhoneToContine: 'ඉදිරියට යාමට ඔබේ දුරකථන අංකය ඇතුළත් කරන්න',
      phoneNumber: 'දුරකථන අංකය',
      phonePlaceholder: '7X XXX XXXX',
      keepMeSignedIn: 'මා පුරනය වී තබන්න',
      invalidPhone: 'වලංගු නොවන දුරකථනය',
      invalidPhoneMessage: 'කරුණාකර වලංගු දුරකථන අංකයක් ඇතුළත් කරන්න (07XXXXXXXX)',
      newToRubberEdge: 'Rubber Edge වලට අලුත්ද?',
      createAccount: 'ගිණුමක් සාදන්න',
      termsAgreement: 'ඉදිරියට යාමෙන්, ඔබ අපගේ නියම සහ රහස්‍යතා ප්‍රතිපත්තියට එකඟ වේ',
      
      signUp: 'ලියාපදිංචි වන්න',
      createNewAccount: 'ඔබේ නව ගිණුම සාදන්න',
      fullName: 'සම්පූර්ණ නම',
      fullNamePlaceholder: 'ඔබේ සම්පූර්ණ නම ඇතුළත් කරන්න',
      accountType: 'ගිණුම් වර්ගය',
      farmer: 'ගොවියා',
      buyer: 'ගැනුම්කරු',
      officer: 'නිලධාරී',
      nicNumber: 'ජා.හැ. අංකය',
      nicPlaceholder: 'ජා.හැ. අංකය ඇතුළත් කරන්න',
      district: 'දිස්ත්‍රික්කය',
      selectDistrict: 'දිස්ත්‍රික්කය තෝරන්න',
      selectDistrictFirst: 'පළමුව දිස්ත්‍රික්කය තෝරන්න',
      farmLocation: 'ගොවිපල ස්ථානය',
      selectFarmLocation: 'ගොවිපල ස්ථානය තෝරන්න',
      landArea: 'ඉඩම් ප්‍රමාණය',
      landAreaPlaceholder: 'ඉඩම් ප්‍රමාණය (හෙක්ටයාර්)',
      companyName: 'සමාගම් නම',
      companyNamePlaceholder: 'සමාගම් නම ඇතුළත් කරන්න',
      businessRegNumber: 'ව්‍යාපාර ලියාපදිංචි අංකය',
      businessRegPlaceholder: 'ලියාපදිංචි අංකය ඇතුළත් කරන්න',
      employeeId: 'සේවක හැඳුනුම්පත',
      employeeIdPlaceholder: 'සේවක හැඳුනුම්පත ඇතුළත් කරන්න',
      department: 'දෙපාර්තමේන්තුව',
      departmentPlaceholder: 'දෙපාර්තමේන්තුව ඇතුළත් කරන්න',
      alreadyHaveAccount: 'දැනටමත් ගිණුමක් තිබේද?',
      signIn: 'පුරනය වන්න',
      fillAllFarmerDetails: 'කරුණාකර සියලු ගොවි විස්තර පුරවන්න',
      fillAllBuyerDetails: 'කරුණාකර සියලු ගැනුම්කරු විස්තර පුරවන්න',
      fillAllOfficerDetails: 'කරුණාකර සියලු නිලධාරී විස්තර පුරවන්න',
      enterFullName: 'කරුණාකර ඔබේ සම්පූර්ණ නම ඇතුළත් කරන්න',
      
      verifyLogin: 'පුරනය සත්‍යාපනය කරන්න',
      verifyAccount: 'ගිණුම සත්‍යාපනය කරන්න',
      enterOtpCode: 'වෙත යවන ලද ඉලක්කම් 6 කේතය ඇතුළත් කරන්න',
      otpSentTo: 'OTP යවන ලදී',
      verifyAndLogIn: 'සත්‍යාපනය කර පුරනය වන්න',
      verifyAndSignUp: 'සත්‍යාපනය කර ලියාපදිංචි වන්න',
      didntReceiveCode: 'කේතය නොලැබුණාද?',
      resendOtp: 'OTP නැවත යවන්න',
      resendIn: 'නැවත යැවීම',
      otpResent: 'ඔබේ දුරකථනයට OTP නැවත යවන ලදී',
      enterSixDigitOtp: 'කරුණාකර ඉලක්කම් 6 OTP ඇතුළත් කරන්න',
      loginFailed: 'පුරනය අසාර්ථකයි',
      registrationFailed: 'ලියාපදිංචිය අසාර්ථකයි',
      registrationSuccess: 'ලියාපදිංචිය සාර්ථකයි! කරුණාකර පුරනය වන්න.',
      pleaseSignIn: 'කරුණාකර පුරනය වන්න',
      failedToSendOtp: 'OTP යැවීමට අසමත් විය',
      failedToResendOtp: 'OTP නැවත යැවීමට අසමත් විය',
      
      // Edit Profile
      personalInformation: 'පුද්ගලික තොරතුරු',
      changePhoto: 'ඡායාරූපය වෙනස් කරන්න',
      nicNumberCannotBeChanged: 'NIC අංකය වෙනස් කළ නොහැක',
      phoneNumberCannotBeChanged: 'දුරකථන අංකය වෙනස් කළ නොහැක',
      farmInformation: 'ගොවිපල තොරතුරු',
      notSet: 'සකසා නැත',
      setLocationOnMap: 'සිතියමේ ස්ථානය සකසන්න',
      updateLocationOnMap: 'සිතියමේ ස්ථානය යාවත්කාලීන කරන්න',
      requiredFields: 'අවශ්ය ක්ෂේත්ර',
      landAreaMustBeNumber: 'ගොවිපල ප්‍රමාණය වලංගු සංඛ්‍යාවක් විය යුතුය',
      profileUpdateSuccess: 'පැතිකඩ සාර්ථකව යාවත්කාලීන කරන ලදී!',
      failedToUpdateProfile: 'පැතිකඩ යාවත්කාලීන කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
      sessionExpired: 'සැසිය ඉකුත් වී ඇත. කරුණාකර නැවත පුරනය වන්න.',
      invalidData: 'ඉදිරිපත් කරන ලද දත්ත වලංගු නොවේ.',
      profileNotFound: 'පැතිකඩ හමු නොවිය. කරුණාකර සහාය සම්බන්ධ කරන්න.',
      serverError: 'සර්වර දෝෂය. කරුණාකර පසුව උත්සාහ කරන්න.',
      discardChanges: 'වෙනස්කම් අවලංගු කරන්න',
      discardChangesMessage: 'ඔබ ඔබේ වෙනස්කම් අවලංගු කිරීමට අවශ්‍য බවට විශ්වාස ද?',
      continueEditing: 'සංස්කරණය চලයි ගිය',
    },
    settings: {
      farmer: 'ගොවියා',
      buyer: 'ගැනුම්කරු',
      officer: 'නිලධාරී',
      noPhoneNumber: 'දුරකථන අංකයක් නැත',
      
      accessDenied: 'ප්‍රවේශය ප්‍රතික්ෂේප විය',
      accessDeniedMessage: 'මෙම පිටුව නිලධාරීන්ට පමණි',
      
      languageChangedToEnglish: 'Language changed to English',
      languageChangedToSinhala: 'භාෂාව සිංහල බවට වෙනස් විය',
      languageChangedToTamil: 'மொழி தமிழாக மாற்றப்பட்டது',
      
      account: 'ගිණුම',
      appSettings: 'යෙදුම් සැකසුම්',
      preferences: 'මනාපයන්',
      supportAndAbout: 'සහාය සහ පිළිබඳව',
      dangerZone: 'අවදානම් කලාපය',
      
      editProfile: 'පැතිකඩ සංස්කරණය',
      editProfileSubtitle: 'ඔබේ පුද්ගලික තොරතුරු යාවත්කාලීන කරන්න',
      farmLocation: 'ගොවිපල ස්ථානය',
      farmLocationSubtitle: 'ඔබේ ගොවිපල ස්ථානය වෙනස් කරන්න',
      
      language: 'භාෂාව',
      languageSubtitle: 'යෙදුම් භාෂාව වෙනස් කරන්න',
      locationServices: 'ස්ථාන සේවා',
      locationServicesSubtitle: 'ස්ථානයට ප්‍රවේශ වීමට ඉඩ දෙන්න',
      weatherAlerts: 'කාලගුණ ඇඟවීම්',
      weatherAlertsSubtitle: 'කාලගුණ දැනුම්දීම් ලබාගන්න',
      
      helpCenter: 'උදව් මධ්‍යස්ථානය',
      helpCenterSubtitle: 'උදව් සහ සහාය ලබාගන්න',
      termsOfService: 'සේවා නියම',
      privacyPolicy: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
      aboutApp: 'RubberEdge ගැන',
      aboutAppSubtitle: 'අනුවාදය 1.0.0',
      
      logoutTitle: 'පිටවීම',
      logoutConfirm: 'ඔබට පිටවීමට අවශ්‍ය බව විශ්වාසද?',
      deleteAccount: 'ගිණුම මකන්න',
      deleteAccountConfirm: 'මෙම ක්‍රියාව අහෝසි කළ නොහැක. ඔබේ සියලු දත්ත ස්ථිරවම මකනු ලැබේ.',
      deleteAccountWarning: 'ඔබේ ගිණුම ස්ථිරවම මකා දැමීමට අවශ්‍ය බව විශ්වාසද? මෙම ක්‍රියාව අහෝසි කළ නොහැකි අතර ඔබේ සියලු දත්ත ස්ථිරවම ඉවත් කෙරේ.',
      deleteAccountFinal: 'මෙය ඔබේ අවසාන අවස්ථාවයි. ඔබේ ගිණුම ස්ථිරවම මකා දැමීමට ඇත්තටම අවශ්‍යද?',
      deleteForever: 'ඔව්, සදාකාලිකවම මකන්න',
      accountDeleted: 'ඔබේ ගිණුම සාර්ථකව මකා දමා ඇත.',
      
      madeWithLove: 'ගොවීන් සඳහා ❤️ සමඟ නිර්මාණය කරන ලදි',
      madeWithLoveRubber: 'රබර් කර්මාන්තය සඳහා ❤️ සමඟ නිර්මාණය කරන ලදි',
      
      enableLocation: 'ස්ථානය සක්‍රීය කරන්න',
      enableLocationMessage: 'ස්ථාන සේවා සක්‍රීය කිරීමට අවශ්‍යද? මෙය ඔබේ උපාංග ස්ථානයට යෙදුමට ප්‍රවේශ වීමට ඉඩ දෙනු ඇත.',
      permissionDenied: 'අවසරය ප්‍රතික්ෂේප විය',
      locationPermissionRequired: 'ස්ථාන සේවා සක්‍රීය කිරීමට ස්ථාන අවසරය අවශ්‍යයි.',
      failedToEnableLocation: 'ස්ථාන සේවා සක්‍රීය කිරීමට අසමත් විය.',
      cacheClearedSuccess: 'හැඹිලිය සාර්ථකව හිස් කරන ලදි!',
      failedToClearCache: 'හැඹිලිය හිස් කිරීමට අසමත් විය',
      clearCache: 'හැඹිලිය හිස් කරන්න',
      clearCacheConfirm: 'ඔබට හැඹිලිය හිස් කිරීමට අවශ්‍ය බව විශ්වාසද?',
      comingSoon: 'ඉක්මනින් පැමිණේ',
      languageComingSoon: 'භාෂා තේරීම ඉක්මනින් පැමිණේ!',
      changeLanguage: 'භාෂාව වෙනස් කරන්න',
      selectLanguage: 'ඔබට අවශ්‍ය භාෂාව තෝරන්න',
      languageChanged: 'භාෂාව සිංහල බවට වෙනස් විය',
      
      // Blockchain Section
      blockchain: 'බ්ලොක්චේන්',
      walletSettings: 'පසුම්බි සැකසුම්',
      walletSettingsSubtitle: 'ඔබේ බ්ලොක්චේන් පසුම්බිය කළමනාකරණය කරන්න',
      blockchainHistory: 'බ්ලොක්චේන් ඉතිහාසය',
      blockchainHistorySubtitle: 'සියලුම දාමයේ වාර්තා බලන්න',
      verifyTransaction: 'ගනුදෙනුව තහවුරු කරන්න',
      verifyTransactionSubtitle: 'ගනුදෙනු සත්‍යතාව පරීක්ෂා කරන්න',
    },

    privacyPolicy: {
      title: 'පෞද්ගලිකත්ව ප්‍රතිපත්තිය',
      lastUpdated: 'අවසන් ගණනයේ: දෙසැම්බර 2025',
      yourPrivacyMatters: 'ඔබේ පෞද්ගලිකත්වය වැදගත්',
      yourPrivacyMattersDesc: 'අපි ඔබේ පුද්ගලික තොරතුරු සහ වගplantation ගොවිපල දත්ත ආරක්ෂා කිරීමට වැඩිලාց සිටිමු. මෙම ප්‍රතිපත්තිය පැහැදිලි කරන්නේ අපි ඔබේ තොරතුරු කරුණු ගෙන, භාවිතා කරන්නේ කෙසේ දැයි සහ ආරක්ෂා කරන්නේ කෙසේ දැයි ය.',
      informationWeCollect: '1. අපි සংගෙන ගන්නා තොරතුරු',
      personalInformation: 'පුද්ගලික තොරතුරු:',
      iotSensorData: 'IoT සেंසර දත්ත:',
      agriculturalData: 'කෘෂි දත්ත:',
      transactionData: 'ගිණුම් ගිණුම් දත්ත:',
      howWeUseYourInformation: '2. අපි ඔබේ තොරතුරු භාවිතා කරන ආකාරය',
      howWeUseItem1: 'ඔබේ වගplantation සඳහා තාත්කාලික නිරීක්ෂණ සහ විශ්ලේෂණ සরිපුරණ කරන්න',
      howWeUseItem2: 'AI-සක්ෂම රෝග ඇඟවීම් සහ වර්ධන පূර්වසූચනා ජනිත කරන්න',
      howWeUseItem3: 'බ්ලොක්චේන්-පදනම් සපයන දාමයේ ट්ටිතාවය සක්ෂම කිරීම',
      howWeUseItem4: 'ගොවි සහ ගැනුම්කරුවරුන් අතර ගිණුම් සුවිධා කිරීම',
      howWeUseItem5: 'කෘෂි උපදේශන සේවා ලබා දෙන්න',
      howWeUseItem6: 'නිර්නාමිත දත්ත විශ්ලේෂණ සිට AI ආකෘතින් වැඩි කිරීම',
      howWeUseItem7: 'EUDR සම්මතිකरण වාර්තාකරණ සහතික කරන්න',
      howWeUseItem8: 'රබර් කෘෂිකර්ම පිළිවෙත් වැඩි කිරීමට පර්යේෂණ පැවැත්වන්න',
      informationSharing: '3. තොරතුරු බෙදාගැනීම',
      sharingText: 'අපි ඔබේ තොරතුරු බෙදාගන්නේ නම් මෙම තත්වයන්ගෙන් පමණි:',
      withAgriculturalOfficers: 'කෘෂි නිලධారීන් සමඟ:',
      withAgriculturalOfficersDesc: 'රෝග ඇඟවීම් සහ උපදේශක නිර්දේශ',
      withBuyers: 'ගැනුම්කරුවරුන් සමඟ:',
      withBuyersDesc: 'සත්‍යාපිත ගිණුම් සඳහා ගුණාත්මක සහතිකरණ දත්ත (ඔබේ එකඟතාවය සමඟ)',
      withRegulatoryAuthorities: 'නියාමක අධිකාරීන් සමඟ:',
      withRegulatoryAuthoritiesDesc: 'නීතිය අවශ්‍ය වි අතර EUDR සම්මතිකരණ දත්ත',
      researchInstitutions: 'පර්යේෂණ প්‍රතිෂ්ඨාන:',
      researchInstitutionsDesc: 'කෘෂි පර්යේෂණ සඳහා නිර්නාමිතකරණ, සමස්ත දත්ත',
      serviceProviders: 'සේවා සපයන්නෝ:',
      serviceProvidersDesc: 'වලාකුළු සත්‍යාපන (AWS), IoT සংযෝගිතාවය (Dialog), නමුත් අලෙවිකරණ සඳහා කිසි විටින්',
      neverSell: 'අපි ඔබේ පුද්ගලික තොරතුරු තෙවන පෙත්සම්බරට විකුණා දෙමු.',
      dataSecurity: '4. දත්ත ආරක්ෂාව',
      yourRights: '5. ඔබේ අයිතිවාසිකම්',
      yourRightsIntro: 'ඔබට අයිතිවාසිකම් තිබේ:',
      contactUsText: 'මෙම අයිතිවාසිකම් ක්‍රියාවිඩින් කිරීමට, privacy@rubberedge.lk සිට අප සම්බන්ධ කරන්න',
      dataRetention: '6. දත්ත රඳවා තැබීම',
      childrenPrivacy: '7. ගිණුම් දරුවරුන්ගේ පෞද්ගලිකත්වය',
      changesPolicy: '8. මෙම ප්‍රතිපත්තිය වෙනස් කිරීම්',
      contactUs: '9. අපව සම්බන්ධ කරන්න',
      contactUsSubtitle: 'පෞද්ගලිකත්ව ක්‍රියාකාරිතා ගැන ප්‍රශ්න හෝ ගැටලු සඳහා:',
      email: 'ඊමේල්: privacy@rubberedge.lk',
      phone: 'දුරකතන: +94 11 234 5678',
      dataProtectionOfficer: 'දත්ත ආරක්ෂාව නිලධාරී: Ravishka Dissanayaka',
      institute: 'ශ්‍රී ලංකා රබර් පර්යේෂණ ප්‍රතිෂ්ඨානය',
    },

    buyer: {
      // Layout / Navigation
      dashboard: 'උපකරණ පුවරුව',
      market: 'වෙළඳපොළ',
      settings: 'සැකසුම්',
      buyerDashboard: 'ගැනුම්කරු උපකරණ පුවරුව',
      marketRates: 'වෙළඳපොළ මිල ගණන්',
      buyerTutorials: 'ගැනුම්කරු මාර්ගෝපදේශ',
      profileAndSettings: 'පැතිකඩ සහ සැකසුම්',
      
      // Dashboard
      currentMarketPrice: 'වත්මන් වෙළඳපොළ මිල',
      availableStock: 'තිබෙන තොගය',
      pendingOrders: 'බලාපොරොත්තු ඇණවුම්',
      fromSuppliers: 'සැපයුම්කරුවන්ගෙන්',
      readyForPickup: 'රැගෙන යාමට සූදානම්',
      upcomingEvents: 'ඉදිරි සිදුවීම්',
      seeAll: 'සියල්ල බලන්න',
      latestNews: 'නවතම පුවත්',
      readMore: 'තවත් කියවන්න',
      noEventsScheduled: 'සිදුවීම් කාලසටහන්ගත කර නැත',
      checkBackLater: 'යාවත්කාලීන කිරීම් සඳහා පසුව පරීක්ෂා කරන්න',
      
      // Market Screen
      marketOpen: 'වෙළඳපොළ විවෘතයි',
      updatedJustNow: 'දැන් යාවත්කාලීන විය',
      myMarketRates: 'මගේ වෙළඳපොළ මිල ගණන්',
      ratesSetByYou: 'ඔබ විසින් සකසන ලද මිල ගණන්',
      loadingRates: 'මිල ගණන් පූරණය වෙමින්...',
      noRatesSet: 'තවම මිල ගණන් සකසා නැත.',
      useUpdateRates: 'ඔබේ මිල ගණන් එකතු කිරීමට "මිල යාවත්කාලීන" භාවිතා කරන්න.',
      marketActions: 'වෙළඳපොළ ක්‍රියා',
      viewMarketTrends: 'වෙළඳපොළ ප්‍රවණතා බලන්න',
      viewMarketTrendsDesc: 'මිල චලනයන් සහ වෙළඳපොළ දත්ත විශ්ලේෂණය කරන්න',
      viewOtherBuyers: 'වෙනත් ගැනුම්කරුවන්ගේ මිල බලන්න',
      viewOtherBuyersDesc: 'ඔබේ මිල ගණන් වෙනත් ගැනුම්කරුවන් සමඟ සසඳන්න',
      updateMyRates: 'මගේ මිල යාවත්කාලීන කරන්න',
      updateMyRatesDesc: 'ඔබේ මිලදී ගැනීමේ මිල ගණන් සකසන්න හෝ යාවත්කාලීන කරන්න',
      perKg: 'කිලෝවට',
      previousPrice: 'පෙර:',
      ratesProvidedBy: 'ලංකා රබර් වෙළඳ සංගමය විසින් සපයන ලද මිල ගණන්',
      otherBuyersPrices: 'වෙනත් ගැනුම්කරුවන්ගේ මිල ගණන්',
      close: 'වසන්න',
      
      // Update Rates Screen
      updateRatesTitle: 'ඔබේ මිලදී ගැනීමේ මිල යාවත්කාලීන කරන්න',
      setTodaysPrices: 'ඔබේ සরবరාহකරුවන් සඳහා අද්‍යතන මිල ගණන් සකසන්න',
      effectivePeriod: 'কার্যকর කාල පරිච්ඡේදය',
      from: 'සිට',
      to: 'දක්වා',
      validFor: 'වලංගු',
      days: 'දින',
      rubberGrades: 'රබර් ශ්‍රේණි',
      enterBuyingPrices: 'කිලෝ ග්‍රෑම් එක සඳහා ඔබේ මිලදී ගැනීමේ මිල ගණන් ඇතුළත් කරන්න',
      rss3: 'RSS3',
      tsr20: 'TSR20',
      latex: 'Latex 60%',
      crepe: 'Crepe',
      customGrades: 'අභිරුචි ශ්‍රේණි',
      yourCustomRubberGrades: 'ඔබේ අභිරුචි රබර් ශ්‍රේණි සහ මිල ගණන්',
      gradeNameExample: 'ශ්‍රේණි නම (උදා: RSS1, Custom Mix)',
      addCustomGrade: 'අභිරුචි ශ්‍රේණිය එක් කරන්න',
      addOtherRubberTypes: 'වෙනත් රබර් වර්ග හෝ අභිරුචි මිශ්‍ර එක් කරන්න',
      additionalNotesOptional: 'අතිරේක සටහන් (විකල්ප)',
      addSpecialConditions: 'ඔබේ සරබරාකරුවන් සඳහා විශේෂ කොන්දේසි හෝ සටහන් එක් කරන්න...',
      clearAll: 'සියල්ල හිස් කරන්න',
      updatePrices: 'මිල යාවත්කාලීන කරන්න',
      updatedPricesVisible: 'යාවත්කාලීන කරන ලද මිල ගණන් සියලු ගොවීන් සඳහා වහාම දෘශ්‍යමාන වනු ඇත',
      confirmPriceUpdate: 'මිල යාවත්කාලීන කිරීම තහවුරු කරන්න',
      sureUpdatePrices: 'ඔබ මෙම මිල ගණන් යාවත්කාලීන කිරීමට අවශ්‍ය බවට විශ්වාස ද?',
      visibleToFarmersImmediately: 'ඔවුන් ගොවීන්ට වහාම දෘශ්‍යමාන වනු ඇත.',
      willBecomeActiveOnStartDate: 'මෙම මිල ගණන් ඇරඹුම් දිනට සක්‍රිය වනු ඇත.',
      loadingYourPrices: 'ඔබේ මිල ගණන් පූරණය වෙමින්...',
      failedToLoadPrices: 'ඔබේ පෙර මිල ගණන් පූරණය කිරීමට අසමත් විය',
      failedToUpdatePrices: 'මිල ගණන් යාවත්කාලීන කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
      pleaseEnterAtLeastOnePrice: 'කරුණාකර යාවත්කාලීන කිරීමට අවම වශයෙන් එක් මිල එක් කරන්න.',
      pleaseCompleteAllCustomGradeFields: 'කරුණාකර සියලු අභිරුචි ශ්‍රේණි ක්ෂේත්ර සම්පූර්ණ කරන්න හෝ හිස් ඒවා ඉවත් කරන්න.',
      invalidDate: 'වලංගු නොවන දිනය',
      endDateMustBeAfterStartDate: 'අවසාන දිනය ඇරඹුම් දිනට පසුව විය යුතුය',
      selectStartDate: 'ඇරඹුම් දිනය තෝරන්න',
      selectEndDate: 'අවසාන දිනය තෝරන්න',
      pricesUpdatedSuccessfully: 'ඔබේ මිල ගණන් සාර්ථකව යාවත්කාලීන කරන ලදී!',
      cancel: 'අවලංගු කරන්න',
      done: 'සිදු විය',
      
      // Tutorials
      allTutorials: 'සියලු මාර්ගෝපදේශ',
      buying: 'මිලදී ගැනීම',
      quality: 'ගුණාත්මකභාවය',
      processing: 'සැකසීම',
      learningCenter: 'ඉගෙනුම් මධ්‍යස්ථානය',
      masterBuyerSkills: 'විශේෂඥ මාර්ගෝපදේශ සමඟ ඔබේ ගැනුම්කරු කුසලතා ප්‍රගුණ කරන්න',
      totalGuides: 'මුළු මාර්ගෝපදේශ',
      categories: 'ප්‍රවර්ග',
      expertTips: 'විශේෂඥ ඉඟි',
      results: 'ප්‍රතිඵල',
      steps: 'පියවර',
      markAsComplete: 'සම්පූර්ණ ලෙස සලකුණු කරන්න',
      noTutorialsFound: 'මාර්ගෝපදේශ හමු නොවීය',
      tryDifferentCategory: 'වෙනත් ප්‍රවර්ගයක් උත්සාහ කරන්න',
      showAll: 'සියල්ල පෙන්වන්න',
      beginner: 'ආරම්භක',
      intermediate: 'මධ්‍යම',
      advanced: 'උසස්',
      tutorials: {
        tutorial1: {
          title: 'ගැනුම්කරු ලෙස ආරම්භ කිරීම',
          description: 'රබර් ගිණුම් කිරීමේ මූලධර්ම සහ මෙම යෙදුම සඵලව භාවිතා කරන ආකාරය ඉගෙන ගන්න.',
          steps: [
            'ඔබේ ගැනුම්කරු පැතිකඩ සමාගමේ විස්තර සමඟ සාදන්න',
            'ඔබේ කැමති රබර් ශ්‍රේණි (RSS1, RSS2, ආදිය) සකසන්න',
            'ඔබේ ගිණුම් කිරීමේ කලාපය සහ දිස්ත්‍රික්ක සිටුවන්න',
            'එක් එක් ශ්‍රේණිය සඳහා ඔබේ ආරම්භක ගිණුම් කිරීමේ මිල නිශ්චිත කරන්න',
            'මිල යාවත්කාලීනතා සහ ගොවි ඉල්ලීම් සඳහා දැනුම්දීම් සක්‍රීය කරන්න',
          ],
        },
        tutorial2: {
          title: 'තරඟකාරී ගිණුම් කිරීමේ මිල සකසන්න',
          description: 'ගිණුම් කිරීමේ ලාභය තබා ගෙන ගොවීන් ආකර්ෂණය කරන මිල සකසන කලාව ප්‍රගුණ කරන්න.',
          steps: [
            'වෙළඳපොළ ටැබ සහ වර්තමාන වෙළඳපොළ මිල පරීක්ෂා කරන්න',
            '"වෙනත් ගැනුම්කරුවරු" ලක්ෂණ භාවිතා කරමින් ප්‍රතිස්පර්ධකයි මිල පර්යේෂණ කරන්න',
            'ඔබේ ප්‍රවහන සහ සැකසුම් පිරිවැය විසඳුවීම',
            'ඉහළ ශ්‍රේණිය සඳහා ගුණාත්මක බෝනස් සලකා බලන්න',
            'ගොවීන් සඳහා ન්‍යායනුකූල අගයන් ඉදිරිපත් කරන මිල සකසන්න',
            'වෙළඳපොළ තත්ත්‍වයට පදනම් වී නිරන්තරයෙන් මිල යාවත්කාලීන කරන්න',
          ],
        },
        tutorial3: {
          title: 'රබර් ශ්‍රේණි අවබෝධ කරගැනීම',
          description: 'විවිධ රබර් පත්තලි ශ්‍රේණි හඳුනා ගැනීම සහ අවකාශ කරගැනීම ඉගෙන ගන්න.',
          steps: [
            'RSS1 (Ribbed Smoked Sheet Grade 1): ඉහළ ගුණාත්මකත්වය, සැහැල් පුරුණු අඩු, කිසිදු පිරිවැල්ලක් නැත',
            'RSS2: හොඳ ගුණාත්මකත්වය සුළු වර්ණ විචලතා සඳහා ඉඩ සිදුවේ',
            'RSS3: සමීපන ශ්‍රේණිය සමහර අවිධිගත භාවයකට ඉඩ සිදුවේ',
            'RSS4: ඉඩම්ගතව ශ්‍රේණිය දෘශ්‍යමාන අවිධිගත බව ඉඩ සිදුවේ',
            'RSS5: ඉඩම්ගතම ශ්‍රේණිය, සැලකිය යුතු අවිධිගත භාවය පවතින අතර',
            'Crepe Rubber: Unsmoked, RSS ගෙන් වෙනස් ලෙස සැකසිණ',
          ],
        },
        tutorial4: {
          title: 'ගුණාත්මකතා ඇගයීමේ ක්‍රමවේද',
          description: 'ගිණුම් කිරීමට සෙවිලි ගිණුම් කිරීමට පෙර රබර් ගුණාත්මකතා ඇගයීමේ වෘත්තීය ක්‍රම.',
          steps: [
            'දෘශ්‍ය පරීක්ෂාව: වර්ණ සමාන වීම සහ පිනිස පරීක්ෂා කරන්න',
            'බිත්තර පරීක්ෂා: සිනහ සහ විදෙශ අංශු නොමැතිවාට සිටීම හැඟීම',
            'සුවඳ පරීක්ෂා: නවතම රබර් තනි, දුර්වාසනා ඉඩමු සිටින්න',
            'තෙතමනය පරීක්ෂාව: නිසි වියන ගුණාත්මකතාවට අත්‍යවශ්‍ය ය',
            'අසන, බුබුලු, හෝ දූෂණයට පරීක්ෂා කරන්න',
            'RSS ශ්‍රේණිය තුල නිසි ශීෂ පිටපතිනුත ප්‍රතිමූර්තිද සත්‍යාපිත කරන්න',
            'මිල සාකච්ඡාවට ගුණාත්මකතා සොයාගැනීම ලිපිගත කරන්න',
          ],
        },
        tutorial5: {
          title: 'වෙළඳපොළ විශ්ලේෂණය සහ ප්‍රවණතා',
          description: 'තොරතුරු සහිත ගිණුම් කිරීමේ සිතුවිලි ඇතිවීම සඳහා රබර් වෙළඳපොළ ප්‍රවණතා ලුහුබඩු සහ විශ්ලේෂණ කරන්න.',
          steps: [
            'ගෝලීය රබර් භාණ්ඩ මිල නිරීක්ෂණ කරන්න (SICOM, TOCOM)',
            'ධර්තුකාල මිල ප්‍රවණතා ට්‍රැක් කරන්න (අධෝකරණ කරුණු අඩුවි)',
            'ඔබේ කලාපයේ සরবරාහ-ඉල්ලුම්역학විද්‍යා විශ්ලේෂණ කරන්න',
            'නිෂ්පාදනය බලපෑ කාලගුණ සිදුවීම් නිරීක්ෂණ කරන්න',
            'රබර් වෙළඳ කිරීම සම්බන්ධ රජ්‍ය ප්‍රතිපත්තිය අනුගමනය කරන්න',
            'මිල සිතුවිලි ඉදිරිපත් කිරීම සඳහා ඉතිහාසික දත්ත භාවිතා කරන්න',
          ],
        },
        tutorial6: {
          title: 'ගොවි සම්බන්ධතා ගොඩනැගීම',
          description: 'රබර් ගොවීන් සමඟ දීර්ඝমාunidos, දුබල සම්බන්ධතා සඳහා වර්දනය කරන්න.',
          steps: [
            'ස්වচ්ඡ සහ විනිවිද ගිණුම් කිරීමේ මිල ඉදිරිපත් කරන්න',
            'ස්ථාවර ගිණුම් කිරීමේ කාල සටහන තබා ගන්න',
            'විශ්වාස ගොඩනැගීම සඳහා කාලීන ගෙවීම් ලබා දෙන්න',
            'ගුණාත්මකතා අවශ්‍යතා පිළිබඳ පැහැදිලිව සන්නිවේදනය කරන්න',
            'රබර් ගුණාත්මකතා වැඩිදියුණු කිරීම පිළිබඳ මාර්ගෝපදේශ ඉදිරිපත් කරන්න',
            'ගොවි ගිණුම් විමසීමට ප්‍රවේශ්‍ය සහ ප්‍රතිකාර්‍ය වන්න',
          ],
        },
        tutorial7: {
          title: 'රබර් සැකසුම් දැනුම',
          description: 'පිතිමාර්ග සිට සම්පූර්ණ පත්තලි දක්වා රබර් සැකසුම් ඉගෙන ගන්න.',
          steps: [
            'පිතිමාර්ග එකතුවිම: රබර් ගස් සිට නිර්භ වශයෙන්',
            'සංසර්ගණය: අම්ල එකතු කිරීම හෝ අම්ල ටැඩි ඔටුණු සඳහා',
            'පත්තල පීඩනය: තුනෙන් පත්තල තුල',
            'Ribbing: ඉරි ඉඩ උද්ධාරණීයට සඳහා ඉඩ සඳහා ඉඩ',
            'ධුමීකරණ/වියන: පත්තල තක්සේරුවට සහ වර්ණ එකතු කිරීම',
            'ශ්‍රේණිකරණ: ගුණාත්මකතා ප්‍රමිතිය අनुව වර්ගීකරණ',
            'ගබඩා: ගුණාත්මකතා පවත්වා ගැනීම සඳහා නිසි තත්ත්‍වය',
          ],
        },
        tutorial8: {
          title: 'සිතිලිපිකරණ සහ ප්‍රවහන',
          description: 'රබර් සිතිලිපිකරණය සහ ප්‍රවහන කිරීම සඳහා හොඳම ක්‍රම පිළිවෙල.',
          steps: [
            'හැකියාවත්බවට සිතිලිපිකරණ දිගු සැලසුම් කරන්න',
            'දූෂණයෙන් වැලක්වීම සඳහා නිසි ඇසුරුම් භාවිතා කරන්න',
            'සුදුසු වාහන උෂ්ණත්වය තබා ගන්න',
            'එකතුවිම සිටින ස්ථානයේ බර සහ ගුණාත්මකතා ලිපිගත කරන්න',
            'රබර් සැතසින්න ක්ষතිය වැලක්වීම සඳහා සැවඉසිලවම',
            'ගොවීන් සමඟ නිරන්තර එකතුවිම දිනවල කාලසටහන් සකසන්න',
            'ඉතිරි ප්‍රවාහ සහ ලිපිගත තොරතුරු රක්ෂා කරන්න',
          ],
        },
      },
    },

    officer: {
      // Layout / Navigation
      dashboard: 'මුල් පිටුව',
      farmers: 'ගොවීන්',
      tutorials: 'මාර්ගෝපදේශ',
      settings: 'සැකසුම්',
      officerDashboard: 'නිලධාරී උපකරණ පුවරුව',
      farmerManagement: 'ගොවි කළමනාකරණය',
      tutorialsGuides: 'මාර්ගෝපදේශ සහ උපදෙස්',
      profileSettings: 'සැකසුම්',
      // Farmers Screen
      farmerDirectory: 'ගොවි නාමාවලිය',
      farmerDirectoryDesc: 'ගොවි ප්‍රොෆයිල් බලන්න සහ කළමනාකරණය කරන්න',
      createEvent: 'සිදුවීමක් සාදන්න',
      createEventDesc: 'නව ගොවිතැන් සිදුවීම් සැලසුම් කරන්න',
      viewEvents: 'සිදුවීම් බලන්න',
      viewEventsDesc: 'ඉදිරි සිදුවීම් කළමනාකරණය කරන්න',
      marketPrice: 'වෙළඳ මිල',
      marketPriceDesc: 'වර්තමාන රබර් මිල ගණන් බලන්න',
      totalFarmers: 'සියලුම ගොවීන්',
      totalEvents: 'සියලුම සිදුවීම්',
      upcoming: 'ඉදිරි',
      total: 'සියලුම',
      event: 'සිදුවීම',
      events: 'සිදුවීම්',
      newEvent: 'නව සිදුවීම',
      livePrices: 'ජීවමාන මිල',
      errorLoadingData: 'දත්ත පිටුව පින් ගැනීම අසාර්ථක විය. නැවත උත්සහ කරන්න.',
      // Tutorials Screen
      learningModulesAvailable: 'ඉගෙනුම් මොඩියුල තිබේ',
      topics: 'මාතෘකා',
      whatYoullLearn: 'ඔබ ඉගෙන ගන්නා දේ',
      availableResources: 'පවතින සම්පත්',
      watchOnYoutube: 'YouTube හි නරඹන්න',
      visitOfficialWebsite: 'නිල වෙබ් අඩවියට පිවිසෙන්න',
      close: 'වසන්න',
      unableToOpenLink: 'සබැඳිය විවෘත කළ නොහැක',
      checkInternetConnection: 'කරුණාකර ඔබේ අන්තර්ජාල සම්බන්ධතාවය පරීක්ෂා කරන්න හෝ පසුව නැවත උත්සාහ කරන්න.',
      video: 'වීඩියෝ',
      docs: 'ලේඛන',
      reference: 'යොමුව',
      tutorial1Title: 'ආරම්භ කිරීම',
      tutorial1Desc: 'රබර් නිලධාරී උපකරණ පුවරුව භාවිතා කිරීමේ සම්පූර්ණ මාර්ගෝපදේශය',
      tutorial1Content: [
        'රබර් එජ් රබර් කළමනාකරණ පද්ධතියේ හැඳින්වීම',
        'නිලධාරී උපකරණ පුවරුව සහ ප්‍රධාන විශේෂාංග සැරිසැරීම',
        'ගොවි නාමාවලිය සහ පැතිකඩ කළමනාකරණය',
        'රෝග හඳුනාගැනීම සහ රෝග විනිශ්චය මෙවලම් භාවිතය',
        'වෙළඳපොළ මිල සහ යාවත්කාලීන විශේෂාංග',
        'සිදුවීම් නිර්මාණය සහ කළමනාකරණය',
        'ගොවීන් සමඟ චැට් සහ සන්නිවේදනය',
      ],
      tutorial2Title: 'රබර් කැපීමේ ක්‍රම',
      tutorial2Desc: 'නවීන සහ සාම්ප්‍රදායික රබර් කැපීමේ ක්‍රම',
      tutorial2Content: [
        'කැපීම ආරම්භ කරන විට - අවුරුදු 6-7 වන 50cm පරිධිය සහිත ගස්',
        'නිසි කැපීමේ වේලාව - අලුයම 3-6 AM',
        'අඩ-සර්පිලාකාර කැපීම 30° කෝණයකින් පහළට',
        '1-1.5mm පොතු ඝනත්වය පවත්වාගෙන යාම',
        'තියුණු පිහි නඩත්තු සහ ශිල්පීය ක්‍රම',
        'එකමුතු දිනක් එදිරිව දෛනික කැපීමේ පද්ධති',
        'ලැටෙක්ස් එකතු කිරීම සහ කෝප්ප තැබීම',
        'කැපීමේ පැනල් වියළීම (TPD) වැළැක්වීම',
      ],
      tutorial3Title: 'රෝග සහ පළිබෝධ කළමනාකරණය',
      tutorial3Desc: 'රබර් ගස් රෝග හඳුනාගැනීම සහ පාලනය',
      tutorial3Content: [
        'කොළ රෝග - ද්විතීයික කොළ වැටීම පාලනය',
        'මූල රෝග - දම් සහ සුදු මූල රෝගය',
        'පැනල් රෝග - කළු තීරු සහ මුදු කුණුවීම',
        'කුඩු පිටි සහ තඹ ඉසින ප්‍රතිකාර',
        'පැල්වත්තේ කුරුලු ඇස් ලප',
        'පොදු පළිබෝධ - කීටයන්, මයිටාවන්, මීලිබග්',
        'ඒකාබද්ධ පළිබෝධ කළමනාකරණ උපාය මාර්ග',
        'රසායනික පාලනය සහ දිලීර නාශක යෙදීම',
      ],
      tutorial4Title: 'වගා කළමනාකරණය',
      tutorial4Desc: 'රබර් වගා මෙහෙයුම් සඳහා හොඳම භාවිතයන්',
      tutorial4Content: [
        'ස්ථාන තේරීම සහ ඉඩම් සකස් කිරීම',
        'නිසි පරතරය - හෙක්ටයාරයකට ගස් 375ක්',
        'පැල්වත්ත කළමනාකරණය සහ පැල තේරීම',
        'අධික අස්වනු ක්ලෝන බඩින් සහ බද්ද කිරීම',
        'පොහොර සහ පස පෝෂණ කළමනාකරණය',
        'ආවරණ භෝග සහ අන්තර් වගාව',
        'වල් පාලනය සහ නඩත්තුව',
        'ජල කළමනාකරණය සහ වාරිමාර්ග',
      ],
      tutorial5Title: 'සැකසුම් සහ ගුණාත්මක පාලනය',
      tutorial5Desc: 'ලැටෙක්ස් සැකසීම සහ ගුණාත්මක ප්‍රමිතීන්',
      tutorial5Content: [
        'ලැටෙක්ස් එකතු කිරීම සහ ක්ෂේත්‍ර කැටිගැන්වීම',
        'ප්‍රති-කැටිකාරක සහ සංරක්ෂක',
        'පත්‍ර රබර් නිෂ්පාදනය සහ දුම් ගැසීම',
        'තාක්ෂණිකව නිශ්චිත රබර් (TSR) ශ්‍රේණි',
        'වියළි රබර් අන්තර්ගතය (DRC) පරීක්ෂා',
        'ආතතිය ශක්තිය පරීක්ෂා (ASTM D412)',
        'ISO 9001 ගුණාත්මක කළමනාකරණය',
        'අපනයන ගුණාත්මක අවශ්‍යතා',
      ],
      tutorial6Title: 'වෙළඳපොළ කළමනාකරණය සහ යෝජනා ක්‍රම',
      tutorial6Desc: 'අලෙවි උපාය මාර්ග සහ රජයේ වැඩසටහන්',
      tutorial6Content: [
        'ගෝලීය රබර් වෙළඳපොළ ප්‍රවණතා සහ මිල',
        'දේශීය වෙළඳපොළ ගතිකත්වය',
        'රජයේ සහනාධාර යෝජනා ක්‍රම',
        'රබර් මණ්ඩල සහාය වැඩසටහන්',
        'මිල ස්ථාවරීකරණය සහ අවම ආධාරක',
        'අපනයන අවස්ථා',
        'සමුපකාර සමිති අලෙවිකරණය',
        'රක්ෂණ සහ ණය පහසුකම්',
      ],
      tutorial7Title: 'නිල RRISL සම්පත්',
      tutorial7Desc: 'රජයේ අත්පොත් සහ තාක්ෂණික ප්‍රකාශන',
      tutorial7Content: [
        'RRISL අත්පොත - සම්පූර්ණ කෘෂිකාර්මික නිර්දේශ',
        'RDD ප්‍රකාශන - පස සංරක්ෂණය සහ ඉඩම් සැකසීම',
        'උපදේශන චක්‍රලේඛ - රෝග කළමනාකරණ ප්‍රොටෝකෝල',
        'තාක්ෂණික මාර්ගෝපදේශ - පොහොර යෙදීමේ කාලසටහන්',
        'සැකසුම් ප්‍රමිතීන් - ගුණාත්මක පාලන මාර්ගෝපදේශ',
        'රබර් පදනම් ගොවිතැන් පද්ධති ලියකියවිලි',
        'නවතම පර්යේෂණ යාවත්කාලීන සහ නවෝත්පාදන',
        'උපදේශක සේවා සඳහා සම්බන්ධතා තොරතුරු',
      ],
      tutorial8Title: 'ශ්‍රී ලංකා රබර් අධිකාරි සබැඳි',
      tutorial8Desc: 'රජයේ රබර් ආයතන සෘජු ප්‍රවේශය',
      tutorial8Content: [
        'ශ්‍රී ලංකා රබර් පර්යේෂණ ආයතනය (RRISL) - www.rrisl.gov.lk',
        'රබර් සංවර්ධන දෙපාර්තමේන්තුව (RDD) - www.rubberdev.gov.lk',
        'බාගත කළ හැකි අත්පොත් සහ තාක්ෂණික අත්පොත්',
        'වගා කළමනාකරණය සඳහා උපදේශන චක්‍රලේඛ',
        'වැසි ආවරණ යෙදීමේ ශිල්පීය ක්‍රම',
        'අන්තර් වගා උපාය මාර්ග මාර්ගෝපදේශ',
        'සුදු මූල රෝග කළමනාකරණ ප්‍රොටෝකෝල',
        'RSS නිෂ්පාදනය සහ ලැටෙක්ස් සැකසුම් ප්‍රමිතීන්',
      ],
      // Dashboard Screen
      goodMorning: 'සුභ උදෑසනක්',
      goodAfternoon: 'සුභ දහවලක්',
      goodEvening: 'සුභ සන්ධ්‍යාවක්',
      officer: 'නිලධාරී',
      loadingCarousel: 'කැරවුසලය පූරණය වෙමින්...',
      recentEvents: 'මෑත සිදුවීම්',
      viewAll: 'සියල්ල බලන්න',
      noEventsFound: 'සිදුවීම් හමු නොවීය',
      createFirstEvent: 'ඔබේ පළමු සිදුවීම සාදන්න!',
      cancelled: 'අවලංගු කරන ලදී',
      ended: 'අවසන් විය',
      latestRubberNews: 'නවතම රබර් පුවත්',
      noRubberNewsAvailable: 'රබර් පුවත් නොමැත',
      readMore: 'තවත් කියවන්න',
    },

    learningCenter: {
      title: 'ඉගෙනුම් මධ්‍යස්ථානය',
      all: 'සියල්ල',
      planting: 'වැඩවීම',
      tapping: 'කැපීම',
      diseaseControl: 'රෝග පාලනය',
      fertilizers: 'පොහොර',
      watchVideo: 'වීඩියෝව නරඹන්න',
      openInYoutube: 'YouTube යෙදුමේ විවෘත කරන්න',
      video: 'වීඩියෝව',
      article: 'ලිපිය',
      guide: 'මාර්ගෝපදේශය',
      noMaterialsFound: 'ඉගෙනුම් ද්‍රව්‍ය හමු නොවීය',
      // Learning Items
      item1: {
        title: 'රබර් වගාවට හැඳින්වීම',
        description: 'රබර් වගාවේ මූලික කරුණු සහ ආරම්භකයින් සඳහා හොඳම පුහුණු ඉගෙන ගන්න.',
        longDescription: `රබර් වගාව යනු දිගුකාලීන කෘෂිකර්මික ආයෝජනයක් වන අතර එයට පළමු දින සිට නිවැරදි සැලසුමක් අවශ්‍ය වේ. මෙම පාඩම රබර් වගාවේ සම්පූර්ණ පදනම පියවරෙන් පියවර විස්තර කරයි, එය ආරම්භකයින්ට පහසු වන අතර ක්ෂේත්‍ර නිලධාරීන්ට සහ ගොනුකරුවන්ට වතු විසිරුවාවන් ක්‍රියාත්මක කරන ආකාරය තේරුම් ගැනීමට ප්‍රයෝජනවේ.

ඔබ ඉගෙන ගනු ඇත:
• රබර් වඩාත් හොඳින් වැඩෙන ස්ථාන (වැසි පතනය, උෂ්ණත්වය, උඩුරුදුරුත්වය, වායු තත්ත්ව)  
• භූමිය තෝරා ගැනීමේ ක්‍රමය සහ රබර් මුල් සඳහා ජල බාහිරමුකින් කිරීම වැදගත් වන්නේ ඇයි  
• භූමි මූලික කරුණු (පටකය, pH, සංයුක්ත ද්‍රව්‍ය) සහ භූමි පරීක්ෂණය වැදගත් වන්නේ ඇයි  
• රබර් වතු විසිරුවාවේ ජීවන චක්‍රය: ප්‍රභෝජනාලය → ක්ෂේත්‍ර වැඩවීම → අනුරූපී අදියර → කැපීම් අදියර  
• නිවැරදි අන්තරය, සෙවණැලි පාලනය, ගොළු පාලනය සහ පළමු නඩුව  
• සාමාන්‍ය වැරදි ජීවිත රක්ෂණ අනුපාතය සහ අනාගත ලේටෙක්ස් නිපදවීම අඩු කරයි  

මෙම අන්තර්ගතය නව ගොවුන්ට මිල අධික වැරදි වළක්වා ගැනීමට, ගස් ජීවිතය වැඩිදියුණු කිරීමට සහ වතු විසිරුවාවන්ට ස්ථාවර ලේටෙක්ස් නිපදවීමට ලබා දීමට සැලසුම් කර ඇත. ඔබ නව ක්ෂේත්‍රයක් ආරම්භ කරනවා නම් හෝ නැවත වැඩවීම සැලසුම් කරනවා නම්, භූමි සූදානම, ක්ලෝන තේරීම සහ ප්‍රභෝජනාල කළමනාකරණය වැනි විස්තරාත්මක පාඩම්ට පෙර මෙය ඔබේ පළමු යොමුවක් ලෙස භාවිතා කරන්න.`,
      },
      item2: {
        title: 'නිවැරදි කැපීම් ක්‍රම',
        description: 'ගස් සෞඛ්‍යය රඳවා ගෙන යෙදීම වැඩිදියුණු කිරීම සඳහා රබර් කැපීමේ කලාව ප්‍රවීණ කර ගන්න.',
        longDescription: `කැපීම රබර් නිපදවීමේ වඩාත් වැදගත් ක්‍රියාකාරකමක් වන අතර එය ලේටෙක්ස් නිපදවීමට සහ ගසේ ආයු කාලයට සෘජුවම බලපායි. හොඳ කැපීම් කැපීමක් බලවත් ලේටෙක්ස් ධාවනයක් නිපදවයි මිස සිදුරු නැවත වැඩෙන පරිදි කැම්බියම් ආරක්ෂා කරයි.

මෙම පාඩම ආවරණය කරයි:
• නිවැරදි කැපීම් කෝණය සහ එය ලේටෙක්ස් ධාවනයට වැදගත් වන්නේ ඇයි  
• ආරක්ෂිත කැපීම් ගැඹුරුත්වය (කැම්බියම් හානිය වළක්වා ගැනීමේ ක්‍රමය)  
• කැපීම් දිගුව සහ කැපීමේ පිහිටුවීම  
• කැපීම් දිනපතා කැපීම සඳහා කඩේ හැන්දෑව සහ තියුණු කිරීම  
• කැපීම් සංඛ්‍යාතය (උදා: d/2, d/3 පද්ධති) සහ විසිත්ත කාලයන්  
• වළක්වා ගත යුතු වැරදි: අතිශයෝක්තිය, රළු සිදුරු සීරුම් කිරීම, නැවත නැවත ගැඹුරු කැපීම්  
• නරක කැපීම නිපදවීම අඩු කර ආයු කාලය කෙටි කරන්නේ කෙසේද  

නිවැරදි ක්‍රමය අනුගමනය කරමින්, ගොවුන්ට දෛනික එකතුව වැඩිදියුණු කළ හැකි අතර සිදුරු ආබාධ අඩු කර ස්ථාවර නිපදවීම වසර ගණනාවක් නඩුවට ගත හැක. මෙම පාඩම නව කැපුම්කරුවන්ට, වතු විසිරුවාවේ සුපර්වයිසර්වරුන්ට සහ ක්ෂේත්‍ර කණ්ඩායම් පුහුණු කරන ඕනෑම කෙනෙකුට නිර්දේශ කරනු ලැබේ.`,
      },
      item3: {
        title: 'සාමාන්‍ය රබර් ගස් රෝග හඳුනා ගැනීම',
        description: 'රබර් ගස්වලට බලපාන සාමාන්‍ය රෝග හඳුනා ගැනීම සහ ප්‍රතිකාර කිරීම ඉගෙන ගන්න.',
        longDescription: `රෝග ලේටෙක්ස් නිපදවීම අඩු කරයි, ගස් දුර්වල කරයි සහ ආරම්භයේදී හඳුනා නොගත්තොත් වේගයෙන් පැතිර සිටී. මෙම පාඩම ගොවුන්ට සහ නිලධාරීන්ට ක්ෂේත්‍ර රෝග ලක්ෂණ සහ සරල නිරීක්ෂණ ක්‍රම භාවිතා කරමින් සාමාන්‍ය රබර් ගස් රෝග හඳුනා ගැනීමට උදව් කරයි.

ඔබ ඉගෙන ගනු ඇත:
• පළමු අවවාද ලක්ෂණ: කහ පත්‍ර, පත්‍ර වැටීම, නරක ප්ලෂිං, මරණය  
• පොතු පත්‍ර රෝග සහ කාලගුණික රටාවන්  
• කඳ සහ සිදුරු රෝග: පටක, පැතිරීම, අසාමාන්‍ය රසායන ධාවනය  
• මුල් ගැටළු: වැඩිවීම, නරක වැඩිවීම, මුල් ගඳ සහ පිරිහීමේ ලක්ෂණ  
• රෝග පැතිරීම අඩු කරන ක්ෂේත්‍ර පිරිපහදු ක්‍රියාකාරකම්  
• ආරක්ෂිත කළමනාකරණය: කප්පාදුව, පිරිපහදුව, ජල බාහිරමුකින් කිරීම නිවැරදි කිරීම සහ ඉලක්කගත ප්‍රතිකාර  
• කෘෂිකර්ම නිලධාරීන්ට සම්බන්ධ වීමේදී සහ ප්‍රචාලන වාර්තා කිරීමේදී  

මෙම මාර්ගෝපදේශය ක්ෂේත්‍රයේ ප්‍රායෝගික භාවිතය සඳහා තැනූ ඇත. ඔබට රෝගය ආරම්භයේදී හඳුනා ගත හැකි නම්, බොහෝ විට ප්‍රචාලන අදියරේ පාලනයට සංසුන්ඳන මිලට වතු විසිරුවාව ආරක්ෂා කළ හැක.`,
      },
      item4: {
        title: 'රබර් වතු විසිරුවාව සඳහා භූමි සූදානම',
        description: 'රබර් ගස් වැඩිවීමට වඩාත් යෝග්‍ය වන පරිදි භූමි සූදානම කිරීමේ සම්පූර්ණ මාර්ගෝපදේශය.',
        longDescription: `භූමි සූදානම රබර් ගස්වලට ඒවායේ මුල් ස්ථාපනය කිරීමේදී සහ පළමු 3 වසර වලදී ක්‍රියාත්මක වීමේදී තීරණය කරයි. නරක භූමි සූදානම ජල රඳවා ගැනීම, පෝෂණ අඩුව සහ දුර්වල මුල් වර්ධනය ඇති කරයි.

මෙම පාඩම විස්තර කරයි:
• භූමි පිරිපහදුව සහ නිවැරදි ක්ෂේත්‍ර පිරිපහදු සැලසුම් සැලසීම  
• භූමි පරීක්ෂණ මූලික කරුණු (pH, සංයුක්ත ද්‍රව්‍ය, NPK සහ සුළු පෝෂණ)  
• විහිර සූදානම: නිර්දේශිත විහිර ප්‍රමාණය සහ නිවැරදි පිරවීම  
• ව්‍යුහගතය/සංයුක්ත ද්‍රව්‍ය එකතු කිරීම ව්‍යුහගතය වැඩිදියුණු කිරීම සහ තෙතමනය සමතුලිත කිරීම සඳහා  
• ජල බාහිරමුකින් කිරීමේ නාලිකා සහ එකමුතු රේඛා එකමුතු භූමි සඳහා  
• ගොළු අඩු කර තෙතමනය නඩුවට ගැනීම සඳහා මල්චිං ක්‍රම  
• වඩාත් හොඳ ජීවිතය සහ වේගවත් පළමු වැඩිවීම සඳහා භූමි සූදානම කිරීමේ ක්‍රමය  

මෙම මාර්ගෝපදේශය වැඩවීම් කාලයට පෙර විශේෂයෙන් ප්‍රයෝජනවේ. එය පැළඳ සිටින මරණය අඩු කරයි, සමාන වැඩිවීම වැඩිදියුණු කරයි සහ අනාගත පොහොර අපහාසය අඩු කරයි.`,
      },
      item5: {
        title: 'පොහොර යෙදීමේ කාලසටහන',
        description: 'රබර් නිපදවීම වැඩිදියුණු කිරීම සඳහා පොහොර යෙදීමේ කාලය සහ ක්‍රමය ඉගෙන ගන්න.',
        longDescription: `රබර් ගස්වලට සමතුලිත පෝෂණයක් අවශ්‍ය වේ එකිනෙකාට කඳ වර්ධනය කිරීමට, සෞඛ්‍ය සම්පන්න පත්‍ර සහ ස්ථාවර ලේටෙක්ස් නිපදවීමට. නිවැරදි පොහොර කාලසටහනක් නිපදවීම වැඩිදියුණු කරයි මිස අපහාසය සහ අනවශ්‍ය වියදම අඩු කරයි.

මෙම පාඩම ආවරණය කරයි:
• වැඩිවීම් අදියර අනුව පෝෂණ අවශ්‍යතා: අනුරූපී vs පරිණාමය සාධිත කැපීම් අදියර  
• NPK වර්ග තෝරා ගැනීමේ ක්‍රමය සහ භූමි පරීක්ෂණ වැදගත් වන්නේ ඇයි  
• යෙදීම් ක්‍රම: වටය යෙදීම, වැසි සමඟ කාලීන කිරීම සහ විභේදන ප්‍රවේශය  
• පොහොර ගිනි සහ මුල් හානිය වළක්වා ගැනීමේ ක්‍රමය  
• වියදම් ඉතිරි කිරීමේ ක්‍රම: කොම්පෝස්ට් + නිවැරදි රසායනික කාලීන කිරීම  
• පෝෂණ අඩුවේ ලක්ෂණ: පත්‍ර වර්ණ වෙනස්වීම්, නරක ප්ලෂිං, වැඩිවීම අඩුවීම  
• ක්ෂේත්‍රයේ ස්ථාවර ප්‍රතිඵල සඳහා වාර්තා රඳවා ගැනීම  

ඔබ නිවැරදි කාලසටහනක් අනුගමනය කර නිවැරදිව යෙදුවහොත්, ඔබට සෞඛ්‍ය සම්පන්න ගස්, ශක්තිමත් සිදුරු නැවත වැඩිවීම සහ කාලයත් සමඟ වඩා හොඳ ලේටෙක්ස් ක්‍රියාකාරකම ලැබේ.`,
      },
      item6: {
        title: 'කැපීම් පැනල කළමනාකරණය',
        description: 'ගස් ජීවන චක්‍රයේදී කැපීම් පැනල කළමනාකරණය සඳහා ඵලදායී උපක්‍රම.',
        longDescription: `කැපීම් පැනල කළමනාකරණය රබර් ගස්වල නිපදවන ආයු කාලයේදී සිදුරු ආරක්ෂා කිරීමට, නැවත වැඩිවීම සහතික කිරීමට සහ ස්ථාවර අස්වාදනයට සහාය වීමට දිගුකාලීන උපක්‍රමයකි.

ඔබ ඉගෙන ගනු ඇත:
• කැපීම් පැනලයක් යනු කුමක්ද සහ පැනල රෝටේෂන් ක්‍රියාත්මක වන්නේ කෙසේද  
• නව පැනලයක් විවෘත කිරීමේදී සහ පැනලයක් විසිත්ත කිරීමේදී  
• සිදුරු ඝනකම සහ නැවත වැඩිවීම නිරීක්ෂණය කිරීමේ ක්‍රමය  
• පැනල වැඩිවීම සහ සිදුරු පරිභෝජන ගැටළු අඩු කිරීමේ ක්‍රමය  
• වසර තුළ කැපීම් පද්ධති සැලසීමේ හොඳම පුහුණු  
• වතු විසිරුවාවන්හි වාර්තා රඳවා ගැනීම සහ සුපර්වයිසන් කිරීමේ වැදගත්කම  
• ගස් වැඩි කාලයක් නිපදවනවා රඳවා ගැනීම සහ ස්ථාවර නිපදවීම සඳහා ප්‍රායෝගික උපදෙස්  

මෙම අන්තර්ගතය සුපර්වයිසර්වරුන්ට, වතු විසිරුවාව කළමනාකරුවන්ට සහ කැපීම් කණ්ඩායම් කළමනාකරණය කරන ප්‍රවීණ ගොවුන්ට විශේෂයෙන් ප්‍රයෝජනවේ.`,
      },
      item7: {
        title: 'සුදු මුල් රෝගය වළක්වා ගැනීම',
        description: 'රබර් ගස්වල සුදු මුල් රෝගය වළක්වා ගැනීම සහ ප්‍රතිකාර ක්‍රම.',
        longDescription: `සුදු මුල් රෝගය රබර් වතු විසිරුවාවේ වඩාත් හානිකර රෝගයක් වන අතර එය භූමි සම්බන්ධතාවය මගින් ගස් අතරට පැතිරීමෙන් මුල් පද්ධතිය විනාශ කරයි.

මෙම පාඩම විස්තර කරයි:
• සුදු මුල් රෝගයට හේතුව කුමක්ද සහ එය පැතිරීමේ ක්‍රමය කෙසේද  
• ක්ෂේත්‍ර රෝග ලක්ෂණ: පත්‍ර වැඩිවීම, තද කහ පත්‍ර, ලේටෙක්ස් අඩුවීම, මුල් පිරිහීම  
• ඉහළ අවදානම් තත්ත්ව: ජල රඳවා ගැනීම, පැරණි කඳන්, නරක ජල බාහිරමුකින් කිරීම  
• වළක්වා ගැනීම: කඳ ඉවත් කිරීම, ක්ෂේත්‍ර පිරිපහදුව සහ නිවැරදි ජල බාහිරමුකින් කිරීම  
• පළමු ප්‍රතිකාර විකල්ප සහ බලපාන ගස් වෙන්කර හඳුනා ගැනීම  
• නැවත වැඩවීම සහ භූමි කළමනාකරණය සඳහා දිගුකාලීන උපක්‍රම  
• නිලධාරීන් සමඟ වාර්තා කිරීම සහ ප්‍රචාලන කළමනාකරණය කිරීමේ ක්‍රමය  

පළමු හඳුනා ගැනීම ක්ෂේත්‍රයේ විශාල කොටස් ඉතිරි කරයි. මෙම පාඩම කුඩා ත්‍යාගශීලීන්ට සහ වතු විසිරුවාව මට්ටමේ කළමනාකරණයට විශේෂයෙන් වැදගත් වේ.`,
      },
      item8: {
        title: 'වැඩවීම සඳහා ක්ලෝන තේරීම',
        description: 'ඔබේ වතු විසිරුවාව සඳහා නිවැරදි රබර් ක්ලෝන තෝරා ගැනීමේ මාර්ගෝපදේශය.',
        longDescription: `ඔබ වැඩවන ක්ලෝනය ඔබේ වතු විසිරුවාවේ අනාගත නිපදවීම, රෝග ප්‍රතිරෝධය සහ දේශීය කාලගුණයට අනුවර්තනය තීරණය කරයි. නරක ක්ලෝනයක් තෝරා ගැනීම වතු විසිරුවාව කළමනාකරණය හොඳ වුවත් නරක ක්‍රියාකාරකමක් ඇති කළ හැක.

මෙම පාඩම ආවරණය කරයි:
• "රබර් ක්ලෝන" යනු කුමක්ද සහ ඒවා වැදගත් වන්නේ ඇයි  
• ප්‍රධාන තේරීම් සාධක: නිපදවීම් ධාවනය, රෝග ප්‍රතිරෝධය, වැඩිවීම් අනුපාතය  
• දේශීය වැසි පතනය, උෂ්ණත්වය සහ භූමි වර්ගයට ක්ලෝන ගැලපීම  
• ප්‍රභෝජනාල මූලාශ්‍ර: සත්‍යාසත්‍ය, සෞඛ්‍ය සම්පන්න ක්ලෝන ද්‍රව්‍ය සහතික කිරීමේ ක්‍රමය  
• මිශ්‍ර/නොදන්නා ක්ලෝන සහ නරක වැඩවීම් ද්‍රව්‍ය වළක්වා ගැනීම  
• ගොවුන්ට සහ නිලධාරීන්ට ප්‍රායෝගික තීරණ ලැයිස්තුව  

මෙම මාර්ගෝපදේශය ගොවුන්ට දිගුකාලීන නිපදවීම වැඩිදියුණු කිරීම සහ රෝග අවදානම අඩු කිරීම සඳහා වඩාත් ආරක්ෂිත වැඩවීම් තීරණ ගැනීමට සහාය වේ.`,
      },
      item9: {
        title: 'වැසි කාලයේ කැපීම් උපදෙස්',
        description: 'වැසි කාලයේදී ඵලදායී කැපීම සඳහා ක්‍රම.',
        longDescription: `වැසි කාලයන් කැපීම් දින අඩු කරයි සහ කැපීම නිවැරදිව නොකළහොත් සිදුරු සංක්‍රමණ ඇති කළ හැක. මෙම පාඩම ගස් ආරක්ෂා කරමින් එකතුව ස්ථාවර රඳවා ගැනීම සඳහා ප්‍රායෝගික ක්‍රම විස්තර කරයි.

ඔබ ඉගෙන ගනු ඇත:
• වැසි ආරක්ෂණ ක්‍රම සහ ආරක්ෂණ ස්ථාපනය කිරීමේ කාලය  
• වැසි රටාවන් මත පදනම්ව කැපීම් කාලය සීරුමාරු කිරීම  
• තෙතමන කැපීම් පැනලවල පොතු සංක්‍රමණ වළක්වා ගැනීම  
• තෙතමන දූෂණයට එරෙහිව ආරක්ෂිත ලේටෙක්ස් එකතුව සහ කූඩු පිරිපහදුව  
• ලේටෙක්ස්හි ජල දූෂණය හැසිරීම  
• ලිස්සා තත්ත්වයන්හි කැපුම්කරුවන්ගේ ආරක්ෂාව ආරක්ෂා කිරීම  

මෙම උපදෙස් ගොවුන්ට වැසි බරපතල වන විට නිපදවීම අඩු කිරීමකින් තොරවා නඩුවට ගත හැක.`,
      },
      item10: {
        title: 'රබර් සඳහා සංයුක්ත පොහොර',
        description: 'රබර් වගාවේදී සංයුක්ත පොහොරේ ප්‍රයෝජන සහ යෙදීම.',
        longDescription: `සංයුක්ත පොහොර දිගුකාලීන භූමි සෞඛ්‍යය වැඩිදියුණු කරයි සහ රසායනික ආදානයන්ට යැපීම අඩු කරයි. රබර් වතු විසිරුවාවන් සඳහා, සංයුක්ත ද්‍රව්‍ය වඩා හොඳ තෙතමනය රඳවා ගැනීමට, ශක්තිමත් මුල් පද්ධති සහ සෞඛ්‍ය සම්පන්න මයික්‍රෝබයිල් ක්‍රියාකාරකමට සහාය වේ.

මෙම පාඩම ආවරණය කරයි:
• සංයුක්ත ආදාන වර්ග: කොම්පෝස්ට්, පොහොර, ගෘහස්ථ පොහොර, මල්චිං, බයෝ-පොහොර  
• භූමි ව්‍යුහගතය සහ පෝෂණ රීසයික්ලිං වල ප්‍රයෝජන  
• සංයුක්ත පොහොර ඵලදායීව යෙදීමේ ක්‍රමය (කාලීන කිරීම + පිහිටුවීම)  
• රසායනික සහ සංයුක්ත පොහොර ආරක්ෂිතව එකතු කිරීම  
• දේශීයව ගොවුන්ට ලබා ගත හැකි අඩු වියදම් සංයුක්ත මූලාශ්‍ර  
• වළක්වා ගත යුතු වැරදි: මුල් වලට විශේෂයෙන්ම නැවත නැවත පොහොර යෙදීම, නරක කොම්පෝස්ටිං  

මෙම පාඩම ගොවුන්ට දිගුකාලීන වගාව සහ වැඩිදියුණු භූමි තත්ත්වය සඳහා නිර්දේශ කරනු ලැබේ.`,
      },
      item11: {
        title: 'පත්‍ර රෝග කළමනාකරණය',
        description: 'සාමාන්‍ය රබර් පත්‍ර රෝග හඳුනා ගැනීම සහ පාලනය.',
        longDescription: `පත්‍ර රෝග පොටෝසින්තෙසිස් අඩු කරයි, ගස් දුර්වල කරයි සහ ලේටෙක්ස් නිපදවීම අඩු කරයි. පත්‍ර රෝගය නිතිපතා වීමෙන් වතු විසිරුවාවන්ට දිගුකාලීන පිරිහීමක් ඇති විය හැක.

මෙම පාඩම විස්තර කරයි:
• ක්ෂේත්‍රයේ සාමාන්‍ය පත්‍ර රෝග හඳුනා ගැනීමේ ක්‍රමය  
• කාලගුණය පත්‍ර රෝග පැතිරීමට බලපාන රිස්ක් කාලයන්  
• ක්ෂේත්‍ර පිරිපහදුව: කප්පාදුව, බලපාන පත්‍ර ඉවත් කිරීම, සෙවණැලි කළමනාකරණය  
• ප්‍රතිරෝධී ක්ලෝන ලෙස දිගුකාලීන ආරක්ෂණයක් සමඟ ප්‍රතිරෝධී ක්ලෝන  
• ආරක්ෂිත ප්‍රයෝග කාලීන කිරීම සහ ප්‍රතිරෝධී ක්‍රම  
• කොතරම් නිතිපතා පරීක්ෂණය කිරීමේදී සහ කුමක් වාර්තා කිරීමේදී මොනිටරිං සැලසුම  

මෙම මාර්ගෝපදේශය ගොවුන්ට වතු විසිරුවාව පුළුල් පැතිරීම අඩු කරමින් ආරම්භයේදී ක්‍රියාත්මක වීමට උදව් කරයි.`,
      },
      item12: {
        title: 'ප්‍රභෝජනාල කළමනාකරණය',
        description: 'රබර් ගස් ප්‍රභෝජනාලයක් ස්ථාපනය කිරීම සහ කළමනාකරණය කිරීම.',
        longDescription: `සෞඛ්‍ය සම්පන්න ප්‍රභෝජනාලයක් ගස් වැඩවීමට පෙර ක්ෂේත්‍රයේ ජීවිතය වැඩිදියුණු කිරීමට සෘජුවම සහාය වේ. නරක ප්‍රභෝජනාල ක්‍රියාකාරකම් දුර්වල පැළඳ සිටින් නිපදවයි ඒවා වැඩවීමෙන් පසු ප්‍රශ්නයට පත් වන අතර පෙත්තන් හෝ රෝග රැගත් හැක.

මෙම පාඩම ආවරණය කරයි:
• බීජ තේරීම සහ ගර්මිනේෂන් මූලික කරුණු  
• පොලිබැග් සූදානම, භූමි මිශ්‍රණය, ජල බාහිරමුකින් කිරීම සහ සෙවණැලි කළමනාකරණය  
• තෙතමනය යෙදීමේ කාලසටහන සහ අතිශයෝක්තිය වළක්වා ගැනීම  
• ප්‍රභෝජනාල අදියරේ පෙත්තන් සහ රෝග වළක්වා ගැනීම  
• ක්ෂේත්‍ර වැඩවීමට පෙර හාර්ඩනිං ක්‍රියාදාමය  
• වඩාත් හොඳ පැළඳ සිටින් තෝරා ගැනීම: කඳ ඝනකම, පත්‍ර සෞඛ්‍යය, මුල් වර්ධනය  
• ප්‍රභෝජනාල වාර්තා සහ ප්‍රතිඵලනය කිරීමේ කාලීන කිරීම  

මෙම පාඩම ගොවුන්ට, සභාවලට සහ රබර් ගස් නිපදවීමේ උසස් ප්‍රමිතියක් සහිත කෘෂිකර්ම අධ්‍යාපනික වැඩසටහන්ට විශේෂයෙන් ප්‍රයෝජනවේ.`,
      },
    },
    faq: {
      title: 'නිතර අසන ප්‍රශ්න',
    subtitle: 'RubberEdge පිළිබඳ වඩාත් සාමාන්‍ය ප්‍රශ්නවලට පිළිතුරු සොයා ගන්න',
      general: 'සාමාන්‍යය',
      disease: 'රෝග සනාක්ත කිරීම',
      quality: 'සීනි කර්මාන්ත තරඳසම',
      market: 'වෙළඳපොළ සහ මිල',
      account: 'ගිණුම සහ සැකසුම්',
      stillNeedHelp: 'තවමත් ප්‍රශ්න තිබේද?',
      stillNeedHelpDesc: 'අපගේ සහයක් කණ්ඩායම ඔබට සහාය කිරීමට මෙහි ඇත',
      contactSupport: 'සහයට සම්බන්ධ වන්න',
      whatIsRubberEdge: 'RubberEdge යනු කුමක්ද?',
      whatIsRubberEdgeAns: 'RubberEdge යනු සීනි ගොවිකරුවන්ට වතුන් කළමනාකරණය කිරීමට, සීනි තරඳසම් නිරීක්ෂණය කිරීමට, රෝග සනාක්ත කිරීමට සහ ගැනුම්කරුවන් සහ කෘෂිකර්ම නිලධාරීන් සමඟ සම්බන්ධ වීමට සැලසුම් කර ඇති ඉතාමත් කටයුතු කරන ජංගම යෙදුමකි.',
      whoCanUse: 'කවුන් මෙම යෙදුම භාවිතා කළ හැකිද?',
      whoCanUseAns: 'යෙදුම සීනි ගොවිකරුවන්, කෘෂිකර්ම නිලධාරීන් සහ සීනි තරඳසම් ගැනුම්කරුවන් සඳහා සැලසුම් කර ඇත. එක එක පරිශීලක වර්ගයට ඔවුන්ගේ අවශ්‍යතා සඳහා අනුවැඩිකරණ කිරීමේ විශේෂාංග ලබා ගත හැකිය.',
      isFree: 'යෙදුම නිදහස් ලෙස භාවිතා කළ හැකිද?',
      isFreeAns: 'ඔව්, RubberEdge හි මූලික විශේෂාංග නිදහස් ලෙස භාවිතා කළ හැකිය. සමහර ප්‍රිමියම් විශේෂ්‍යතා ඉදිරියේදී දැමුම් සඳහා අවශ්‍ය විය හැකිය.',
      offlineUsage: 'මම යෙදුම සම්බන්ධතාවය නොමැතිව භාවිතා කළ හැකිද?',
      offlineUsageAns: 'ඔව්, යෙදුම සම්බන්ධතාවය නොමැතිව වැඩ කිරීමට සැලසුම් කර ඇත. ඔබේ දත්ත ස්ථානීයව ගබඩා කරනු ලැබේ සහ සම්බන්ධතාවය නැවත ලබා ගත් විට සමන්වයීකරණය වේ.',
      diseaseAccuracy: 'රෝග සනාක්ත කිරීමේ නිරවද්‍යතාවය කෙතරම්ද?',
      diseaseAccuracyAns: 'අපගේ AI මෘදුකාංගය රූපයන් විශ්ලේෂණය කරමින් රබර් ගස් රෝග සනාක්ත කරයි. රූපයක් උඩුගත කරන්න සහ තත්පර කිහිපයකින් ප්‍රතිඵල ලබා ගන්න.',
      detectedDisease: 'කුමන රෝග සනාක්ත කර ගත හැකිද?',
      detectedDiseaseAns: 'යෙදුම පොදු රබර් ගස් රෝග වල විශාල පරාසයක් සනාක්ත කළ හැකිය, ඇතුළුව පත්‍ර රෝග, කඳ රෝග සහ මුල් රෝග.',
      whichDiseases: 'මෙම යෙදුම කුමන රෝග සනාක්ත කළ හැකිද?',
      whichDiseasesAns: 'යෙදුම පොදු රබර් ගස් රෝග වල විශාල පරාසයක් සනාක්ත කළ හැකිය, ඇතුළුව පත්‍ර රෝග, කඳ රෝග සහ මුල් රෝග.',
      qualityMeasured: 'සීනි තරඳසම් ගුණාත්මකභාවය පරිමාණය කරන්නේ කෙසේද?',
      qualityMeasuredAns: 'සීනි තරඳසම් ගුණාත්මකභාවය IoT සංවේදකයන් භාවිතා කරමින් පරිමාණය කරන ලබන්නේ pH මට්ටම, පිස්සුවීම, DRC (වියළි රබර් අන්තර්ගතය), උෂ්ණත්වය සහ ගෝලතාව සැබෑ කාලයට නිරීක්ෂණය කිරීමෙනි.',
      qualityAccuracy: 'ගුණාත්මකභාවය ඇගයීමේ නිරවද්‍යතාවය කුමක්ද?',
      qualityAccuracyAns: 'අපගේ IoT පද්ධතිය සීනි තරඳසම් ගුණාත්මකභාවය නිරීක්ෂණයේ දී සංවිධිසම්පන්න සංවේදකයන් භාවිතා කරමින් 98.7% නිරවද්‍යතාව ලබා දෙයි. මෙය ප්‍රතික්ෂේප අනුපාතය 30% සිට 7% ට ඩින්න අඩු කරයි.',
      viewHistory: 'ගුණාත්මකභාවයේ ඉතිහාසය බලා ගත හැකිද?',
      viewHistoryAns: 'ඔව්, ඔබට උපකරණ පුවරුවේ ඕනෑම මිතුරුවරයාවේ විස්තරිත ගුණාත්මකභාවයේ ඉතිහාසය සහ ඉතිරතා බලා ගත හැකිය. ඐතිහාසික දත්ත කාලයින් දී ඔබේ අවස්ථාවන් ගිණුම් කිරීමට උපකාර කරයි.',
      pricesDetermined: 'සීනි තරඳසම් මිල නිර්ණය කරන්නේ කෙසේද?',
      pricesDeterminedAns: 'සීනි තරඳසම් මිල දෛනිකව වෙළඳපොළ තත්ත්වය පිළිබඳ යාවත්කාලීන වේ. යෙදුම බහු ගැනුම්කරුවන්ගෙන් වත්මන් මිල පෙන්වයි, ඔබට සැසඳා සුිතම සඳහා පිළිතුරු පිටපතින් තෝරා ගැනීමට ඉඩ දෙයි.',
      sellDirectly: 'මම යෙදුම හරහා ඒ කෙළින් ලබා දිය හැකිද?',
      sellDirectlyAns: 'ඔව්, ඔබට සත්‍යාපිත ගැනුම්කරුවන් සමඟ සම්බන්ධ වීමට සහ යෙදුම හරහා විකසිතයින් පටන් ගත හැකිය. සියලු ගනුදෙනු স্঵চ্ছතාව සඳහා ලියාපදිංචි වේ.',
      blockchainTraceability: 'බ්ලොක්චේන් අනුපිටපතිකරණය යනු කුමක්ද?',
      blockchainTraceabilityAns: 'Hyperledger Fabric භාවිතා කිරීමෙන්, සෑම බඩුද ගොවිතිබඩුවෙන් කර්මාන්තයට ඉදිරි විපරම් ගිරිනොවන ලේ. එය EUDR අනුකූලතාවය, වංචා සඳහා අඩු කිරීම සහ පිංඡ මිල ඇතුළුවම ලබා දෙයි.',
      updateProfile: 'ගිණුම යාවත්කාලීන කිරීමට නමුත් මා කළ යුතුද?',
      updateProfileAns: 'සැකසුම් > ගිණුම සංස්කරණය ඉතිරි ඔබේ පුද්ගලික තොරතුරු, සම්බන්ධතා විස්තර සහ වතුන් තොරතුරු යාවත්කාලීන කිරීමට.',
      changePassword: 'මගේ මුරපදය වෙනස් කිරීමට මා කළ යුතුද?',
      changePasswordAns: 'සැකසුම් > ආරක්ෂාව > මුරපදය වෙනස් කරන්න ඉතිරි. ඔබට ඔබේ වර්තමාන මුරපදය ඇතුළත් කිරීම සහ එමනින් පරිසර මුරපදය දෙවරක් ඇතුළත් කිරීම අවශ්‍ය වේ.',
      multiplePlantations: 'මම බහු වතුන් එක් ගිණුමින් එකතු කර ගත හැකිද?',
      multiplePlantationsAns: 'ඔව්, ඔබට එක් ගිණුමින් බහු වතුන් කළමනාකරණය කිරීමට ඉඩ ඇත. සැකසුම් > වතුන් > නව වතුර එක් කිරීමට ඉතිරි අතිරේක ගුණාංග ලියාපදිංචි කිරීමට.',
      },
    helpSupport: {
      title: 'උපකාර සහ ආධාර',
      selectYourRole: 'ඔබේ භූමිකාව තෝරන්න',
      frequentlyAskedQuestions: 'නිතර අසන ප්‍රශ්න',
      contactSupport: 'ආධාරට සම්බන්ධ වන්න',
      callSupport: 'ආධාර කිරීමට කතා කරන්න',
      emailSupport: 'ඉ-තැපෙල්',
      whatsAppSupport: 'WhatsApp',
      farmer: 'ගොවියා',
      officer: 'නිලධාරී',
      buyer: 'ගැනුම්කරුවා',
      
      // Farmer FAQs
      farmerQ1: 'මම ඔබේ වතුන්සිටු සංවේදකයන්වලින් දත්ත කියවන්නේ කෙසේද?',
      farmerA1: 'උපකරණ පුවරුව ගිය ඔබේ වතුර තෝරන්න. IoT සංවේදකයන් pH, ගෝලතාවය, DRC, උෂ්ණත්වය සහ ගෝලතාවයේ සැබෑ කාලයේ දත්ත ප්‍රදර්ශනය කරයි. විස්තරිත ඉතිහාසය සහ ඉතිරතා බැලීමට ඕනෑම මිතුරුවරයක් තට කරන්න.',
      farmerQ2: 'රෝග ඍතුවක් ඉදිරිපත් නොවුවහොත් මා කළ යුතුද?',
      farmerA2: 'CLSD හඳුනා ගත් විට ක්ෂණිකව රෝග ඍතුවකට එකතු වේ. ඍතුවෙන් ලබා දෙන අනුබන්ධිත ප්‍රතිකර ප්‍රතිපත්තිය අනුගමනය කරන්න. ඔබට විශේෂඥ මිතුරුවරයත් සමඟ කෘෂිකර්ම නිලධාරීන් ඔබේ එක්ස් විසින් සම්බන්ධ විය හැකිය.',
      farmerQ3: 'ලැටෙක්ස් ගුණාත්මකතා ඇගයීම තරම් නිරවද්‍යතාවය තිබේද?',
      farmerA3: 'අපගේ IoT පද්ධතිය සංවිධිසම්පන්න pH, ගෝලතාවය සහ DRC සංවේදකයන් භාවිතා කරමින් සීනි තරඳසම් ගුණාත්මකතා නිරීක්ෂණයේ දී 98.7% නිරවද්‍යතාවය ලබා දෙයි. මෙය ප්‍රතික්ෂේප අනුපාතය 30% සිට 7% ට පහළට අඩු කරයි.',
      farmerQ4: 'නාම එක්සේ යෙදුම භාවිතා කළ හැකිද?',
      farmerA4: 'ඔව්! යෙදුම දත්ත ස්ථානීයව ගබඩා කරයි සහ සම්බන්ධතාවය නැවත සම්පාදනය කරයි. වැදගත් ඍතුවුන් සහ මෑත දත්ත නාම එක්සේ ප්‍රවේශමය ඉතිරි.',
      farmerQ5: 'IoT සංවේදකයන් සම්බන්ධ කිරීමට මා කළ යුතුද?',
      farmerA5: 'සැකසුම් > උපකරණ > නව සංවේදක එක් කිරීමට යාම. ඔබේ ESP32-ගතිසම සංවේදක කිට් සඳහා ඳුරුවීමේ උපදෙස් අනුගමනය කරන්න. තාක්ෂණික සහාය අවශ්‍ය නම් ආධාරට සම්බන්ධ වන්න.',
      
      // Officer FAQs
      officerQ1: 'බහු වතුන් නිරීක්ෂණ කිරීම නිලධාරීට කෙසේද?',
      officerA1: 'ඔබේ නිලධාරී උපකරණ පුවරුව ඔබේ අධිකරණ බලപෙළේ ලියාපදිංචි සියලු වතුන්ගේ දෘෂ්ටි ලබා දෙයි. කලාපයෙන්, රෝග තත්ත්වයෙන් හෝ ගුණාත්මකතා මිතුරුවරයන්ගෙන් බැලීමට ෆිල්ටර් භාවිතා කරන්න.',
      officerQ2: 'ගොවිකරුවලට නිර්දේශ එවිය හැකි ඒ නිලධාරීට?',
      officerA2: 'ඕනෑම ගොවිකරුගේ පුද්ගලික තොරතුරු තෝරා ගෙන \'උපදෙස් එවන්න\' විශේෂ අංගය භාවිතා කරන්න. ඔබට රෝග කළමනාකරණ මිතුරුවරයන්, වගා උපදෙස් හෝ ගුණාත්මකතා ඉතිරතා අනුබන්ධ කිරීමට ඉඩ ඇත.',
      officerQ3: 'කුමන වාර්තා සිතුවිය හැකිද?',
      officerA3: 'ප්‍රාදේශික රෝග පුපුරෙන වාර්තා, ඉතිරත් පුරෝකථන, ගුණාත්මකතා ඇගයීම සිතුවිය සහ අධිකරණ කරුණු EU වනරුණු-නිදහස් නිතිඥතා (EUDR) සඳහා නිමි කරන්න.',
      officerQ4: 'රෝග සනාක්තකරණ ප්‍රතිඵල සත්‍යාපනය නිලධාරීට කෙසේද?',
      officerA4: 'MobileNet-YOLOv8 පිරිසැලසුම් 99.43% නිරවද්‍යතාවය ලබා දෙයි. ඔබට සනාක්තකරණ රූපයන්, විශ්වාසයේ ශ්‍රේණිය සහ ඐතිහාසික රටාවුන් සත්‍යාපනයට පෙර විමර්ශනය කිරීමට ඉඩ ඇත.',
      
      // Buyer FAQs
      buyerQ1: 'ගිණුම් ගිණුම් සඳහා පෙර ලැටෙක්ස් ගුණාත්මකතා සත්‍යාපනය නිලධාරීට කෙසේද?',
      buyerA1: 'සෑම බඩුවම බ්ලොක්චේන්වල ගබඩා කරන ලද සත්‍යාපිත IoT සංවේදක කියවීම් (pH, ගෝලතාවය, DRC) එක් කරයි. ඔබ නිවේදන ඉදිරිපත් කිරීමට පෙර සම්පූර්ණ ගුණාත්මකතා ඉතිහාසය සහ සතිකරණ තත්ත්වය බලන්න.',
      buyerQ2: 'බ්ලොක්චේන් අනුපිටපතිකරණය යනු කුමක්ද?',
      buyerA2: 'Hyperledger Fabric භාවිතා කිරීමෙන්, සෑම බඩුවම ගොවිතිබඩුවෙන් කර්මාන්තයට ඉදිරි විපරම් ගිරිනොවන ලේ. එය EUDR අනුකූලතාවය, වංචා සඳහා අඩු කිරීම සහ පිංඡ මිල ඇතුළුවම ලබා දෙයි.',
      buyerQ3: 'බටන් හරහා ගිණුම් විස්තර එවිය හැකි ඒ?',
      buyerA3: 'ලබා ගිණුම් බඩුවුන් පිරික්සා බලන්න, ගුණාත්මකතා මිතුරුවරයන් විමර්ශනය කරන්න, සපයන්නා ශ්‍රේණිය පරීක්ෂා කරන්න සහ ඉතිරිව සරල වැඩි ඉතිරි දෙන්න. සියලු ගනුදෙනු බ්ලොක්චේන්වල ලියාපදිංචි වේ.',
      buyerQ4: 'නිවේදන තත්ත්වය අනුගමනය කිරීමට මට කිරීමට හැකිද?',
      buyerA4: 'ඔව්! සැබෑ කාලයේ ඉදිරි අනුමතිය, නිෂ්පාදනය සහ බෙදා දෙන තත්ත්වය පෙන්වයි. බ්ලොක්චේන් වාර්තා සපයන් දාමයේ ගුණාත්මකතා අවිචල සාධනයක් ලබා දෙයි.',
    },
    contactPage: {
        headerTitle: 'අපට සම්බන්ධ වන්න',
        heroInfoTitle: 'අපි ඔබට උදව් කිරීමට සිටිමු',
        heroInfoSubtitle: 'අපගේ ආධාර කණ්ඩායම හමුවන්න සහ අපි හැකි ඉක්මනින් ප්‍රතිචාර දෙන්නෙමු',
      quickContact: 'ඉක්මන් සම්බන්ධතා',
      sendUsMessage: 'අපට පණිවිඩයක් එවන්න',
      yourName: 'ඔබේ නම',
      yourNamePlaceholder: 'ඔබේ නම ඇතුළත් කරන්න',
      emailAddress: 'ඉ-තැපෙල් ලිපිනය',
      emailAddressPlaceholder: 'ඔබේ ඉ-තැපෙල් ඇතුළත් කරන්න',
      subject: 'ගැටලුව',
      subjectPlaceholder: 'මෙය පිළිබඳ කුමක්ද?',
      message: 'පණිවිඩය',
      messagePlaceholder: 'ඔබේ පණිවිඩය මෙහි ඇතුළත් කරන්න...',
      sendMessage: 'පණිවිඩය යවන්න',
      sending: 'යවමින්...',
      messageSent: 'පණිවිඩය යැවිණි!',
      messageSentDesc: 'අපට සම්බන්ධ වීමට ස්තුතියි. අපි 24-48 පැයින් ඔබට ප්‍රතිචාර දෙන්නෙමු.',
      fillAllFields: 'කරුණාකර සියලු ක්ෂේත්‍ර පුරවන්න',
      invalidEmail: 'කරුණාකර වලංගු ඉ-තැපෙල් ලිපිනයක් ඇතුළත් කරන්න',
      officeHours: 'කාර්යාලය නිවසේ ඉතුරු කිරීම්',
      mondayFriday: 'සඳුදා - සිකුරා: උවදෙ 8:00 - සවස 5:00',
      saturday: 'සෙනසුරාදා: උවදෙ 9:00 - හරinnan 1:00',
      sunday: 'ඉරිදා: වසා ඇත',
      weHereToHelp: 'අපි ඔබට උදව් කිරීමට සිටිමු',
      supportTeam: 'අපගේ ආධාර කණ්ඩායම හමුවන්න',
    },
    farmerDirectory: {
      headerTitle: 'ගොවිපලු නාමාවලිය',
      searchPlaceholder: 'ගොවිපලුවරුන් සොයන්න...',
      loadingFarmers: 'ගොවිපලුවරුන් පූරණය කරමින්...',
      noFarmersFound: 'ගොවිපලුවරුන් හමු නොවිණි',
      noFarmersDesc: 'තවම කිසිදු ගොවිපලුවරුන් ලියාපදිංචි නොවී ඇත',
      tryAdjustingSearch: 'ඔබේ සෙවුම් පද සකස් කිරීමට උත්සාහ කරන්න',
      farmer: 'ගොවිපලුවරු',
      farmers: 'ගොවිපලුවරුන්',
      failedToLoadFarmers: 'ගොවිපලුවරුන් පූරණය කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
    },
    officerDirectory: {
      headerTitle: 'ආධාර නිලධාරීන්',
      loadingOfficers: 'නිලධාරීන් පූරණය වෙමින්...',
      noOfficersAvailable: 'ඉলක්කු වූ නිලධාරීන් නැත',
      noOfficersDesc: 'දැනට පද්ධතියේ කිසිදු ආධාර නිලධාරීන් නොමැත.',
      retry: 'නැවතත් උත්සාහ කරන්න',
      tapToViewDetails: 'විස්තර බැලීමට තට කරන්න',
      officer: 'නිලධාරී',
      officers: 'නිලධාරීන්',
      failedToLoadOfficers: 'නිලධාරීන් පූරණය කිරීමට අපොහොසත් විය. කරුණාකර නැවතත් උත්සාහ කරන්න.',
    },
    officerDetail: {
      headerTitle: 'නිලධාරී විස්තර',
      loadingOfficerDetails: 'නිලධාරී විස්තර පූරණය වෙමින්...',
      officerNotFound: 'නිලධාරී හමු නොවිණි',
      phone: 'දුරකථනය',
      employeeId: 'සේවක හැඳුනුම්පත',
      department: 'දෙපාර්තමේන්තුව',
      role: 'භූමිකාව',
      verified: 'සත්‍යාපිතයි',
      joined: 'එක්වී ගිය',
      yes: 'ඔව්',
      no: 'නැත',
      callOfficer: 'නිලධාරීට ඇමතින්න',
      startChat: 'කතා පටන් කරන්න',
      failedToLoadOfficerDetails: 'නිලධාරී විස්තර පූරණය කිරීමට අපොහොසත් විය.',
      failedToStartChat: 'නිලධාරීගේ සමඟ කතාව ආරම්භ කිරීමට අපොහොසත් විය.',
    },
    chatScreen: {
      online: 'සබඳතාවයේ',
      connecting: 'සংযුක්ත වෙමින්...',
      noMessagesYet: 'තවම පණිවිඩ නැත',
      startConversation: '{name} සමඟ කතාව ආරම්භ කරන්න!',
      noConversationSelected: 'කිසිම සංවාදයක් තෝරා ගී නැත',
      roleMismatch: 'එක්ස පාංශුක හමුවිය',
      goBack: 'ආපසු යන්න',
      messagePlaceholder: '{name}... ට පණිවිඩය',
    },
    userGuide: {
      headerTitle: 'පරිශීලක මාර්ගෝපදේශ',
      welcomeTitle: 'RubberEdge සඳහා සාදරයි',
      welcomeSubtitle: 'ඔබේ සීනි වතුන් কાර්යকරලෙන් කළමනාකරණය කිරීමට යෙදුමේ සියලු විශේෂාංග භාවිතා කරන ආකාරය ඉගෙන ගන්න',
      howToUse: 'භාවිතා කරන ආකාරය',
      gettingStarted: 'පටන්ගැනීම',
      diseaseDetection: 'රෝග සනාක්තකරණ',
      monitoringLatexQuality: 'සීනි තරඳසම් ගුණාත්මකභාවය නිරීක්ෂණය කිරීම',
      marketAndSelling: 'වෙළඳපල සහ විකිණීම',
      weatherForecasts: 'කාලගුණ පූර්වලාසය',
      gettingHelp: 'උපකාර ලබාගැනීම',
      usingOffline: 'නොමිතිකව භාවිතා කිරීම',
      needMoreHelp: 'තවත් උපකාර අවශ්‍යද?',
      needMoreHelpSubtitle: 'අපගේ ආධාර කණ්ඩායම සම්බන්ධ කරන්න හෝ අපගේ AI සහాය සමඟ චැට් කරන්න',
      chatWithAI: 'AI සමඟ චැට් කරන්න',
      contactUs: 'අපට සම්බන්ධ වන්න',
      // Getting Started steps
      createAccountTitle: 'ඔබේ ගිණුම් සාදන්න',
      createAccountDesc: 'ඔබේ දුරකථන අංකය සමඟ ලියාපදිංචි වීම සහ OTP සමඟ සත්‍යාපනය කරන්න. ඔබේ මූලික විස්තර ඇතුළත් කරන්න නම, ස්ථානය සහ වතුන් තොරතුරු.',
      setUpProfileTitle: 'ඔබේ පුද්ගලික තොරතුරු සකස් කරන්න',
      setUpProfileDesc: 'ඔබේ වතුන් විස්තර, සම්බන්ධතා තොරතුරු සහ ඔබේ තෝරාගත් භාෂාව තෝරා ගැනීමෙන් ඔබේ පුද්ගලික තොරතුරු සම්පූර්ණ කරන්න.',
      exploreDashboardTitle: 'උපකරණ පුවරුව පිරික්සන්න',
      exploreDashboardDesc: 'ඔබේ උපකරණ පුවරුව සැබෑ කාලයේ සීනි ගුණාත්මකභාව මිතුරුවරයන්, කාලගුණ යාවත්කාලීන කිරීම්, වෙළඳපොළ මිල සහ වැදගත් දැනුම්දීම් පෙන්වයි.',
      // Disease Detection steps
      takePhotoTitle: 'ඡායාරූපයක් ගන්න',
      takePhotoDesc: 'රෝග සනාක්ත කිරීමේ ටැබයට ගොස් කැමරා බටනය තට කරන්න. ප්‍රභලිත සීනි කොළපත් ඡායාරූපයක් ගන්න.',
      waitForAnalysisTitle: 'විශ්ලේෂණය සඳහා රැඳී සිටින්න',
      waitForAnalysisDesc: 'අපගේ AI ඡායාරූපය විශ්ලේෂණය කරයි සහ තත්පර කිහිපයකින් රෝග හඳුනා ගනී උසස් යාන්ත්‍රික බුද්ධිමත්තාවය භාවිතා කරමින්.',
      viewResultsTitle: 'ප්‍රතිඵල බලන්න',
      viewResultsDesc: 'හඳුනාගත් රෝගය, විශ්වාසයේ මට්ටම සහ ලක්ෂණ සහ හේතෝන් පිළිබඳ විස්තරිත තොරතුරු බලන්න.',
      getTreatmentTitle: 'උපකාර ලබා ගන්න',
      getTreatmentDesc: 'නිර්දේශිත උපකාර සැලසුම් සහ වැළැක්වීමේ උපදෙස් අනුගමනය කරන්න. ඔබට විශේෂඥ උපදෙස් සඳහා කෘෂිකර්ම නිලධාරීන්ගෙන් සම්බන්ධ විය හැකිය.',
      // Latex Quality steps
      viewRealTimeDataTitle: 'සැබෑ කාලයේ දත්ත බලන්න',
      viewRealTimeDataDesc: 'ඔබේ උපකරණ පුවරුවෙන් IoT සංවේදකයන්ගෙන් pH, DRC, උෂ්ණත්වය, ආර්ද්‍රතාවය සහ ගෝලතාවයේ සජීවී කියවීම් පරීක්ෂා කරන්න.',
      understandMetricsTitle: 'මිතුරුවරයන් තේරුම් ගන්න',
      understandMetricsDesc: 'ඕනෑම මිතුරුවරයක විස්තරිත විස්තර, ප්‍රමිත පරාසයන් සහ ඓතිහාසික ඉතිරතා බැලීමට ටැප් කරන්න.',
      setQualityAlertsTitle: 'ගුණාත්මකභාවයේ ඇඟවීම් සකස් කරන්න',
      setQualityAlertsDesc: 'ඕනෑම මිතුරුවරයක ප්‍රමිත පරාසයෙන් පිටත ගිය විට ඔබට දැනුම් දීමට දැනුම්දීම් වින්‍යාස කරන්න.',
      improveQualityTitle: 'ගුණාත්මකභාවය වැඩිදියුණු කරන්න',
      improveQualityDesc: 'ඔබේ සීනි ගුණාත්මකභාවය වැඩිදියුණු කර හොඳ මිල ලබා ගැනීමට AI-ධාවිත නිර්දේශ අනුගමනය කරන්න.',
      // Market steps
      checkMarketPricesTitle: 'වෙළඳපොළ මිල පරීක්ෂා කරන්න',
      checkMarketPricesDesc: 'වෙළඳපොළ ටැබයට ගොස් ඔබේ ප්‍රාන්තයේ විවිධ ගැනුම්කරුවන්ගෙන් වත්මන් සීනි මිල බලන්න.',
      compareBuyersTitle: 'ගැනුම්කරුවන් සංසන්දනය කරන්න',
      compareBuyersDesc: 'හොඳම ගනුදෙනුව ලබා ගැනීමට බහු ගැනුම්කරුවන්ගෙන් මිල, රේටිං සහ නියමයන් සංසන්දනය කරන්න.',
      connectWithBuyersTitle: 'ගැනුම්කරුවන් සමඟ සම්බන්ධ වන්න',
      connectWithBuyersDesc: 'ගැනුම්කරුවෙකුගේ පුද්ගලික තොරතුරු බැලීමට ටැප් කර කතාවක් ආරම්භ කරන්න හෝ විකිණීම් ඉල්ලීමක් එවන්න.',
      trackTransactionsTitle: 'ගනුදෙනු නිරීක්ෂණය කරන්න',
      trackTransactionsDesc: 'සියලු විකිණීම් බ්ලොක්චේන් තාක්ෂණය සමඟ ලියාපදිංචි වේ සම්පූර්ණ ප්‍රකාශිතභාවය සඳහා.',
      // Weather steps
      viewCurrentWeatherTitle: 'වත්මන් කාලගුණය බලන්න',
      viewCurrentWeatherDesc: 'ඔබේ වතුන් සඳහා උෂ්ණත්වය, ආර්ද්‍රතාවය සහ වායු වේගය ඇතුළු වත්මන් කාලගුණ තත්ත්වයන් පරීක්ෂා කරන්න.',
      sevenDayForecastTitle: 'දින 7 පූර්වලාසය',
      sevenDayForecastDesc: 'විස්තරිත දින 7 කාලගුණ පූර්වලාසය භාවිතා කර ඔබේ ටැපිං උත්සාහය සැලසුම් කරන්න.',
      weatherAlertsTitle: 'කාලගුණ ඇඟවීම්',
      weatherAlertsDesc: 'වැසි, ගාල්ල සහ අතිශයෝක්ති කාලගුණ තත්ත්වයන් පිළිබඳ දැනුම්දීම් ලබා ගන්න.',
      // Support steps
      aiChatAssistantTitle: 'AI චැට් සහායක',
      aiChatAssistantDesc: 'සීනි ගොවනය පිළිබඳ ඕනෑම ප්‍රශ්නයක් අපගේ AI සහායකට අසන්න. දින 24 සහායක් ලබා ගත හැකිය.',
      contactOfficersTitle: 'නිලධාරීන් සම්බන්ධ කරන්න',
      contactOfficersDesc: 'විශේෂඥ මාර්ගෝපදේශය සඳහා කෘෂිකර්ම නිලධාරීන්ගේ ලේඛනාගාරය පිරික්සා සම්බන්ධ වන්න.',
      learningCenterTitle: 'ඉගෙනුම් මධ්‍යස්ථානය',
      learningCenterDesc: 'රබර් වගාවේ හොඳ පුහුණු විද්‍යාව පිළිබඳ අධ්‍යාපනික වීඩියෝ, ලිපි සහ මාර්ගෝපදේශ ප්‍රවේශ කරන්න.',
      faqsTitle: 'නිතර අසන ප්‍රශ්න',
      faqsDesc: 'අපගේ සම්පූර්ණ FAQ කොළපතේ සාමාන්‍ය ප්‍රශ්නවලට ඉක්මන් පිළිතුරු සොයා ගන්න.',
      // Offline steps
      offlineModeTitle: 'නොමිතික ප්‍රකාරය',
      offlineModeDesc: 'යෙදුම නොමිතිකව ක්‍රියා කරයි! ඔබේ දත්ත දේශීයව ගබඩා කරනු ලැබේ සහ අන්තර්ජාලයට නැවත සම්බන්ධ වූ විට සමන්වයීකරණය වේ.',
      cachedDataTitle: 'කැෂ් කරන ලද දත්ත',
      cachedDataDesc: 'අන්තර්ජාලය නොමැති විට ප්‍රසංග ගුණාත්මකභාව කියවීම්, මිල සහ කාලගුණ දත්ත තවමත් ප්‍රවේශ කළ හැකිය.',
      autoSyncTitle: 'ස්වයංක්‍රීය සමන්වයීකරණය',
      autoSyncDesc: 'සම්බන්ධතාවය ප්‍රතිස්ථාපිත වූ විට, සියලු දත්ත ස්වයංක්‍රීයව සර්වරයට සමන්වයීකරණය වේ.',
    },

    // Buyers Screen
    buyersScreen: {
      headerTitle: 'ගැනුම්කරු මිල',
      headerSubtitle: 'ලියාපදිංචි ගැනුම්කරුවරුන්ගේ මිල බලන්න',
      searchPlaceholder: 'නම හෝ නගරය අනුව සෙවීම...',
      filterAll: 'සියලුම ශ්‍රේණි',
      currentPrices: 'වර්තමාන මිල',
      best: 'හොඳම',
      lkr: 'LKR',
      perKg: 'kg බදු',
      additionalInfo: 'අතිරේක තොරතුරු',
      contactBuyer: 'ගැනුම්කරු සම්බන්ධ කරන්න',
      error: 'දෝෂය',
      failedToLoadPrices: 'මිල ලබා ගැනීමට අපොහොසත්',
      noPhoneAvailable: 'දුරකථන අංකයක් නොමැත',
      callError: ' ඇමතුමක් කිරීමට හැකි නැත',
      buyers: 'ගැනුම්කරුවරු',
      listings: 'ලැයිස්තු',
      verified: 'සත්‍යාපිත',
      noPricesAvailable: 'මිල ලබා ගත නොහැක',
      noBuyersPosted: 'ගැනුම්කරුවරු තවම මිල පෝස්ට් කර නැත',
      tryAdjustingFilters: 'ඔබේ ෆිල්ටර් ගැලපීමට උත්සාහ කරන්න',
      loadingPrices: 'මිල ලබා ගනිමින් ඇත...',
    },

    // Other Buyers Prices Screen
    otherBuyersPricesScreen: {
      headerTitle: 'අනෙකුත් ගැනුම්කරු මිල',
      headerSubtitle: 'විවිධ ගැනුම්කරුවරුන් විසින් මිල සංසන්දනය කරන්න',
      noBuyersAvailable: 'ගැනුම්කරුවරු ලබා ගත නොහැක',
      noBuyersDesc: 'මේ සময়ේ අනෙකුත් ගැනුම්කරුවරු සොයා ගත නොහැකි විය',
      unableToLoad: 'දත්ත ලබා ගැනීමට හැකි නැත',
      tryAgain: 'නැවත උත්සාහ කරන්න',
      buyers: 'ගැනුම්කරුවරු',
      prices: 'මිල',
      cities: 'නගර',
      loadingPrices: 'මිල ලබා ගනිමින් ඇත...',
      pleaseWait: 'කරුණාකර සඳහා වන්න...',
      verified: 'සත්‍යාපිත',
      pricesLabel: 'මිල',
      updated: 'යාවත්කාලීන',
      lkr: 'LKR',
    },

    // Weather Screen
    weatherScreen: {
      loadingWeather: 'කාලගුණ ලබා ගනිමින්...',
      feelsLike: 'හැඟෙනු ඇත',
      todaysTappingConditions: 'අද කසාඩු කිරීමේ තත්ත්‍ව',
      excellent: 'ඉතා හොඳයි',
      good: 'හොඳ',
      fair: 'සාධාරණ',
      poor: 'දුර්වල',
      notRecommended: 'නිර්දේශ නොකරනු ලබන',
      bestTappingWindow: 'හොඳම කසාඩු කිරීමේ කාලය',
      optimalLatexFlow: 'මෙම කාල පරිච්ඡේදයේ හොඳම ලැටෙක්ස් ගැලීම',
      expectedLatexQuality: 'අපේක්ෂිත ලැටෙක්ස් ගුණාත්මකතාවය',
      qualityGrade: 'ගුණාත්මකතා ශ්‍රේණිය',
      estDrc: 'ඇස්. DRC',
      humidity: 'ආර්ද්‍රතාවය',
      wind: 'සුළඟ',
      uvIndex: 'UV දර්ශකය',
      pressure: 'පීඩනය',
      high: 'ඉහළ',
      low: 'පහළ',
      normal: 'සාමාන්‍ය',
      hourlyForecast: 'පැයපසින් අනාවැකිය',
      sevenDayForecast: '7 දින අනාවැකිය',
      tappingScore: 'කසාඩු ලකුණු',
      rubberFarmingTips: 'රබර් ගොවිතැන් ඉඟි',
      highRainProbability: 'ඉහළ වර්ෂාපතන සම්භාවිතාව',
      avoidTappingRain: 'ලැටෙක්ස් තනුක වීම සහ පොත්ත හානි වැළැක්වීමට කසාඩු කිරීම වළකින්න.',
      highHumidity: 'ඉහළ ආර්ද්‍රතාවය',
      highHumidityDesc: 'ඉහළ ආර්ද්‍රතාවය ලැටෙක්ස් කැටි ගැසීම මන්දගාමී කළ හැක. අවශ්‍ය නම් ඇමෝනියා සංරක්ෂණය භාවිතා කරන්න.',
      highTemperature: 'ඉහළ උෂ්ණත්වය',
      highTemperatureDesc: 'හොඳම ලැටෙක්ස් ගැලීම සහ ගුණාත්මකතාව සඳහා උදේ කාලයේ කසාඩු කරන්න.',
      optimalTappingTime: 'හොඳම කසාඩු කිරීමේ කාලය',
      optimalTappingDesc: 'හොඳම කසාඩු කිරීමේ කාලය හිරු නැඟීමට මිනිත්තු 30 කට පෙර ටර්ගර් පීඩනය ඉහළම විට.',
      checkTrees: 'ගස් පරීක්ෂා කරන්න',
      checkTreesDesc: 'කසාඩු කිරීමට පෙර ඔබේ ගස් පැනල වියළීම පරීක්ෂා කරන්න. වියළි පැනලවලට විශ්‍රාම කාල අවශ්‍ය වේ.',
      today: 'අද',
      tomorrow: 'හෙට',
      weatherDataBy: 'කාලගුණ දත්ත Open-Meteo.com වෙතින්',
      now: 'දැන්',
      // Weather conditions
      clearSky: 'පැහැදිලි අහස',
      mainlyClear: 'බොහෝ දුරට පැහැදිලි',
      partlyCloudy: 'අර්ධ වලාකුළු සහිත',
      overcast: 'වලාකුළු සහිත',
      foggy: 'මීදුම සහිත',
      rimeFog: 'හිම මීදුම',
      lightDrizzle: 'සුළු වැස්ස',
      drizzle: 'වැස්ස',
      denseDrizzle: 'තද වැස්ස',
      lightRain: 'සුළු වැසි',
      rain: 'වැසි',
      heavyRain: 'තද වැසි',
      lightSnow: 'සුළු හිම',
      snow: 'හිම',
      heavySnow: 'තද හිම',
      rainShowers: 'වැසි වැටීම්',
      moderateShowers: 'මධ්‍යස්ථ වැසි',
      heavyShowers: 'තද වැසි වැටීම්',
      thunderstorm: 'අකුණු කුණාටුව',
      severeStorm: 'දරුණු කුණාටුව',
      unknown: 'නොදන්නා',
      // Quality levels
      moderate: 'මධ්‍යස්ථ',
      // Recommendation texts
      excellentRecommendation: 'රබර් කසාඩු කිරීම සඳහා පරිපූර්ණ තත්ත්‍ව. ඉහළ ගුණාත්මක ලැටෙක්ස් අස්වැන්නක් අපේක්ෂා කරන්න.',
      goodRecommendation: 'කසාඩු කිරීම සඳහා හොඳ තත්ත්‍ව. සාමාන්‍ය මෙහෙයුම් සමඟ ඉදිරියට යන්න.',
      fairRecommendation: 'මධ්‍යස්ථ තත්ත්‍ව. වඩා හොඳ අස්වැන්නක් සඳහා හැකි නම් ප්‍රමාද කිරීම සලකා බලන්න.',
      poorRecommendation: 'අහිතකර තත්ත්‍ව. කසාඩු කිරීම අඩු ගුණාත්මක ලැටෙක්ස් ඇති කළ හැක.',
      notRecommendedRecommendation: 'අද කසාඩු නොකරන්න. කාලගුණ තත්ත්‍ව ලැටෙක්ස් ගුණාත්මකතාවයට සැලකිය යුතු ලෙස බලපානු ඇත.',
    },

    // Growth Screen
    growthScreen: {
      headerTitle: 'වර්ධන මිනුම්',
      headerSubtitle: 'ඔබේ රබර් ගස් වර්ධනය ස්පර්ශ කරන්න',
      measureTreeGrowth: 'ගස් වර්ධනය මැනීම',
      useCameraOrManual: 'කැමරා මිනුම් භාවිතා කරන්න හෝ අගයන් අතින් ඇතුලත් කරන්න',
      camera: 'කැමරා',
      manual: 'ඇතුල් කරන්න',
      latestMeasurement: 'නවතම මිනුම්',
      allMeasurements: 'සියලු මිනුම්',
      noMeasurements: 'තවම මිනුම් නැත',
      startMeasuringTrees: 'කැමරා භාවිතයෙන් ඔබේ රබර් ගස් මැනීම ආරම්භ කරන්න',
      records: 'වාර්තා',
      loading: 'පූරණය වෙමින්...',
      requiredField: 'අවශ්‍ය ක්ෂේත්‍ර',
      pleaseEnterTreeId: 'කරුණාකර ගස් ID එකක් ඇතුලත් කරන්න',
      pleaseEnterGirth: 'කරුණාකර ඝිර මිනුම් ඇතුලත් කරන්න',
      invalidValue: 'අවලංගු අගය',
      pleaseEnterValidGirth: 'කරුණාකර වලංගු ඝිර මිනුම් ඇතුලත් කරන්න',
      pleaseEnterValidHeight: 'කරුණාකර වලංගු උස මිනුම් ඇතුලත් කරන්න',
      measurementSaved: 'මිනුම් සුරකින ලදී!',
      deleteMeasurement: 'මිනුම් මකන්න',
      deleteConfirmation: 'ඔබ විශ්වාසයි ඔබ මෙම මිනුම් මකා දැමීමට අවශ්‍යද?',
      deleteRecord: 'මකන්න',
      howToMeasure: 'කිරීමේ ක්‍රම',
      positionReferenceCard: 'Reference කාඩ් ස්ථිතිකරණය කරන්න',
      holdCard: 'වගේ අධි/නිම්ඩ කාඩ්ඩු (8.56cm පළල) ඔබේ ගස් කඳු ඉතින් 120cm උස සිටින්න.',
      markCardWidth: 'කාඩ් පළල සලකුණු කරන්න',
      tapLeftRight: 'කාඩ්ඩුවේ වම් දාරය තට්ටු කරන්න, පසුව දකුණු දාරය තට්ටු කරන්න. මෙම මිනුම් පරිමාණයක් සකසයි.',
      markTrunkDiameter: 'කඳුවේ විෂ්කම්භය සලකුණු කරන්න',
      tapTwoPoints: 'කඳුවේ එක පැත්තක් තට්ටු කරන්න, පසුව ප්‍රතිවිරුද්ධ පැත්තක් තට්ටු කරන්න. යෙදුම ස්වයංක්‍රීයව ඝිර ගණනය කරයි.',
      saveMeasurement: 'මිනුම් සුරකින්න',
      onceCalculated: 'ගණනය කළ පසු, ගස් ID සහ ස්ථානය සමඟ වාර්තා කිරීමට සුරකින බොත්තම තට්ටු කරන්න.',
      treeReadyForTapping: 'ගස් ඝිර 50cm ට ළඟා නොවන තුරු කසාඩු කිරීමට සූදානම් වේ.',
      typicallyYears: '(සාමාන්‍යයෙන් වසර 5-7).',
      bestAccuracy: 'විශිෂ්ටතම නිවුරුබිම සඳහා, දුරකතනය ගස් කඳුවට සමාන්තරව අචල ගලපන්න.',
      holdPhoneParallel: 'දුරකතනය ගස් කඳුවට සමාන්තරව අඩු කරන්න',
      gotIt: 'තේරුණා!',
      manualEntry: 'අතින් ඇතුළත් කිරීම',
      enterMeasurements: 'ටේප් මිනුම් සමඟ ගත් මිනුම් ඇතුලත් කරන්න',
      treeId: 'ගස් ID',
      eg: 'උ.දා., T-001, Block-A-15',
      girthCm: 'Girth (cm)',
      circumference: '120cm උසින් පරිවර්තිතය',
      heightCm: 'උස (cm)',
      optional: 'විකල්ප',
      location: 'ස්ථානය',
      egBlockA: 'උ.දා., Block A, Row 5',
      notes: 'සටහන්',
      observations: 'කිසිදු ප්‍රකාශන (සෞඛ්‍යය, පොත්ත තත්ත්‍ව, ආදිය)...',
      readyForTapping: 'කසාඩු කිරීමට සූදානම්',
      almostReady: 'නිකුත් සූදානම්',
      growingWell: 'හොඳින් වර්ධනය වෙමින්',
      earlyStage: 'මුල් අවස්ථාව',
      tapCardPoints: 'කාඩ් පළලින් 2 ලකුණු තට්ටු කරන්න',
      tapTrunkPoints: 'කඳුවේ විෂ්කම්භයෙන් 2 ලකුණු තට්ටු කරන්න',
      measurementComplete: 'මිනුම් සම්පූර්ණ! වාර්තා කිරීමට සුරකින බොත්තම තට්ටු කරන්න.',
      tapTrunkPoints2: 'කඳුවේ විෂ්කම්භයෙන් 2 ලකුණු තට්ටු කරන්න',
      reset: 'නැවත සකසන්න',
      longPressDelete: 'වාර්තා මකා දැමීමට දිගු පීඩනය කරන්න',
      requestingCamera: 'කැමරා අවසරය ඉල්ලා සිටින්න...',
      permissionRequired: 'අවසර අවශ්‍යතාවය',
      cameraAccessNeeded: 'කැමරා ප්‍රවේශයට අවශ්‍යතාවය',
      failedToSaveMeasurement: 'මිනුම් සුරැකීමට අසමත්',
    },
    marketScreen: {
      rubberMarket: 'රබර් වෙළඳපොළ',
      liveLocationPrices: 'ශ්‍රී ලංකාව • සජීවී මිල',
      updated: 'යාවත්කාලීන',
      loadingMarketData: 'වෙළඳපොළ දත්ත පූරණය වෙමින්',
      fetchingPrices: 'නවතම රබර් මිල ලබා ගනිමින්...',
      oops: 'අපොයි!',
      tryAgain: 'නැවත උත්සාහ කරන්න',
      failedToLoadPrices: 'වෙළඳපොළ මිල පූරණය කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
      currentPrice: 'වත්මන් මිල',
      weeklyChange: 'පසුගිය කාලයෙන් සතිපතා වෙනස',
      sixMonthTrend: 'මාස 6 මිල ප්‍රවණතාව',
      rss3Grade: 'RSS3 ශ්‍රේණිය',
      marketStatistics: 'වෙළඳපොළ සංඛ්‍යාලේඛන',
      weekHigh: 'සතියේ ඉහළම',
      weekLow: 'සතියේ පහළම',
      monthHigh: 'මාසයේ ඉහළම',
      monthLow: 'මාසයේ පහළම',
      noHistoricalData: 'ඓතිහාසික දත්ත නොමැත',
      statsUnavailable: 'වෙළඳපොළ සංඛ්‍යාලේඛන නොමැත',
      allRubberGrades: 'සියලුම රබර් ශ්‍රේණි',
      tapToSelect: 'තේරීමට තට්ටු කරන්න',
      dataSource: 'කොළඹ රබර් වෙළඳුන්ගේ සංගමයේ (CRTA) වෙන්දේසි මගින් ලබාගත් දත්ත, සිලෝන් වාණිජ මණ්ඩලයේ සතියකට දෙවරක් පැවැත්වේ.',
      viewOfficialPrices: 'නිල CRTA මිල බලන්න →',
      cannotOpenLink: 'සබැඳිය විවෘත කළ නොහැක',
      unableToOpenWebsite: 'CRTA වෙබ් අඩවිය විවෘත කළ නොහැක. කරුණාකර www.crtasl.org අතින් පිවිසෙන්න.',
      failedToOpenWebsite: 'වෙබ් අඩවිය විවෘත කිරීමට අසමත් විය.',
      rss1Desc: 'දුම් ආවරණ පත්‍ර ශ්‍රේණිය 1',
      rss2Desc: 'දුම් ආවරණ පත්‍ර ශ්‍රේණිය 2',
      rss3Desc: 'දුම් ආවරණ පත්‍ර ශ්‍රේණිය 3',
      rss4Desc: 'දුම් ආවරණ පත්‍ර ශ්‍රේණිය 4',
      rss5Desc: 'දුම් ආවරණ පත්‍ර ශ්‍රේණිය 5',
      latexDesc: 'සෙන්ට්‍රිෆියුගඩ් ලැටෙක්ස්',
      tsr20Desc: 'තාක්ෂණිකව නිශ්චිත රබර්',
      crepeDesc: 'සුදු ක්‍රේප් රබර්',
    },

    // Farm Location Screen
    farmLocation: {
      loading: 'ගොවිපල ස්ථානය පූරණය වෙමින්...',
      updateYourLocation: 'ඔබේ ගොවිපල ස්ථානය යාවත්කාලීන කරන්න',
      pinOnMap: 'සිතියමේ ඔබේ ගොවිපල සටහන් කරන්න',
      searchPlaceholder: 'ඔබේ ස්ථානය සොයන්න...',
      noLocationsFound: '🔍 ස්ථාන කිසිවක් හමු නොවිය',
      searchUnavailable: '⚠️ සෙවුම් සේවාව නොමැත. පසුව නැවත උත්සාහ කරන්න.',
      checkInternet: 'ඔබේ ඉන්ටර්නෙට් සම්බන්ධතාවය පරීක්ෂා කරන්න',
      tryDifferentTerm: 'වෙනස් සෙවුම් පදයක් උත්සාහ කරන්න',
      instruction: '👆 සිතියමේ ඕනෑම තැනක සෙවීම හෝ ස්පර්ශ කිරීමෙන් ඔබේ ස්ථානය සකසන්න',
      locationSelected: 'ස්ථානය තෝරා ගන්නා ලදී',
      locationRequired: 'ස්ථානය අවශ්ය',
      selectLocationMessage: 'කරුණාකර සිතියමේ ඔබේ ගොවිපල ස්ථානය තෝරන්න හෝ ලිපිනය සොයන්න.',
      updateSuccess: 'ඔබේ ගොවිපල ස්ථානය සාර්ථකව යාවත්කාලීන කරන ලදී!',
      updateError: 'ගොවිපල ස්ථානය යාවත්කාලීන කිරීමට අසමත් විය. කරුණාකර නැවත උත්සාහ කරන්න.',
      saveButton: 'ගොවිපල ස්ථානය සුරකින්න',
    },

    // Terms of Service Screen
    termsOfServicePage: {
      headerTitle: 'සේවා නියම',
      lastUpdated: 'අවසාන වරට යාවත්කාලීන: දෙසැම්බර 2025',
      section1Title: 'නියම පිළිගැනීම',
      section1Content: 'Rubber Edge ට ප්‍රවේශ වීමෙන් සහ භාවිතා කිරීමෙන්, ඔබ මෙම සේවා නියම පිළිගන්න සහ එයට බන්ධනය වීමට එකඟ වෙනවා. මෙම වේදිකාව IoT සেන්සර, AI-බල ගැන්වූ විश්ලේෂණ සහ බ්ලොක්චේන් තාක්ෂණ ශ්‍රී ලංකාවේ රබර් වගාවට සහාය දීම සඳහා ඒකාබද්ධ කරයි.',
      section2Title: 'පරිශීලක ගිණුම්',
      section2Content: 'ඔබ එකඟ වේ:',
      section2Item1: 'නිවැරදි ලියාපදිංචි තොරතුරු සরබរා කරන්න',
      section2Item2: 'ඔබේ ගිණුම් අනන්‍යතා සුරක්ෂිතව පවත්වා ගන්න',
      section2Item3: 'ඕනෑම අননුවර්තන ප්‍රවේශ ගැන ක්ෂණිකව අපට දැනුම් දෙන්න',
      section2Item4: 'ඔබේ নির්ধारිත භූමිකාව (ගොවි, නිලධාරි, හෝ ගැනුම්කරු) අනුව වේදිකාව භාවිතා කරන්න',
      section3Title: 'IoT සেන්සර දත්ත',
      section3Content: 'සেන්සර දත්ත පිළිබඳ:',
      section3Item1: 'දත්ත නිරවද්‍යතාවය නිසි සේන්සර අංශුකරණ සහ නඩත්තුවේ මත රඳා පවතී',
      section3Item2: 'ඔබේ දේපළ වෙතින් ස්ථාපිත IoT උපාංගවල භෞතික ආරක්ෂාව ඔබ යටතේ ඇත',
      section3Item3: 'අපි තාක්ෂණික සහාය සපයමු නමුත් බාධාවිරහිත සඳහා සහතිකයක් නොදෙමු',
      section3Item4: 'සේන්සර අගයන් උපදේශනාත්මක අරමුණු සඳහා ඇත; ගොවිතැናත්ව තීරණ ඔබේ দায়িත්වය',
      section4Title: 'AI පුරෝකථන සහ රෝග සනාක්ත කිරීම',
      section4Content: 'අපගේ AI ម්‍රශ්‍ය (LSTM වර්ධන පුරෝකථනය සඳහා, MobileNet-YOLOv8 රෝග සනාක්ත කිරීම සඳහා) �сторичкేeservedအ data දත්ත සහ වර්තමාන තත්ත්‍ව මත ভিතিකරගත උපදේශනාත්මක තොරතුරු සපයන්න. අපගේ ම්‍රශ්‍ය සඳහා ඉතා නිවැරදි අනුපාත ඇත (වර්ධන පුරෝකථනය සඳහා 93.4%, රෝග සනාක්ත කිරීම සඳහා 99.43%), ඒවා තෝරනය-ආධාර ගැතිකරණ වඩාත් පරිපූර්ණ කෘෂිකර්ම උපදේශනා සමඟ භාවිතා කළ යුතුය.',
      section5Title: 'බ්ලොක්චේන් ගිණුම්',
      section5Content: 'සরবරාห්‍ය දාමීය පැහැදිලිතාවය සඳහා:',
      section5Item1: 'සියලු ගුණ දත්ත සහ ගිණුම් Hyperledger Fabric බ්ලොక්චේනයේ වාර්තා කරනු ලැබේ',
      section5Item2: 'බ්ලොක්චේන් වාර්තා වෙනස්කිරීමට අධිමත නොවන අතර තහවුරු වූ පසු වෙනස් කිරීමට නොහැක',
      section5Item3: 'ඔබ ඔබේ කෙතෑඩ දත්ත සලුවාකරණ සඳහා වාර්තා කිරීම අවසරයි',
      section5Item4: 'EUDR අනුකූලතා දත්ත අදාළ රෙගුලේටरी අධිකාරිවලට බෙදා ගනු ලැබේ',
      section6Title: 'බෞද්ධිક ملكيتี',
      section6Content: 'Rubber Edge සහ අනෙකුත් සියලු තාක්ෂණ, IoT සිසිදි ස්වරූපයන්, AI ම්‍රශ්‍ය සහ මෘදුකාංගය, බෞද්ධිකpublishedିකTIමුහුණත් අයිතිවලින් සුරක්ෂිතයි. ඔබ පද්ධතිවල කිසිදු කොටසක පිටපතක්, සංශෝධනයක් හෝ Reverse engineering ප්‍රකාশනය නොකළ හැක.',
      section7Title: 'වගකීම සීමාවලින්',
      section7Content: 'අපි මෙම වේදිකාව as-is ලෙස සපයන්නෙමු. අපි නිරවද්‍යතාවය සහ විශ්වසනීයතාව සඳහා උත්සාහ කිරීමට තිබුණද, අපි සඳහා ගිණුම්කරණය නොකරමු',
      section8Title: 'අවසන් කිරීම',
      section8Content: 'අපි මෙම නියම උල්ලංඝණය කරන, জාල ක්‍රියාකාරිත්වයට නිযුක්ත, හෝ වේදිකාව අපයෝජනයට ගිණුම් අවහිර කිරීම හෝ අවසන් කිරීම සඳහා අයිතිය තබා ගනිමු. ඔබ සහාය සම්බන්ධතා කිරීමෙන් ඕනෑම වේලාවක ඔබේ ගිණුම අවසන් කළ හැකිය.',
      section9Title: 'නියම වෙත වෙනස්කිරීම්',
      section9Content: 'අපි දෙසැම්බර පර්යන්තයි. සැලකිය යුතු වෙනස්කිරීම් ඊ-තැපෑල හෝ තුළ ඇති නිවේදන මගින් සන්නිවේදනය කරනු ලැබේ. පසු වැඩිවිසිටුම අවසන් නියම පිළිගැනීම ගණනය වේ.',
      section10Title: 'පාලිතවන නීතිය',
      section10Content: 'මෙම නියම ශ්‍රී ලංකා නීතිවලින් පාලිතයි. ඕනෑම ගැටලුවක් ශ්‍රී ලංකා අධිකරණ සභා විසින් විසඳීමට බඳුන් වේ.',
      questionsAboutTerms: 'නියම පිළිබඳ ප්‍රශ්‍න?',
      emailContact: 'ඊ-තැපෑල: legal@rubberedge.lk',
      phoneContact: 'දුරකථනය: +94 11 234 5678',
    },

    aboutScreen: {
      appName: 'Rubber Edge',
      appSubtitle: 'ස්මාර්ට් රබර් වගාව සඳහා IoT, AI සහ බ්ලොක්චේන්',
      appDescription: 'තත්‍ය කාලීන තීක්ෂණ, පුරෝකථන විශ්ලේෂණ සහ විනිවිද පෙනෙන වෙළඳපොළ ප්‍රවේශය සමඟින් කුඩා පරිමාණ ගොවීන් සවිබල ගැන්වීම සඳහා ඒකාබද්ධ තාක්ෂණික විසඳුම් හරහා ශ්‍රී ලංකාවේ රබර් කර්මාන්තය විප්ලවීය කිරීම.',
      missionTitle: 'අපේ මෙහෙවර',
      missionContent: 'ලැටෙක්ස් ගුණාත්මකභාවය අධීක්ෂණය, රෝග කළමනාකරණය සහ සැපයුම් දාම විනිවිදභාවය සම්බන්ධ තාත්විත අභියෝගවලට මුහුණ දෙන දැරිය හැකි, පරිමාණ කළ හැකි තාක්ෂණය හරහා ශ්‍රී ලාංකික රබර් ගොවීන්ගේ ඵලදායිතාව, ගුණාත්මකභාවය සහ ආදායම වැඩි දියුණු කිරීම.',
      visionTitle: 'අපේ දැක්ම',
      visionContent: 'සෑම ගොවියෙකුටම අති නවීන තාක්ෂණයට, සාධාරණ වෙළඳපොළ අවස්ථාවලට සහ ගෝලීය තිරසාරත්ව ප්‍රමිතීන් සපුරාලන අතරතුර ඔවුන්ගේ වැවිලි ඉඩමේ විභවය උපරිම කිරීමට දැනුමට ප්‍රවේශය ඇති ශ්‍රී ලංකාවේ සමෘද්ධිමත්, තිරසාර රබර් කර්මාන්තයක්.',
      featuresTitle: 'තාක්ෂණික විශේෂාංග',
      feature1Title: 'IoT සෙන්සර් ජාලය',
      feature1Desc: 'pH, ටර්බිඩිටි, DRC, උෂ්ණත්වය සහ ආර්ද්‍රතාවය සඳහා ESP32 පදනම් සෙන්සර භාවිතයෙන් 98.7% නිරවද්‍යතාවයකින් තත්‍ය කාලීන අධීක්ෂණය.',
      feature2Title: 'AI වර්ධන පුරෝකථනය',
      feature2Desc: 'LSTM ආකෘති 93.4% නිරවද්‍යතාවයකින් ගස් උස සහ ලැටෙක්ස් අස්වැන්න පුරෝකථනය කරයි, ටැපින් කාලසටහන් ප්‍රශස්ත කරයි.',
      feature3Title: 'රෝග හඳුනාගැනීම',
      feature3Desc: 'MobileNet-YOLOv8 CLSD රෝග ලක්ෂණ පෙනීමට දින 14කට පෙර 99.43% නිරවද්‍යතාවයකින් හඳුනා ගනී, අස්වැන්න අලාභය 60% සිට 8.2% දක්වා අඩු කරයි.',
      feature4Title: 'බ්ලොක්චේන් ලුහුබැඳීම',
      feature4Desc: 'Hyperledger Fabric සැපයුම් දාම විනිවිදභාවය සහ EUDR අනුකූලතාව සහතික කරයි, ප්‍රතික්ෂේප අනුපාත 40% සිට 6% දක්වා අඩු කරයි.',
      statsTitle: 'කාර්යසාධන මිනුම්',
      stat1Label: 'ලැටෙක්ස් ගුණාත්මක නිරවද්‍යතාව',
      stat2Label: 'වර්ධන පුරෝකථන නිරවද්‍යතාව',
      stat3Label: 'රෝග හඳුනාගැනීම් නිරවද්‍යතාව',
      stat4Label: 'ප්‍රතික්ෂේප අනුපාතය (30% සිට පහළට)',
      researchTitle: 'පර්යේෂණ පසුබිම',
      researchPara1: 'Rubber Edge යනු කුඩා පරිමාණ ගොවීන් මුහුණ දෙන පද්ධතිමය අභියෝග විසඳීම සඳහා ශ්‍රී ලංකා රබර් පර්යේෂණ ආයතනයේ (RRISL) සිදු කරන ලද විස්තීරණ පර්යේෂණයක ප්‍රතිඵලයයි.',
      researchPara2: 'මෙම වේදිකාව කෘෂිකර්මයේ ඛණ්ඩනය වූ තාක්ෂණික පද්ධති විසඳීම සඳහා IoT සෙන්සර් ජාල AI-බලගැන්වූ පුරෝකථන විශ්ලේෂණ සහ බ්ලොක්චේන් ලුහුබැඳීම සමඟ ඒකාබද්ධ කරයි. පර්යේෂණය ගුණාත්මක සහතිකය, රෝග කළමනාකරණය සහ වෙළඳපොළ ප්‍රවේශය සම්බන්ධ තීරණාත්මක හිඩැස් නිරවද්‍ය, දැරිය හැකි, තත්‍ය කාලීන තීරණ සහාය හරහා විසඳයි.',
      researchHighlight: 'B.Eng (Hons) මෘදුකාංග ඉංජිනේරු විද්‍යාව - මට්ටම 6 පර්යේෂණ ව්‍යාපෘතිය',
      teamTitle: 'පර්යේෂණ කණ්ඩායම',
      researcher: 'පර්යේෂක',
      supervisor: 'අධීක්ෂක',
      assessor: 'තක්සේරුකරු',
      contributionsTitle: 'ප්‍රධාන දායකත්ව',
      problemDomain: 'ගැටලු ක්ෂේත්‍රය',
      problemItem1: 'තත්‍ය කාලීන ලැටෙක්ස් ගුණාත්මක අධීක්ෂණය හරහා ප්‍රතික්ෂේප අනුපාත 30% සිට 6.8% දක්වා අඩු කරන ලදී',
      problemItem2: 'රෝග ලක්ෂණ ආරම්භයට දින 14කට පෙර හඳුනාගැනීම, අස්වැන්න අලාභය 60% සිට 8.2% දක්වා අඩු කරයි',
      problemItem3: 'ප්‍රශස්ත සම්පත් කළමනාකරණය සඳහා 93.4% නිරවද්‍යතාවයකින් LSTM පදනම් වර්ධන පුරෝකථනය',
      problemItem4: 'EUDR අනුකූලතාව සහ විනිවිද පෙනෙන සැපයුම් දාම සහතික කරන බ්ලොක්චේන් ලුහුබැඳීම',
      researchDomain: 'පර්යේෂණ ක්ෂේත්‍රය',
      researchItem1: 'ගස් බෝග කළමනාකරණය සඳහා IoT, AI සහ බ්ලොක්චේන් නව ඒකාබද්ධ කිරීම',
      researchItem2: 'අඩු සම්බන්ධතා පරිසරවල තත්‍ය කාලීන සැකසීම සඳහා එජ් පරිගණක යෙදවීම',
      researchItem3: 'ශ්‍රී ලංකාවේ රබර් වගා කොන්දේසි සඳහා සන්දර්භ-විශේෂිත AI ආකෘති',
      researchItem4: 'සංවර්ධනය වෙමින් පවතින රටවල කුඩා පරිමාණ අනුගමනය සඳහා පරිමාණ කළ හැකි රාමුව',
      impactTitle: 'රබර් කර්මාන්තයට බලපෑම',
      impactIntro: 'සාම්ප්‍රදායික ක්‍රම ඵලදායිතාව සහ වෙළඳපොළ තරඟකාරිත්වය පහළ යාමට හේතු වී ඇති ශ්‍රී ලංකාවේ රබර් අංශයේ නවීකරණය සඳහා වන හදිසි අවශ්‍යතාවයට Rubber Edge මුහුණ දෙයි. දැරිය හැකි මිලකට ව්‍යවසාය-ශ්‍රේණියේ තාක්ෂණය කුඩා පරිමාණ ගොවීන්ට ලබා දීමෙන්, වේදිකාව:',
      impact1: 'ලැටෙක්ස් ගුණාත්මක අනුකූලතාව සහ මිල තීරණ බලය වැඩි දියුණු කරයි',
      impact2: 'කල්තියා රෝග මැදිහත්වීම සහ වැළැක්වීම සක්‍රීය කරයි',
      impact3: 'සම්පත් ප්‍රශස්තකරණය සඳහා දත්ත-මත පදනම් වූ තීක්ෂණ සපයයි',
      impact4: 'ජාත්‍යන්තර තිරසාරත්ව ප්‍රමිතීන්ට අනුකූලතාව සහතික කරයි',
      impact5: 'විනිවිද පෙනෙන, වංචා-ප්‍රතිරෝධී සැපයුම් දාම නිර්මාණය කරයි',
      impact6: 'ග්‍රාමීය කෘෂිකාර්මික ප්‍රජාවල ඩිජිටල් පරතරය පියවයි',
      contactTitle: 'සම්බන්ධ වන්න',
      email: 'ඊ-තැපෑල',
      phone: 'දුරකථනය',
      location: 'ස්ථානය',
      website: 'වෙබ් අඩවිය',
      footerText: '© 2025 Rubber Edge. සියලු හිමිකම් ඇවිරිණි.',
      footerSubtext: 'ශ්‍රී ලංකා රබර් පර්යේෂණ ආයතනය සමඟ සහයෝගීතාවයෙන් සංවර්ධනය කරන ලදී',
    },
    walletSettings: {
      headerTitle: 'බ්ලොක්චේන් සැකසුම්',
      headerSubtitle: 'ඔබේ මුදල් පසුම්බිය සහ ජාලය කළමනාකරණය කරන්න',
      wallet: 'මුදල් පසුම්බිය',
      networkSettings: 'ජාල සැකසුම්',
      activeNetwork: 'සක්‍රීය ජාලය',
      testnet: 'පරීක්ෂණ ජාලය',
      mainnet: 'ප්‍රධාන ජාලය',
      rpcUrl: 'RPC URL',
      chainId: 'දාම හැඳුනුම්පත',
      dataSync: 'දත්ත සමමුහුර්තකරණය',
      pendingRecords: 'අපේක්ෂිත වාර්තා',
      records: 'වාර්තා',
      syncNow: 'දැන් සමමුහුර්ත කරන්න',
      syncing: 'සමමුහුර්ත කරමින්...',
      autoSync: 'ස්වයංක්‍රීය සමමුහුර්තකරණය',
      security: 'ආරක්ෂාව',
      exportPrivateKey: 'පුද්ගලික යතුර අපනයනය කරන්න',
      biometricLock: 'ජෛවමිතික අගුල',
      comingSoon: 'ඉක්මනින් පැමිණේ',
      biometricComingSoonDesc: 'ජෛවමිතික අගුල අනාගත යාවත්කාලීනයකදී ලබා ගත හැකිය.',
      quickActions: 'ඉක්මන් ක්‍රියා',
      transactionHistory: 'ගනුදෙනු ඉතිහාසය',
      verifyTransaction: 'ගනුදෙනුව තහවුරු කරන්න',
      blockExplorer: 'බ්ලොක් ගවේෂකය',
      dangerZone: 'අන්තරාය කලාපය',
      disconnectWallet: 'මුදල් පසුම්බිය විසන්ධි කරන්න',
      footerPoweredBy: 'Polygon ජාලය මගින් බලගැන්වේ',
      footerVersion: 'RubberEdge Blockchain v1.0.0',
      noPendingData: 'අපේක්ෂිත දත්ත නැත',
      allDataSynced: 'සියලුම දත්ත දැනටමත් බ්ලොක්චේන් වෙත සමමුහුර්ත කර ඇත.',
      walletNotConnected: 'මුදල් පසුම්බිය සම්බන්ධ නැත',
      connectWalletToSync: 'දත්ත සමමුහුර්ත කිරීමට කරුණාකර ඔබේ මුදල් පසුම්බිය සම්බන්ධ කරන්න.',
      syncComplete: 'සමමුහුර්තකරණය සම්පූර්ණයි',
      syncedRecords: 'සමමුහුර්ත කළ',
      failedRecords: 'අසාර්ථක',
      syncFailed: 'සමමුහුර්තකරණය අසාර්ථක විය',
      syncFailedDesc: 'දත්ත සමමුහුර්ත කිරීම අසාර්ථක විය. කරුණාකර නැවත උත්සාහ කරන්න.',
      exportPrivateKeyTitle: 'පුද්ගලික යතුර අපනයනය කරන්න',
      exportPrivateKeyWarning: 'ඔබට ඔබේ පුද්ගලික යතුර අපනයනය කිරීමට අවශ්‍ය බව විශ්වාසද? ඔබේ පුද්ගලික යතුරට ප්‍රවේශය ඇති ඕනෑම කෙනෙකුට ඔබේ මුදල් පසුම්බිය පාලනය කළ හැකිය.',
      export: 'අපනයනය කරන්න',
      privateKeyTitle: 'පුද්ගලික යතුර',
      contactSupportForExport: 'ආරක්ෂාව සඳහා, ඔබේ පුද්ගලික යතුර ආරක්ෂිතව අපනයනය කිරීමට කරුණාකර සහාය අමතන්න.',
      disconnectWalletTitle: 'මුදල් පසුම්බිය විසන්ධි කරන්න',
      disconnectWalletWarning: 'ඔබට විසන්ධි කිරීමට අවශ්‍ය බව විශ්වාසද? ඔබේ පුද්ගලික යතුර උපස්ථ කර ඇති බවට වග බලා ගන්න.',
      disconnect: 'විසන්ධි කරන්න',
    },
    verifyTransaction: {
      headerTitle: 'ගනුදෙනුව තහවුරු කරන්න',
      headerSubtitle: 'බ්ලොක්චේන් වාර්තා පරීක්ෂා කරන්න',
      transactionHash: 'ගනුදෙනු හැෂ්',
      enterTxHashPlaceholder: 'ගනුදෙනු හැෂ් ඇතුළත් කරන්න (0x...)',
      verifyOnBlockchain: 'බ්ලොක්චේන් මත තහවුරු කරන්න',
      recordVerified: 'වාර්තාව තහවුරු කර ඇත!',
      notFoundLocally: 'දේශීයව හමු නොවීය',
      recordedOnBlockchain: 'මෙම වාර්තාව බ්ලොක්චේන් මත සටහන් කර ඇත.',
      notFoundLocallyDesc: 'මෙම හැෂ් දේශීය වාර්තාවල හමු නොවීය. විස්තර සඳහා ඔබට බ්ලොක්චේන් ගවේෂකය පරීක්ෂා කළ හැකිය.',
      priceRecord: '💰 මිල වාර්තාව',
      transactionRecord: '🤝 ගනුදෙනු වාර්තාව',
      supplyChainBatch: '📦 සැපයුම් දාම කණ්ඩායම',
      grade: 'ශ්‍රේණිය',
      price: 'මිල',
      recorded: 'සටහන් කළ',
      recorder: 'සටහන් කරන්නා',
      farmerId: 'ගොවි හැඳුනුම්පත',
      buyerId: 'ගැනුම්කරු හැඳුනුම්පත',
      amount: 'ප්‍රමාණය',
      totalValue: 'මුළු වටිනාකම',
      status: 'තත්වය',
      location: 'ස්ථානය',
      timestamp: 'කාල මුද්‍රාව',
      viewOnBlockchainExplorer: 'බ්ලොක්චේන් ගවේෂකයෙහි බලන්න',
      howToVerify: 'තහවුරු කරන්නේ කෙසේද',
      howToVerifyDesc: 'මිලක්, ගනුදෙනුවක් හෝ සැපයුම් දාම වාර්තාවක් බ්ලොක්චේන් මත පවතින බව තහවුරු කිරීමට ගනුදෙනු හැෂ් එකක් ඇතුළත් කරන්න. හැෂ් "0x" සමඟ ආරම්භ විය යුතු අතර අක්ෂර 66ක් විය යුතුය.',
      exampleTxHash: 'උදාහරණ ගනුදෙනු හැෂ්:',
      error: 'දෝෂය',
      enterTxHash: 'කරුණාකර ගනුදෙනු හැෂ් ඇතුළත් කරන්න',
      invalidHash: 'අවලංගු හැෂ්',
      invalidHashDesc: 'කරුණාකර වලංගු ගනුදෙනු හැෂ් ඇතුළත් කරන්න (0x...)',
      verificationFailed: 'තහවුරු කිරීම අසාර්ථක විය',
      verificationFailedDesc: 'ගනුදෙනුව තහවුරු කිරීම අසාර්ථක විය. කරුණාකර නැවත උත්සාහ කරන්න.',
    },
  },

  ta: {
    common: {
      continue: 'தொடரவும்',
      cancel: 'ரத்து செய்',
      logout: 'வெளியேறு',
      delete: 'நீக்கு',
      discard: 'நிராகரி',
      clear: 'அழி',
      success: 'வெற்றி',
      error: 'பிழை',
      ok: 'சரி',
      yes: 'ஆம்',
      no: 'இல்லை',
      or: 'அல்லது',
      loading: 'ஏற்றுகிறது...',
      save: 'சேமி',
      submit: 'சமர்ப்பி',
      back: 'பின்',
      next: 'அடுத்து',
      skip: 'தவிர்',
      done: 'முடிந்தது',
      search: 'தேடு',
      noData: 'தரவு இல்லை',
      retry: 'மீண்டும் முயற்சிக்கவும்',
      seeAll: 'அனைத்தையும் பார்க்கவும்',
      readMore: 'மேலும் படிக்கவும்',
      pleaseEnter: 'உள்ளிடவும்',
    },
    languageSelection: {
      title: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      subtitle: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      english: 'ஆங்கிலம்',
      sinhala: 'சிங்களம்',
      tamil: 'தமிழ்',
    },
    onboarding: {
      title1: 'ஆரோக்கியமான ரப்பர் மரங்களை வளர்க்கவும்',
      desc1: 'AI இன் சக்தியுடன் ரப்பர் மர நோய்களை ஆரம்பத்திலேயே கண்டறியுங்கள். உங்கள் மரங்களின் புகைப்படத்தை எடுங்கள், எங்கள் அமைப்பு உடனடியாக பகுப்பாய்வு செய்து தொற்றுகள் அல்லது அசாதாரணங்களை கண்டறியும். சிகிச்சை பரிந்துரைகள் மற்றும் தடுப்பு குறிப்புகளையும் பெறுவீர்கள்.',
      title2: 'உங்கள் விளைச்சலை கண்காணித்து மேம்படுத்துங்கள்',
      desc2: 'ஸ்மார்ட் வளர்ச்சி கண்காணிப்பு மற்றும் புதுப்பிப்புகளுடன் உங்கள் ரப்பர் தோட்டத்தை கட்டுப்படுத்துங்கள். உங்கள் இருப்பிடத்திற்கு ஏற்ற வானிலை எச்சரிக்கைகள் மற்றும் நிபுணர் ஆலோசனைகளைப் பெறுங்கள்.',
      title3: 'நம்பிக்கையுடன் விற்கவும்!',
      desc3: 'எங்கள் உள்ளமைக்கப்பட்ட சந்தையுடன் உங்கள் கடின உழைப்பை லாபமாக மாற்றுங்கள். நம்பகமான வாங்குபவர்களுடன் நேரடியாக இணையுங்கள், உங்கள் ரப்பர் தயாரிப்புகளை காட்சிப்படுத்துங்கள் மற்றும் சிறந்த விலைகளைப் பெறுங்கள்.',
      skipNow: 'இப்போது தவிர்க்கவும்',
      getStarted: 'தொடங்கவும்',
    },
    tabs: {
      home: 'முகப்பு',
      diagnose: 'நோய் கண்டறிதல்',
      support: 'ஆதரவு',
      settings: 'அமைப்புகள்',
      welcome: 'வரவேற்கிறோம், விவசாயி',
    },
    home: {
      loadingCarousel: 'கேரோசெல் ஏற்றுகிறது...',
      recentEvents: 'சமீபத்திய நிகழ்வுகள்',
      noEvents: 'நிகழ்வுகள் கண்டுபிடிக்கப்படவில்லை',
      createEvent: 'உங்கள் முதல் நிகழ்வை உருவாக்கவும்!',
      latestNews: 'சமீபத்திய ரப்பர் செய்திகள்',
      noNews: 'ரப்பர் செய்திகள் கிடைக்கவில்லை',
      cancelled: 'ரத்து செய்யப்பட்டது',
      ended: 'முடிந்தது',
    },
    createEvent: {
      headerTitle: 'நிகழ்வு உருவாக்கவும்',
      eventImage: 'நிகழ்வு படத்தைச் சேர்க்கவும் (விரும்பிய)',
      eventImageOptional: 'நிகழ்வு படத்தைச் சேர்க்கவும் (விரும்பிய)',
      eventTitle: 'நிகழ்வு சிரசელை *',
      eventTitleRequired: 'நிகழ்வு சிரசெலை உள்ளிடவும்',
      eventTitlePlaceholder: 'எ.கா., ரப்பர் குழாயாக வேலை செய்வதற்கான ஆலோசனை',
      description: 'விளக்கம் *',
      descriptionRequired: 'நிகழ்வு விளக்கம் உள்ளிடவும்',
      descriptionPlaceholder: 'நிகழ்வு விவரங்களை விவரிக்கவும்...',
      eventDate: 'நிகழ்வு தேதி *',
      eventDateRequired: 'நிகழ்வு தேதி எதிர்காலத்தில் இருக்க வேண்டும்',
      eventTime: 'நிகழ்வு நேரம் *',
      eventTimeRequired: 'நிகழ்வு நேரத்தைத் தேர்ந்தெடுக்கவும்',
      location: 'இருப்பிடம் (விரும்பிய)',
      locationOptional: 'இருப்பிடம் (விரும்பிய)',
      locationPlaceholder: 'எ.கா., கெகள்ளே சமூக மண்டபம்',
      contactNumber: 'தொடர்பு எண் (விரும்பிய)',
      contactNumberOptional: 'தொடர்பு எண் (விரும்பிய)',
      contactNumberPlaceholder: 'எ.கா., 077 123 4567',
      maxParticipants: 'அதிகபட்ச பங்குதாரர்கள் (விரும்பிய)',
      maxParticipantsOptional: 'அதிகபட்ச பங்குதாரர்கள் (விரும்பிய)',
      maxParticipantsPlaceholder: 'எ.கா., 50',
      eventStatus: 'நிகழ்வு நிலை',
      eventIsActive: 'நிகழ்வு செயல்படுகிறது',
      activeEventsVisible: 'செயல்படும் நிகழ்வுகள் விவசாயிகளுக்குக் காணப்படுகின்றன மற்றும் பதிவுசெய்ய முடியும்',
      eventIsCancelled: 'நிகழ்வு ரத்து செய்யப்பட்டது',
      cancelledEventsCannot: 'ரத்து செய்யப்பட்ட நிகழ்வுகள் புதிய பதிவுசெய்ய முடியாது',
      createEventButton: 'நிகழ்வு உருவாக்கவும்',
      errorTitle: 'பிழை',
      enterEventTitle: 'நிகழ்வு சிரசெலை உள்ளிடவும்',
      enterEventDescription: 'நிகழ்வு விளக்கம் உள்ளிடவும்',
      eventDateMustBeFuture: 'நிகழ்வு தேதி எதிர்காலத்தில் இருக்க வேண்டும்',
      invalidStatusTitle: 'தவறான நிலை',
      invalidStatusMessage: 'ஒரு செயல்படாத நிகழ்வை ரத்து செய்வது குறிக்க வேண்டும். நிகழ்வு நிலை அமைப்புகளை சரிபார்க்கவும்.',
      conflictingStatusTitle: 'முரண்பட்ட நிலை',
      conflictingStatusMessage: 'ஒரு நிகழ்வு செயல்படும் மற்றும் ரத்து செய்யப்பட்டவை இரண்டும் இருக்க முடியாது। நிலையை சரிசெய்க.',
      cancelledEventWarningTitle: 'ரத்து செய்யப்பட்ட நிகழ்வு',
      cancelledEventWarningDesc: 'நீங்கள் ரத்து செய்யப்பட்ட நிகழ்வை உருவாக்கிக் கொண்டிருக்கிறீர்கள். நீங்கள் தொடரதে விரும்புகிறீர்களா?',
      successTitle: 'வெற்றி',
      successMessage: 'நிகழ்வு வெற்றிகரமாக உருவாக்கப்பட்டது!',
      permissionDenied: 'அனுமதி தேவை',
      permissionDeniedMessage: 'கேமரா சுருள் அனுமதிக்கவும்',
      failedToCreateEvent: 'நிகழ்வு உருவாக்க விफலமானது',
      warningInactiveOnly: 'இந்த நிகழ்வு செயல்படாததாக உருவாக்கப்படும்',
      warningCancelledOnly: 'இந்த நிகழ்வு ரத்து செய்யப்பட்டதாக உருவாக்கப்படும்',
      warningBothInactiveAndCancelled: 'இந்த நிகழ்வு செயல்படாது மற்றும் ரத்து செய்யப்பட்டதாக உருவாக்கப்படும்',
    },
    eventDetails: {
      title: 'நிகழ்வு விவரங்கள்',
      loadingEvent: 'நிகழ்வு ஏற்றுகிறது...',
      eventNotFound: 'நிகழ்வு கண்டுபிடிக்கப்படவில்லை',
      eventNotFoundDesc: 'நீங்கள் தேடும் நிகழ்வு இல்லை அல்லது அகற்றப்பட்டுள்ளது.',
      description: 'விளக்கம்',
      organizedBy: 'ஏற்பாடு செய்தவர்',
      interested: 'ஆர்வமுள்ள',
      person: 'நபர்',
      people: 'மக்கள்',
      maxCapacity: 'அதிகபட்ச திறன்',
      youAre: 'நீங்கள்',
      registerInterest: 'ஆர்வத்தை பதிவுசெய்து',
      unregister: 'பதிவு நீக்கவும்',
      unregisterConfirm: 'பதிவு நீக்கவும்',
      unregisterConfirmText: 'இந்த நிகழ்விலிருந்து பதிவு நீக்க விரும்புகிறீர்களா?',
      eventCancelled: 'இந்த நிகழ்வு ரத்து செய்யப்பட்டுள்ளது',
      eventEnded: 'இந்த நிகழ்வு முடிந்துவிட்டது',
      registerSuccess: 'இந்த நிகழ்வுக்கு நீங்கள் பதிவுசெய்துள்ளீர்கள்!',
      unregisterSuccess: 'இந்த நிகழ்விலிருந்து நீங்கள் பதிவு நீக்கியுள்ளீர்கள்',
      viewAttendeeList: 'கலந்துகொண்டோரின் பட்டியலைக் காட்டி உங்கள் டாஷ்போர்டிலிருந்து இந்த நிகழ்வை நிர்வகிக்கவும்',
    },
    diagnose: {
      detectDisease: 'நோய் கண்டறிதல்',
      detectDiseaseDesc: 'உங்கள் தாவரத்தின் நோய்களை சரிபார்க்கவும்',
      qualityCheck: 'தரம் சரிபார்ப்பு',
      qualityCheckDesc: 'உங்கள் லாட்டுக்ஸ் தரத்தை சரிபார்க்கவும்',
      weatherForecast: 'வானிலை முன்னறிவிப்பு',
      weatherForecastDesc: 'உங்கள் பகுதியின் வானிலை நிலையை சரிபார்க்கவும்',
      growthForecast: 'வளர்ச்சி முன்னறிவிப்பு',
      growthForecastDesc: 'உங்கள் தாவரத்தின் வளர்ச்சியை முன்னறிவிக்கவும்',
      marketPrice: 'சந்தை விலை',
      marketPriceDesc: 'தினசரி சந்தை விலைகளை சரிபார்க்கவும்',
      buyersPrices: 'ஆளுபவரின் விலைகள்',
      buyersPricesDesc: 'வாங்குபவர்களின் விலைகளை சரிபார்க்கவும்',
    },
    diseaseDetail: {
      confidence: 'நம்பிக்கை',
      about: 'பற்றி',
      recommendation: 'பரிந்துரை',
      chatWithAI: 'AI ஏஜெண்டுடன் உரையாடவும்',
      diseaseNotFound: 'நோய் தகவல் கண்டுபிடிக்கப்படவில்லை',
      noDiseaseInfo: 'இந்த நோய்க்கான விரிவான தகவல் கிடைக்கவில்லை',
      goBack: 'பின்னால் செல்லவும்',
      healthy: {
        name: 'ஆரோக்கியமான',
        description: 'இலை ஆரோக்கியமாக தோன்றுகிறது மற்றும் நோயின் எந்த அறிகுறியும் இல்லை.',
        treatment: 'வழக்கமான பராமரிப்பு மற்றும் கண்காணிப்பைத் தொடரவும்.',
      },
      abnormalLeafFall: {
        name: 'அசாதாரண இலை வீழ்ச்சி',
        description: 'சுற்றுச்சூழல் சுளுவு, ஊட்டச்சத்து குறைபாடு அல்லது பலவீனமான நோய்ப்பூச்சী காரணிகளால் ஏற்படும் சதாசர்வகாலமான இலை வீழ்ச்சி.',
        treatment: 'வடிகால் மேம்படுத்தவும், சன்னிதானமான உரம் மூலம் சரியான ஊட்டச்சத்து உறுதி செய்யவும் மற்றும் நீர்ப்பாசனை நிர்வகிக்கவும்.',
      },
      birdEyeSpot: {
        name: 'பறவை கண் புள்ளி',
        description: 'ஈস்ட் ஜிம் (Phyllachora heveae) மற்றும் ரப்பர் இலைகளில் இலக்ஷ்ய-போல் மோதிரங்கள் கொண்ட வட்ட புள்ளிகளை ஏற்படுத்துகிறது.',
        treatment: 'ஆரம்ப கட்டங்களில் செப்பு பூஞ்சைக்கொல்லி அல்லது போர்டோ கலவை பயன்படுத்தவும் மற்றும் நோய்வாய்ப்பட்ட இலைகளை அகற்றவும்.',
      },
      corynesporaLeafFall: {
        name: 'Corynespora இலை வீழ்ச்சி',
        description: 'கடுமையான ஈஸ்ட் (Corynespora cassiicola) குறிப்பிடத்தக்க இலை நீக்கம் மற்றும் மகசூல் இழப்பை ஏற்படுத்துகிறது.',
        treatment: 'மழைக்காலத்தில் 10-14 நாட்களுக்கு ஒரு முறை பைப்போலி மிரர்ப்பு பூஞ்சைக்கொல்லி பயன்படுத்தவும், வாতாயன மேம்படுத்தவும் மற்றும் கடுமையாக வெட்டவும்.',
      },
      powderyMildew: {
        name: 'பொடி பூஞ்சை',
        description: 'তরুণ ரப்பர் இலைகளில் வெள்ளை பொடிய பூச்சுக்கு ஏற்படுத்துகிற வளர்ச்சிரோগ।',
        treatment: 'கந்தக பூஞ்சைக்கொல்லி, மரங்களের அंतर மேம்பாட்டுக்கான வாதாயன மேம்படுத்தவும் மற்றும் நைட்ரஜன் குறைக்கவும்.',
      },
      phytophthoraLeafFall: {
        name: 'Phytophthora இலை வீழ்ச்சி',
        description: 'குளிர்ந்த நிலையில் விரைவான இலை மற்றும் கிளை பின்னுக்கு ஆதாரம் ஏற்படுத்துகிற ஜல நாயாப் நோயாக் ஜீவி (Phytophthora palmivora).',
        treatment: 'மண் வடிகால் மேம்படுத்தவும், பாசுபேட் பூஞ்சைக்கொல்லி பயன்படுத்தவும் மற்றும் ஜல জீர்ணம் நிலைகள் தவிர்க்கவும்.',
      },
    },
    support: {
      howCanWeHelp: 'நாங்கள் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
      chooseOption: 'கீழே இருந்து விருப்பங்களைத் தேர்ந்தெடுக்கவும் அல்லது நேரடியாக எங்களைத் தொடர்பு கொள்ளுங்கள்',
      chatWithAI: 'AI உடன் உரையாடவும்',
      chatWithAIDesc: 'எங்கள் AI உதவியாளரிடம் உடனடி பதிலைப் பெறுங்கள்',
      faqs: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      faqsDesc: 'பொதுவான கேள்விகளுக்கான பதிலைக் கண்டறியுங்கள்',
      contactUs: 'எங்களை தொடர்பு கொள்ளவும்',
      contactUsDesc: 'எங்கள் ஆதரவு குழுவிடம் தொடர்பு கொள்ளுங்கள்',
      contactOfficer: 'அதிகாரியைத் தொடர்பு கொள்ளவும்',
      contactOfficerDesc: 'உங்கள் ஒதுக்கப்பட்ட ஆதரவு அதிகாரியைத் தொடர்பு கொள்ளுங்கள்',
      userGuide: 'பயனர் வழிகாட்டி',
      userGuideDesc: 'பயன்பாட்டை திறம்படப் பயன்படுத்த கற்றுக் கொள்ளுங்கள்',
      learningCenter: 'கற்றல் மையம்',
      learningCenterDesc: 'ரப்பர் விவசாயத்திற்கான கல்வி வளங்கள்',
      quickContact: 'விரைவு தொடர்பு',
      callUs: 'எங்களை அழையுங்கள்',
      emailUs: 'எங்களுக்கு மின்னஞ்சல் அனுப்புங்கள்',
    },
    notifications: {
      title: 'அறிப்புகள்',
      clearAll: 'அழிக்க',
      noNotificationsYet: 'இன்னும் அறிப்புகள் இல்லை',
      noNotificationsDesc: 'நீங்கள் அறிப்புகளைப் பெற்றால், அவை இங்கே தோன்றும்',
      new: 'புதிய',
      earlier: 'முன்பு',
    },
    auth: {
      welcomeBack: 'மீண்டும் வரவேற்கிறோம்',
      enterPhoneToContine: 'தொடர உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்',
      phoneNumber: 'தொலைபேசி எண்',
      phonePlaceholder: '7X XXX XXXX',
      keepMeSignedIn: 'என்னை உள்நுழைந்திருக்கவும்',
      invalidPhone: 'தவறான தொலைபேசி',
      invalidPhoneMessage: 'சரியான தொலைபேசி எண்ணை உள்ளிடவும் (07XXXXXXXX)',
      newToRubberEdge: 'Rubber Edge க்கு புதியவரா?',
      createAccount: 'கணக்கை உருவாக்கு',
      termsAgreement: 'தொடர்வதன் மூலம், எங்கள் விதிமுறைகள் மற்றும் தனியுரிமைக் கொள்கையை ஏற்கிறீர்கள்',
      
      signUp: 'பதிவு செய்க',
      createNewAccount: 'உங்கள் புதிய கணக்கை உருவாக்கவும்',
      fullName: 'முழு பெயர்',
      fullNamePlaceholder: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      accountType: 'கணக்கு வகை',
      farmer: 'விவசாயி',
      buyer: 'வாங்குபவர்',
      officer: 'அதிகாரி',
      nicNumber: 'தே.அ.அ. எண்',
      nicPlaceholder: 'தே.அ.அ. எண்ணை உள்ளிடவும்',
      district: 'மாவட்டம்',
      selectDistrict: 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
      selectDistrictFirst: 'முதலில் மாவட்டத்தைத் தேர்ந்தெடுக்கவும்',
      farmLocation: 'பண்ணை இருப்பிடம்',
      selectFarmLocation: 'பண்ணை இருப்பிடத்தைத் தேர்ந்தெடுக்கவும்',
      landArea: 'நில பரப்பளவு',
      landAreaPlaceholder: 'நில பரப்பளவு (ஹெக்டேர்)',
      companyName: 'நிறுவனத்தின் பெயர்',
      companyNamePlaceholder: 'நிறுவனத்தின் பெயரை உள்ளிடவும்',
      businessRegNumber: 'வணிக பதிவு எண்',
      businessRegPlaceholder: 'பதிவு எண்ணை உள்ளிடவும்',
      employeeId: 'பணியாளர் அடையாளம்',
      employeeIdPlaceholder: 'பணியாளர் அடையாளத்தை உள்ளிடவும்',
      department: 'துறை',
      departmentPlaceholder: 'துறையை உள்ளிடவும்',
      alreadyHaveAccount: 'ஏற்கனவே கணக்கு உள்ளதா?',
      signIn: 'உள்நுழைக',
      fillAllFarmerDetails: 'அனைத்து விவசாயி விவரங்களையும் நிரப்பவும்',
      fillAllBuyerDetails: 'அனைத்து வாங்குபவர் விவரங்களையும் நிரப்பவும்',
      fillAllOfficerDetails: 'அனைத்து அதிகாரி விவரங்களையும் நிரப்பவும்',
      enterFullName: 'உங்கள் முழு பெயரை உள்ளிடவும்',
      
      verifyLogin: 'உள்நுழைவை சரிபார்க்கவும்',
      verifyAccount: 'கணக்கை சரிபார்க்கவும்',
      enterOtpCode: 'க்கு அனுப்பப்பட்ட 6 இலக்க குறியீட்டை உள்ளிடவும்',
      otpSentTo: 'OTP அனுப்பப்பட்டது',
      verifyAndLogIn: 'சரிபார்த்து உள்நுழையவும்',
      verifyAndSignUp: 'சரிபார்த்து பதிவு செய்யவும்',
      didntReceiveCode: 'குறியீடு கிடைக்கவில்லையா?',
      resendOtp: 'OTP மீண்டும் அனுப்பு',
      resendIn: 'மீண்டும் அனுப்புவது',
      otpResent: 'உங்கள் தொலைபேசிக்கு OTP மீண்டும் அனுப்பப்பட்டது',
      enterSixDigitOtp: '6 இலக்க OTP ஐ உள்ளிடவும்',
      loginFailed: 'உள்நுழைவு தோல்வியடைந்தது',
      registrationFailed: 'பதிவு தோல்வியடைந்தது',
      registrationSuccess: 'பதிவு வெற்றி! உள்நுழையவும்.',
      pleaseSignIn: 'உள்நுழையவும்',
      failedToSendOtp: 'OTP அனுப்ப முடியவில்லை',
      failedToResendOtp: 'OTP மீண்டும் அனுப்ப முடியவில்லை',
      
      // Edit Profile
      personalInformation: 'தனிப்பட்ட தகவல்',
      changePhoto: 'புகைப்படத்தை மாற்றவும்',
      nicNumberCannotBeChanged: 'NIC எண்ணை மாற்ற முடியாது',
      phoneNumberCannotBeChanged: 'தொலைபேசி எண்ணை மாற்ற முடியாது',
      farmInformation: 'பண்ணைத் தகவல்',
      notSet: 'அமைக்கப்படவில்லை',
      setLocationOnMap: 'வரைபடத்தில் இருப்பிடத்தை அமைக்கவும்',
      updateLocationOnMap: 'வரைபடத்தில் இருப்பிடத்தைப் புதுப்பிக்கவும்',
      requiredFields: 'தேவையான புலங்கள்',
      landAreaMustBeNumber: 'நிலப்பரப்பு சரியான எண்ணாக இருக்க வேண்டும்',
      profileUpdateSuccess: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
      failedToUpdateProfile: 'சுயவிவரத்தைப் புதுப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      sessionExpired: 'அமர்வு முடிந்து விட்டது. மீண்டும் உள்நுழையவும்.',
      invalidData: 'வழங்கப்பட்ட தரவு செல்லுபடியாகாது.',
      profileNotFound: 'சுயவிவரம் கண்டுபிடிக்கப்படவில்லை. தயவுசெய்து ஆதரவைத் தொடர்பு கொள்ளவும்.',
      serverError: 'சேவையக பிழை. பிறகு மீண்டும் முயற்சிக்கவும்.',
      discardChanges: 'மாற்றங்களை நிராகரிக்கவும்',
      discardChangesMessage: 'உங்கள் மாற்றங்களை நிராகரிக்க விரும்புகிறீர்களா?',
      continueEditing: 'தொடர்ந்து திருத்து',
    },
    settings: {
      farmer: 'விவசாயி',
      buyer: 'வாங்குபவர்',
      officer: 'அதிகாரி',
      noPhoneNumber: 'தொலைபேசி எண் இல்லை',
      
      accessDenied: 'அணுகல் மறுக்கப்பட்டது',
      accessDeniedMessage: 'இந்தப் பக்கம் அதிகாரிகளுக்கு மட்டுமே',
      
      languageChangedToEnglish: 'Language changed to English',
      languageChangedToSinhala: 'භාෂාව සිංහල බවට වෙනස් විය',
      languageChangedToTamil: 'மொழி தமிழாக மாற்றப்பட்டது',
      
      account: 'கணக்கு',
      appSettings: 'பயன்பாட்டு அமைப்புகள்',
      preferences: 'விருப்பங்கள்',
      supportAndAbout: 'ஆதரவு & பற்றி',
      dangerZone: 'ஆபத்து மண்டலம்',
      
      editProfile: 'சுயவிவரத்தைத் திருத்து',
      editProfileSubtitle: 'உங்கள் தனிப்பட்ட தகவலைப் புதுப்பிக்கவும்',
      farmLocation: 'பண்ணை இருப்பிடம்',
      farmLocationSubtitle: 'உங்கள் பண்ணை இருப்பிடத்தை மாற்றவும்',
      
      language: 'மொழி',
      languageSubtitle: 'பயன்பாட்டு மொழியை மாற்றவும்',
      locationServices: 'இருப்பிட சேவைகள்',
      locationServicesSubtitle: 'இருப்பிடத்தை அணுக அனுமதிக்கவும்',
      weatherAlerts: 'வானிலை எச்சரிக்கைகள்',
      weatherAlertsSubtitle: 'வானிலை அறிவிப்புகளைப் பெறவும்',
      
      helpCenter: 'உதவி மையம்',
      helpCenterSubtitle: 'உதவி மற்றும் ஆதரவைப் பெறவும்',
      termsOfService: 'சேவை விதிமுறைகள்',
      privacyPolicy: 'தனியுரிமைக் கொள்கை',
      aboutApp: 'RubberEdge பற்றி',
      aboutAppSubtitle: 'பதிப்பு 1.0.0',
      
      logoutTitle: 'வெளியேறு',
      logoutConfirm: 'நீங்கள் வெளியேற விரும்புகிறீர்களா?',
      deleteAccount: 'கணக்கை நீக்கு',
      deleteAccountConfirm: 'இந்த செயலை செயல்தவிர்க்க முடியாது. உங்கள் எல்லா தரவும் நிரந்தரமாக நீக்கப்படும்.',
      deleteAccountWarning: 'உங்கள் கணக்கை நிரந்தரமாக நீக்க விரும்புகிறீர்களா? இந்த செயலை செயல்தவிர்க்க முடியாது மற்றும் உங்கள் எல்லா தரவும் நிரந்தரமாக அகற்றப்படும்.',
      deleteAccountFinal: 'இது உங்கள் கடைசி வாய்ப்பு. உங்கள் கணக்கை நிரந்தரமாக நீக்க நீங்கள் உண்மையில் விரும்புகிறீர்களா?',
      deleteForever: 'ஆம், என்றென்றும் நீக்கு',
      accountDeleted: 'உங்கள் கணக்கு வெற்றிகரமாக நீக்கப்பட்டது.',
      
      madeWithLove: 'விவசாயிகளுக்காக ❤️ உடன் உருவாக்கப்பட்டது',
      madeWithLoveRubber: 'ரப்பர் தொழிலுக்காக ❤️ உடன் உருவாக்கப்பட்டது',
      
      enableLocation: 'இருப்பிடத்தை இயக்கு',
      enableLocationMessage: 'இருப்பிட சேவைகளை இயக்க விரும்புகிறீர்களா? இது உங்கள் சாதன இருப்பிடத்தை அணுக பயன்பாட்டை அனுமதிக்கும்.',
      permissionDenied: 'அனுமதி மறுக்கப்பட்டது',
      locationPermissionRequired: 'இருப்பிட சேவைகளை இயக்க இருப்பிட அனுமதி தேவை.',
      failedToEnableLocation: 'இருப்பிட சேவைகளை இயக்க முடியவில்லை.',
      cacheClearedSuccess: 'தற்காலிக சேமிப்பு வெற்றிகரமாக அழிக்கப்பட்டது!',
      failedToClearCache: 'தற்காலிக சேமிப்பை அழிக்க முடியவில்லை',
      clearCache: 'தற்காலிக சேமிப்பை அழி',
      clearCacheConfirm: 'தற்காலிக சேமிப்பை அழிக்க விரும்புகிறீர்களா?',
      comingSoon: 'விரைவில் வருகிறது',
      languageComingSoon: 'மொழி தேர்வு விரைவில் வருகிறது!',
      changeLanguage: 'மொழியை மாற்று',
      selectLanguage: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
      languageChanged: 'மொழி தமிழாக மாற்றப்பட்டது',
      
      // Blockchain Section
      blockchain: 'பிளாக்செயின்',
      walletSettings: 'பணப்பை அமைப்புகள்',
      walletSettingsSubtitle: 'உங்கள் பிளாக்செயின் பணப்பையை நிர்வகிக்கவும்',
      blockchainHistory: 'பிளாக்செயின் வரலாறு',
      blockchainHistorySubtitle: 'அனைத்து செயின் பதிவுகளையும் காணவும்',
      verifyTransaction: 'பரிவர்த்தனையை சரிபார்க்கவும்',
      verifyTransactionSubtitle: 'பரிவர்த்தனை நம்பகத்தன்மையை சரிபார்க்கவும்',
    },

    privacyPolicy: {
      title: 'தனியுரிமைக் கொள்கை',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது: டிசம்பர் 2025',
      yourPrivacyMatters: 'உங்கள் தனியுரிமை முக்கியம்',
      yourPrivacyMattersDesc: 'நாங்கள் உங்கள் ব్যक్తிগత தகவல் மற்றும் தோட்டம் தரவு பாதுகாப்புக்கு பிரதিশ్ठितமாக உள்ளோம். இந்தக் கொள்கை நாம் உங்கள் தகவல் சேகரிப்பு, பயன்படுத்துவது மற்றும் பாதுகாப்பது எப்படி என்பதை விளக்குகிறது.',
      informationWeCollect: '1. நாம் சேகரிக்கும் தகவல்',
      personalInformation: 'ব్যక్తிগत தகவல்:',
      iotSensorData: 'IoT சென்சார் தரவு:',
      agriculturalData: 'விவசாய தரவு:',
      transactionData: 'பரிவர்தన தரவு:',
      howWeUseYourInformation: '2. நாம் உங்கள் தகவலை எப்படி பயன்படுத்துகிறோம்',
      howWeUseItem1: 'உங்கள் தோட்டத்திற்கு நி실ை நேர கண்காணிப்பு மற்றும் பகுப்பாய்வு வழங்குதல்',
      howWeUseItem2: 'AI-உந்துதல் நோய் எச்சரிக்கைகள் மற்றும் வளர்ச்சி পূர்বறிவிப்பு உৎপन்ন செய்யுங்கள்',
      howWeUseItem3: 'Blockchain-based சப்లை சেইன் தொடர்தன்மை செயல்படுத்துங்கள்',
      howWeUseItem4: 'விவசாயிகள் மற்றும் கொள்ளிடையாளர்களுக்கு இடையே பரிவர்தனை செயல்படுத்துங்கள்',
      howWeUseItem5: 'விவசாய ஆலோசனை சேவைகள் வழங்குங்கள்',
      howWeUseItem6: 'गुमनाम தரவு பகுப்பாய்வு மூலம் AI மாதிரியை উন্নத করুங்கள்',
      howWeUseItem7: 'EUDR সম্মতি রিপোর্টিং নিশ্চিত করুங்கள்',
      howWeUseItem8: 'रबर் চাষ అభ్యാసాలను बेहतर করने के लिए গবेषણा conduct करুங்கள்',
      informationSharing: '3. தகவல் பகிர்வு',
      sharingText: 'நாங்கள் உங்கள் தகவலைப் பகிரப்பும் இந்த சூழ்நிலைகளில் மட்டுமே:',
      withAgriculturalOfficers: 'விவசாய அधिकारीகளுடன்:',
      withAgriculturalOfficersDesc: 'நோய் எச்சரிக்கைகள் மற்றும் ஆலோசனை பரிந్थुමलिह்वை',
      withBuyers: 'கொள్ళిడைदारों शब्द:',
      withBuyersDesc: 'আপনার సమ్మతితో xác thực చేయబడిన লেनదেনের জন్য গुणवत्ता प्रमाণपत्र డेटా',
      withRegulatoryAuthorities: 'నियामక అధिकారীలతో:',
      withRegulatoryAuthoritiesDesc: 'చట్టం వలె అవసరమైన EUDR సম్మతি డేటా',
      researchInstitutions: 'গবেषણा संस্थान:',
      researchInstitutionsDesc: 'कृषि গবेषणा के लिए गुमनाम, एकत्रित डेटा',
      serviceProviders: 'सेवा प्रदाता:',
      serviceProvidersDesc: 'क्लाउड होस्टिंग (AWS), IoT कनेक्टिविटी (Dialog), लेकिन मार्केटिंग के लिए कभी नहीं',
      neverSell: 'हम आपकी व्यक्तिगत जानकारी को तीसरे पक्ष को कभी नहीं बेचते।',
      dataSecurity: '4. डेटा सुरक्षा',
      yourRights: '5. आपके अधिकार',
      yourRightsIntro: 'आपको अधिकार है:',
      contactUsText: 'इन अधिकारों का प्रयोग करने के लिए, हमसे privacy@rubberedge.lk पर संपर्क करें',
      dataRetention: '6. डेटा प्रतिधारण',
      childrenPrivacy: '7. बच्चों की गोपनीयता',
      changesPolicy: '8. इस नीति में परिवर्तन',
      contactUs: '9. हमसे संपर्क करें',
      contactUsSubtitle: 'गोपनीयता से संबंधित प्रश्नों या चिंताओं के लिए:',
      email: 'ईमेल: privacy@rubberedge.lk',
      phone: 'फोन: +94 11 234 5678',
      dataProtectionOfficer: 'डेटा संरक्षण अधिकारी: Ravishka Dissanayaka',
      institute: 'श्रीलंका रबर अनुसंधान संस्थान',
    },

    buyer: {
      // Layout / Navigation
      dashboard: 'முகப்புப்பலகை',
      market: 'சந்தை',
      settings: 'அமைப்புகள்',
      buyerDashboard: 'வாங்குபவர் முகப்புப்பலகை',
      marketRates: 'சந்தை விலைகள்',
      buyerTutorials: 'வாங்குபவர் பயிற்சிகள்',
      profileAndSettings: 'சுயவிவரம் & அமைப்புகள்',
      
      // Dashboard
      currentMarketPrice: 'தற்போதைய சந்தை விலை',
      availableStock: 'கிடைக்கும் இருப்பு',
      pendingOrders: 'நிலுவையில் உள்ள ஆர்டர்கள்',
      fromSuppliers: 'விநியோகஸ்தர்களிடமிருந்து',
      readyForPickup: 'எடுக்க தயார்',
      upcomingEvents: 'வரவிருக்கும் நிகழ்வுகள்',
      seeAll: 'அனைத்தையும் பார்',
      latestNews: 'சமீபத்திய செய்திகள்',
      readMore: 'மேலும் படிக்க',
      noEventsScheduled: 'நிகழ்வுகள் திட்டமிடப்படவில்லை',
      checkBackLater: 'புதுப்பிப்புகளுக்கு பின்னர் சரிபார்க்கவும்',
      
      // Market Screen
      marketOpen: 'சந்தை திறந்துள்ளது',
      updatedJustNow: 'இப்போது புதுப்பிக்கப்பட்டது',
      myMarketRates: 'எனது சந்தை விலைகள்',
      ratesSetByYou: 'உங்களால் அமைக்கப்பட்ட விலைகள்',
      loadingRates: 'விலைகள் ஏற்றப்படுகின்றன...',
      noRatesSet: 'இன்னும் விலைகள் அமைக்கப்படவில்லை.',
      useUpdateRates: 'உங்கள் விலைகளைச் சேர்க்க "விலைகளைப் புதுப்பி" பயன்படுத்தவும்.',
      marketActions: 'சந்தை நடவடிக்கைகள்',
      viewMarketTrends: 'சந்தை போக்குகளைப் பார்',
      viewMarketTrendsDesc: 'விலை நகர்வுகள் மற்றும் சந்தை தரவை பகுப்பாய்வு செய்யவும்',
      viewOtherBuyers: 'மற்ற வாங்குபவர்களின் விலைகளைப் பார்',
      viewOtherBuyersDesc: 'உங்கள் விலைகளை மற்ற வாங்குபவர்களுடன் ஒப்பிடுங்கள்',
      updateMyRates: 'எனது விலைகளைப் புதுப்பி',
      updateMyRatesDesc: 'உங்கள் வாங்கும் விலைகளை அமைக்கவும் அல்லது புதுப்பிக்கவும்',
      perKg: 'ஒரு கிலோவுக்கு',
      previousPrice: 'முந்தையது:',
      ratesProvidedBy: 'இலங்கை ரப்பர் வர்த்தக சங்கத்தால் வழங்கப்பட்ட விலைகள்',
      otherBuyersPrices: 'மற்ற வாங்குபவர்களின் விலைகள்',
      close: 'மூடு',
      
      // Update Rates Screen
      updateRatesTitle: 'உங்கள் கொள்முதல் விலைகளைப் புதுப்பிக்கவும்',
      setTodaysPrices: 'உங்கள் சரிக்கணக்குக்காரர்களுக்கான இன்றைய விலைகளை அமைக்கவும்',
      effectivePeriod: 'பயனுள்ள காலம்',
      from: 'இருந்து',
      to: 'வரை',
      validFor: 'செல்லுபடியாகும் நேரம்',
      days: 'நாட்கள்',
      rubberGrades: 'ரப்பர் தரங்கள்',
      enterBuyingPrices: 'LKR க்கு உங்கள் கொள்முதல் விலைகளைக் கிலோகிராமுக்கு உள்ளிடவும்',
      rss3: 'RSS3',
      tsr20: 'TSR20',
      latex: 'Latex 60%',
      crepe: 'Crepe',
      customGrades: 'தனிப்பயன் தரங்கள்',
      yourCustomRubberGrades: 'உங்கள் தனிப்பயன் ரப்பர் தரங்கள் மற்றும் விலைகள்',
      gradeNameExample: 'தர பெயர் (எ.கா., RSS1, Custom Mix)',
      addCustomGrade: 'தனிப்பயன் தரம் சேர்க்கவும்',
      addOtherRubberTypes: 'பிற ரப்பர் வகைகள் அல்லது தனிப்பயன் கலவைகளைச் சேர்க்கவும்',
      additionalNotesOptional: 'கூடுதல் குறிப்புகள் (விருப்பமான)',
      addSpecialConditions: 'உங்கள் சரிக்கணக்குக்காரர்களுக்கான சிறப்பு நிபந்தனைகள் அல்லது குறிப்புகளைச் சேர்க்கவும்...',
      clearAll: 'அனைத்தையும் அழிக்கவும்',
      updatePrices: 'விலைகளைப் புதுப்பிக்கவும்',
      updatedPricesVisible: 'புதுப்பிக்கப்பட்ட விலைகள் அனைத்து விவசாயীகளுக்கும் உடனடியாக புலப்படும்',
      confirmPriceUpdate: 'விலை புதுப்பிப்பை உறுதிசெய்யவும்',
      sureUpdatePrices: 'இந்த விலைகளைப் புதுப்பிக்க நீங்கள் நிச்சயம் விரும்புகிறீர்களா?',
      visibleToFarmersImmediately: 'அவை விவசாயীகளுக்கு உடனடியாக புலப்படும்.',
      willBecomeActiveOnStartDate: 'இந்த விலைகள் தொடக்க தேதியில் செயல்படத் தொடங்கும்.',
      loadingYourPrices: 'உங்கள் விலைகள் ஏற்றப்படுகின்றன...',
      failedToLoadPrices: 'உங்கள் முந்தைய விலைகளை ஏற்றுவதில் தோல்வி',
      failedToUpdatePrices: 'விலைகளைப் புதுப்பிப்பதில் தோல்வி. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      pleaseEnterAtLeastOnePrice: 'புதுப்பிக்க குறைந்தபட்சம் ஒரு விலையை உள்ளிடவும்.',
      pleaseCompleteAllCustomGradeFields: 'அனைத்து தனிப்பயன் தர புலங்களை முடிக்கவும் அல்லது வெற்று வாய்களை அகற்றவும்.',
      invalidDate: 'தவறான தேதி',
      endDateMustBeAfterStartDate: 'நிறைவு தேதி ஆரம்ப தேதிக்குப் பிறகு இருக்க வேண்டும்',
      selectStartDate: 'தொடக்க தேதியைத் தேர்ந்தெடுக்கவும்',
      selectEndDate: 'நிறைவு தேதியைத் தேர்ந்தெடுக்கவும்',
      pricesUpdatedSuccessfully: 'உங்கள் விலைகள் வெற்றிகரமாகப் புதுப்பிக்கப்பட்டுள்ளன!',
      cancel: 'ரத்து செய்',
      done: 'முடிந்துவிட்டது',
      
      // Tutorials
      allTutorials: 'அனைத்து பயிற்சிகள்',
      buying: 'வாங்குதல்',
      quality: 'தரம்',
      processing: 'செயலாக்கம்',
      learningCenter: 'கற்றல் மையம்',
      masterBuyerSkills: 'நிபுணர் வழிகாட்டிகளுடன் உங்கள் வாங்குபவர் திறன்களை மேம்படுத்துங்கள்',
      totalGuides: 'மொத்த வழிகாட்டிகள்',
      categories: 'வகைகள்',
      expertTips: 'நிபுணர் குறிப்புகள்',
      results: 'முடிவுகள்',
      steps: 'படிகள்',
      markAsComplete: 'முடிந்ததாகக் குறி',
      noTutorialsFound: 'பயிற்சிகள் கண்டுபிடிக்கப்படவில்லை',
      tryDifferentCategory: 'வேறு வகையை முயற்சிக்கவும்',
      showAll: 'அனைத்தையும் காட்டு',
      beginner: 'தொடக்கநிலை',
      intermediate: 'இடைநிலை',
      advanced: 'மேம்பட்ட',
      tutorials: {
        tutorial1: {
          title: 'ரப்பர் வாங்குபவராக தொடங்குதல்',
          description: 'ரப்பர் ক்রয়ின் அடிப்படைகள் மற்றும் இந்த பயன்பாட்டை திறம்பட பயன்படுத்துவதைக் கற்றுக்கொள்ளுங்கள்.',
          steps: [
            'நிறுவன விவரங்களுடன் உங்கள் வாங்குபவர் சுயவிவரத்தை உருவாக்கவும்',
            'உங்கள் விருப்பமான ரப்பர் தரங்களை (RSS1, RSS2, முதலியவை) அமைக்கவும்',
            'உங்கள் ক்রய பிரதேশ மற்றும் மாவட்டங்களை கட்டமைக்கவும்',
            'ஒவ்வொரு வகுப்பிற்கும் உங்கள் ஆரம்ப ক்রய விலைகளை நிர்ধारிக்கவும்',
            'விலை புதுப்பிப்புகள் மற்றும் விவசாயி கோரிக்கைகளுக்கான அறிப்புகளை செயல்படுத்தவும்',
          ],
        },
        tutorial2: {
          title: 'போட்டிமுறை ক்রய விலைகளை அமைக்கவும்',
          description: 'விவசாயীகளை ஈர்க்கும் வகையில் விலைகளை அமைக்கும் கலையை கடந்து செல்லவும் மற்றும் லாபজनকতையை பராமரிக்கவும்.',
          steps: [
            'சந்தை தாவலில் தற்போதைய சந்தை விலைகளைச் சரிபார்க்கவும்',
            '"மற்ற வாங்குபவர்கள்" பண்ணை பயன்படுத்தி போட்டியாளரின் விலைகளை ஆராய்ந்து பார்க்கவும்',
            'உங்கள் போக்குவரத்து மற்றும் செயலாக்க செலவுகளை கணக்கில் எடுத்துக்கொள்ளவும்',
            'உচ்சந்தர வகுப்புக்கு தரம் பிரিமியம் கருத்தில் கொள்ளுங்கள்',
            'விவசாயীகளுக்கு ন்யாய மதிப்பை வழங்கும் விலைகளை அமைக்கவும்',
            'சந்தை நிலைமைகளின் அடிப்படையில் விலைகளை அவ்வப்போது புதுப்பிக்கவும்',
          ],
        },
        tutorial3: {
          title: 'ரப்பர் தரங்களைப் புரிந்துகொள்ளுதல்',
          description: 'பல்வேறு ரப்பர் தாள் தரங்களை அடையாளப்படுத்த மற்றும் வேறுபடுத்த கற்றுக்கொள்ளுங்கள்.',
          steps: [
            'RSS1 (Ribbed Smoked Sheet Grade 1): பிரিமியம் தரம், ஒளிபালன நிறம், குறைபாடு இல்லை',
            'RSS2: நல்ல தரம் சிறிய நிறம் மாறுபாடுகளுடன்',
            'RSS3: தரமான தரம் சில அபூर்ணতா அனுமதிக்கப்பட்டது',
            'RSS4: குறைந்த தரம் தெரியும் குறைபாடுகள் ஆனால் இன்னும் பயன்படுத்தக்கூடியது',
            'RSS5: மிகக் குறைந்த தரம், குறிப்பிடத்தக்க குறைபாடுகள் உள்ளன',
            'Crepe Rubber: புகையாகாத, RSS இலிருந்து வேறுபட்டவாறு செயலாக்கப்பட்டது',
          ],
        },
        tutorial4: {
          title: 'தரம் மதிப்பீட்டு நுட்பங்கள்',
          description: 'ক்রয়ின் முன் ரப்பர் தரத்தை மதிப்பீடு செய்ய கணிதப் பொருத்தமான முறைகள்.',
          steps: [
            'பார்வை ஆய்வு: நிறம் சமரূபத்া மற்றும் வெளிப்படைத்தை சரிபார்க்கவும்',
            'அமைப்பு சோதனை: மென்மை மற்றும் அயல் துகள்கள் இல்லாமல் உணர்கையிலிருக்க',
            'வாசனை சோதனை: புதிய ரப்பர் வெவ்வேறு வாசனை, கெட்ட வாசனை இல்லை',
            'ஈரப்பதம் சரிபார்ப்பு: முறையான உலர்த்தல் தரத்திற்கு அপরिहार्य',
            'பூஞ்சை, குமிழ்கள் அல்லது மாசுமண்டனத்திற்கு சரிபார்க்கவும்',
            'RSS வகுப்புகளில் சரியான விலங்கு வகுப்பை சரிபார்க்கவும்',
            'விலை பரஸ்பர ஆய்வுக்கு தரம் கண்டுபிடிப்புகளை ஆவணப்படுத்தவும்',
          ],
        },
        tutorial5: {
          title: 'சந்தை பிறுவின்சி மற்றும் போக்குவரத்து',
          description: 'தகவலறிவுள்ள ক்রয় முடிவுகளை எடுக்க ரப்பர் சந்தை விவாத பாய்வுகளை தாக்கம் மற்றும் பிறுவின்சி செய்யுங்கள்.',
          steps: [
            'உலக ரப்பர் பொருட்களை விலைகளைக் கண்டறிந்து பார்க்கவும் (SICOM, TOCOM)',
            'கைறுக்ரூ விலை வகை தாக்கங்களை (பருவம் பற்றி குறைவாக)',
            'உங்கள் பிரதேசத்தில் விற்பனை-வேண்டுதல் गतिविधि பிறுவின்சி செய்யுங்கள்',
            'உற்பத்தி பாதிக்கும் வாతாவரண நிகழ்வுகளைக் கண்டுங்கள்',
            'ரப்பர் வர்த்தக அரசு கொள்கைகளைப் பின்வாங்கவும்',
            'விலை இலாபாட்ட ஈடுபடுவதற்கு வரலாற்று தரவுகளை பயன்படுத்துங்கள்',
          ],
        },
        tutorial6: {
          title: 'விவசாய সம்பர்க்க கட்டமைப்பு',
          description: 'ரப்பர் விவசாயிகளுடன் வலுவான, நீண்டகாலப் பரிணாம வளர்த்து எடுக்க வளர்க்கவும்.',
          steps: [
            'நியாய மற்றும் வெளிப்பட்ட ক்రয় விலைகளை வழங்கவும்',
            'நிலையான ক্রய அட்டவணைகளை நிலைத்தி பராமரிக்கவும்',
            'நம்பிக்கை வளர்க்க சময োक্ய பணி வழங்கவும்',
            'தரம் வேண்டுதல் பற்றி தெளிவாக தொடர்பு கொள்ளுங்கள்',
            'ரப்பர் தரம் மேம்படுத்த வழிகாட்டல் வழங்கவும்',
            'விவசாய கேள்விகளுக்கு அணுக்கமாக இருக்கவும் மற்றும் প்রতியாக்रியைட்மாகவும் இருங்கள்',
          ],
        },
        tutorial7: {
          title: 'ரப்பர் செயலாக்கம் ஞ்சாணம்',
          description: 'பொங்கலிலிருந்து முடிந்த தாள் வரை ரப்பர் எவ்வாறு செயலாக்கப்படுகிறது என்பதை புரிந்துக்கொள்ளுங்கள்.',
          steps: [
            'பொங்கல் சங்கலனம்: ரப்பர் மரங்களிலிருந்து புதிய பொங்கல்',
            'உருவாக்கம்: அமிலம் சேர்த்து ரப்பர் ஆয்ந்த உருவாக்க',
            'தாள் அழுத்தம்: மெல்ல தாள்களில் உருளை',
            'விலங்கு: சம உலர்த்தலுக்கு விலங்கு வகுப்பு உருவாக்க',
            'புகையாகுதல்/உலர்த்தல்: தாள்களை சேமிக்க மற்றும் நிறமாக்க',
            'வகுப்பாக்கல்: தரம் வகுப்புகளை வகைப்படுத்த',
            'சேமிப்பு: தரம் பராமரிக்க சரியான நிலைமைகள்',
          ],
        },
        tutorial8: {
          title: 'தெளிவு மற்றும் போக்குவரத்து',
          description: 'ரப்பர் தெளிவாக சேகரிப்பு மற்றும் போக்குவரத்து செய்ய சிறந்த நடைமுறைகள்.',
          steps: [
            'திறமையான சேகரிப்பு வழித்தடங்களைத் திட்டமிடவும்',
            'மாசுமண்டனத்தை எதிர்த்து தகுந்த பொதியடிவு பயன்படுத்துங்கள்',
            'பொருத்தமான வாகனம் வெப்பநிலை பராமரிக்கவும்',
            'சேகரிப்பு நிலையில் எடை மற்றும் தரத்தை ஆவணப்படுத்தவும்',
            'சேதம் தவிர்க்க ரப்பரை கவனமாக கையாள்ளுங்கள்',
            'விவசாயிகளுடன் வழக்கமான சேகரிப்பு நாட்களை வரிசைப்படுத்துங்கள்',
            'சேமிப்பு தாக்கம் பராமரிக்கவும்',
          ],
        },
      },
    },

    officer: {
      // Layout / Navigation
      dashboard: 'முகப்பு',
      farmers: 'விவசாயிகள்',
      tutorials: 'பயிற்சிகள்',
      settings: 'அமைப்புகள்',
      officerDashboard: 'அதிகாரி முகப்புப்பலகை',
      farmerManagement: 'விவசாயி மேலாண்மை',
      tutorialsGuides: 'பயிற்சிகள் மற்றும் வழிகாட்டிகள்',
      profileSettings: 'அமைப்புகள்',
      // Farmers Screen
      farmerDirectory: 'விவசாயி தொகுப்பு',
      farmerDirectoryDesc: 'விவசாயி ப்ரோபைல்களை பார்வையிடவும் மேலாண்மை செய்யவும்',
      createEvent: 'நிகழ்வை உருவாக்கு',
      createEventDesc: 'புதிய விவசாய நிகழ்வுகளை திட்டமிடுங்கள்',
      viewEvents: 'நிகழ்வுகளை பார்க்க',
      viewEventsDesc: 'வரும் நிகழ்வுகளை மேலாண்மை செய்யுங்கள்',
      marketPrice: 'சந்தை விலை',
      marketPriceDesc: 'நடப்பு ரப்பர் விலைகளை பார்க்க',
      totalFarmers: 'மொத்த விவசாயிகள்',
      totalEvents: 'மொத்த நிகழ்வுகள்',
      upcoming: 'வரும்',
      total: 'மொத்தம்',
      event: 'நிகழ்வு',
      events: 'நிகழ்வுகள்',
      newEvent: 'புதிய நிகழ்வு',
      livePrices: 'நேரடி விலைகள்',
      errorLoadingData: 'தரவுகளை ஏற்றுவது தோல்வியுற்றது. மீண்டும் முயற்சிக்கவும்.',
      // Tutorials Screen
      learningModulesAvailable: 'கற்றல் தொகுதிகள் உள்ளன',
      topics: 'தலைப்புகள்',
      whatYoullLearn: 'நீங்கள் கற்றுக்கொள்வது',
      availableResources: 'கிடைக்கும் வளங்கள்',
      watchOnYoutube: 'YouTube இல் பாருங்கள்',
      visitOfficialWebsite: 'அதிகாரப்பூர்வ இணையதளத்தைப் பாருங்கள்',
      close: 'மூடு',
      unableToOpenLink: 'இணைப்பைத் திறக்க முடியவில்லை',
      checkInternetConnection: 'உங்கள் இணைய இணைப்பைச் சரிபார்க்கவும் அல்லது பின்னர் மீண்டும் முயற்சிக்கவும்.',
      video: 'வீடியோ',
      docs: 'ஆவணங்கள்',
      reference: 'குறிப்பு',
      tutorial1Title: 'தொடங்குதல்',
      tutorial1Desc: 'ரப்பர் அதிகாரி முகப்புப்பலகையைப் பயன்படுத்துவதற்கான முழு வழிகாட்டி',
      tutorial1Content: [
        'ரப்பர் எட்ஜ் ரப்பர் மேலாண்மை அமைப்பின் அறிமுகம்',
        'அதிகாரி முகப்புப்பலகை மற்றும் முக்கிய அம்சங்களை வழிநடத்துதல்',
        'விவசாயி கோப்பகம் மற்றும் சுயவிவரங்களை நிர்வகித்தல்',
        'நோய் கண்டறிதல் மற்றும் நோயறிதல் கருவிகளைப் பயன்படுத்துதல்',
        'சந்தை விலைகள் மற்றும் புதுப்பிப்பு அம்சங்கள்',
        'நிகழ்வு உருவாக்கம் மற்றும் நிர்வாகம்',
        'விவசாயிகளுடன் அரட்டை மற்றும் தொடர்பு',
      ],
      tutorial2Title: 'ரப்பர் தட்டுதல் நுட்பங்கள்',
      tutorial2Desc: 'நவீன மற்றும் பாரம்பரிய ரப்பர் தட்டுதல் முறைகள்',
      tutorial2Content: [
        'தட்டுதல் தொடங்க வேண்டிய நேரம் - 6-7 ஆண்டுகள் 50செமீ சுற்றளவு கொண்ட மரங்கள்',
        'சரியான தட்டுதல் நேரம் - அதிகாலை 3-6 AM',
        '30° கோணத்தில் கீழ்நோக்கி அரை-சுருள் வெட்டு',
        '1-1.5மிமீ பட்டை தடிமன் பராமரித்தல்',
        'கூர்மையான கத்தி பராமரிப்பு மற்றும் நுட்பங்கள்',
        'மாற்று நாள் vs தினசரி தட்டுதல் அமைப்புகள்',
        'லேடெக்ஸ் சேகரிப்பு மற்றும் கோப்பை வைப்பு',
        'தட்டுதல் பேனல் வறட்சி (TPD) தடுப்பு',
      ],
      tutorial3Title: 'நோய்கள் & பூச்சி மேலாண்மை',
      tutorial3Desc: 'ரப்பர் மர நோய்களை அடையாளம் காணுதல் மற்றும் கட்டுப்படுத்துதல்',
      tutorial3Content: [
        'இலை நோய்கள் - இரண்டாம் நிலை இலை உதிர்வு கட்டுப்பாடு',
        'வேர் நோய்கள் - ஊதா மற்றும் வெள்ளை வேர் நோய்',
        'பேனல் நோய்கள் - கருப்பு கோடு மற்றும் பூசண அழுகல்',
        'பொடி பூஞ்சை மற்றும் தாமிர தெளிப்பு சிகிச்சை',
        'நர்சரிகளில் பறவை கண் புள்ளி',
        'பொதுவான பூச்சிகள் - கரையான், உண்ணிகள், மாவுப்பூச்சி',
        'ஒருங்கிணைந்த பூச்சி மேலாண்மை உத்திகள்',
        'இரசாயன கட்டுப்பாடு மற்றும் பூசணக்கொல்லி பயன்பாடு',
      ],
      tutorial4Title: 'தோட்ட மேலாண்மை',
      tutorial4Desc: 'ரப்பர் தோட்ட செயல்பாடுகளுக்கான சிறந்த நடைமுறைகள்',
      tutorial4Content: [
        'இட தேர்வு மற்றும் நில தயாரிப்பு',
        'சரியான இடைவெளி - ஹெக்டேருக்கு 375 மரங்கள்',
        'நர்சரி மேலாண்மை மற்றும் நாற்று தேர்வு',
        'அதிக விளைச்சல் குளோன்களின் மொட்டு மற்றும் ஒட்டுதல்',
        'உரம் மற்றும் மண் ஊட்டச்சத்து மேலாண்மை',
        'மூடாக்கு பயிர்கள் மற்றும் ஊடுபயிர்',
        'களை கட்டுப்பாடு மற்றும் பராமரிப்பு',
        'நீர் மேலாண்மை மற்றும் நீர்ப்பாசனம்',
      ],
      tutorial5Title: 'பதப்படுத்துதல் & தர கட்டுப்பாடு',
      tutorial5Desc: 'லேடெக்ஸ் பதப்படுத்துதல் மற்றும் தர தரநிலைகள்',
      tutorial5Content: [
        'லேடெக்ஸ் சேகரிப்பு மற்றும் வயல் உறைவிப்பு',
        'எதிர்-உறைவிப்பான்கள் மற்றும் பாதுகாப்பான்கள்',
        'தாள் ரப்பர் உற்பத்தி மற்றும் புகையூட்டல்',
        'தொழில்நுட்ப ரீதியாக குறிப்பிடப்பட்ட ரப்பர் (TSR) தரங்கள்',
        'உலர் ரப்பர் உள்ளடக்கம் (DRC) சோதனை',
        'இழுவிசை வலிமை சோதனை (ASTM D412)',
        'ISO 9001 தர மேலாண்மை',
        'ஏற்றுமதி தர தேவைகள்',
      ],
      tutorial6Title: 'சந்தை மேலாண்மை & திட்டங்கள்',
      tutorial6Desc: 'சந்தைப்படுத்தல் உத்திகள் மற்றும் அரசு திட்டங்கள்',
      tutorial6Content: [
        'உலகளாவிய ரப்பர் சந்தை போக்குகள் மற்றும் விலை',
        'உள்ளூர் சந்தை இயக்கவியல்',
        'அரசு மானிய திட்டங்கள்',
        'ரப்பர் வாரிய ஆதரவு திட்டங்கள்',
        'விலை நிலைப்படுத்தல் மற்றும் குறைந்தபட்ச ஆதரவு',
        'ஏற்றுமதி வாய்ப்புகள்',
        'கூட்டுறவு சங்கங்கள் சந்தைப்படுத்தல்',
        'காப்பீடு மற்றும் கடன் வசதிகள்',
      ],
      tutorial7Title: 'அதிகாரப்பூர்வ RRISL வளங்கள்',
      tutorial7Desc: 'அரசு கையேடுகள் மற்றும் தொழில்நுட்ப வெளியீடுகள்',
      tutorial7Content: [
        'RRISL கையேடு - முழுமையான வேளாண் பரிந்துரைகள்',
        'RDD வெளியீடுகள் - மண் பாதுகாப்பு மற்றும் நில தயாரிப்பு',
        'ஆலோசனை சுற்றறிக்கைகள் - நோய் மேலாண்மை நெறிமுறைகள்',
        'தொழில்நுட்ப வழிகாட்டிகள் - உர பயன்பாட்டு அட்டவணைகள்',
        'பதப்படுத்துதல் தரநிலைகள் - தர கட்டுப்பாட்டு வழிகாட்டுதல்கள்',
        'ரப்பர் அடிப்படை விவசாய அமைப்புகள் ஆவணப்படுத்தல்',
        'சமீபத்திய ஆராய்ச்சி புதுப்பிப்புகள் மற்றும் கண்டுபிடிப்புகள்',
        'ஆலோசனை சேவைகளுக்கான தொடர்பு தகவல்',
      ],
      tutorial8Title: 'இலங்கை ரப்பர் ஆணையம் இணைப்புகள்',
      tutorial8Desc: 'அரசு ரப்பர் நிறுவனங்களுக்கு நேரடி அணுகல்',
      tutorial8Content: [
        'இலங்கை ரப்பர் ஆராய்ச்சி நிறுவனம் (RRISL) - www.rrisl.gov.lk',
        'ரப்பர் அபிவிருத்தி திணைக்களம் (RDD) - www.rubberdev.gov.lk',
        'பதிவிறக்கம் செய்யக்கூடிய கையேடுகள் மற்றும் தொழில்நுட்ப கையேடுகள்',
        'தோட்ட மேலாண்மைக்கான ஆலோசனை சுற்றறிக்கைகள்',
        'மழை காவலர் பயன்பாட்டு நுட்பங்கள்',
        'ஊடுபயிர் உத்தி வழிகாட்டிகள்',
        'வெள்ளை வேர் நோய் மேலாண்மை நெறிமுறைகள்',
        'RSS உற்பத்தி மற்றும் லேடெக்ஸ் பதப்படுத்துதல் தரநிலைகள்',
      ],
      // Dashboard Screen
      goodMorning: 'காலை வணக்கம்',
      goodAfternoon: 'மதிய வணக்கம்',
      goodEvening: 'மாலை வணக்கம்',
      officer: 'அதிகாரி',
      loadingCarousel: 'கரோசெல் ஏற்றுகிறது...',
      recentEvents: 'சமீபத்திய நிகழ்வுகள்',
      viewAll: 'அனைத்தையும் காண்க',
      noEventsFound: 'நிகழ்வுகள் இல்லை',
      createFirstEvent: 'உங்கள் முதல் நிகழ்வை உருவாக்குங்கள்!',
      cancelled: 'ரத்து செய்யப்பட்டது',
      ended: 'முடிந்தது',
      latestRubberNews: 'சமீபத்திய ரப்பர் செய்திகள்',
      noRubberNewsAvailable: 'ரப்பர் செய்திகள் இல்லை',
      readMore: 'மேலும் படிக்க',
    },

    // Growth Screen
    growthScreen: {
      headerTitle: 'வளர்ச்சி அளவீடு',
      headerSubtitle: 'உங்கள் ரப்பர் மரத்தின் வளர்ச்சியைக் கண்டறிக',
      measureTreeGrowth: 'மரத்தின் வளர்ச்சியை அளவிடவும்',
      useCameraOrManual: 'கேமரா அளவீட்டைப் பயன்படுத்தவும் அல்லது மதிப்புகளை கைமுறையாக உள்ளிடவும்',
      camera: 'கேமரா',
      manual: 'கைமுறை',
      latestMeasurement: 'சமீபத்திய அளவீடு',
      allMeasurements: 'அனைத்து அளவீடுகளும்',
      noMeasurements: 'இன்னும் அளவீடுகள் இல்லை',
      startMeasuringTrees: 'கேமராவைப் பயன்படுத்தி உங்கள் ரப்பர் மரங்களை அளவிட ஆரம்பிக்கவும்',
      records: 'பதிவுகள்',
      loading: 'ஏற்றுகிறது...',
      requiredField: 'தேவையான ஆண்',
      pleaseEnterTreeId: 'கருணயாக ஒரு மர ID ஐ உள்ளிடவும்',
      pleaseEnterGirth: 'கருணயாக உள்ளுறை அளவீட்டை உள்ளிடவும்',
      invalidValue: 'தவறான மதிப்பு',
      pleaseEnterValidGirth: 'கருணயாக ஒரு செல்லுபடியாகும் உள்ளுறை அளவீட்டை உள்ளிடவும்',
      pleaseEnterValidHeight: 'கருணயாக ஒரு செல்லுபடியாகும் உயர அளவீட்டை உள்ளிடவும்',
      measurementSaved: 'அளவீடு சேமிக்கப்பட்டது!',
      deleteMeasurement: 'அளவீட்டை நீக்கவும்',
      deleteConfirmation: 'இந்த அளவீட்டை நீக்க நீங்கள் உறுதியாக உள்ளீர்களா?',
      deleteRecord: 'நீக்கவும்',
      howToMeasure: 'அளவிடுவது எப்படி',
      positionReferenceCard: 'குறிப்புக் கார்டுக்கு அளவிடவும்',
      holdCard: 'ஒரு நிலையான கடன்/பெற்றோல் கார்ட்டை (8.56cm அகலம்) மற்றும் பூமியிலிருந்து 120cm உயரத்தில் மரத்தின் தாலம் அருகே வைத்திருக்கவும்.',
      markCardWidth: 'கார்ட்டு அகலத்தைக் குறிக்கவும்',
      tapLeftRight: 'கார்டின் இடது விளிம்பை தட்டவும், பிறகு வலது விளிம்பை தட்டவும். இது அளவீட்டுக் கோல் அமைக்கிறது.',
      markTrunkDiameter: 'தாலத்தின் விட்டத்தைக் குறிக்கவும்',
      tapTwoPoints: 'தாலத்தின் ஒரு பக்கத்தைத் தட்டவும், பிறகு எதிர் பக்கத்தைத் தட்டவும். பயன்பாடு உள்ளுறையை தானாகவே கணக்கிடுகிறது.',
      saveMeasurement: 'அளவீட்டைச் சேமிக்கவும்',
      onceCalculated: 'கணக்கிடப்பட்ட பிறகு, மரம் ID மற்றும் இடத்துடன் பதிவு செய்ய சேமிக்க தட்டவும்.',
      treeReadyForTapping: 'மரங்கள் 120cm உயரத்தில் உள்ளுறை 50cm ஐ அடையும் போது குயர்ப்பதற்குத் தயாரான',
      typicallyYears: '(பொதுவாக 5-7 ஆண்டுகள்).',
      bestAccuracy: 'சிறந்த கருத்துப்படிக்கு, நல்ல வெளிச்சத்துடன் மரத்தின் தாலத்திற்கு செல்லுபடியாகாமல் தொலைபேசியை வைத்திருக்கவும்.',
      holdPhoneParallel: 'தொலைபேசியை மரத்தின் தாலத்திற்கு இணையாக வைத்திருக்கவும்',
      gotIt: 'புரிந்தேன்!',
      manualEntry: 'கைமுறை பதிவு',
      enterMeasurements: 'டேப் அளவீட்டு மூலம் எடுத்த அளவீடுகளை உள்ளிடவும்',
      treeId: 'மர ID',
      eg: 'உ.தா., T-001, Block-A-15',
      girthCm: 'உள்ளுறை (cm)',
      circumference: '120cm உயரத்தில் சுற்றளவு',
      heightCm: 'உயரம் (cm)',
      optional: 'விருப்பமான',
      location: 'இடம்',
      egBlockA: 'உ.தா., Block A, Row 5',
      notes: 'குறிப்புகள்',
      observations: 'எந்த அவதானங்கள் (ஆரோக்கியம், பட்டை நிலையை, முதலியன)...',
      readyForTapping: 'குயர்ப்பதற்குத் தயாரான',
      almostReady: 'கிட்டத்தட்ட தயாரான',
      growingWell: 'நன்றாக வளர்ந்து கொண்டுள்ளது',
      earlyStage: 'ஆரம்ப கட்டம்',
      tapCardPoints: 'கார்டு அகலத்தில் 2 புள்ளிகளை தட்டவும்',
      tapTrunkPoints: 'தாலத்து விட்டம் முழுதும் 2 புள்ளிகளை தட்டவும்',
      measurementComplete: 'அளவீடு முடிந்தது! பதிவு செய்ய சேமிக்க தட்டவும்.',
      tapTrunkPoints2: 'தாலத்து விட்டம் முழுதும் 2 புள்ளிகளை தட்டவும்',
      reset: 'மீட்டமைக்கவும்',
      longPressDelete: 'ஒரு பதிவை நீக்க நீண்ட பீடனை தட்டவும்',
      requestingCamera: 'கேமரா அனுமதியை கோரிக்கை செய்கிறது...',
      permissionRequired: 'அனுமதி தேவையான',
      cameraAccessNeeded: 'கேமரா அணுகல் தேவைப்பட்டுள்ளது',
      failedToSaveMeasurement: 'அளவீட்டைச் சேமிக்க முடியவில்லை',
    },
    marketScreen: {
      rubberMarket: 'ரப்பர் சந்தை',
      liveLocationPrices: 'இலங்கை • நேரலை விலைகள்',
      updated: 'புதுப்பிக்கப்பட்டது',
      loadingMarketData: 'சந்தை தரவை ஏற்றுகிறது',
      fetchingPrices: 'சமீபத்திய ரப்பர் விலைகளை பெறுகிறது...',
      oops: 'அச்சச்சோ!',
      tryAgain: 'மீண்டும் முயற்சிக்கவும்',
      failedToLoadPrices: 'சந்தை விலைகளை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      currentPrice: 'தற்போதைய விலை',
      weeklyChange: 'கடந்த காலத்திலிருந்து வாராந்திர மாற்றம்',
      sixMonthTrend: '6-மாத விலை போக்கு',
      rss3Grade: 'RSS3 தரம்',
      marketStatistics: 'சந்தை புள்ளிவிவரங்கள்',
      weekHigh: 'வாரம் உயர்ந்தது',
      weekLow: 'வாரம் குறைந்தது',
      monthHigh: 'மாதம் உயர்ந்தது',
      monthLow: 'மாதம் குறைந்தது',
      noHistoricalData: 'வரலாற்று தரவு கிடைக்கவில்லை',
      statsUnavailable: 'சந்தை புள்ளிவிவரங்கள் கிடைக்கவில்லை',
      allRubberGrades: 'அனைத்து ரப்பர் தரங்கள்',
      tapToSelect: 'தேர்ந்தெடுக்க தட்டவும்',
      dataSource: 'கொழும்பு ரப்பர் வர்த்தகர்கள் சங்கத்தின் (CRTA) ஏலங்களில் இருந்து தரவு, சிலோன் வணிக சபையில் வாரம் இருமுறை நடத்தப்படுகிறது.',
      viewOfficialPrices: 'அதிகாரப்பூர்வ CRTA விலைகளை காண்க →',
      cannotOpenLink: 'இணைப்பை திறக்க முடியாது',
      unableToOpenWebsite: 'CRTA வலைத்தளத்தை திறக்க முடியாது. www.crtasl.org ஐ கைமுறையாக பார்வையிடவும்.',
      failedToOpenWebsite: 'வலைத்தளத்தை திறக்க முடியவில்லை.',
      rss1Desc: 'புகை படிந்த தாள் தரம் 1',
      rss2Desc: 'புகை படிந்த தாள் தரம் 2',
      rss3Desc: 'புகை படிந்த தாள் தரம் 3',
      rss4Desc: 'புகை படிந்த தாள் தரம் 4',
      rss5Desc: 'புகை படிந்த தாள் தரம் 5',
      latexDesc: 'மையவிலக்கு லேடெக்ஸ்',
      tsr20Desc: 'தொழில்நுட்ப ரீதியாக குறிப்பிடப்பட்ட ரப்பர்',
      crepeDesc: 'வெளிறிய க்ரேப் ரப்பர்',
    },

    // Farm Location Screen
    farmLocation: {
      loading: 'பண்ணைத் இருப்பிடம் ஏற்றுகிறது...',
      updateYourLocation: 'உங்கள் பண்ணைத் இருப்பிடத்தை புதுப்பிக்கவும்',
      pinOnMap: 'வரைபடத்தில் உங்கள் பண்ணையை குறிக்கவும்',
      searchPlaceholder: 'உங்கள் இருப்பிடத்தைத் தேடவும்...',
      noLocationsFound: '🔍 இருப்பிடங்கள் கிடைக்கவில்லை',
      searchUnavailable: '⚠️ தேடல் கிடைக்கவில்லை. பிறகு மீண்டும் முயற்சிக்கவும்.',
      checkInternet: 'உங்கள் இணைய இணைப்பைச் சரிபார்க்கவும்',
      tryDifferentTerm: 'வேறு தேடல் சொல்லை முயற்சிக்கவும்',
      instruction: '👆 வரைபடத்தில் எங்கும் தேடி அல்லது தட்டி உங்கள் இருப்பிடத்தை அமைக்கவும்',
      locationSelected: 'இருப்பிடம் தேர்ந்தெடுக்கப்பட்டது',
      locationRequired: 'இருப்பிடம் தேவை',
      selectLocationMessage: 'வரைபடத்தில் உங்கள் பண்ணைத் இருப்பிடத்தைத் தேர்ந்தெடுக்கவும் அல்லது முகவரியைத் தேடவும்.',
      updateSuccess: 'உங்கள் பண்ணைத் இருப்பிடம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!',
      updateError: 'பண்ணைத் இருப்பிடத்தைப் புதுப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      saveButton: 'பண்ணைத் இருப்பிடம் சேமிக்கவும்',
    },

    // Terms of Service Screen
    termsOfServicePage: {
      headerTitle: 'சேவை விதிமுறைகள்',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது: டிசம்பர் 2025',
      section1Title: 'விதிமுறைகளை ஏற்றல்',
      section1Content: 'Rubber Edge ஐ அணுகி பயன்படுத்துவதன் மூலம், நீங்கள் இந்த சேவை விதிமுறைகளை ஏற்கொள்கிறீர்கள் மற்றும் இணைக்க ஒப்புக்கொள்கிறீர்கள். இந்த தளம் IoT சेন்சர்கள், AI-இயக்கிய பகுப்பாய்வு மற்றும் ப்ளாக்செயின் தொழில்நுட்பத்தை இணைத்து இலங்கையில் ரப்பர் சாகுபடியை ஆதரிக்கிறது.',
      section2Title: 'பயனர் கணக்குகள்',
      section2Content: 'நீங்கள் ஒப்புக்கொள்கிறீர்கள்:',
      section2Item1: 'துல்லியமான பதிவு தகவல் வழங்கவும்',
      section2Item2: 'உங்கள் கணக்கு நற்சான்றுகளின் பாதுகாப்பை பராமரிக்கவும்',
      section2Item3: 'அங்கீகாரமற்ற அணுகல் பற்றி உடனடியாக எங்களுக்குத் தெரியப்படுத்தவும்',
      section2Item4: 'உங்கள் நியமிக்கப்பட்ட பாத்திரத்திற்கு (விவசாயி, அதிகாரி, அல்லது வாங்குபவர்) ஏற்ப தளத்தைப் பயன்படுத்தவும்',
      section3Title: 'IoT சேன்சர் தரவு',
      section3Content: 'சேன்சர் தரவு தொடர்பாக:',
      section3Item1: 'தரவு துல்லியத்தன்மை சரியான சேன்சர் அளவுத்திருத்தம் மற்றும் பரிபालனம் மீது சார்பு உள்ளது',
      section3Item2: 'உங்கள் சொத்தில் நிறுவப்பட்ட IoT சாதனங்களின் உடல் பாதுகாப்பு உங்களுக்குக் குறிப்பிடப்பட்ட ஆண்',
      section3Item3: 'நாங்கள் தொழில்நுட்ப ஆதரவை வழங்குகிறோம் ஆனால் தடையற்ற சேவை செயல்பாட்டிற்கு உத்தரவாதம் அளிக்கிறோம்',
      section3Item4: 'சேன்சர் வாசிப்பு ஆலோசனা நோக்கங்களுக்கான; விவசாய முடிவுகள் உங்கள் பொறுப்புக்கு',
      section4Title: 'AI கணிப்புகள் மற்றும் நோய் கண்டறிதல்',
      section4Content: 'எங்கள் AI மாதிரிகள் (LSTM வளர்ச்சி ஊகத்திற்கு, MobileNet-YOLOv8 நோய் கண்டறிதலுக்கு) வரலாற்று தரவு மற்றும் தற்போதைய நிலைமைகளின் அடிப்படையில் ஆலோசனা தகவல் வழங்குகின்றன. எங்கள் மாதிரிகளுக்கு உচ்ச துல்லியம் விகிதம் உள்ளது (வளர்ச்சி ஊகத்திற்கு 93.4%, நோய் கண்டறிதலுக்கு 99.43%), அவை முடிவு-ஆதரவு கருவிகளாக தொழில்முறை விவசாய ஆலோசனையுடன் பயன்படுத்தப்பட வேண்டும்.',
      section5Title: 'ப்ளாக்செயின் பரிமாற்றங்கள்',
      section5Content: 'விநியோგம் சங்கிலி வெளிப்படைத்தன்மையுக்கு:',
      section5Item1: 'அனைத்து தரம் தரவு மற்றும் பரிமாற்றங்கள் Hyperledger Fabric ப்ளாக்செயினில் பதிவு செய்யப்பட்ட',
      section5Item2: 'ப்ளாக்செயின் பதிவுகள் மாற்றக்கூடியவை அல்ல மற்றும் உறுதிப்படுத்தப்பட்ட பின் மாற்ற முடியாது',
      section5Item3: 'நீங்கள் ট্রেসেபிலிட்டির நோக்கங்களுக்கு உங்கள் நாற்பதி தரவுக்கள் பதிவு செய்வதை அங்கீகரிக்கிறீர்கள்',
      section5Item4: 'EUDR இணக்க தரவு பொருந்தக்கூடிய ஒழுங்குமுறை அதிகாரிகளுடன் பகிர்ந்து கொள்ளப்படுகிறது',
      section6Title: 'அறிவுசார் சொத்து',
      section6Content: 'Rubber Edge மற்றும் அனைத்து தொடர்புடைய தொழில்நுட்பம், IoT சেன்சர் வடிவமைப்புகள், AI மாதிரிகள் மற்றும் மென்பொருள், அறிவுசார் சொத்து உரிமைகளால் பாதுகாக்கப்பட்டுள்ளன. நீங்கள் கணினியின் எந்த பகுதியையும் நகலெடுக்க, மாற்ற அல்லது பின்னோக்கு பொறியியல் செய்ய முடியாது.',
      section7Title: 'பொறுப்பு கட்டுப்பாடு',
      section7Content: 'இந்த தளத்தை நாங்கள் as-is வழங்குகிறோம். நாங்கள் துல்லியத்தன்மை மற்றும் நம்பகத்தன்மையை நோக்கம் கொண்டாலும், உணர்வு தரவு, AI கணிப்புகள் அல்லது கணினி செயல்செய்ய நிறுத்தம் நம்பத்தை விளைந்த பயிர் இழப்பு, আর্থ சேதம் அல்லது பிற விளைவுகளுக்கு நாங்கள் பொறுப்பாவோம் அல்ல.',
      section8Title: 'அடைத்தல்',
      section8Content: 'இந்த விதிமுறைகளை மீறும்,欺рای ক்রিয়াகளை செய்து, அல்லது தளத்தை दుरुपयोग செய்யும் கணக்குகளை இடைநிறுத்த அல்லது நிறுத்த நாங்கள் உரிமை கோரிக்கொண்டோம். ஆதரவைத் தொடர்பு கொண்டு நீங்கள் எந்த நேரத்திலும் உங்கள் கணக்கு அடைக்கலாம்.',
      section9Title: 'விதிமுறைகளுக்கு மாற்றங்கள்',
      section9Content: 'இந்த சேவை விதிமுறைகளை நாங்கள் குறிப்பிட்ட கால இடைவெளியில் புதுப்பிக்கலாம். குறிப்பிடத்தக்க மாற்றங்கள் மின்னஞ்சல் அல்லது உள்-செயல்பாட்டு அறிவிப்பு மூலம் தொடர்புப்படுத்தப்படும். மாற்றங்களுக்குப் பிறகு தொடர்ந்து பயன்பாடு புதுப்பிக்கப்பட்ட விதிமுறைகளை ஏற்றுக்கொள்வதாக இருக்கிறது.',
      section10Title: 'நிர்வாகி சட்டம்',
      section10Content: 'இந்த விதிமுறைகள் இலங்கையின் சட்டங்களால் நிர்வாகி. எந்தேனும் தகராறுகள் இலங்கை நீதிமன்றங்களில் தீர்க்கப்படும்.',
      questionsAboutTerms: 'விதிமுறைகள் பற்றி கேள்விகள்?',
      emailContact: 'மின்னஞ்சல்: legal@rubberedge.lk',
      phoneContact: 'தொலைபேசி: +94 11 234 5678',
    },

    learningCenter: {
      title: 'கற்றல் மையம்',
      all: 'அனைத்தும்',
      planting: 'நடவு',
      tapping: 'தட்டுதல்',
      diseaseControl: 'நோய் கட்டுப்பாடு',
      fertilizers: 'உரங்கள்',
      watchVideo: 'வீடியோவைப் பார்க்கவும்',
      openInYoutube: 'YouTube பயன்பாட்டில் திறக்கவும்',
      video: 'வீடியோ',
      article: 'கட்டுரை',
      guide: 'வழிகாட்டி',
      noMaterialsFound: 'கற்றல் பொருட்கள் கிடைக்கவில்லை',
      // Learning Items
      item1: {
        title: 'ரப்பர் விவசாயத்திற்கான அறிமுகம்',
        description: 'ரப்பர் விவசாயத்தின் அடிப்படைகளையும் தொடக்கநிலையாளர்களுக்கான சிறந்த நடைமுறைகளையும் கற்றுக்கொள்ளுங்கள்.',
        longDescription: `ரப்பர் விவசாயம் முதல் நாளே சரியான திட்டமிடல் தேவைப்படும் நீண்டகால விவசாய முதலீடாகும். இந்தப் பாடம் ரப்பர் விவசாயத்தின் முழு அறக்கட்டளையையும் படிப்படியாக விளக்குகிறது, இது தொடக்கநிலையாளர்களுக்கு எளிதானது மற்றும் துறை அதிகாரிகள் மற்றும் வாங்குபவர்களுக்கு விவசாயங்கள் எவ்வாறு நிர்வகிக்கப்படுகின்றன என்பதைப் புரிந்துகொள்ள உதவுகிறது.

நீங்கள் கற்றுக்கொள்வீர்கள்:
• ரப்பர் சிறப்பாக வளரும் இடங்கள் (மழைப்பொழிவு, வெப்பநிலை, உயரம், காற்று நிலவரங்கள்)  
• தரைத் தேர்வு மற்றும் ரப்பர் வேர்களுக்கு நீர்ப்போக்கு ஏன் முக்கியமானது  
• மண் அடிப்படைகள் (அமைப்பு, pH, கரிமப் பொருள்) மற்றும் மண் சோதனை ஏன் முக்கியமானது  
• ரப்பர் தோட்ட வாழ்க்கைச் சுழற்சி: நர்சரி → தரை வளர்ச்சி → இளம் கட்டம் → கட்டுதல் கட்டம்  
• சரியான இடைவெளி, நிழல் கட்டுப்பாடு, புற்று கட்டுப்பாடு மற்றும் ஆரம்ப பராமரிப்பு  
• வாழ்வு விகிதம் மற்றும் எதிர்கால லேடெக்ஸ் உற்பத்தியை குறைக்கும் பொதுவான தவறுகள்  

இந்த உள்ளடக்கம் புதிய விவசாயிகளுக்கு விலையுயர்ந்த தவறுகளைத் தவிர்க்க, மர வாழ்வை மேம்படுத்த மற்றும் தோட்டங்களுக்கு நிலையான லேடெக்ஸ் உற்பத்தியை வழங்குவதற்காக வடிவமைக்கப்பட்டுள்ளது. நீங்கள் புதிய துறையைத் தொடங்கினால் அல்லது மறுவளர்ச்சியைத் திட்டமிட்டால், மண் தயாரிப்பு, குளோன் தேர்வு மற்றும் நர்சரி நிர்வாகம் போன்ற விரிவான பாடங்களுக்கு முன் இது உங்கள் முதல் குறிப்பாகப் பயன்படுத்துங்கள்.`,
      },
      item2: {
        title: 'சரியான கட்டுதல் நுட்பங்கள்',
        description: 'மர ஆரோக்கியத்தைப் பராமரித்துக்கொண்டு உற்பத்தியை அதிகரிப்பதற்கான ரப்பர் கட்டுதல் கலையைத் தேர்ச்சி பெறுங்கள்.',
        longDescription: `கட்டுதல் ரப்பர் உற்பத்தியின் மிக முக்கியமான செயல்பாடாகும், ஏனெனில் இது லேடெக்ஸ் உற்பத்தி மற்றும் மரத்தின் ஆயுளுக்கு நேரடியாக பாதிப்பை ஏற்படுத்துகிறது. ஒரு நல்ல கட்டுதல் வெட்டு வலிமையான லேடெக்ஸ் ஓட்டத்தை உருவாக்குகிறது மேலும் பட்டை மீண்டும் வளர்வதற்கு காம்பியத்தை பாதுகாக்கிறது.

இந்தப் பாடம் உள்ளடக்குகிறது:
• சரியான கட்டுதல் கோணம் மற்றும் லேடெக்ஸ் ஓட்டத்திற்கு இது ஏன் முக்கியமானது  
• பாதுகாப்பான கட்டுதல் ஆழம் (காம்பியம் சேதத்தைத் தவிர்ப்பதற்கான வழிமுறை)  
• கட்டுதல் நீளம் மற்றும் கட்டுதலின் நிலை  
• தினசரி கட்டுதலுக்கு கத்தி கையாளுதல், கூர்மைப்படுத்துதல் மற்றும் நிலைத்தன்மை  
• கட்டுதல் அதிர்வெண் (எ.கா. d/2, d/3 அமைப்புகள்) மற்றும் ஓய்வு காலங்கள்  
• தவிர்க்க வேண்டிய தவறுகள்: மிகை கட்டுதல், கரடுமுரடான பட்டை தேய்த்தல், மீண்டும் மீண்டும் ஆழமான கட்டுதல்கள்  
• மோசமான கட்டுதல் உற்பத்தியை குறைத்து ஆயுள் காலத்தை குறைக்கும் வழி  

சரியான நுட்பத்தை பின்பற்றுவதன் மூலம், விவசாயிகள் தினசரி சேகரிப்பை மேம்படுத்தலாம், பட்டை சேதங்களை குறைக்கலாம் மற்றும் பல ஆண்டுகளுக்கு நிலையான உற்பத்தியை பராமரிக்கலாம். இந்தப் பாடம் புதிய கட்டுவோருக்கு, தோட்ட மேற்பார்வையாளர்களுக்கு மற்றும் துறை குழுக்களை பயிற்றுவிக்கும் எவருக்கும் பரிந்துரைக்கப்படுகிறது.`,
      },
      item3: {
        title: 'பொதுவான ரப்பர் மர நோய்களை அடையாளம் காணுதல்',
        description: 'ரப்பர் மரங்களை பாதிக்கும் பொதுவான நோய்களை அடையாளம் காண மற்றும் சிகிச்சையளிக்க கற்றுக்கொள்ளுங்கள்.',
        longDescription: `நோய்கள் லேடெக்ஸ் உற்பத்தியை குறைக்கின்றன, மரங்களை பலவீனப்படுத்துகின்றன மற்றும் ஆரம்பத்தில் அடையாளம் காணப்படாவிட்டால் விரைவாக பரவுகின்றன. இந்தப் பாடம் விவசாயிகள் மற்றும் அதிகாரிகளுக்கு துறை நோய் அறிகுறிகள் மற்றும் எளிய கவனிப்பு முறைகளைப் பயன்படுத்தி பொதுவான ரப்பர் மர நோய்களை அடையாளம் காண உதவுகிறது.

நீங்கள் கற்றுக்கொள்வீர்கள்:
• ஆரம்ப எச்சரிக்கை அறிகுறிகள்: மஞ்சள் இலைகள், இலை வீழ்ச்சி, மோசமான பிளஷிங், மரணம்  
• பூஞ்சை இலை நோய்கள் மற்றும் பருவகால முறை  
• தண்டு மற்றும் பட்டை நோய்கள்: பட்டைகள், வெடித்தல், அசாதாரண சாப் ஓட்டம்  
• வேர்ச்செடி பிரச்சனைகள்: தண்ணீர்ப்பற்று, மோசமான வளர்ச்சி, வேர்நாற்றம் மற்றும் சிதைவு அறிகுறிகள்  
• நோய் பரவலை குறைக்கும் துறை சுத்திகரிப்பு நடைமுறைகள்  
• பாதுகாப்பான நிர்வாகம்: கத்தரித்தல், சுத்திகரிப்பு, நீர்ப்போக்கு சரிசெய்தல் மற்றும் இலக்கு சிகிச்சைகள்  
• வேளாண் அதிகாரிகளைத் தொடர்புகொள்ளும் போது மற்றும் பரவலைப் புகாரளிக்கும் போது  

இந்த வழிகாட்டி துறையில் நடைமுறை பயன்பாட்டிற்காக வடிவமைக்கப்பட்டுள்ளது. நீங்கள் நோயை ஆரம்பத்தில் அடையாளம் காண முடிந்தால், பெரும்பாலும் நோய் கட்டத்தின் சிகிச்சையை விட குறைந்த செலவில் தோட்டத்தை பாதுகாக்க முடியும்.`,
      },
      item4: {
        title: 'ரப்பர் தோட்டத்திற்கான மண் தயாரிப்பு',
        description: 'ரப்பர் மர வளர்ச்சிக்கு உகந்த மண்ணை தயாரிப்பதற்கான முழுமையான வழிகாட்டி.',
        longDescription: `மண் தயாரிப்பு ரப்பர் மரங்களுக்கு முதல் 3 ஆண்டுகளில் அவற்றின் வேர்களை நிறுவுதல் மற்றும் செயல்படுதல் ஆகியவற்றை தீர்மானிக்கிறது. மோசமான மண் தயாரிப்பு நீர்த்தேக்கம், ஊட்டச்சத்து இழப்பு மற்றும் பலவீனமான வேர்வளர்ச்சியை உருவாக்குகிறது.

இந்தப் பாடம் விளக்குகிறது:
• தரை தெளிவு மற்றும் சரியான துறை திட்ட அமைப்பு திட்டமிடல்  
• மண் சோதனை அடிப்படைகள் (pH, கரிமப் பொருள், NPK மற்றும் நுண்ணிய ஊட்டச்சத்துகள்)  
• குழி தயாரிப்பு: பரிந்துரைக்கப்படும் குழி அளவு மற்றும் சரியான நிரப்புதல்  
• கலவை/கரிமப் பொருள் சேர்த்து கட்டமைப்பை மேம்படுத்த மற்றும் ஈரப்பத சமநிலையை பராமரிக்க  
• மலையோர மண்ணிற்கான நீர்ப்போக்கு கால்வாய்கள் மற்றும் உட்கரடுகள்  
• புற்றுகளை குறைக்க மற்றும் ஈரப்பதத்தை பராமரிக்க மூல்ச் முறைகள்  
• சிறந்த வாழ்வு மற்றும் விரைவான ஆரம்ப வளர்ச்சிக்கு மண்ணை தயாரிப்பதற்கான வழி  

இந்த வழிகாட்டி வளர்ச்சி காலத்திற்கு முன் மிகவும் பயனுள்ளதாக இருக்கும். இது இளம் மரணத்தை குறைக்கிறது, சமமான வளர்ச்சியை மேம்படுத்துகிறது மற்றும் எதிர்கால உர தொழில்நுட்பத்தை குறைக்கிறது.`,
      },
      item5: {
        title: 'உர தொழில்நுட்ப அட்டவணை',
        description: 'அதிக ரப்பர் உற்பத்திக்கு உரங்களை எப்போது மற்றும் எவ்வாறு பயன்படுத்துவது என்பதை கற்றுக்கொள்ளுங்கள்.',
        longDescription: `ரப்பர் மரங்களுக்கு சமநிலையான ஊட்டச்சத்து தேவைப்படுகிறது, அவை கடினமான தண்டுகளை வளர்த்து, ஆரோக்கியமான இலைகளை மற்றும் நிலையான லேடெக்ஸ் உற்பத்தியை கொண்டிருக்கும். ஒரு சரியான உர தொழில்நுட்ப அட்டவணை உற்பத்தியை மேம்படுத்துகிறது மேலும் இழப்பு மற்றும் தேவையற்ற செலவை குறைக்கிறது.

இந்தப் பாடம் உள்ளடக்குகிறது:
• வளர்ச்சி கட்டத்தால் ஊட்டச்சத்து தேவைகள்: இளம் vs முதிர்ந்த கட்டுதல் கட்டம்  
• NPK வகைகளை தேர்ந்தெடுப்பது மற்றும் மண் சோதனைகள் ஏன் முக்கியமானது  
• பயன்பாட்டு முறைகள்: வளைய பயன்பாடு, மழைக்கு கால அமைப்பு மற்றும் பிரித்தல் அணுகுமுறை  
• உர எரிவு மற்றும் வேர்ச்சேதத்தை தவிர்ப்பதற்கான வழி  
• செலவு சேமிப்பு நுட்பங்கள்: உரம் + சரியான இரசாயன கால அமைப்பு  
• ஊட்டச்சத்து குறைபாடின் அறிகுறிகள்: இலை வண்ண மாற்றங்கள், மோசமான பிளஷிங், வளர்ச்சி குறைபாடு  
• துறையில் நிலையான முடிவுகளுக்கு பதிவு செய்தல்  

நீங்கள் சரியான அட்டவணையை பின்பற்றி சரியாக பயன்படுத்தினால், உங்களுக்கு ஆரோக்கியமான மரங்கள், வலிமையான பட்டை மீண்டும் வளர்ச்சி மற்றும் காலப்போக்கில் சிறந்த லேடெக்ஸ் செயல்பாடு கிடைக்கும்.`,
      },
      item6: {
        title: 'கட்டுதல் பலகை நிர்வாகம்',
        description: 'மர வாழ்க்கைச் சுழற்சியில் கட்டுதல் பலகைகளை நிர்வகிப்பதற்கான பயனுள்ள உத்திகள்.',
        longDescription: `கட்டுதல் பலகை நிர்வாகம் ரப்பர் மரங்களின் உற்பத்தி ஆயுளில் பட்டையை பாதுகாப்பது, மீண்டும் வளர்ச்சியை உறுதிப்படுத்துதல் மற்றும் நிலையான அறுவடைக்கு உதவும் நீண்டகால உத்தி.

நீங்கள் கற்றுக்கொள்வீர்கள்:
• ஒரு கட்டுதல் பலகை என்றால் என்ன மற்றும் பலகை சுழற்சி எவ்வாறு செயல்படுகிறது  
• புதிய பலகையை திறக்கும் போது மற்றும் பலகையை ஓய்வெடுக்கும் போது  
• பட்டை தடித்திருப்பை மற்றும் மீண்டும் வளர்ச்சியை கண்காணிப்பது  
• பலகை வறட்சியை மற்றும் பட்டை நுகர்வு சிக்கல்களை குறைப்பது  
• ஆண்டுகளில் கட்டுதல் அமைப்புகளை திட்டமிடுவதற்கான சிறந்த நடைமுறைகள்  
• எஸ்டேட்களில் பதிவு செய்தல் மற்றும் மேற்பார்வை செய்தலின் முக்கியத்துவம்  
• மரங்களை நீண்டகாலம் உற்பத்தி செய்ய வைத்து நிலையான உற்பத்தியை பராமரிப்பதற்கான நடைமுறை உதவிக்குறிப்புகள்  

இந்த உள்ளடக்கம் மேற்பார்வையாளர்களுக்கு, எஸ்டேட் மேலாளர்களுக்கு மற்றும் கட்டுதல் குழுக்களை நிர்வகிக்கும் அனுபவமுள்ள விவசாயிகளுக்கு மிகவும் பயனுள்ளதாக இருக்கும்.`,
      },
      item7: {
        title: 'வெள்ளை வேர்நோயை தடுப்பது',
        description: 'ரப்பர் மரங்களில் வெள்ளை வேர்நோயை தடுப்பது மற்றும் சிகிச்சையளிப்பது.',
        longDescription: `வெள்ளை வேர்நோய் ரப்பர் தோட்டத்தின் மிகவும் தீங்கு விளைவிக்கும் நோயாகும், ஏனெனில் இது மண் தொடர்பு மூலம் மரங்களுக்கு பரவும் வேர்ச்செடி அமைப்பை அழிக்கிறது.

இந்தப் பாடம் விளக்குகிறது:
• வெள்ளை வேர்நோய் எவ்வாறு ஏற்படுகிறது மற்றும் எவ்வாறு பரவுகிறது  
• துறை நோய் அறிகுறிகள்: இலை தண்ணீர்ப்பற்று, திடீர் மஞ்சள் இலைகள், லேடெக்ஸ் குறைபாடு, வேர்ச்சிதைவு  
• அதிக ஆபத்து நிலவரங்கள்: நீர்த்தேக்கம், பழைய தண்டுகள், மோசமான நீர்ப்போக்கு  
• தடுப்பு: தண்டு அகற்றல், துறை சுத்திகரிப்பு மற்றும் சரியான நீர்ப்போக்கு  
• ஆரம்ப சிகிச்சை விருப்பங்கள் மற்றும் பாதிக்கப்பட்ட மரங்களை பிரித்து அடையாளம் காணுதல்  
• மறுவளர்ச்சி மற்றும் மண் நிர்வாகத்திற்கான நீண்டகால உத்திகள்  
• அதிகாரிகளிடம் புகாரளிப்பது மற்றும் பரவலை நிர்வகிப்பது  

ஆரம்ப அடையாளம் துறையின் பெரிய பகுதிகளை காப்பாற்றுகிறது. இந்தப் பாடம் சிறிய உரிமையாளர்களுக்கு மற்றும் தோட்ட அளவிலான நிர்வாகத்திற்கு மிகவும் முக்கியமானது.`,
      },
      item8: {
        title: 'வளர்ச்சிக்கான குளோன் தேர்வு',
        description: 'உங்கள் தோட்டத்திற்கு சரியான ரப்பர் குளோன்களை தேர்ந்தெடுப்பதற்கான வழிகாட்டி.',
        longDescription: `நீங்கள் வளர்க்கும் குளோன் உங்கள் தோட்டத்தின் எதிர்கால உற்பத்தி, நோய் எதிர்ப்பு மற்றும் உள்ளூர்வெப்பநிலைக்கு ஏற்றத்தன்மையை தீர்மானிக்கிறது. தவறான குளோனை தேர்ந்தெடுப்பது விவசாய நிர்வாகம் நல்லதாக இருந்தாலும் மோசமான செயல்பாட்டை உருவாக்கக்கூடும்.

இந்தப் பாடம் உள்ளடக்குகிறது:
• "ரப்பர் குளோன்கள்" என்றால் என்ன மற்றும் அவை ஏன் முக்கியமானது  
• முக்கிய தேர்வு காரணிகள்: உற்பத்தி திறன், நோய் எதிர்ப்பு, வளர்ச்சி வீதம்  
• உள்ளூர்வெப்பநிலைக்கு குளோன்களை பொருத்துதல் மழைப்பொழிவு, வெப்பநிலை மற்றும் மண் வகை  
• நர்சரி மூல: உண்மையான, ஆரோக்கியமான குளோன் பொருளை உறுதிப்படுத்தும் வழி  
• கலவை/அறியப்படாத குளோன்கள் மற்றும் மோசமான வளர்ச்சி பொருள்களை தவிர்ப்பது  
• விவசாயிகள் மற்றும் அதிகாரிகளுக்கு நடைமுறை முடிவு பட்டியல்  

இந்த வழிகாட்டி விவசாயிகளுக்கு நீண்டகால உற்பத்தியை மேம்படுத்த மற்றும் நோய் ஆபத்தை குறைக்க சிறந்த வளர்ச்சி முடிவுகளை எடுக்க உதவுகிறது.`,
      },
      item9: {
        title: 'மழைக்கால கட்டுதல் உதவிக்குறிப்புகள்',
        description: 'மழைக்காலத்தில் பயனுள்ள கட்டுதலுக்கு நுட்பங்கள்.',
        longDescription: `மழைக்காலங்கள் கட்டுதல் நாட்களை குறைக்கின்றன மற்றும் கட்டுதல் சரியாக செய்யப்படாவிட்டால் பட்டை தொற்றுகளை உருவாக்கக்கூடும். இந்தப் பாடம் மரங்களை பாதுகாத்து சேகரிப்பை நிலையானதாக வைத்திருக்க நடைமுறை முறைகளை விளக்குகிறது.

நீங்கள் கற்றுக்கொள்வீர்கள்:
• மழை பாதுகாப்பு முறைகள் மற்றும் பாதுகாப்புகளை நிறுவும் நேரம்  
• மழை முறைக்கு ஏற்ப கட்டுதல் நேரத்தை சரிசெய்தல்  
• ஈரமான கட்டுதல் பலகைகளில் பூஞ்சை தொற்றுகளை தடுப்பது  
• ஈரமான நாட்களில் பாதுகாப்பான லேடெக்ஸ் சேகரிப்பு மற்றும் கூடு சுத்திகரிப்பு  
• லேடெக்ஸில் நீர் தொற்றை கையாளுதல்  
• சறுக்கும் நிலவரங்களில் கட்டுவோரின் பாதுகாப்பை பாதுகாத்தல்  

இந்த உதவிக்குறிப்புகள் விவசாயிகளுக்கு மழை அதிகமாக இருக்கும் போது உற்பத்தியை குறைக்காமல் நடைமுறைப்படுத்த உதவுகின்றன.`,
      },
      item10: {
        title: 'ரப்பருக்கான கரிம உரங்கள்',
        description: 'ரப்பர் விவசாயத்தில் கரிம உரங்களின் நன்மைகள் மற்றும் பயன்பாடு.',
        longDescription: `கரிம உரங்கள் நீண்டகால மண் ஆரோக்கியத்தை மேம்படுத்துகின்றன மற்றும் ரசாயன உள்ளீடுகளுக்கு சார்பை குறைக்கின்றன. ரப்பர் தோட்டங்களுக்கு, கரிமப் பொருள் சிறந்த ஈரப்பத பிடித்தல், வலிமையான வேர்ச்செடி அமைப்பு மற்றும் ஆரோக்கியமான நுண்ணிய உயிரினங்கள் செயல்பாட்டிற்கு உதவுகிறது.

இந்தப் பாடம் உள்ளடக்குகிறது:
• கரிம உள்ளீடு வகைகள்: உரம், உரம், பச்சை உரம், மூல்ச், பயோ-உரங்கள்  
• மண் கட்டமைப்பு மற்றும் ஊட்டச்சத்து மறுசுழற்சியில் நன்மைகள்  
• கரிம உரத்தை பயனுள்ளதாக பயன்படுத்தும் வழி (கால அமைப்பு + இடம்)  
• ரசாயன மற்றும் கரிம உரங்களை பாதுகாப்பாக ஒருங்கிணைத்தல்  
• உள்ளூர்விவசாயிகளுக்கு கிடைக்கக்கூடிய குறைந்த செலவு கரிம மூலங்கள்  
• தவிர்க்க வேண்டிய தவறுகள்: வேர்களுக்கு மிகவும் அருகில் பழைய உரத்தை பயன்படுத்துதல், மோசமான உரம் செய்தல்  

இந்தப் பாடம் விவசாயிகளுக்கு நீண்டகால விவசாயம் மற்றும் மேம்படுத்தப்பட்ட மண் நிலவரம் ஆகியவற்றிற்கு பரிந்துரைக்கப்படுகிறது.`,
      },
      item11: {
        title: 'இலை நோய்களை நிர்வகித்தல்',
        description: 'பொதுவான ரப்பர் இலை நோய்களை அடையாளம் காணுதல் மற்றும் கட்டுப்படுத்துதல்.',
        longDescription: `இலை நோய்கள் புகைப்பட சிந்தனையை குறைக்கின்றன, மரங்களை பலவீனப்படுத்துகின்றன மற்றும் லேடெக்ஸ் உற்பத்தியை குறைக்கின்றன. இலை நோய் அடிக்கடி ஏற்படும் போது, தோட்டங்கள் நீண்டகால சிதைவுக்கு உள்ளாகலாம்.

இந்தப் பாடம் விளக்குகிறது:
• துறையில் பொதுவான இலை நோய்களை அடையாளம் காணும் வழி  
• வானிலை நோய் பரவலுக்கு பாதிப்பை ஏற்படுத்தும் ஆபத்து காலங்கள்  
• துறை சுத்திகரிப்பு: கத்தரித்தல், பாதிக்கப்பட்ட இலைகளை அகற்றுதல், நிழல் நிர்வாகம்  
• நீண்டகால பாதுகாப்பாக எதிர்ப்பு குளோன்கள்  
• பாதுகாப்பான பயன்பாட்டு கால அமைப்பு மற்றும் எதிர்ப்பு முறைகள்  
• எவ்வளவு அடிக்கடி சோதனை செய்ய வேண்டும் மற்றும் என்ன பதிவு செய்ய வேண்டும் என்பதற்கான கண்காணிப்பு திட்டம்  

இந்த வழிகாட்டி விவசாயிகளுக்கு தோட்ட பரவலை குறைத்து ஆரம்பத்தில் செயல்பட உதவுகிறது.`,
      },
      item12: {
        title: 'நர்சரி நிர்வாகம்',
        description: 'ரப்பர் மர நர்சரியை அமைத்து நிர்வகித்தல்.',
        longDescription: `ஒரு ஆரோக்கியமான நர்சரி தரை வளர்ச்சிக்கு முன் துறையில் வாழ்வை மேம்படுத்துவதற்கு நேரடியாக உதவுகிறது. மோசமான நர்சரி நடைமுறைகள் வலுவற்ற இளம் மரங்களை உருவாக்குகின்றன, அவை வளர்ச்சிக்குப் பிறகு சிக்கல்களுக்கு உள்ளாகலாம் மற்றும் பூச்சிகள் அல்லது நோய்களை கொண்டிருக்கலாம்.

இந்தப் பாடம் உள்ளடக்குகிறது:
• விதை தேர்வு மற்றும் முளைப்பு அடிப்படைகள்  
• பாலிபேக் தயாரிப்பு, மண் கலவை, நீர்ப்போக்கு மற்றும் நிழல் நிர்வாகம்  
• தண்ணீர்ப்பாசன அட்டவணை மற்றும் மிகை தண்ணீர்ப்பாசனத்தை தவிர்ப்பது  
• நர்சரி கட்டத்தில் பூச்சிகள் மற்றும் நோய்களை தடுப்பது  
• தரை வளர்ச்சிக்கு முன் கடினப்படுத்தும் செயல்முறை  
• சிறந்த இளம் மரங்களை தேர்ந்தெடுப்பது: தண்டு தடித்திருப்பு, இலை ஆரோக்கியம், வேர்வளர்ச்சி  
• நர்சரி பதிவுகள் மற்றும் மறுவளர்ச்சிக்கு கால அமைப்பு  

இந்தப் பாடம் விவசாயிகளுக்கு, கூட்டுறவுகளுக்கு மற்றும் உயர் தர ரப்பர் தாவரங்களை உருவாக்கும் வேளாண் பயிற்சி திட்டங்களுக்கு மிகவும் பயனுள்ளதாக இருக்கும்.`,
      },
    },
    faq: {
      title: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      subtitle: 'RubberEdge பற்றிய மிகவும் பொதுவான கேள்விகளுக்கான பதிலைக் கண்டறியுங்கள்',
      general: 'பொதுவான',
      disease: 'நோய் সনাক்தকরணம்',
      quality: 'பால் தரம்',
      market: 'சந்தை மற்றும் விலை',
      account: 'கணக்கு மற்றும் அமைப்புகள்',
      stillNeedHelp: 'இன்னும் கேள்விகள் உள்ளதா?',
      stillNeedHelpDesc: 'எங்கள் ஆதரவு குழு உங்களுக்கு உதவ இங்கே உள்ளது',
      contactSupport: 'ஆதரவைத் தொடர்பு கொள்ளுங்கள்',
      
      // General Questions
      whatIsRubberEdge: 'RubberEdge என்றால் என்ன?',
      whatIsRubberEdgeAns: 'RubberEdge என்பது பாலுள்ள விவசாயிகளுக்கு தங்கள் தோட்டங்களை நிர்வகிக்க, பால் தரத்தைக் கண்காணிக்க, நோய்களைக் கண்டறிய மற்றும் வாங்குபவர்களுடன் இணைக்க வடிவமைக்கப்பட்ட ஒரு விரிவான மொபைல் பயன்பாடு.',
      whoCanUse: 'இந்த பயன்பாட்டை யார் பயன்படுத்த முடியும்?',
      whoCanUseAns: 'இந்த பயன்பாடு பாலுள்ள விவசாயிகள், விவசாய அதிகாரிகள் மற்றும் பால் வாங்குபவர்களுக்கு வடிவமைக்கப்பட்டுள்ளது. ஒவ்வொரு பயனர் வகைக்கும் அவர்களின் தேவைகளுக்கு உறுப்புணர்வு செய்யப்பட்ட வசதிகளுக்கான அணுகல் உள்ளது.',
      isFree: 'பயன்பாடு பயன்பாடு இலவசம்?',
      isFreeAns: 'ஆம், RubberEdge இன் அடிப்படை வசதிகள் இலவசமாக பயன்படுத்த முடியும். சில பிரিமியம் வசதிகள் சக்திவாய் செல்லலாம்.',
      offlineUsage: 'இணைய பிணைப்பு இல்லாமல் பயன்பாட்டை பயன்படுத்த முடியுமா?',
      offlineUsageAns: 'ஆம்! பயன்பாடு தথ்தை உள்ளூரில் சேமிக்கிறது மற்றும் இணையல் மீட்டெடுக்கப்பட்டு ஒப்பிசைக்கப்படுகிறது. முக்கியமான எச்சரிக்கைகள் மற்றும் சமீபத்திய தரவு தொலைபேசி பயன்பாட்டாக அணுக முடியும்.',
      
      // Disease Detection Questions
      diseaseAccuracy: 'நோய் சனாக்த முறைப்பாய் எவ்வளவு துல்லியம்?',
      diseaseAccuracyAns: 'எங்கள் செயற்கை நுண்ணறிவு சக்தி நோய் சனாக்த கணினி MobileNet-YOLOv8 மாதிரি பயன்படுத்துகிறது மற்றும் CLSD உட்பட பொதுவான பாலுள்ள மரம் நோய்களை கண்டறியும் போது 99.43% துல்லியத்தை வழங்குகிறது.',
      detectedDisease: 'நோய் கண்டறியப்பட்டால் நான் என்ன செய்ய வேண்டும்?',
      detectedDiseaseAns: 'நோய் கண்டறியப்பட்டால், பயன்பாடு பரிந்துரைக்கப்பட்ட சிகிச்சை திட்டங்களை வழங்கும். விশেষজ்ஞ வழிகாட்டுதலுக்கு பயன்பாட்டின் மூலமாக விவசாய அதிகாரிகளுடன் நேரடியாக தொடர்பு கொள்ளலாம்.',
      whichDiseases: 'பயன்பாடு எந்த நோய்களைக் கண்டறிய முடியும்?',
      whichDiseasesAns: 'பயன்பாடு Corynespora Leaf Spot Disease (CLSD), பொடி பூஞ்சை, Anthracnose மற்றும் பிற பொதுவான பூஞ்சை நோய்களை உட்பட பல்வேறு பாலுள்ள மரம் நோய்களைக் கண்டறிய முடியும்.',
      
      // Latex Quality Questions
      qualityMeasured: 'பாலுள்ள தரம் எப்படி அளக்கப்படுகிறது?',
      qualityMeasuredAns: 'பாலுள்ள தரம் IoT சென்சர்களைப் பயன்படுத்தி அளக்கப்படுகிறது, இது pH நிலைகளை, தெளிவுத்தன்மைக்கு, DRC (உலர் பால் உள்ளடக்கம்), வெப்பநிலை மற்றும் ஈரப்பதத்தை நிரীக்ষணம் செய்கிறது.',
      qualityAccuracy: 'தரம் மதிப்பீடு எவ்வளவு துல்லியம்?',
      qualityAccuracyAns: 'எங்கள் IoT கணினி சரிசெய்யப்பட்ட சென்சர்களைப் பயன்படுத்தி பாலுள்ள தரம் கண்காணிப்பில் 98.7% துல்லியத்தை வழங்குகிறது. இது நிராகரணம் விகிதத்தை 30% முதல் 7% க்கு கீழே குறைக்கிறது.',
      viewHistory: 'தர வரலாற்றை பார்க்க முடியுமா?',
      viewHistoryAns: 'ஆம், டாஷ்போர்டில் எந்த மெட்ரிக்கிலும் விரிவான தர வரலாற்றையும் போக்குகளையும் பார்க்க முடியும். வரலாற்று தரவு காலொட்டத்தில் உங்கள் மேம்பாட்டைக் கண்டறிய உதவுகிறது.',
      
      // Market & Pricing Questions
      pricesDetermined: 'பாலுள்ள விலைகள் எப்படி நிர்ணயிக்கப்படுகிறது?',
      pricesDeterminedAns: 'பாலுள்ள விலைகள் சந்தை நிபந்தனைகளின் அடிப்படையில் தினசரி புதுப்பிக்கப்படுகிறது. பயன்பாடு பல வாங்குபவர்களிடமிருந்து தற்போதைய விலைகளைக் காட்டுகிறது, இது உங்களை ஒப்பிட்டுப் பார்க்கவும் சிறந்த சலுகைகளைத் தேர்ந்தெடுக்க அனுமதிக்கிறது.',
      sellDirectly: 'பயன்பாட்டின் மூலமாக நேரடியாக விற்க முடியுமா?',
      sellDirectlyAns: 'ஆம், சரிசெய்யப்பட்ட வாங்குபவர்களுடன் இணைக்கலாம் மற்றும் பயன்பாட்டின் மூலமாக விற்பனை தொடங்கலாம். அனைத்து பரிவர்த்தனைகளும் வெளிப்படைத்தனத்திற்காக பதிவுசெய்யப்படுகின்றன.',
      blockchainTraceability: 'தொகுதி சங்கிலி கண்ணாய் என்றால் என்ன?',
      blockchainTraceabilityAns: 'Hyperledger Fabric ஐப் பயன்படுத்தி, ஒவ்வொரு பாட்டை பண்ணையிலிருந்து தொழிற்சாலைக்கு கண்டறியப்படுகிறது. இது EUDR இணக்கம்,欺 குறைப்பு மற்றும் வெளிப்படையான விலை நிர்ধারம் உத்தரவாதம் கொடுக்கிறது.',
      
      // Account & Settings Questions
      updateProfile: 'என் சுயவரிணவை புதுப்பிக்க என்ன செய்ய வேண்டும்?',
      updateProfileAns: 'அமைப்புகள் > சுயவரிணவ ஆசிரியர் என்ற தங்கள் ব்যக்তிগত தரவு, தொடர்பு விவரங்கள் மற்றும் பண்ணை விவரங்கள் புதுப்பிக்க.',
      changePassword: 'என் கடவுச்சொல்லை மாற்ற என்ன செய்ய வேண்டும்?',
      changePasswordAns: 'அமைப்புகள் > பாதுகாப்பு > கடவுச்சொல் மாற்ற என்ற சொல்ல செல்லுங்கள். தங்கள் தற்போதைய கடவுச்சொல்லை உள்ளிட வேண்டும் மற்றும் பிறகு உங்கள் புதிய கடவுச்சொல்ல இருமுறை உறுதிப்படுத்த வேண்டும்.',
      multiplePlantations: 'ஒரு கணக்கிலிருந்து பல பண்ணைகளைச் சேர்க்க முடியுமா?',
      multiplePlantationsAns: 'ஆம், ஒரு கணக்கில் பல பண்ணைகளை நிர்வகிக்க முடியும். அமைப்புகள் > பண்ணைகள் > புதிய பண்ணைச் சேர்க்க என்ற கூற்றுக்கு சென்று கூடுதல் சொத்தை பதிவுசெய்யவும்.',
    },
    helpSupport: {
      title: 'உதவி மற்றும் ஆதரவு',
      selectYourRole: 'உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்',
      frequentlyAskedQuestions: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      contactSupport: 'ஆதரவுக்கு தொடர்பு கொள்ளவும்',
      callSupport: 'ஆதரவை அழைக்கவும்',
      emailSupport: 'மின்னஞ்சல்',
      whatsAppSupport: 'WhatsApp',
      farmer: 'விவசாயி',
      officer: 'அதிகாரி',
      buyer: 'கொள்முதல்காரர்',
      
      // Farmer FAQs
      farmerQ1: 'நான் எனது தோட்டத்திலிருந்து சென்சார் தரவைப் படிக்கலாம்?',
      farmerA1: 'டேஷ்போர்டுக்குச் சென்று உங்கள் தோட்டத்தைத் தேர்ந்தெடுக்கவும். IoT சென்சார்கள் pH, தெளிவற்றness, DRC, வெப்பநிலை மற்றும் ஈரப்பதத்தின் நிஜ நேர தரவைக் காட்டும். விস்தாரமான வரலாறு மற்றும் போக்குகளைப் பார்க்க எந்த மெட்ரிக்கையும் தட்டவும்.',
      farmerQ2: 'நான் நோய் எச்சரிக்கை பெற்றால் என்ன செய்ய வேண்டும்?',
      farmerA2: 'நோய் எச்சரிக்கைகள் CLSD கண்டறியப்பட்டவுடனே தோன்றும். எச்சரிக்கையில் வழங்கப்பட்ட பரிந்துரைக்கப்பட்ட சிகிச்சை திட்டத்தைப் பின்பற்றவும். நிபுணர் வழிகாட்டுதலுக்கு வேளாண் அதிகாரிகளுடன் நேரடியாக தொடர்பு கொள்ளலாம்.',
      farmerQ3: 'லேடெக்ஸ் quality மதிப்பீடு எவ்வளவு துல்லியமாக உள்ளது?',
      farmerA3: 'எங்கள் IoT சிஸ்டம் சமன்வயமான pH, தெளிவற்றness மற்றும் DRC சென்சார்களைப் பயன்படுத்தி லேடெக்ஸ் quality கண்காணிப்பில் 98.7% துல்லியத்தை வழங்குகிறது. இது நிராகரணை விகிதத்தை 30% இலிருந்து 7% ஆகக் குறைக்கிறது.',
      farmerQ4: 'இணையம் இல்லாமல் என்னால் பயன்பாட்டைப் பயன்படுத்த முடியுமா?',
      farmerA4: 'ஆம்! பயன்பாடு தரவை உள்ளூரில் சேமிக்கிறது மற்றும் இணைக்கு மீட்டெடுக்கப்பட்டபோது ஒத்திசைக்கிறது. முக்கியமான எச்சரிக்கைகள் மற்றும் சமீபத்திய தரவு offline ல் அணுகுவதற்கு இருக்கவில்லை.',
      farmerQ5: 'IoT சென்சார்களை எவ்வாறு இணைக்கலாம்?',
      farmerA5: 'சேமிப்பு > சாதனங்கள் > புதிய சென்சார் சேர்க்கவும் ஆகியவற்றுக்குச் செல்லுங்கள். உங்கள் ESP32-அடிப்படையிலான சென்சார் கிட்டிற்கான பேரிணைப்பு வழிமுறைகளைப் பின்பற்றவும். தொழில்நுட்ப உதவி தேவைப்பட்டால் ஆதரவிற்கு தொடர்பு கொள்ளவும்.',
      
      // Officer FAQs
      officerQ1: 'பல தோட்டங்களை கண்காணிக்கல் அதிகாரி?',
      officerA1: 'உங்கள் அதிகாரி டேஷ்போர்டு உங்கள் அதிகார வரம்பில் உள்ள அனைத்து பதிவுசெய்யப்பட்ட தோட்டங்களின் மேலோட்டத்தை வழங்குகிறது. பிராந்தியம், நோய் நிலை அல்லது quality மெட்ரிக்குகளால் பார்க்க வடிப்பு பயன்படுத்தவும்.',
      officerQ2: 'விவசாயிகளுக்கு எவ்வாறு பரிந்துரைகளைக் கலந்தாய்வு செய்யலாம்?',
      officerA2: 'எந்த விவசாயியின் சுயவிவரத்தைத் தேர்ந்தெடுத்து \'ஆலோசனை அனுப்பவும்\' பொருளை பயன்படுத்தவும். நீங்கள் நோய் நிர்வாகம், சாகுபடி டிप்ஸ் அல்லது quality மேம்பாட்டு பரிந்துரைகளை வழங்கலாம்.',
      officerQ3: 'நான் என்ன அறிக்கைகளை உருவாக்கலாம்?',
      officerA3: 'பிராந்திய நோய் வெடிப்பு அறிக்கைகள், பலன் கணிப்புகள், quality மதிப்பீடு சாரांशங்கள் மற்றும் EU Deforestation-Free நிய்ம (EUDR) க்கான இணக்க அறிக்கைகளை உருவாக்கவும்.',
      officerQ4: 'நோய் கண்டறிதல் முடிவுகளை நான் சரிபார்க்கலாம்?',
      officerA4: 'MobileNet-YOLOv8 மாதிரி 99.43% துல்லியத்தை வழங்குகிறது. உறுதிப்பாடு செய்வதற்கு முன் கண்டறிதல் உபயோகிக்கற, நம்பிக்கை மதிப்பெண்கள் மற்றும் சரிவுகளை மறுஆய்வு செய்யலாம்.',
      
      // Buyer FAQs
      buyerQ1: 'க்রய்ல் முன்னில் லேடெக்ஸ் quality உறுதிப்படுத்த கூடியுள்ளன?',
      buyerA1: 'ஒவ்வொரு பேட்சு பிளாக்சீல் சேமிக்கப்பட்ட சரிபார்க்கப்பட்ட IoT சென்சார் readingsஐ (pH, தெளிவற்றness, DRC) சேர்க்கிறது. நிவேதனம் போடுவதற்கு முன் முழு quality வரலாறு மற்றும் சான்றிதல் நிலையைப் பார்க்கவும்.',
      buyerQ2: 'தொகுதி traceability என்ன?',
      buyerA2: 'Hyperledger Fabric ஐப் பயன்படுத்திய, ஒவ்வொரு பேட்சுவும் பண்ணை முதல் செயலாக்க வரை ட்ரைக் செய்யப்படுகிறது. இது EUDR இணக்கம், நட்ட எதிர்ப்பு மற்றும் தெளிமான விலை நிர்ணயம் பொதியாக ஆக்குகிறது.',
      buyerQ3: 'பயன்பாட்டு மூலம் ஆணை வேண்டுவல்ல்கள் கூடியுள்ளன?',
      buyerA3: 'கிடைக்கக்கூடிய லேடெக்ஸ் பேட்சுகளை உசாவி, quality மெட்ரிக்குகளை மூல்யம் செய்க, சப்ளையர் ரேட்டிங்குகளை சரிபார்க்கவும் மற்றும் நேரடியாகவே ஆணை வைக்கவும். அனைத்து பரிமாற்றங்களும் பிளாக்சீன்ல் பதிவுசெய்யப்பட்டுள்ளன.',
      buyerQ4: 'கப்பல் நிலையை ட்ரைங்க் செய்யலாம்?',
      buyerA4: 'ஆம்! நிஜ நேர ட்ரைங்கிங் pickup, செயலாக்கம் மற்றும் வணிக நிலையைக் காட்டும். பிளாக்சீன் பதிவுகள் சப்ளை சங்கிலியிலெ quality வின் மாற்றியமைக்க முடியாத ஆதாரம் வழங்குகின்றன.',
    },
    contactPage: {
      headerTitle: 'எங்களை தொடர்பு கொள்ளவும்',
      heroInfoTitle: 'நாங்கள் உங்களுக்கு உதவ இங்கே உள்ளோம்',
      heroInfoSubtitle: 'எங்கள் ஆதரவு குழுவிடம் சொல்லி எங்கள் விரைவாக பதிலளிக்கிறோம்',
      quickContact: 'விரைவு தொடர்பு',
      sendUsMessage: 'எங்களுக்கு ஒரு செய்திக்கு அனுப்பவும்',
      yourName: 'உங்கள் பெயர்',
      yourNamePlaceholder: 'உங்கள் பெயரை உள்ளிடவும்',
      emailAddress: 'மின்னஞ்சல் முகவரி',
      emailAddressPlaceholder: 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      subject: 'பொருள்',
      subjectPlaceholder: 'இது எதைப் பற்றி?',
      message: 'செய்தி',
      messagePlaceholder: 'உங்கள் செய்திக்கு இங்கே உள்ளிடவும்...',
      sendMessage: 'செய்திக்கு அனுப்பவும்',
      sending: 'அனுப்பமாறு...',
      messageSent: 'செய்திக்கு அனுப்பப்பட்டது!',
      messageSentDesc: 'எங்களை தொடர்பு கொள்ள நன்றி. நாங்கள் 24-48 மணிநேரத்திற்குள் திரும்பி வருவோம்.',
      fillAllFields: 'அனைத்து புலங்களையும் பூரணப்படுத்தவும்',
      invalidEmail: 'சரியான மின்னஞ்சல் முகவரி உள்ளிடவும்',
      officeHours: 'அலுவலக நேரம்',
      mondayFriday: 'திங்கட்கிழமை - வெள்ளிக்கிழமை: காலை 8:00 - மாலை 5:00',
      saturday: 'சனிக்கிழமை: காலை 9:00 - பிற்பகல் 1:00',
      sunday: 'ஞாயிற்றுக்கிழமை: மூடப்பட்டுள்ளது',
      weHereToHelp: 'நாங்கள் உங்களுக்கு உதவ இங்கே உள்ளோம்',
      supportTeam: 'எங்கள் ஆதரவு குழுவிடம் சொல்லவும்',
    },
    farmerDirectory: {
      headerTitle: 'விவசாய அலைபேசி அலைவரிசை',
      searchPlaceholder: 'விவசாயிகளை தேடவும்...',
      loadingFarmers: 'விவசாயிகளை பதிவிறக்கம் செய்யப்பட்டுள்ளது...',
      noFarmersFound: 'விவசாயிகள் கிடைக்கவில்லை',
      noFarmersDesc: 'இனும் எந்த விவசாயிகளும் பதிவுசெய்யப்படவில்லை',
      tryAdjustingSearch: 'உங்கள் தேடல் விதிமுறைகளை சரிசெய்ய முயற்சி செய்க',
      farmer: 'விவசாயி',
      farmers: 'விவசாயிகள்',
      failedToLoadFarmers: 'விவசாயிகளை பதிவிறக்கம் செய்ய முடியவில்லை. இயல்பாகவே முயற்சி செய்க.',
    },
    officerDirectory: {
      headerTitle: 'ஆதரவு அதிகாரிகள்',
      loadingOfficers: 'அதிகாரிகள் பதிவிறக்கம் செய்யப்பட்டுள்ளது...',
      noOfficersAvailable: 'எந்த அதிகாரிகளும் கிடைக்கவில்லை',
      noOfficersDesc: 'தற்போது கணினிতে ஆதரவு அதிகாரிகள் இல்லை.',
      retry: 'மீண்டும் முயற்சி செய்க',
      tapToViewDetails: 'விவரங்களைப் பார்க்க தட்டவும்',
      officer: 'அதிகாரி',
      officers: 'அதிகாரிகள்',
      failedToLoadOfficers: 'அதிகாரிகளை பதிவிறக்கம் செய்ய முடியவில்லை. மீண்டும் முயற்சி செய்க.',
    },
    officerDetail: {
      headerTitle: 'அதிகாரி விவரங்கள்',
      loadingOfficerDetails: 'அதிகாரி விவரங்கள் பதிவிறக்கம் செய்யப்பட்டுள்ளது...',
      officerNotFound: 'அதிகாரி கண்டறியப்படவில்லை',
      phone: 'தொலைபேசி',
      employeeId: 'பணியாளர் ஐடி',
      department: 'பிभាग',
      role: 'பங்கு',
      verified: 'சரிபார்க்கப்பட்ட',
      joined: 'சேர்ந்த',
      yes: 'ஆம்',
      no: 'இல்லை',
      callOfficer: 'அதிகாரிக்கு அழைப்பு விடவும்',
      startChat: 'உரையாடல் தொடங்கவும்',
      failedToLoadOfficerDetails: 'அதிகாரி விவரங்கள் பதிவிறக்கம் செய்ய முடியவில்லை.',
      failedToStartChat: 'அதிகாரியுடன் உரையாடல் தொடங்க முடியவில்லை.',
    },
    chatScreen: {
      online: 'ஆன்லைனில்',
      connecting: 'இணைப்பு வருகிறது...',
      noMessagesYet: 'இன்னும் செய்திகள் இல்லை',
      startConversation: '{name} உடன் உரையாடலைத் தொடங்கவும்!',
      noConversationSelected: 'உரையாடல் தேர்வு செய்யப்படவில்லை',
      roleMismatch: 'பங்கு பொருத்தமற்றது கண்டறியப்பட்டது',
      goBack: 'பின்செல்லவும்',
      messagePlaceholder: '{name}... க்கு செய்தி',
    },
    userGuide: {
      headerTitle: 'பயனர் வழிகாட்டி',
      welcomeTitle: 'RubberEdge க்கு வரவேற்கிறோம்',
      welcomeSubtitle: 'உங்கள் ரப்பர் தோட்டத்தை திறம்பட நிர்வகிக்க பயன்பாட்டின் அனைத்து அம்சங்களை எவ்வாறு பயன்படுத்துவது என்பதை கற்றுக்கொள்ளுங்கள்',
      howToUse: 'பயன்படுத்துவது எப்படி',
      gettingStarted: 'தொடக்கம்',
      diseaseDetection: 'நோய் கண்டறிதல்',
      monitoringLatexQuality: 'பால் தரத்தை கண்காணித்தல்',
      marketAndSelling: 'சந்தை & விற்பனை',
      weatherForecasts: 'வானிலை முன்னறிவிப்புகள்',
      gettingHelp: 'உதவி பெறுதல்',
      usingOffline: 'ஆஃப்லைன் பயன்பாடு',
      needMoreHelp: 'மேலும் உதவி தேவையா?',
      needMoreHelpSubtitle: 'எங்கள் ஆதரவு குழுவைத் தொடர்பு கொள்ளவும் அல்லது எங்கள் AI உதவியாளருடன் உரையாடவும்',
      chatWithAI: 'AI உடன் உரையாடவும்',
      contactUs: 'எங்களை தொடர்பு கொள்ளவும்',
      // Getting Started steps
      createAccountTitle: 'உங்கள் கணக்கை உருவாக்குங்கள்',
      createAccountDesc: 'உங்கள் தொலைபேசி எண்ணைப் பயன்படுத்தி பதிவு செய்து OTP மூலம் சரிபார்க்கவும். உங்கள் அடிப்படை விவரங்களை உள்ளீடு செய்யுங்கள் பெயர், இடம் மற்றும் தோட்ட தகவல்.',
      setUpProfileTitle: 'உங்கள் சுயவரிணவை அமைக்கவும்',
      setUpProfileDesc: 'உங்கள் தோட்ட விவரங்கள், தொடர்பு விவரங்கள் மற்றும் உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுப்பதன் மூலம் உங்கள் சுயவரிணவை முழுமையாக்குங்கள்.',
      exploreDashboardTitle: 'டாஷ்போர்டை ஆராயுங்கள்',
      exploreDashboardDesc: 'உங்கள் டாஷ்போர்ட் நிகழ்நேர பால் தர மெட்ரிக்குகள், வானிலை புதுப்பிப்புகள், சந்தை விலைகள் மற்றும் முக்கியமான அறிவிப்புகளைக் காட்டுகிறது.',
      // Disease Detection steps
      takePhotoTitle: 'ஒரு புகைப்படம் எடுக்கவும்',
      takePhotoDesc: 'நோய் கண்டறிதல் தாவலுக்கு சென்று கேமரா பொத்தானைத் தட்டவும். பாதிக்கப்பட்ட ரப்பர் இலையின் தெளிவான புகைப்படத்தை எடுக்கவும்.',
      waitForAnalysisTitle: 'பகுப்பாய்வுக்கு காத்திருங்கள்',
      waitForAnalysisDesc: 'எங்கள் AI புகைப்படத்தை பகுப்பாய்வு செய்கிறது மற்றும் உயர் செயற்கை நுண்ணறிவைப் பயன்படுத்தி சில வினாடிகளில் நோய்களை அடையாளம் காண்கிறது.',
      viewResultsTitle: 'முடிவுகளைப் பார்க்கவும்',
      viewResultsDesc: 'கண்டறியப்பட்ட நோய், நம்பகத்தன்மை நிலை மற்றும் அறிகுறிகள் மற்றும் காரணங்கள் பற்றிய விரிவான தகவலைப் பார்க்கவும்.',
      getTreatmentTitle: 'சிகிச்சை பெறுங்கள்',
      getTreatmentDesc: 'பரிந்துரைக்கப்பட்ட சிகிச்சை திட்டங்கள் மற்றும் தடுப்பு உதவிக்குறிப்புகளை பின்பற்றவும். நிபுணர் ஆலோசனைக்கு விவசாய அதிகாரியைத் தொடர்பு கொள்ளலாம்.',
      // Latex Quality steps
      viewRealTimeDataTitle: 'நிகழ்நேர தரவைப் பார்க்கவும்',
      viewRealTimeDataDesc: 'உங்கள் டாஷ்போர்டில் IoT சென்சர்களிலிருந்து pH, DRC, வெப்பநிலை, ஈரப்பதம் மற்றும் தெளிவுத்தன்மைக்கான நிகழ்நேர வாசிப்புகளை சரிபார்க்கவும்.',
      understandMetricsTitle: 'மெட்ரிக்குகளை புரிந்துகொள்ளுங்கள்',
      understandMetricsDesc: 'விரிவான விளக்கங்கள், தரநிலைகள் மற்றும் வரலாற்று போக்குகளைப் பார்க்க எந்த மெட்ரிக்க் அட்டையிலும் தட்டவும்.',
      setQualityAlertsTitle: 'தர எச்சரிக்கைகளை அமைக்கவும்',
      setQualityAlertsDesc: 'எந்த மெட்ரிக்கும் தரநிலையை விட்டு விலகியிருக்கும் போது உங்களுக்கு அறிவிப்பு செய்ய அறிவிப்புகளை வடிவமைக்கவும்.',
      improveQualityTitle: 'தரத்தை மேம்படுத்துங்கள்',
      improveQualityDesc: 'உங்கள் பால் தரத்தை மேம்படுத்த மற்றும் சிறந்த விலைகளைப் பெற AI-உந்துதல் பரிந்துரைகளை பின்பற்றவும்.',
      // Market steps
      checkMarketPricesTitle: 'சந்தை விலைகளை சரிபார்க்கவும்',
      checkMarketPricesDesc: 'சந்தை தாவலுக்கு சென்று உங்கள் பிராந்தியத்தில் பல வாங்குபவர்களிடமிருந்து தற்போதைய பால் விலைகளைப் பார்க்கவும்.',
      compareBuyersTitle: 'வாங்குபவர்களை ஒப்பிடுங்கள்',
      compareBuyersDesc: 'சிறந்த ஒப்பந்தத்தைப் பெற பல வாங்குபவர்களின் விலைகள், மதிப்பீடுகள் மற்றும் சலுகைகளை ஒப்பிடுங்கள்.',
      connectWithBuyersTitle: 'வாங்குபவர்களுடன் இணைக்கவும்',
      connectWithBuyersDesc: 'ஒரு வாங்குபவரின் சுயவரிணவைப் பார்க்க தட்டி ஒரு உரையாடலைத் தொடங்கவும் அல்லது விற்பனை கோரிக்கையை அனுப்பவும்.',
      trackTransactionsTitle: 'பரிவர்த்தனைகளை கண்காணிக்கவும்',
      trackTransactionsDesc: 'அனைத்து விற்பனைகளும் முழு வெளிப்படைத்தனத்திற்காக பிளாக்செயின் தொழில்நுட்பத்துடன் பதிவுசெய்யப்படுகின்றன.',
      // Weather steps
      viewCurrentWeatherTitle: 'தற்போதைய வானிலையைப் பார்க்கவும்',
      viewCurrentWeatherDesc: 'உங்கள் தோட்டத்திற்கான வெப்பநிலை, ஈரப்பதம் மற்றும் காற்று வேகம் உள்ளிட்ட தற்போதைய வானிலை நிலவரங்களை சரிபார்க்கவும்.',
      sevenDayForecastTitle: '7-நாள் முன்னறிவிப்பு',
      sevenDayForecastDesc: 'உங்கள் டேப்பிங் அட்டவணையை திட்டமிட விரிவான 7-நாள் வானிலை முன்னறிவிப்பைப் பயன்படுத்தவும்.',
      weatherAlertsTitle: 'வானிலை எச்சரிக்கைகள்',
      weatherAlertsDesc: 'மழை, புயல் அல்லது தீவிர வானிலை நிலவரங்கள் பற்றிய அறிவிப்புகளைப் பெறுங்கள்.',
      // Support steps
      aiChatAssistantTitle: 'AI உரையாடல் உதவியாளர்',
      aiChatAssistantDesc: 'ரப்பர் விவசாயம் பற்றிய எந்த கேள்விக்கும் எங்கள் AI உதவியாளரிடம் கேளுங்கள். 24/7 துரித உதவி கிடைக்கிறது.',
      contactOfficersTitle: 'அதிகாரிகளைத் தொடர்பு கொள்ளுங்கள்',
      contactOfficersDesc: 'நிபுணர் வழிகாட்டுதலுக்கு விவசாய அதிகாரிகளின் அடைவை உலாவி தொடர்பு கொள்ளுங்கள்.',
      learningCenterTitle: 'கற்றல் மையம்',
      learningCenterDesc: 'ரப்பர் விவசாயம் சிறந்த நடைமுறைகள் பற்றிய கல்வி வீடியோக்கள், கட்டுரைகள் மற்றும் வழிகாட்டிகளை அணுகவும்.',
      faqsTitle: 'கேள்விகள்',
      faqsDesc: 'எங்கள் விரிவான FAQ பிரிவில் பொதுவான கேள்விகளுக்கு விரைவான பதில்களைக் கண்டறியுங்கள்.',
      // Offline steps
      offlineModeTitle: 'ஆஃப்லைன் முறை',
      offlineModeDesc: 'பயன்பாடு ஆஃப்லைனில் வேலை செய்கிறது! உங்கள் தரவு உள்ளூரில் சேமிக்கப்படுகிறது மற்றும் இணையம் மீண்டும் இணைக்கப்படும்போது ஒத்திசைக்கப்படுகிறது.',
      cachedDataTitle: 'கேச் செய்யப்பட்ட தரவு',
      cachedDataDesc: 'இணையம் இல்லாதபோது சமீபத்திய தர வாசிப்புகள், விலைகள் மற்றும் வானிலை தரவு இன்னும் அணுகக்கூடியதாக இருக்கும்.',
      autoSyncTitle: 'தானியங்கி ஒத்திசைவு',
      autoSyncDesc: 'இணைப்பு மீட்டெடுக்கப்படும்போது, அனைத்து தரவும் தானாகவே சர்வருடன் ஒத்திசைக்கப்படுகிறது.',
    },

    // Buyers Screen
    buyersScreen: {
      headerTitle: 'வாங்குபவர் விலைகள்',
      headerSubtitle: 'பதிவுசெய்யப்பட்ட வாங்குபவர்களிடமிருந்து விலைகளைப் பார்க்கவும்',
      searchPlaceholder: 'பெயர் அல்லது நகரத்தால் தேடுக...',
      filterAll: 'அனைத்து ரேட்டிங்குகள்',
      currentPrices: 'தற்போதைய விலைகள்',
      best: 'சிறந்த',
      lkr: 'LKR',
      perKg: 'ஒரு கிலோவிற்கு',
      additionalInfo: 'கூடுதல் தகவல்',
      contactBuyer: 'வாங்குபவரைத் தொடர்பு கொள்ளவும்',
      error: 'பிழை',
      failedToLoadPrices: 'விலைகளைலோட் செய்ய முடியவில்லை',
      noPhoneAvailable: 'தொலைபேசி எண்ணை பெற முடியாது',
      callError: 'அழைப்பைச் செய்ய முடியவில்லை',
      buyers: 'வாங்குபவர்கள்',
      listings: 'பட்டியல்கள்',
      verified: 'சரிபார்க்கப்பட்டுள்ளது',
      noPricesAvailable: 'விலைகள் கிடைக்கவில்லை',
      noBuyersPosted: 'வாங்குபவர்கள் இன்னும் விலைகளை வெளியிடவில்லை',
      tryAdjustingFilters: 'உங்கள் வடிப்பீடுகளை சரிசெய்ய முயற்சிக்கவும்',
      loadingPrices: 'விலைகளைலோட் செய்கிறது...',
    },

    // Other Buyers Prices Screen
    otherBuyersPricesScreen: {
      headerTitle: 'மற்ற வாங்குபவர் விலைகள்',
      headerSubtitle: 'பல்வேறு வாங்குபவர்களுடன் விலைகளை ஒப்பிடுக',
      noBuyersAvailable: 'வாங்குபவர்கள் கிடைக்கவில்லை',
      noBuyersDesc: 'இந்த நேரத்தில் மற்ற வாங்குபவர்களைக் கண்டுபிடிக்க முடியவில்லை',
      unableToLoad: 'தரவைலோட் செய்ய முடியவில்லை',
      tryAgain: 'மீண்டும் முயற்சிக்கவும்',
      buyers: 'வாங்குபவர்கள்',
      prices: 'விலைகள்',
      cities: 'நகரங்கள்',
      loadingPrices: 'விலைகளைலோட் செய்கிறது...',
      pleaseWait: 'தயவுசெய்து காத்திருங்கள்...',
      verified: 'சரிபார்க்கப்பட்டுள்ளது',
      pricesLabel: 'விலைகள்',
      updated: 'புதுப்பிக்கப்பட்டுள்ளது',
      lkr: 'LKR',
    },

    // Weather Screen
    weatherScreen: {
      loadingWeather: 'வானிலையைலோட் செய்கிறது...',
      feelsLike: 'உணர்ந்தது போல',
      todaysTappingConditions: 'இன்றைய குயர்க்க நிலைமைகள்',
      excellent: 'சிறந்த',
      good: 'நல்ல',
      fair: 'நியாயமான',
      poor: 'மோசமான',
      notRecommended: 'பரிந்துரைக்கப்படாதது',
      bestTappingWindow: 'சிறந்த குயர்க்க நேரம்',
      optimalLatexFlow: 'இந்த காலகட்டத்தில் உகந்த பால் ஓட்டம்',
      expectedLatexQuality: 'எதிர்பார்க்கப்படும் பால் தரம்',
      qualityGrade: 'தரம்',
      estDrc: 'மதிப். DRC',
      humidity: 'ஈரப்பதம்',
      wind: 'காற்று',
      uvIndex: 'UV குறியீடு',
      pressure: 'அழுத்தம்',
      high: 'உச்சம்',
      low: 'குறைவு',
      normal: 'சாதாரணம்',
      hourlyForecast: 'மணிநேர முன்னறிவிப்பு',
      sevenDayForecast: '7 நாள் முன்னறிவிப்பு',
      tappingScore: 'குயர்க்க மதிப்பெண்',
      rubberFarmingTips: 'ரப்பர் விவசாய குறிப்புகள்',
      highRainProbability: 'அதிக மழைப்பொழிவு நிகழ்தகவு',
      avoidTappingRain: 'பால் நீர்த்த மற்றும் பட்டையின் சேதத்தைத் தடுக்க குயர்க்கப்பதை தவிர்க்கவும்.',
      highHumidity: 'அதிக ஈரப்பதம்',
      highHumidityDesc: 'அதிக ஈரப்பதம் பால் உறைதலை மெதுவாக்கக்கூடும். தேவைப்பட்டால் அம்மோனியா பாதுகாப்பைப் பயன்படுத்தவும்.',
      highTemperature: 'உச்ச வெப்பநிலை',
      highTemperatureDesc: 'சிறந்த பால் ஓட்டம் மற்றும் தரத்திற்கு காலையில் குயர்க்கவும்.',
      optimalTappingTime: 'உகந்த குயர்க்க நேரம்',
      optimalTappingDesc: 'உகந்த குயர்க்க நேரம் சூரிய உதயத்திற்கு 30 நிமிடங்களுக்கு முன் turgor அழுத்தம் அதிகபட்சம் இருக்கும்.',
      checkTrees: 'மரங்களைச் சரிபார்க்கவும்',
      checkTreesDesc: 'குயர்க்குவதற்கு முன் உங்கள் மரங்களுக்கான பேனல் வறண்ட தன்மை சரிபார்க்கவும். வறண்ட பேனல்களுக்கு ஓய்வு கால தேவை.',
      today: 'இன்று',
      tomorrow: 'நாளை',
      weatherDataBy: 'வானிலை தரவு Open-Meteo.com',
      now: 'இப்போது',
      // Weather conditions
      clearSky: 'தெளிவான வானம்',
      mainlyClear: 'பெரும்பாலும் தெளிவாக',
      partlyCloudy: 'ஓரளவு மேகமூட்டம்',
      overcast: 'மேகமூட்டம்',
      foggy: 'மூடுபனி',
      rimeFog: 'உறைபனி மூடுபனி',
      lightDrizzle: 'மெல்லிய தூரல்',
      drizzle: 'தூரல்',
      denseDrizzle: 'கனமான தூரல்',
      lightRain: 'மெல்லிய மழை',
      rain: 'மழை',
      heavyRain: 'கனமழை',
      lightSnow: 'மெல்லிய பனி',
      snow: 'பனி',
      heavySnow: 'கனமான பனி',
      rainShowers: 'மழை பெய்யும்',
      moderateShowers: 'மிதமான மழை',
      heavyShowers: 'கனமான மழை',
      thunderstorm: 'இடியுடன் கூடிய மழை',
      severeStorm: 'கடுமையான புயல்',
      unknown: 'தெரியவில்லை',
      // Quality levels
      moderate: 'மிதமான',
      // Recommendation texts
      excellentRecommendation: 'ரப்பர் குயர்க்கத்திற்கு சரியான நிலைமைகள். உயர்தர பால் விளைச்சலை எதிர்பாருங்கள்.',
      goodRecommendation: 'குயர்க்கத்திற்கு நல்ல நிலைமைகள். சாதாரண செயல்பாடுகளைத் தொடருங்கள்.',
      fairRecommendation: 'மிதமான நிலைமைகள். சிறந்த விளைச்சலுக்கு முடிந்தால் தாமதிக்க பரிசீலிக்கவும்.',
      poorRecommendation: 'சாதகமற்ற நிலைமைகள். குயர்க்கம் குறைந்த தரமான பாலை ஏற்படுத்தக்கூடும்.',
      notRecommendedRecommendation: 'இன்று குயர்க்க வேண்டாம். வானிலை நிலைமைகள் பால் தரத்தை கணிசமாக பாதிக்கும்.',
    },

    aboutScreen: {
      appName: 'Rubber Edge',
      appSubtitle: 'ஸ்மார்ட் ரப்பர் சாகுபடிக்கான IoT, AI & பிளாக்செயின்',
      appDescription: 'நிகழ்நேர நுண்ணறிவு, முன்கணிப்பு பகுப்பாய்வு மற்றும் வெளிப்படையான சந்தை அணுகல் மூலம் சிறு விவசாயிகளை அதிகாரப்படுத்தும் ஒருங்கிணைந்த தொழில்நுட்ப தீர்வுகள் மூலம் இலங்கையின் ரப்பர் தொழிலை புரட்சிகரமாக்குதல்.',
      missionTitle: 'எங்கள் நோக்கம்',
      missionContent: 'பால் தர கண்காணிப்பு, நோய் மேலாண்மை மற்றும் விநியோக சங்கிலி வெளிப்படைத்தன்மை ஆகியவற்றில் உள்ள நிஜ-உலக சவால்களை எதிர்கொள்ளும் மலிவான, அளவிடக்கூடிய தொழில்நுட்பத்தின் மூலம் இலங்கை ரப்பர் விவசாயிகளின் உற்பத்தித்திறன், தரம் மற்றும் வருமானத்தை மேம்படுத்துதல்.',
      visionTitle: 'எங்கள் தொலைநோக்கு',
      visionContent: 'ஒவ்வொரு விவசாயியும் அதிநவீன தொழில்நுட்பம், நியாயமான சந்தை வாய்ப்புகள் மற்றும் உலகளாவிய நிலைத்தன்மை தரங்களை சந்திக்கும் போது தங்கள் தோட்டத்தின் திறனை அதிகரிக்க அறிவை பெறக்கூடிய இலங்கையில் செழிப்பான, நிலையான ரப்பர் தொழில்.',
      featuresTitle: 'தொழில்நுட்ப அம்சங்கள்',
      feature1Title: 'IoT சென்சார் நெட்வொர்க்',
      feature1Desc: 'pH, கலங்கலான தன்மை, DRC, வெப்பநிலை மற்றும் ஈரப்பதத்திற்கான ESP32 அடிப்படையிலான சென்சார்களைப் பயன்படுத்தி 98.7% துல்லியத்துடன் நிகழ்நேர கண்காணிப்பு.',
      feature2Title: 'AI வளர்ச்சி முன்கணிப்பு',
      feature2Desc: 'LSTM மாதிரிகள் 93.4% துல்லியத்துடன் மர உயரம் மற்றும் பால் மகசூலை கணிக்கின்றன, குயர்க்க அட்டவணைகளை உகந்ததாக்குகின்றன.',
      feature3Title: 'நோய் கண்டறிதல்',
      feature3Desc: 'MobileNet-YOLOv8 அறிகுறிகளுக்கு 14 நாட்களுக்கு முன்பே CLSD ஐ 99.43% துல்லியத்துடன் கண்டறியும், மகசூல் இழப்பை 60% இலிருந்து 8.2% ஆக குறைக்கிறது.',
      feature4Title: 'பிளாக்செயின் கண்டறியுந்தன்மை',
      feature4Desc: 'Hyperledger Fabric விநியோக சங்கிலி வெளிப்படைத்தன்மை மற்றும் EUDR இணக்கத்தை உறுதி செய்கிறது, நிராகரிப்பு விகிதங்களை 40% இலிருந்து 6% ஆக குறைக்கிறது.',
      statsTitle: 'செயல்திறன் அளவீடுகள்',
      stat1Label: 'பால் தர துல்லியம்',
      stat2Label: 'வளர்ச்சி முன்கணிப்பு துல்லியம்',
      stat3Label: 'நோய் கண்டறிதல் துல்லியம்',
      stat4Label: 'நிராகரிப்பு விகிதம் (30% இலிருந்து குறைந்தது)',
      researchTitle: 'ஆராய்ச்சி பின்னணி',
      researchPara1: 'Rubber Edge என்பது சிறு விவசாயிகள் எதிர்கொள்ளும் முறையான சவால்களை எதிர்கொள்ள இலங்கை ரப்பர் ஆராய்ச்சி நிறுவனத்தில் (RRISL) மேற்கொள்ளப்பட்ட விரிவான ஆராய்ச்சியின் விளைவாகும்.',
      researchPara2: 'இந்த தளம் விவசாயத்தில் துண்டாடப்பட்ட தொழில்நுட்ப அமைப்புகளை தீர்க்க IoT சென்சார் நெட்வொர்க்குகளை AI-இயக்கப்படும் முன்கணிப்பு பகுப்பாய்வு மற்றும் பிளாக்செயின் கண்டறியுந்தன்மையுடன் ஒருங்கிணைக்கிறது.',
      researchHighlight: 'B.Eng (Hons) மென்பொருள் பொறியியல் - நிலை 6 ஆராய்ச்சி திட்டம்',
      teamTitle: 'ஆராய்ச்சி குழு',
      researcher: 'ஆராய்ச்சியாளர்',
      supervisor: 'மேற்பார்வையாளர்',
      assessor: 'மதிப்பீட்டாளர்',
      contributionsTitle: 'முக்கிய பங்களிப்புகள்',
      problemDomain: 'சிக்கல் களம்',
      problemItem1: 'நிகழ்நேர பால் தர கண்காணிப்பு மூலம் நிராகரிப்பு விகிதங்களை 30% இலிருந்து 6.8% ஆக குறைத்தது',
      problemItem2: 'அறிகுறி தொடக்கத்திற்கு 14 நாட்களுக்கு முன்பே நோய் கண்டறிதல், மகசூல் இழப்பை 60% இலிருந்து 8.2% ஆக குறைக்கிறது',
      problemItem3: 'உகந்த வள மேலாண்மைக்கு 93.4% துல்லியத்துடன் LSTM அடிப்படையிலான வளர்ச்சி முன்கணிப்பு',
      problemItem4: 'EUDR இணக்கம் மற்றும் வெளிப்படையான விநியோக சங்கிலிகளை உறுதி செய்யும் பிளாக்செயின் கண்டறியுந்தன்மை',
      researchDomain: 'ஆராய்ச்சி களம்',
      researchItem1: 'மர பயிர் மேலாண்மைக்கான IoT, AI மற்றும் பிளாக்செயின் புதுமையான ஒருங்கிணைப்பு',
      researchItem2: 'குறைந்த இணைப்பு சூழல்களில் நிகழ்நேர செயலாக்கத்திற்கான எட்ஜ் கம்ப்யூட்டிங் பயன்படுத்தல்',
      researchItem3: 'இலங்கை ரப்பர் சாகுபடி நிலைமைகளுக்கான சூழல்-குறிப்பிட்ட AI மாதிரிகள்',
      researchItem4: 'வளரும் நாடுகளில் சிறு விவசாயிகள் ஏற்றுக்கொள்வதற்கான அளவிடக்கூடிய கட்டமைப்பு',
      impactTitle: 'ரப்பர் தொழிலில் தாக்கம்',
      impactIntro: 'பாரம்பரிய முறைகள் உற்பத்தித்திறன் மற்றும் சந்தை போட்டித்தன்மை குறைவதற்கு வழிவகுத்த இலங்கையின் ரப்பர் துறையில் நவீனமயமாக்கலுக்கான அவசர தேவையை Rubber Edge நிவர்த்தி செய்கிறது. மலிவான விலையில் நிறுவன-தர தொழில்நுட்பத்தை சிறு விவசாயிகளுக்கு வழங்குவதன் மூலம், தளம்:',
      impact1: 'பால் தர நிலைத்தன்மை மற்றும் விலை நிர்ணய சக்தியை மேம்படுத்துகிறது',
      impact2: 'முன்கூட்டியே நோய் தலையீடு மற்றும் தடுப்புக்கு உதவுகிறது',
      impact3: 'வள உகந்தமாக்கலுக்கான தரவு-இயக்கப்படும் நுண்ணறிவுகளை வழங்குகிறது',
      impact4: 'சர்வதேச நிலைத்தன்மை தரங்களுக்கு இணக்கத்தை உறுதி செய்கிறது',
      impact5: 'வெளிப்படையான, மோசடி-எதிர்ப்பு விநியோக சங்கிலிகளை உருவாக்குகிறது',
      impact6: 'கிராமப்புற விவசாய சமூகங்களில் டிஜிட்டல் பிளவை குறைக்கிறது',
      contactTitle: 'தொடர்பு கொள்ளுங்கள்',
      email: 'மின்னஞ்சல்',
      phone: 'தொலைபேசி',
      location: 'இருப்பிடம்',
      website: 'வலைத்தளம்',
      footerText: '© 2025 Rubber Edge. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      footerSubtext: 'இலங்கை ரப்பர் ஆராய்ச்சி நிறுவனத்துடன் இணைந்து உருவாக்கப்பட்டது',
    },
    walletSettings: {
      headerTitle: 'பிளாக்செயின் அமைப்புகள்',
      headerSubtitle: 'உங்கள் பணப்பையையும் நெட்வொர்க்கையும் நிர்வகிக்கவும்',
      wallet: 'பணப்பை',
      networkSettings: 'நெட்வொர்க் அமைப்புகள்',
      activeNetwork: 'செயலில் உள்ள நெட்வொர்க்',
      testnet: 'சோதனை நெட்வொர்க்',
      mainnet: 'முதன்மை நெட்வொர்க்',
      rpcUrl: 'RPC URL',
      chainId: 'சங்கிலி ஐடி',
      dataSync: 'தரவு ஒத்திசைவு',
      pendingRecords: 'நிலுவையிலுள்ள பதிவுகள்',
      records: 'பதிவுகள்',
      syncNow: 'இப்போது ஒத்திசைக்கவும்',
      syncing: 'ஒத்திசைக்கிறது...',
      autoSync: 'தானியங்கி ஒத்திசைவு',
      security: 'பாதுகாப்பு',
      exportPrivateKey: 'தனிப்பட்ட விசையை ஏற்றுமதி செய்',
      biometricLock: 'பயோமெட்ரிக் பூட்டு',
      comingSoon: 'விரைவில் வருகிறது',
      biometricComingSoonDesc: 'பயோமெட்ரிக் பூட்டு எதிர்கால புதுப்பிப்பில் கிடைக்கும்.',
      quickActions: 'விரைவு செயல்கள்',
      transactionHistory: 'பரிவர்த்தனை வரலாறு',
      verifyTransaction: 'பரிவர்த்தனையை சரிபார்க்கவும்',
      blockExplorer: 'பிளாக் எக்ஸ்ப்ளோரர்',
      dangerZone: 'ஆபத்து மண்டலம்',
      disconnectWallet: 'பணப்பையை துண்டிக்கவும்',
      footerPoweredBy: 'Polygon நெட்வொர்க் மூலம் இயக்கப்படுகிறது',
      footerVersion: 'RubberEdge Blockchain v1.0.0',
      noPendingData: 'நிலுவையில் தரவு இல்லை',
      allDataSynced: 'அனைத்து தரவுகளும் ஏற்கனவே பிளாக்செயினில் ஒத்திசைக்கப்பட்டுள்ளன.',
      walletNotConnected: 'பணப்பை இணைக்கப்படவில்லை',
      connectWalletToSync: 'தரவை ஒத்திசைக்க உங்கள் பணப்பையை இணைக்கவும்.',
      syncComplete: 'ஒத்திசைவு முடிந்தது',
      syncedRecords: 'ஒத்திசைக்கப்பட்டது',
      failedRecords: 'தோல்வி',
      syncFailed: 'ஒத்திசைவு தோல்வி',
      syncFailedDesc: 'தரவை ஒத்திசைக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      exportPrivateKeyTitle: 'தனிப்பட்ட விசையை ஏற்றுமதி செய்',
      exportPrivateKeyWarning: 'உங்கள் தனிப்பட்ட விசையை ஏற்றுமதி செய்ய விரும்புகிறீர்களா? உங்கள் தனிப்பட்ட விசைக்கு அணுகல் உள்ள எவரும் உங்கள் பணப்பையை கட்டுப்படுத்த முடியும்.',
      export: 'ஏற்றுமதி',
      privateKeyTitle: 'தனிப்பட்ட விசை',
      contactSupportForExport: 'பாதுகாப்பிற்காக, உங்கள் தனிப்பட்ட விசையை பாதுகாப்பாக ஏற்றுமதி செய்ய ஆதரவை தொடர்பு கொள்ளவும்.',
      disconnectWalletTitle: 'பணப்பையை துண்டிக்கவும்',
      disconnectWalletWarning: 'துண்டிக்க விரும்புகிறீர்களா? உங்கள் தனிப்பட்ட விசையை காப்புப் பிரதி எடுத்துள்ளீர்கள் என்பதை உறுதி செய்யுங்கள்.',
      disconnect: 'துண்டிக்கவும்',
    },
    verifyTransaction: {
      headerTitle: 'பரிவர்த்தனையை சரிபார்க்கவும்',
      headerSubtitle: 'பிளாக்செயின் பதிவுகளை சோதிக்கவும்',
      transactionHash: 'பரிவர்த்தனை ஹாஷ்',
      enterTxHashPlaceholder: 'பரிவர்த்தனை ஹாஷை உள்ளிடவும் (0x...)',
      verifyOnBlockchain: 'பிளாக்செயினில் சரிபார்க்கவும்',
      recordVerified: 'பதிவு சரிபார்க்கப்பட்டது!',
      notFoundLocally: 'உள்ளூரில் கிடைக்கவில்லை',
      recordedOnBlockchain: 'இந்த பதிவு பிளாக்செயினில் பதிவு செய்யப்பட்டுள்ளது.',
      notFoundLocallyDesc: 'இந்த ஹாஷ் உள்ளூர் பதிவுகளில் கண்டுபிடிக்கப்படவில்லை. விவரங்களுக்கு பிளாக்செயின் எக்ஸ்ப்ளோரரை சோதிக்கலாம்.',
      priceRecord: '💰 விலை பதிவு',
      transactionRecord: '🤝 பரிவர்த்தனை பதிவு',
      supplyChainBatch: '📦 விநியோக சங்கிலி தொகுதி',
      grade: 'தரம்',
      price: 'விலை',
      recorded: 'பதிவு செய்யப்பட்டது',
      recorder: 'பதிவாளர்',
      farmerId: 'விவசாயி ஐடி',
      buyerId: 'வாங்குபவர் ஐடி',
      amount: 'தொகை',
      totalValue: 'மொத்த மதிப்பு',
      status: 'நிலை',
      location: 'இருப்பிடம்',
      timestamp: 'நேர முத்திரை',
      viewOnBlockchainExplorer: 'பிளாக்செயின் எக்ஸ்ப்ளோரரில் காண்க',
      howToVerify: 'சரிபார்ப்பது எப்படி',
      howToVerifyDesc: 'விலை, பரிவர்த்தனை அல்லது விநியோக சங்கிலி பதிவு பிளாக்செயினில் உள்ளதா என்பதை சரிபார்க்க பரிவர்த்தனை ஹாஷை உள்ளிடவும். ஹாஷ் "0x" உடன் தொடங்கி 66 எழுத்துகள் நீளமாக இருக்க வேண்டும்.',
      exampleTxHash: 'உதாரண பரிவர்த்தனை ஹாஷ்:',
      error: 'பிழை',
      enterTxHash: 'பரிவர்த்தனை ஹாஷை உள்ளிடவும்',
      invalidHash: 'தவறான ஹாஷ்',
      invalidHashDesc: 'செல்லுபடியாகும் பரிவர்த்தனை ஹாஷை உள்ளிடவும் (0x...)',
      verificationFailed: 'சரிபார்ப்பு தோல்வி',
      verificationFailedDesc: 'பரிவர்த்தனையை சரிபார்க்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    },
  },
};

export const getTranslation = (language: Language): Translations => {
  return translations[language] || translations.en;
};
