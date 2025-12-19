export type Language = 'en' | 'hi' | 'te';

export interface Translations {
  appName: string;
  tagline: string;
  offlineReady: string;
  online: string;
  offline: string;
  offlineModeEnabled: string;
  dashboard: string;
  symptomChecker: string;
  patientRecords: string;
  emergency: string;
  settings: string;
  selectLanguage: string;
  checkSymptoms: string;
  viewRecords: string;
  emergencyHelp: string;
  quickActions: string;
  recentActivity: string;
  lastSync: string;
  neverSynced: string;
  syncNow: string;
  syncing: string;
  symptomAssessment: string;
  selectSymptoms: string;
  howAreYouFeeling: string;
  assessRisk: string;
  riskLevel: string;
  low: string;
  medium: string;
  high: string;
  critical: string;
  guidance: string;
  startOver: string;
  callEmergency: string;
  back: string;
  next: string;
  noRecords: string;
  addPatient: string;
  name: string;
  age: string;
  gender: string;
  male: string;
  female: string;
  other: string;
  bloodType: string;
  allergies: string;
  conditions: string;
  symptoms: string;
  save: string;
  cancel: string;
  delete: string;
  emergencyContacts: string;
  firstAidGuide: string;
  nearbyFacilities: string;
  kioskMode: string;
  home: string;
  check: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'MedRelay',
    tagline: 'Healthcare that works offline',
    offlineReady: 'Offline Ready',
    online: 'Online',
    offline: 'Offline',
    offlineModeEnabled: 'Offline Mode Enabled',
    dashboard: 'Dashboard',
    symptomChecker: 'Symptom Checker',
    patientRecords: 'Health Records',
    emergency: 'Emergency',
    settings: 'Settings',
    selectLanguage: 'Select Language',
    checkSymptoms: 'Check Symptoms',
    viewRecords: 'View Records',
    emergencyHelp: 'Emergency Help',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    lastSync: 'Last Sync',
    neverSynced: 'Never synced',
    syncNow: 'Sync Now',
    syncing: 'Syncing...',
    symptomAssessment: 'Symptom Assessment',
    selectSymptoms: 'Select your symptoms',
    howAreYouFeeling: 'How are you feeling today?',
    assessRisk: 'Assess Risk',
    riskLevel: 'Risk Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical',
    guidance: 'Guidance',
    startOver: 'Start Over',
    callEmergency: 'Call Emergency',
    back: 'Back',
    next: 'Next',
    noRecords: 'No patient records found',
    addPatient: 'Add Patient',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    bloodType: 'Blood Type',
    allergies: 'Allergies',
    conditions: 'Medical Conditions',
    symptoms: 'Symptoms',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    emergencyContacts: 'Emergency Contacts',
    firstAidGuide: 'First Aid Guide',
    nearbyFacilities: 'Nearby Facilities',
    kioskMode: 'Kiosk Mode',
    home: 'Home',
    check: 'Check',
  },
  hi: {
    appName: 'मेडरिले',
    tagline: 'ऑफलाइन काम करने वाली स्वास्थ्य सेवा',
    offlineReady: 'ऑफलाइन तैयार',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    offlineModeEnabled: 'ऑफलाइन मोड सक्षम',
    dashboard: 'डैशबोर्ड',
    symptomChecker: 'लक्षण जाँच',
    patientRecords: 'स्वास्थ्य रिकॉर्ड',
    emergency: 'आपातकाल',
    settings: 'सेटिंग्स',
    selectLanguage: 'भाषा चुनें',
    checkSymptoms: 'लक्षण जाँचें',
    viewRecords: 'रिकॉर्ड देखें',
    emergencyHelp: 'आपातकालीन मदद',
    quickActions: 'त्वरित कार्य',
    recentActivity: 'हाल की गतिविधि',
    lastSync: 'अंतिम सिंक',
    neverSynced: 'कभी सिंक नहीं हुआ',
    syncNow: 'अभी सिंक करें',
    syncing: 'सिंक हो रहा है...',
    symptomAssessment: 'लक्षण मूल्यांकन',
    selectSymptoms: 'अपने लक्षण चुनें',
    howAreYouFeeling: 'आज आप कैसा महसूस कर रहे हैं?',
    assessRisk: 'जोखिम का आकलन करें',
    riskLevel: 'जोखिम स्तर',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    critical: 'गंभीर',
    guidance: 'मार्गदर्शन',
    startOver: 'फिर से शुरू करें',
    callEmergency: 'आपातकाल कॉल करें',
    back: 'वापस',
    next: 'आगे',
    noRecords: 'कोई मरीज़ का रिकॉर्ड नहीं मिला',
    addPatient: 'मरीज़ जोड़ें',
    name: 'नाम',
    age: 'उम्र',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    bloodType: 'रक्त प्रकार',
    allergies: 'एलर्जी',
    conditions: 'चिकित्सा स्थितियाँ',
    symptoms: 'लक्षण',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    emergencyContacts: 'आपातकालीन संपर्क',
    firstAidGuide: 'प्राथमिक चिकित्सा गाइड',
    nearbyFacilities: 'नज़दीकी सुविधाएँ',
    kioskMode: 'कियोस्क मोड',
    home: 'होम',
    check: 'जाँचें',
  },
  te: {
    appName: 'మెడ్‌రిలే',
    tagline: 'ఆఫ్‌లైన్‌లో పనిచేసే ఆరోగ్య సంరక్షణ',
    offlineReady: 'ఆఫ్‌లైన్ సిద్ధం',
    online: 'ఆన్‌లైన్',
    offline: 'ఆఫ్‌లైన్',
    offlineModeEnabled: 'ఆఫ్‌లైన్ మోడ్ ఎనేబుల్ అయింది',
    dashboard: 'డాష్‌బోర్డ్',
    symptomChecker: 'లక్షణాల పరీక్ష',
    patientRecords: 'ఆరోగ్య రికార్డులు',
    emergency: 'అత్యవసరం',
    settings: 'సెట్టింగ్‌లు',
    selectLanguage: 'భాషను ఎంచుకోండి',
    checkSymptoms: 'లక్షణాలను తనిఖీ చేయండి',
    viewRecords: 'రికార్డులను చూడండి',
    emergencyHelp: 'అత్యవసర సహాయం',
    quickActions: 'త్వరిత చర్యలు',
    recentActivity: 'ఇటీవలి కార్యకలాపం',
    lastSync: 'చివరి సింక్',
    neverSynced: 'ఎప్పుడూ సింక్ చేయలేదు',
    syncNow: 'ఇప్పుడు సింక్ చేయండి',
    syncing: 'సింక్ అవుతోంది...',
    symptomAssessment: 'లక్షణాల అంచనా',
    selectSymptoms: 'మీ లక్షణాలను ఎంచుకోండి',
    howAreYouFeeling: 'ఈ రోజు మీకు ఎలా అనిపిస్తోంది?',
    assessRisk: 'ప్రమాదాన్ని అంచనా వేయండి',
    riskLevel: 'ప్రమాద స్థాయి',
    low: 'తక్కువ',
    medium: 'మధ్యస్థం',
    high: 'ఎక్కువ',
    critical: 'క్లిష్టమైన',
    guidance: 'మార్గదర్శకత్వం',
    startOver: 'మళ్ళీ ప్రారంభించండి',
    callEmergency: 'అత్యవసర కాల్',
    back: 'వెనక్కి',
    next: 'తదుపరి',
    noRecords: 'రోగి రికార్డులు కనుగొనబడలేదు',
    addPatient: 'రోగిని జోడించండి',
    name: 'పేరు',
    age: 'వయస్సు',
    gender: 'లింగం',
    male: 'పురుషుడు',
    female: 'స్త్రీ',
    other: 'ఇతర',
    bloodType: 'రక్త రకం',
    allergies: 'అలర్జీలు',
    conditions: 'వైద్య పరిస్థితులు',
    symptoms: 'లక్షణాలు',
    save: 'సేవ్',
    cancel: 'రద్దు',
    delete: 'తొలగించు',
    emergencyContacts: 'అత్యవసర సంప్రదింపులు',
    firstAidGuide: 'ప్రథమ చికిత్స గైడ్',
    nearbyFacilities: 'సమీపంలోని సౌకర్యాలు',
    kioskMode: 'కియోస్క్ మోడ్',
    home: 'హోమ్',
    check: 'తనిఖీ చేయండి',
  },
};
