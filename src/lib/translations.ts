export type Language = 'en' | 'hi' | 'ta';

export interface Translations {
  appName: string;
  tagline: string;
  offlineReady: string;
  online: string;
  offline: string;
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
  save: string;
  cancel: string;
  emergencyContacts: string;
  firstAidGuide: string;
  nearbyFacilities: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'MedRelay',
    tagline: 'Healthcare that works offline',
    offlineReady: 'Offline Ready',
    online: 'Online',
    offline: 'Offline',
    dashboard: 'Dashboard',
    symptomChecker: 'Symptom Checker',
    patientRecords: 'Patient Records',
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
    save: 'Save',
    cancel: 'Cancel',
    emergencyContacts: 'Emergency Contacts',
    firstAidGuide: 'First Aid Guide',
    nearbyFacilities: 'Nearby Facilities',
  },
  hi: {
    appName: 'मेडरिले',
    tagline: 'ऑफलाइन काम करने वाली स्वास्थ्य सेवा',
    offlineReady: 'ऑफलाइन तैयार',
    online: 'ऑनलाइन',
    offline: 'ऑफलाइन',
    dashboard: 'डैशबोर्ड',
    symptomChecker: 'लक्षण जाँच',
    patientRecords: 'मरीज़ के रिकॉर्ड',
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
    save: 'सहेजें',
    cancel: 'रद्द करें',
    emergencyContacts: 'आपातकालीन संपर्क',
    firstAidGuide: 'प्राथमिक चिकित्सा गाइड',
    nearbyFacilities: 'नज़दीकी सुविधाएँ',
  },
  ta: {
    appName: 'மெட்ரிலே',
    tagline: 'ஆஃப்லைனில் செயல்படும் சுகாதாரம்',
    offlineReady: 'ஆஃப்லைன் தயார்',
    online: 'ஆன்லைன்',
    offline: 'ஆஃப்லைன்',
    dashboard: 'டாஷ்போர்டு',
    symptomChecker: 'அறிகுறி சரிபார்ப்பு',
    patientRecords: 'நோயாளி பதிவுகள்',
    emergency: 'அவசரநிலை',
    settings: 'அமைப்புகள்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    checkSymptoms: 'அறிகுறிகளை சரிபார்க்கவும்',
    viewRecords: 'பதிவுகளைப் பார்க்கவும்',
    emergencyHelp: 'அவசர உதவி',
    quickActions: 'விரைவு செயல்கள்',
    recentActivity: 'சமீபத்திய செயல்பாடு',
    lastSync: 'கடைசி ஒத்திசைவு',
    neverSynced: 'ஒத்திசைக்கப்படவில்லை',
    syncNow: 'இப்போது ஒத்திசைக்கவும்',
    syncing: 'ஒத்திசைக்கிறது...',
    symptomAssessment: 'அறிகுறி மதிப்பீடு',
    selectSymptoms: 'உங்கள் அறிகுறிகளைத் தேர்ந்தெடுக்கவும்',
    howAreYouFeeling: 'இன்று நீங்கள் எப்படி உணர்கிறீர்கள்?',
    assessRisk: 'ஆபத்தை மதிப்பிடுங்கள்',
    riskLevel: 'ஆபத்து நிலை',
    low: 'குறைவு',
    medium: 'நடுத்தர',
    high: 'அதிக',
    critical: 'மிகவும் தீவிரம்',
    guidance: 'வழிகாட்டுதல்',
    startOver: 'மீண்டும் தொடங்கு',
    callEmergency: 'அவசர அழைப்பு',
    back: 'பின்',
    next: 'அடுத்து',
    noRecords: 'நோயாளி பதிவுகள் இல்லை',
    addPatient: 'நோயாளியைச் சேர்க்கவும்',
    name: 'பெயர்',
    age: 'வயது',
    gender: 'பாலினம்',
    male: 'ஆண்',
    female: 'பெண்',
    other: 'மற்றவை',
    bloodType: 'இரத்த வகை',
    allergies: 'ஒவ்வாமைகள்',
    conditions: 'மருத்துவ நிலைமைகள்',
    save: 'சேமி',
    cancel: 'ரத்து செய்',
    emergencyContacts: 'அவசர தொடர்புகள்',
    firstAidGuide: 'முதலுதவி வழிகாட்டி',
    nearbyFacilities: 'அருகிலுள்ள வசதிகள்',
  },
};
