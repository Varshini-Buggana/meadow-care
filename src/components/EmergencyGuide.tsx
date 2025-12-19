import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Bandage,
  ChevronRight,
  Heart,
  Droplets,
  Flame,
  Wind,
  Skull
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface EmergencyGuideProps {
  onBack: () => void;
}

const emergencyContacts = [
  { name: 'Emergency Services', number: '112', description: 'Police, Fire, Ambulance' },
  { name: 'Ambulance', number: '108', description: 'Medical Emergency' },
  { name: 'Women Helpline', number: '181', description: 'Women in distress' },
  { name: 'Child Helpline', number: '1098', description: 'Child in distress' },
];

const firstAidGuides = [
  {
    id: 'bleeding',
    icon: Droplets,
    title: { en: 'Severe Bleeding', hi: 'गंभीर रक्तस्राव', ta: 'கடுமையான இரத்தப்போக்கு' },
    steps: {
      en: [
        'Apply firm pressure with a clean cloth',
        'Keep the injured area elevated above the heart',
        'Do not remove the cloth if blood soaks through - add more layers',
        'Call emergency services immediately',
        'Keep the person calm and lying down',
      ],
      hi: [
        'साफ कपड़े से दबाव डालें',
        'घायल क्षेत्र को दिल से ऊपर रखें',
        'अगर खून कपड़े में समा जाए तो उसे न हटाएं - और परतें जोड़ें',
        'तुरंत आपातकालीन सेवाओं को कॉल करें',
        'व्यक्ति को शांत रखें और लेटाए रखें',
      ],
      ta: [
        'சுத்தமான துணியால் அழுத்தம் கொடுங்கள்',
        'காயமடைந்த பகுதியை இதயத்திற்கு மேலே உயர்த்தி வைக்கவும்',
        'இரத்தம் துணியில் ஊறினால் அகற்ற வேண்டாம் - மேலும் துணி சேர்க்கவும்',
        'உடனடியாக அவசர சேவைகளை அழைக்கவும்',
        'நபரை அமைதியாக படுக்க வைக்கவும்',
      ],
    },
  },
  {
    id: 'burns',
    icon: Flame,
    title: { en: 'Burns', hi: 'जलना', ta: 'தீக்காயங்கள்' },
    steps: {
      en: [
        'Cool the burn under cool running water for at least 10 minutes',
        'Remove jewelry or tight clothing near the burn (before swelling)',
        'Cover loosely with a clean, non-fluffy material',
        'Do NOT apply ice, butter, or toothpaste',
        'Seek medical attention for serious burns',
      ],
      hi: [
        'जले हुए हिस्से को कम से कम 10 मिनट ठंडे पानी में रखें',
        'जले के पास से आभूषण या तंग कपड़े हटाएं (सूजन से पहले)',
        'साफ, गैर-रोएंदार सामग्री से ढीला ढकें',
        'बर्फ, मक्खन या टूथपेस्ट न लगाएं',
        'गंभीर जलने पर चिकित्सा सहायता लें',
      ],
      ta: [
        'தீக்காயத்தை குளிர்ந்த நீரில் குறைந்தது 10 நிமிடம் வைக்கவும்',
        'நகைகள் அல்லது இறுக்கமான ஆடைகளை அகற்றவும் (வீக்கத்திற்கு முன்)',
        'சுத்தமான துணியால் தளர்வாக மூடவும்',
        'பனிக்கட்டி, வெண்ணெய் போடாதீர்கள்',
        'கடுமையான தீக்காயங்களுக்கு மருத்துவ உதவி பெறுங்கள்',
      ],
    },
  },
  {
    id: 'choking',
    icon: Wind,
    title: { en: 'Choking', hi: 'गला घुटना', ta: 'மூச்சுத்திணறல்' },
    steps: {
      en: [
        'Encourage coughing if person can cough forcefully',
        'Give 5 back blows between shoulder blades',
        'Give 5 abdominal thrusts (Heimlich maneuver)',
        'Alternate between back blows and abdominal thrusts',
        'Call emergency services if blockage persists',
      ],
      hi: [
        'अगर व्यक्ति जोर से खांस सकता है तो खांसने के लिए प्रोत्साहित करें',
        'कंधों के बीच 5 बार पीठ पर थपकी दें',
        '5 बार पेट पर जोर से दबाव दें (हेमलिक पद्धति)',
        'पीठ पर थपकी और पेट पर दबाव को बारी-बारी से करें',
        'अगर रुकावट बनी रहे तो आपातकालीन सेवाओं को कॉल करें',
      ],
      ta: [
        'நபர் வலுவாக இருமினால் இருமலை ஊக்குவிக்கவும்',
        'தோள்களுக்கு இடையில் 5 முதுகு அடிகள் கொடுங்கள்',
        '5 வயிற்று அழுத்தங்கள் கொடுங்கள்',
        'முதுகு அடிகள் மற்றும் வயிற்று அழுத்தங்களை மாற்றி மாற்றி செய்யுங்கள்',
        'தடை நீடித்தால் அவசர சேவைகளை அழைக்கவும்',
      ],
    },
  },
  {
    id: 'heartattack',
    icon: Heart,
    title: { en: 'Heart Attack Signs', hi: 'दिल का दौरा', ta: 'மாரடைப்பு' },
    steps: {
      en: [
        'Call emergency services immediately (112 or 108)',
        'Have the person sit or lie down comfortably',
        'If they have prescribed aspirin and are not allergic, give one',
        'Loosen any tight clothing',
        'Be prepared to perform CPR if person becomes unresponsive',
      ],
      hi: [
        'तुरंत आपातकालीन सेवाओं को कॉल करें (112 या 108)',
        'व्यक्ति को आराम से बैठने या लेटने दें',
        'अगर उन्हें एस्पिरिन निर्धारित है और एलर्जी नहीं है, तो एक दें',
        'कोई भी तंग कपड़ा ढीला करें',
        'अगर व्यक्ति बेहोश हो जाए तो CPR करने के लिए तैयार रहें',
      ],
      ta: [
        'உடனடியாக அவசர சேவைகளை அழைக்கவும் (112 அல்லது 108)',
        'நபரை வசதியாக உட்காரவும் அல்லது படுக்கவும்',
        'ஆஸ்பிரின் பரிந்துரைக்கப்பட்டிருந்தால், ஒன்று கொடுங்கள்',
        'இறுக்கமான ஆடைகளை தளர்த்துங்கள்',
        'நபர் பதிலளிக்கவில்லை என்றால் CPR செய்ய தயாராக இருங்கள்',
      ],
    },
  },
  {
    id: 'poisoning',
    icon: Skull,
    title: { en: 'Poisoning', hi: 'विषाक्तता', ta: 'நச்சுத்தன்மை' },
    steps: {
      en: [
        'Call poison control or emergency services immediately',
        'Do NOT induce vomiting unless instructed by medical professionals',
        'Try to identify what was consumed and how much',
        'Keep the person calm and monitor breathing',
        'Bring the poison container to the hospital if possible',
      ],
      hi: [
        'तुरंत पॉइज़न कंट्रोल या आपातकालीन सेवाओं को कॉल करें',
        'चिकित्सा पेशेवरों द्वारा निर्देश दिए बिना उल्टी न कराएं',
        'पता लगाने की कोशिश करें कि क्या और कितना खाया गया',
        'व्यक्ति को शांत रखें और सांस की निगरानी करें',
        'अगर संभव हो तो जहर का कंटेनर अस्पताल ले जाएं',
      ],
      ta: [
        'உடனடியாக விஷ கட்டுப்பாட்டு அல்லது அவசர சேவைகளை அழைக்கவும்',
        'மருத்துவர்கள் கூறாமல் வாந்தி எடுக்க வைக்காதீர்கள்',
        'என்ன எவ்வளவு உட்கொண்டது என்பதை கண்டறியுங்கள்',
        'நபரை அமைதியாக வைத்து சுவாசத்தை கவனியுங்கள்',
        'முடிந்தால் விஷ கொள்கலனை மருத்துவமனைக்கு கொண்டு செல்லுங்கள்',
      ],
    },
  },
];

export function EmergencyGuide({ onBack }: EmergencyGuideProps) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-display font-bold">{t.emergency}</h1>
      </div>

      {/* Emergency Call Button */}
      <Button
        variant="kioskEmergency"
        size="kiosk"
        className="w-full gap-3 animate-pulse-soft"
        onClick={() => window.location.href = 'tel:112'}
      >
        <Phone className="w-6 h-6" />
        {t.callEmergency} - 112
      </Button>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            {t.emergencyContacts}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors touch-target"
            >
              <div>
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-muted-foreground">{contact.description}</div>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold">
                {contact.number}
                <ChevronRight className="w-5 h-5" />
              </div>
            </a>
          ))}
        </CardContent>
      </Card>

      {/* First Aid Guides */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bandage className="w-5 h-5 text-primary" />
            {t.firstAidGuide}
          </CardTitle>
          <CardDescription>Quick reference for common emergencies</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {firstAidGuides.map((guide) => {
              const IconComponent = guide.icon;
              return (
                <AccordionItem key={guide.id} value={guide.id} className="border rounded-lg px-4">
                  <AccordionTrigger className="hover:no-underline py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium text-left">{guide.title[language as keyof typeof guide.title]}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <ol className="space-y-3 pl-2">
                      {guide.steps[language as keyof typeof guide.steps].map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>

      {/* Nearby Facilities Placeholder */}
      <Card variant="outline">
        <CardContent className="py-6 text-center">
          <MapPin className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
          <p className="font-medium">{t.nearbyFacilities}</p>
          <p className="text-sm text-muted-foreground mt-1">
            Location services not available offline
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
