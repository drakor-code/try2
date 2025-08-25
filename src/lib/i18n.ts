import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      navigation: 'Navigation',
      home: 'Home',
      vendors: 'Vendors',
      clients: 'Clients',
      reports: 'Reports',
      users: 'Users',
      settings: 'Settings',
      support: 'Support',
      adminChat: 'Admin Chat',
      howToUse: 'How to use the program',
      
      // Auth
      auth: {
        title: 'Debt-IQ',
        email: 'Email',
        username: 'Username',
        password: 'Password',
        firstName: 'First Name',
        lastName: 'Last Name',
        confirmPassword: 'Confirm Password',
        loginButton: 'Log In',
        signUpButton: 'Sign Up',
        signUp: 'Sign Up',
        logIn: 'Log In',
        logout: 'Log Out',
        switchAccount: 'Switch Account',
        close: 'Close',
        alreadyHaveAccount: 'Already have an account? Log in',
        dontHaveAccount: "Don't have an account? Sign up"
      },
      // Keep login for backward compatibility
      login: {
        title: 'Debt-IQ',
        email: 'Email',
        username: 'Username',
        password: 'Password',
        loginButton: 'Log In',
        close: 'Close'
      },
      
      // Dashboard
      dashboard: {
        title: 'Dashboard',
        overview: 'Overview of debt management system',
        clientsDebt: "Clients' Debt",
        vendorsDebt: "Vendors' Debt",
        totalReceivable: 'Total Receivables',
        totalPayable: 'Total Payables',
        netPosition: 'Net Position',
        receivableDesc: 'Amount due from clients',
        payableDesc: 'Amount due to vendors',
        surplus: 'Surplus',
        deficit: 'Deficit',
        quickActions: 'Quick Actions',
        manageVendors: 'Manage Vendors',
        manageVendorsDesc: 'Add or edit vendor information',
        manageClientsDesc: 'Add or edit client information',
        viewReportsDesc: 'Generate debt and payment reports'
      },
      
      // Common actions
      actions: {
        add: 'Add',
        edit: 'Edit',
        delete: 'Delete',
        refresh: 'Refresh',
        showAll: 'Show All',
        save: 'Save',
        cancel: 'Cancel',
        export: 'Export'
      },
      
      // Vendors
      vendor: {
        title: 'Vendors',
        id: 'Vendor ID',
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        debt: 'Debt',
        createdAt: 'Created At',
        addVendor: 'Add Vendor',
        editVendor: 'Edit Vendor',
        vendorsList: 'Vendors List',
        description: 'Manage vendor data and track debts'
      },
      
      // Clients
      client: {
        title: 'Clients',
        name: 'Name',
        phone: 'Phone',
        email: 'Email',
        address: 'Address',
        debt: 'Debt',
        totalDebt: 'Total Debt',
        addClient: 'Add Client',
        editClient: 'Edit Client',
        clientId: 'Client ID',
        createdAt: 'Created At',
        manageClients: 'Manage Clients',
        trackDebts: 'Track debts and follow up',
        clientsList: 'Clients List'
      },
      
      // Reports
      reports: {
        title: 'Reports',
        description: 'Generate and export financial and administrative reports',
        vendorDebts: 'Vendor Debts Report',
        vendorDebtsDesc: 'Comprehensive report of vendor debts and amounts due',
        clientDebts: 'Client Debts Report', 
        clientDebtsDesc: 'Detailed report of client debts and overdue amounts',
        cashPayments: 'Cash Payments Report',
        cashPaymentsDesc: 'Record of all cash transactions and payments',
        transfers: 'Transfers Report',
        transfersDesc: 'Bank transfers and electronic transactions report',
        viewReport: 'View Report',
        exportPdf: 'Export PDF',
        totalVendors: 'Total Vendors',
        totalClients: 'Total Clients',
        totalTransactions: 'Total Transactions'
      },
      
      // Users
      users: {
        title: 'Users',
        description: 'Manage users and permissions',
        fullName: 'Full Name',
        username: 'Username',
        role: 'Role',
        createdAt: 'Created At',
        lastLogin: 'Last Login',
        actions: 'Actions',
        usersList: 'Users List',
        addUser: 'Add User',
        editUser: 'Edit User',
        admin: 'Admin',
        staff: 'Staff',
        admins: 'Admins',
        employees: 'Employees'
      },
      
      // Settings
      settings: {
        title: 'Settings',
        description: 'System and company settings',
        companySettings: 'Company Settings',
        companyName: 'Company Name',
        companyDescription: 'Company Description',
        companyLogo: 'Company Logo',
        uploadNewLogo: 'Upload New Logo',
        saveSettings: 'Save Settings',
        databaseManagement: 'Database Management',
        backup: 'Backup',
        backupDesc: 'Create a backup of all data for security',
        createBackup: 'Create Backup',
        restore: 'Restore Data',
        restoreDesc: 'Restore data from a previous backup',
        restoreFromBackup: 'Restore from Backup',
        systemInfo: 'System Information',
        systemVersion: 'System Version',
        lastBackup: 'Last Backup',
        databaseSize: 'Database Size'
      },
      
      // Support
      support: {
        title: 'Support',
        description: 'Get help and technical support',
        companyInfo: 'Afnan Information Technology Solutions',
        aboutCompany: 'About Company',
        aboutDesc: 'A leading company in developing specialized technical solutions in business and financial management systems. We provide innovative solutions that help companies improve work efficiency and manage their resources effectively.',
        services: 'Services',
        service1: '• Business management systems development',
        service2: '• Inventory and sales management solutions', 
        service3: '• Human resources management systems',
        service4: '• Technical support and maintenance',
        phone: 'Phone',
        email: 'Email',
        liveChat: 'Live Chat',
        phoneDesc: 'For immediate support and urgent inquiries',
        emailDesc: 'For detailed inquiries and technical support',
        chatDesc: 'Get instant help via chat',
        callNow: 'Call Now',
        sendMessage: 'Send Message',
        startChat: 'Start Chat',
        helpResources: 'Help Resources',
        userGuide: 'User Guide',
        userGuideDesc: 'Comprehensive guide to using all system features',
        faq: 'Frequently Asked Questions',
        faqDesc: 'Answers to the most common questions',
        training: 'Training Programs',
        trainingDesc: 'Training videos to learn how to use the system',
        website: 'Website',
        websiteDesc: 'Visit our website for more information',
        visitWebsite: 'Visit Website',
        available247: 'Available 24/7'
      },
      
      // Admin Chat
      adminChat: {
        title: 'Admin Chat',
        description: 'Communicate with team and management',
        onlineUsers: 'Online Users',
        generalChat: 'General Chat',
        search: 'Search',
        searchMessages: 'Search in messages...',
        typeMessage: 'Type your message...',
        online: 'online',
        you: 'You'
      },
      
      // Common
      common: {
        loading: 'Loading...',
        loadingData: 'Loading data...',
        error: 'Error',
        errorLoadingData: 'Error loading data',
        noData: 'No data available',
        active: 'Active',
        inactive: 'Inactive',
        overdue: 'Overdue',
        current: 'Current',
        total: 'Total',
        iqd: 'IQD',
        welcome: 'Welcome',
        welcomeToSystem: 'Welcome to Debt Management System',
        startJourney: 'Start your journey in efficient business and financial management',
        login: 'Login',
        exploreSystem: 'Explore System',
        pageNotFound: 'Page Not Found',
        pageNotFoundDesc: 'The page you are looking for is not available or has been moved',
        returnHome: 'Return Home'
      }
    }
  },
  ar: {
    translation: {
      // Navigation - Iraqi Arabic
      navigation: 'التنقل',
      home: 'الصفحة الرئيسية',
      vendors: 'الموردين',
      clients: 'الزبائن',
      reports: 'التقارير',
      users: 'المستخدمين',
      settings: 'الإعدادات',
      support: 'المساعدة',
      adminChat: 'محادثة الإدارة',
      howToUse: 'شلون استخدم البرنامج',
      
      // Auth - Iraqi Arabic
      auth: {
        title: 'Debt-IQ',
        email: 'الإيميل',
        username: 'اسم المستخدم',
        password: 'كلمة السر',
        firstName: 'الاسم الأول',
        lastName: 'الاسم الأخير',
        confirmPassword: 'تأكيد كلمة السر',
        loginButton: 'ادخل',
        signUpButton: 'سجل',
        signUp: 'تسجيل',
        logIn: 'دخول',
        logout: 'خروج',
        switchAccount: 'تبديل الحساب',
        close: 'سكر',
        alreadyHaveAccount: 'عندك حساب؟ ادخل هنا',
        dontHaveAccount: 'ما عندك حساب؟ سجل هنا'
      },
      // Keep login for backward compatibility
      login: {
        title: 'Debt-IQ',
        email: 'الإيميل',
        username: 'اسم المستخدم',
        password: 'كلمة السر',
        loginButton: 'ادخل',
        close: 'سكر'
      },
      
      // Dashboard - Iraqi Arabic
      dashboard: {
        title: 'لوحة التحكم',
        overview: 'نظرة عامة على نظام إدارة الديون',
        clientsDebt: 'ديون الزبائن',
        vendorsDebt: 'ديون الموردين',
        totalReceivable: 'إجمالي المستحقات',
        totalPayable: 'إجمالي المدفوعات',
        netPosition: 'صافي الموقف',
        receivableDesc: 'المبلغ المستحق من العملاء',
        payableDesc: 'المبلغ المستحق للموردين',
        surplus: 'فائض',
        deficit: 'عجز',
        quickActions: 'إجراءات سريعة',
        manageVendors: 'إدارة الموردين',
        manageVendorsDesc: 'إضافة أو تعديل معلومات الموردين',
        manageClientsDesc: 'إضافة أو تعديل معلومات العملاء',
        viewReportsDesc: 'إنشاء تقارير الديون والمدفوعات'
      },
      
      // Common actions - Iraqi Arabic
      actions: {
        add: 'زيد',
        edit: 'عدل',
        delete: 'احذف',
        refresh: 'حدث',
        showAll: 'اعرض الكل',
        save: 'احفظ',
        cancel: 'الغي',
        export: 'صدر'
      },
      
      // Vendors - Iraqi Arabic
      vendor: {
        title: 'الموردين',
        id: 'رقم المورد',
        name: 'الاسم',
        phone: 'رقم الهاتف',
        email: 'الإيميل',
        address: 'العنوان',
        debt: 'الدين',
        createdAt: 'تاريخ الإنشاء',
        addVendor: 'زيد مورد',
        editVendor: 'عدل المورد',
        vendorsList: 'قائمة الموردين',
        description: 'إدارة بيانات الموردين ومتابعة الديون'
      },
      
      // Clients - Iraqi Arabic
      client: {
        title: 'الزبائن',
        name: 'الاسم',
        phone: 'رقم الهاتف',
        email: 'الإيميل',
        address: 'العنوان',
        debt: 'الدين',
        totalDebt: 'إجمالي الدين',
        addClient: 'زيد زبون',
        editClient: 'عدل الزبون',
        clientId: 'رقم الزبون',
        createdAt: 'تاريخ الإنشاء',
        manageClients: 'إدارة الزبائن',
        trackDebts: 'إدارة بيانات الزبائن ومتابعة الديون',
        clientsList: 'قائمة الزبائن'
      },
      
      // Reports - Iraqi Arabic
      reports: {
        title: 'التقارير',
        description: 'إنشاء وتصدير التقارير المالية والإدارية',
        vendorDebts: 'تقرير ديون الموردين',
        vendorDebtsDesc: 'تقرير شامل بديون الموردين والمبالغ المستحقة',
        clientDebts: 'تقرير ديون العملاء',
        clientDebtsDesc: 'تقرير تفصيلي بديون العملاء والمتأخرات',
        cashPayments: 'تقارير الدفعات النقدية',
        cashPaymentsDesc: 'سجل جميع المعاملات النقدية والدفعات',
        transfers: 'تقارير التحويلات',
        transfersDesc: 'تقرير التحويلات البنكية والمعاملات الإلكترونية',
        viewReport: 'عرض التقرير',
        exportPdf: 'تصدير PDF',
        totalVendors: 'إجمالي الموردين',
        totalClients: 'إجمالي العملاء',
        totalTransactions: 'إجمالي المعاملات'
      },
      
      // Users - Iraqi Arabic
      users: {
        title: 'المستخدمين',
        description: 'إدارة المستخدمين والصلاحيات',
        fullName: 'الاسم الكامل',
        username: 'اسم المستخدم',
        role: 'الدور',
        createdAt: 'تاريخ الإنشاء',
        lastLogin: 'آخر دخول',
        actions: 'الإجراءات',
        usersList: 'قائمة المستخدمين',
        addUser: 'إضافة مستخدم',
        editUser: 'تعديل المستخدم',
        admin: 'مدير',
        staff: 'موظف',
        admins: 'المديرين',
        employees: 'الموظفين'
      },
      
      // Settings - Iraqi Arabic
      settings: {
        title: 'الإعدادات',
        description: 'إعدادات النظام والشركة',
        companySettings: 'إعدادات الشركة',
        companyName: 'اسم الشركة',
        companyDescription: 'وصف الشركة',
        companyLogo: 'شعار الشركة',
        uploadNewLogo: 'رفع شعار جديد',
        saveSettings: 'حفظ الإعدادات',
        databaseManagement: 'إدارة قاعدة البيانات',
        backup: 'النسخة الاحتياطية',
        backupDesc: 'إنشاء نسخة احتياطية من جميع البيانات لضمان الأمان',
        createBackup: 'إنشاء نسخة احتياطية',
        restore: 'استعادة البيانات',
        restoreDesc: 'استعادة البيانات من نسخة احتياطية سابقة',
        restoreFromBackup: 'استعادة من نسخة احتياطية',
        systemInfo: 'معلومات النظام',
        systemVersion: 'إصدار النظام',
        lastBackup: 'آخر نسخة احتياطية',
        databaseSize: 'حجم قاعدة البيانات'
      },
      
      // Support - Iraqi Arabic
      support: {
        title: 'المساعدة',
        description: 'الحصول على المساعدة والدعم التقني',
        companyInfo: 'شركة أفنان لحلول تقنية المعلومات',
        aboutCompany: 'عن الشركة',
        aboutDesc: 'شركة رائدة في مجال تطوير الحلول التقنية المتخصصة في أنظمة إدارة الأعمال والمالية. نقدم حلول مبتكرة تساعد الشركات على تحسين كفاءة العمل وإدارة مواردها بفعالية.',
        services: 'الخدمات',
        service1: '• تطوير أنظمة إدارة الأعمال',
        service2: '• حلول إدارة المخزون والمبيعات',
        service3: '• أنظمة إدارة الموارد البشرية',
        service4: '• الدعم التقني والصيانة',
        phone: 'الهاتف',
        email: 'البريد الإلكتروني',
        liveChat: 'الدردشة المباشرة',
        phoneDesc: 'للدعم الفوري والاستفسارات العاجلة',
        emailDesc: 'للاستفسارات التفصيلية والدعم التقني',
        chatDesc: 'للحصول على مساعدة فورية عبر الدردشة',
        callNow: 'اتصل الآن',
        sendMessage: 'إرسال رسالة',
        startChat: 'بدء الدردشة',
        helpResources: 'مصادر المساعدة',
        userGuide: 'دليل المستخدم',
        userGuideDesc: 'دليل شامل لاستخدام جميع ميزات النظام',
        faq: 'الأسئلة الشائعة',
        faqDesc: 'إجابات على الأسئلة الأكثر شيوعاً',
        training: 'البرامج التدريبية',
        trainingDesc: 'فيديوهات تدريبية لتعلم استخدام النظام',
        website: 'الموقع الإلكتروني',
        websiteDesc: 'زيارة موقعنا للمزيد من المعلومات',
        visitWebsite: 'زيارة الموقع',
        available247: 'متوفر 24/7'
      },
      
      // Admin Chat - Iraqi Arabic
      adminChat: {
        title: 'محادثة الإدارة',
        description: 'التواصل مع فريق العمل والإدارة',
        onlineUsers: 'المستخدمون المتصلون',
        generalChat: 'دردشة الإدارة',
        search: 'بحث',
        searchMessages: 'البحث في الرسائل...',
        typeMessage: 'اكتب رسالتك...',
        online: 'متصل',
        you: 'أنت'
      },
      
      // Common - Iraqi Arabic
      common: {
        loading: 'جاري التحميل...',
        loadingData: 'جاري تحميل البيانات...',
        error: 'خطأ',
        errorLoadingData: 'صار خطأ بتحميل البيانات',
        noData: 'ما كو بيانات',
        active: 'نشط',
        inactive: 'غير نشط',
        overdue: 'متأخر',
        current: 'حالي',
        total: 'المجموع',
        iqd: 'د.ع',
        welcome: 'مرحباً',
        welcomeToSystem: 'مرحباً بك في نظام إدارة الديون',
        startJourney: 'ابدأ رحلتك في إدارة الأعمال والمالية بكفاءة',
        login: 'تسجيل الدخول',
        exploreSystem: 'استكشاف النظام',
        pageNotFound: 'عذراً! الصفحة غير موجودة',
        pageNotFoundDesc: 'الصفحة التي تبحث عنها غير متوفرة أو تم نقلها',
        returnHome: 'العودة للرئيسية'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // default language - Arabic
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;