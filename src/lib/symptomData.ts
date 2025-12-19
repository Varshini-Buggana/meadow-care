export interface Symptom {
  id: string;
  name: Record<string, string>;
  category: 'general' | 'respiratory' | 'digestive' | 'pain' | 'neurological' | 'skin';
  severity: number;
}

export const symptoms: Symptom[] = [
  { id: 'fever', name: { en: 'Fever', hi: 'बुखार', te: 'జ్వరం' }, category: 'general', severity: 2 },
  { id: 'headache', name: { en: 'Headache', hi: 'सिरदर्द', te: 'తలనొప్పి' }, category: 'neurological', severity: 2 },
  { id: 'cough', name: { en: 'Cough', hi: 'खांसी', te: 'దగ్గు' }, category: 'respiratory', severity: 1 },
  { id: 'shortness_of_breath', name: { en: 'Shortness of Breath', hi: 'सांस की तकलीफ', te: 'ఊపిరి ఆడకపోవడం' }, category: 'respiratory', severity: 4 },
  { id: 'chest_pain', name: { en: 'Chest Pain', hi: 'सीने में दर्द', te: 'ఛాతీ నొప్పి' }, category: 'pain', severity: 5 },
  { id: 'nausea', name: { en: 'Nausea', hi: 'मतली', te: 'వికారం' }, category: 'digestive', severity: 2 },
  { id: 'vomiting', name: { en: 'Vomiting', hi: 'उल्टी', te: 'వాంతులు' }, category: 'digestive', severity: 3 },
  { id: 'diarrhea', name: { en: 'Diarrhea', hi: 'दस्त', te: 'విరేచనాలు' }, category: 'digestive', severity: 2 },
  { id: 'fatigue', name: { en: 'Fatigue', hi: 'थकान', te: 'అలసట' }, category: 'general', severity: 1 },
  { id: 'dizziness', name: { en: 'Dizziness', hi: 'चक्कर आना', te: 'తల తిరగడం' }, category: 'neurological', severity: 3 },
  { id: 'body_ache', name: { en: 'Body Ache', hi: 'बदन दर्द', te: 'ఒంటి నొప్పి' }, category: 'pain', severity: 2 },
  { id: 'sore_throat', name: { en: 'Sore Throat', hi: 'गले में खराश', te: 'గొంతు నొప్పి' }, category: 'respiratory', severity: 1 },
  { id: 'rash', name: { en: 'Skin Rash', hi: 'त्वचा पर दाने', te: 'చర్మంపై దద్దుర్లు' }, category: 'skin', severity: 2 },
  { id: 'abdominal_pain', name: { en: 'Abdominal Pain', hi: 'पेट दर्द', te: 'కడుపు నొప్పి' }, category: 'digestive', severity: 3 },
  { id: 'loss_of_consciousness', name: { en: 'Loss of Consciousness', hi: 'बेहोशी', te: 'స్పృహ కోల్పోవడం' }, category: 'neurological', severity: 5 },
  { id: 'bleeding', name: { en: 'Bleeding', hi: 'खून बहना', te: 'రక్తస్రావం' }, category: 'general', severity: 4 },
  { id: 'injury', name: { en: 'Injury', hi: 'चोट', te: 'గాయం' }, category: 'general', severity: 4 },
];

export type RiskLevel = 'low' | 'medium' | 'high';

export interface AssessmentResult {
  riskLevel: RiskLevel;
  guidance: Record<string, string>;
}

export function assessSymptoms(selectedSymptomIds: string[]): AssessmentResult {
  // Simple rule-based assessment as per user requirements
  const hasChestPain = selectedSymptomIds.includes('chest_pain');
  const hasBreathlessness = selectedSymptomIds.includes('shortness_of_breath');
  const hasBleeding = selectedSymptomIds.includes('bleeding');
  const hasInjury = selectedSymptomIds.includes('injury');
  const hasFever = selectedSymptomIds.includes('fever');
  const hasHeadache = selectedSymptomIds.includes('headache');

  let riskLevel: RiskLevel;
  
  // HIGH RISK: chest pain OR breathlessness OR bleeding OR injury
  if (hasChestPain || hasBreathlessness || hasBleeding || hasInjury) {
    riskLevel = 'high';
  }
  // MEDIUM RISK: fever + headache
  else if (hasFever && hasHeadache) {
    riskLevel = 'medium';
  }
  // LOW RISK: everything else
  else {
    riskLevel = 'low';
  }

  const guidance = getGuidance(riskLevel);
  return { riskLevel, guidance };
}

function getGuidance(riskLevel: RiskLevel): Record<string, string> {
  const guidanceMap: Record<RiskLevel, Record<string, string>> = {
    low: {
      en: 'Your symptoms appear mild. Rest, stay hydrated, and monitor your condition. Consult a doctor if symptoms persist beyond 3 days.',
      hi: 'आपके लक्षण हल्के हैं। आराम करें, पानी पीते रहें। 3 दिनों से अधिक समय तक रहने पर डॉक्टर से मिलें।',
      te: 'మీ లక్షణాలు తేలికగా ఉన్నాయి. విశ్రాంతి తీసుకోండి, నీరు తాగండి. 3 రోజుల తర్వాత కూడా కొనసాగితే వైద్యుడిని సంప్రదించండి.',
    },
    medium: {
      en: 'Your symptoms suggest a moderate concern. Visit a local health center within 24-48 hours. Rest and monitor symptoms.',
      hi: 'आपके लक्षण मध्यम चिंता का संकेत देते हैं। 24-48 घंटों में स्वास्थ्य केंद्र जाएं। आराम करें।',
      te: 'మీ లక్షణాలు మధ్యస్థ ఆందోళనను సూచిస్తున్నాయి. 24-48 గంటల్లో ఆరోగ్య కేంద్రానికి వెళ్ళండి.',
    },
    high: {
      en: 'URGENT: Your symptoms indicate a serious concern. Please visit a healthcare facility immediately or call emergency services.',
      hi: 'तत्काल: आपके लक्षण गंभीर हैं। कृपया तुरंत अस्पताल जाएं या आपातकालीन सेवाओं को कॉल करें।',
      te: 'అత్యవసరం: మీ లక్షణాలు తీవ్రమైన ఆందోళనను సూచిస్తున్నాయి. వెంటనే ఆసుపత్రికి వెళ్ళండి లేదా అత్యవసర సేవలను కాల్ చేయండి.',
    },
  };

  return guidanceMap[riskLevel];
}
