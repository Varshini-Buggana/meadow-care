export interface Symptom {
  id: string;
  name: Record<string, string>;
  category: 'general' | 'respiratory' | 'digestive' | 'pain' | 'neurological' | 'skin';
  severity: number; // 1-5
}

export const symptoms: Symptom[] = [
  { id: 'fever', name: { en: 'Fever', hi: 'बुखार', ta: 'காய்ச்சல்' }, category: 'general', severity: 2 },
  { id: 'headache', name: { en: 'Headache', hi: 'सिरदर्द', ta: 'தலைவலி' }, category: 'neurological', severity: 2 },
  { id: 'cough', name: { en: 'Cough', hi: 'खांसी', ta: 'இருமல்' }, category: 'respiratory', severity: 1 },
  { id: 'shortness_of_breath', name: { en: 'Shortness of Breath', hi: 'सांस की तकलीफ', ta: 'மூச்சுத்திணறல்' }, category: 'respiratory', severity: 4 },
  { id: 'chest_pain', name: { en: 'Chest Pain', hi: 'सीने में दर्द', ta: 'நெஞ்சு வலி' }, category: 'pain', severity: 5 },
  { id: 'nausea', name: { en: 'Nausea', hi: 'मतली', ta: 'குமட்டல்' }, category: 'digestive', severity: 2 },
  { id: 'vomiting', name: { en: 'Vomiting', hi: 'उल्टी', ta: 'வாந்தி' }, category: 'digestive', severity: 3 },
  { id: 'diarrhea', name: { en: 'Diarrhea', hi: 'दस्त', ta: 'வயிற்றுப்போக்கு' }, category: 'digestive', severity: 2 },
  { id: 'fatigue', name: { en: 'Fatigue', hi: 'थकान', ta: 'சோர்வு' }, category: 'general', severity: 1 },
  { id: 'dizziness', name: { en: 'Dizziness', hi: 'चक्कर आना', ta: 'தலைசுற்றல்' }, category: 'neurological', severity: 3 },
  { id: 'body_ache', name: { en: 'Body Ache', hi: 'बदन दर्द', ta: 'உடல் வலி' }, category: 'pain', severity: 2 },
  { id: 'sore_throat', name: { en: 'Sore Throat', hi: 'गले में खराश', ta: 'தொண்டை வலி' }, category: 'respiratory', severity: 1 },
  { id: 'rash', name: { en: 'Skin Rash', hi: 'त्वचा पर दाने', ta: 'தோல் அரிப்பு' }, category: 'skin', severity: 2 },
  { id: 'abdominal_pain', name: { en: 'Abdominal Pain', hi: 'पेट दर्द', ta: 'வயிற்று வலி' }, category: 'digestive', severity: 3 },
  { id: 'loss_of_consciousness', name: { en: 'Loss of Consciousness', hi: 'बेहोशी', ta: 'சுய நினைவு இழப்பு' }, category: 'neurological', severity: 5 },
  { id: 'bleeding', name: { en: 'Bleeding', hi: 'खून बहना', ta: 'இரத்தப்போக்கு' }, category: 'general', severity: 4 },
];

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface AssessmentResult {
  riskLevel: RiskLevel;
  guidance: Record<string, string>;
  immediateActions: Record<string, string[]>;
}

export function assessSymptoms(selectedSymptomIds: string[]): AssessmentResult {
  const selectedSymptoms = symptoms.filter(s => selectedSymptomIds.includes(s.id));
  
  const maxSeverity = Math.max(...selectedSymptoms.map(s => s.severity), 0);
  const avgSeverity = selectedSymptoms.length > 0 
    ? selectedSymptoms.reduce((sum, s) => sum + s.severity, 0) / selectedSymptoms.length 
    : 0;
  
  const hasCritical = selectedSymptoms.some(s => s.severity === 5);
  const hasHighSeverity = selectedSymptoms.some(s => s.severity >= 4);
  
  let riskLevel: RiskLevel;
  
  if (hasCritical || (hasHighSeverity && selectedSymptoms.length >= 3)) {
    riskLevel = 'critical';
  } else if (hasHighSeverity || avgSeverity >= 3) {
    riskLevel = 'high';
  } else if (avgSeverity >= 2 || selectedSymptoms.length >= 4) {
    riskLevel = 'medium';
  } else {
    riskLevel = 'low';
  }

  const guidance = getGuidance(riskLevel);
  const immediateActions = getImmediateActions(riskLevel, selectedSymptoms);

  return { riskLevel, guidance, immediateActions };
}

function getGuidance(riskLevel: RiskLevel): Record<string, string> {
  const guidanceMap: Record<RiskLevel, Record<string, string>> = {
    low: {
      en: 'Your symptoms appear to be mild. Rest, stay hydrated, and monitor your condition. If symptoms worsen or persist for more than 3 days, consult a healthcare provider.',
      hi: 'आपके लक्षण हल्के प्रतीत होते हैं। आराम करें, पानी पीते रहें और अपनी स्थिति पर नज़र रखें। यदि लक्षण बिगड़ते हैं या 3 दिनों से अधिक समय तक रहते हैं, तो स्वास्थ्य सेवा प्रदाता से परामर्श लें।',
      ta: 'உங்கள் அறிகுறிகள் லேசானவை. ஓய்வு எடுங்கள், நீர்ச்சத்து குறையாமல் பார்த்துக்கொள்ளுங்கள். 3 நாட்களுக்கு மேல் தொடர்ந்தால் மருத்துவரை அணுகவும்.',
    },
    medium: {
      en: 'Your symptoms suggest a moderate health concern. Consider visiting a local health center within 24-48 hours. Continue to monitor symptoms and rest.',
      hi: 'आपके लक्षण एक मध्यम स्वास्थ्य चिंता का संकेत देते हैं। 24-48 घंटों के भीतर स्थानीय स्वास्थ्य केंद्र जाने पर विचार करें। लक्षणों पर नज़र रखें और आराम करें।',
      ta: 'உங்கள் அறிகுறிகள் மிதமான சுகாதார கவலையை குறிக்கின்றன. 24-48 மணி நேரத்திற்குள் உள்ளூர் சுகாதார மையத்தை அணுகவும்.',
    },
    high: {
      en: 'Your symptoms indicate a significant health concern. Please visit a healthcare facility as soon as possible, ideally within the next few hours.',
      hi: 'आपके लक्षण एक महत्वपूर्ण स्वास्थ्य चिंता का संकेत देते हैं। कृपया जल्द से जल्द, आदर्श रूप से अगले कुछ घंटों के भीतर, किसी स्वास्थ्य सुविधा पर जाएँ।',
      ta: 'உங்கள் அறிகுறிகள் கணிசமான சுகாதார கவலையை குறிக்கின்றன. உடனடியாக சுகாதார மையத்தை அணுகவும்.',
    },
    critical: {
      en: 'EMERGENCY: Your symptoms suggest a critical condition. Seek immediate medical attention or call emergency services right away. Do not delay.',
      hi: 'आपातकाल: आपके लक्षण एक गंभीर स्थिति का संकेत देते हैं। तुरंत चिकित्सा सहायता लें या तुरंत आपातकालीन सेवाओं को कॉल करें। देरी न करें।',
      ta: 'அவசரநிலை: உங்கள் அறிகுறிகள் ஒரு தீவிரமான நிலையை குறிக்கின்றன. உடனடியாக மருத்துவ உதவி பெறுங்கள் அல்லது அவசர சேவைகளை அழைக்கவும்.',
    },
  };

  return guidanceMap[riskLevel];
}

function getImmediateActions(riskLevel: RiskLevel, selectedSymptoms: Symptom[]): Record<string, string[]> {
  const actions: Record<string, string[]> = {
    en: [],
    hi: [],
    ta: [],
  };

  if (riskLevel === 'critical') {
    actions.en = ['Call emergency services immediately', 'Keep the person calm and still', 'Do not give food or water if unconscious'];
    actions.hi = ['तुरंत आपातकालीन सेवाओं को कॉल करें', 'व्यक्ति को शांत और स्थिर रखें', 'बेहोश होने पर खाना या पानी न दें'];
    actions.ta = ['உடனடியாக அவசர சேவைகளை அழைக்கவும்', 'நபரை அமைதியாக வைக்கவும்', 'சுய நினைவு இல்லாவிட்டால் உணவு கொடுக்க வேண்டாம்'];
  } else if (riskLevel === 'high') {
    actions.en = ['Prepare to visit a health facility', 'Keep important documents ready', 'Note down all symptoms and their duration'];
    actions.hi = ['स्वास्थ्य सुविधा जाने की तैयारी करें', 'महत्वपूर्ण दस्तावेज तैयार रखें', 'सभी लक्षणों और उनकी अवधि को नोट करें'];
    actions.ta = ['சுகாதார மையத்திற்கு செல்ல தயாராகுங்கள்', 'முக்கிய ஆவணங்களை தயாராக வைக்கவும்', 'அறிகுறிகளை குறித்து வைக்கவும்'];
  } else if (riskLevel === 'medium') {
    actions.en = ['Rest and stay hydrated', 'Monitor symptoms regularly', 'Take over-the-counter medication if appropriate'];
    actions.hi = ['आराम करें और पानी पीते रहें', 'नियमित रूप से लक्षणों की निगरानी करें', 'यदि उचित हो तो ओटीसी दवा लें'];
    actions.ta = ['ஓய்வு எடுங்கள், நீர் அருந்துங்கள்', 'அறிகுறிகளை கவனியுங்கள்', 'தேவைப்பட்டால் மருந்து எடுக்கவும்'];
  } else {
    actions.en = ['Get adequate rest', 'Drink plenty of fluids', 'Eat light, nutritious meals'];
    actions.hi = ['पर्याप्त आराम करें', 'खूब तरल पदार्थ पिएं', 'हल्का, पौष्टिक भोजन करें'];
    actions.ta = ['போதுமான ஓய்வு எடுங்கள்', 'நிறைய நீர் அருந்துங்கள்', 'இலகுவான உணவு சாப்பிடுங்கள்'];
  }

  return actions;
}
