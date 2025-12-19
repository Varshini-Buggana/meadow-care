import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { symptoms, assessSymptoms, RiskLevel } from '@/lib/symptomData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SymptomCheckerProps {
  onBack: () => void;
}

export function SymptomChecker({ onBack }: SymptomCheckerProps) {
  const { language, t, isKioskMode } = useLanguage();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleCheck = () => {
    if (selectedSymptoms.length > 0) {
      setShowResults(true);
    }
  };

  const handleStartOver = () => {
    setSelectedSymptoms([]);
    setShowResults(false);
  };

  const result = showResults ? assessSymptoms(selectedSymptoms) : null;

  const getRiskConfig = (level: RiskLevel) => {
    const configs = {
      low: { 
        icon: CheckCircle, 
        color: 'text-success', 
        bg: 'bg-success/10', 
        border: 'border-success/30',
        label: t.low 
      },
      medium: { 
        icon: Info, 
        color: 'text-warning', 
        bg: 'bg-warning/10', 
        border: 'border-warning/30',
        label: t.medium 
      },
      high: { 
        icon: AlertTriangle, 
        color: 'text-emergency', 
        bg: 'bg-emergency/10', 
        border: 'border-emergency/30',
        label: t.high 
      },
    };
    return configs[level];
  };

  // Results View
  if (showResults && result) {
    const riskConfig = getRiskConfig(result.riskLevel);
    const RiskIcon = riskConfig.icon;

    return (
      <div className={cn("space-y-6 animate-fade-in", isKioskMode && "text-xl")}>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className={cn("w-5 h-5", isKioskMode && "w-7 h-7")} />
          </Button>
          <h1 className={cn("text-2xl font-display font-bold", isKioskMode && "text-3xl")}>{t.symptomAssessment}</h1>
        </div>

        <Card className={cn("border-2", riskConfig.border, riskConfig.bg)}>
          <CardHeader className="text-center pb-4">
            <RiskIcon className={cn("w-16 h-16 mx-auto mb-4", riskConfig.color, isKioskMode && "w-24 h-24")} />
            <CardTitle className={cn("text-2xl", isKioskMode && "text-3xl")}>{t.riskLevel}</CardTitle>
            <div className={cn("text-3xl font-bold mt-2", riskConfig.color, isKioskMode && "text-4xl")}>
              {riskConfig.label.toUpperCase()}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className={cn("font-semibold mb-2 flex items-center gap-2", isKioskMode && "text-xl")}>
                <AlertCircle className="w-5 h-5" />
                {t.guidance}
              </h3>
              <p className={cn("text-muted-foreground leading-relaxed", isKioskMode && "text-lg")}>
                {result.guidance[language]}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size={isKioskMode ? "kiosk" : "lg"}
            onClick={handleStartOver}
            className="gap-2"
          >
            <RefreshCw className={cn("w-5 h-5", isKioskMode && "w-6 h-6")} />
            {t.startOver}
          </Button>
          
          {result.riskLevel === 'high' ? (
            <Button
              variant="emergency"
              size={isKioskMode ? "kiosk" : "lg"}
              className="gap-2"
              onClick={() => window.location.href = 'tel:112'}
            >
              <Phone className={cn("w-5 h-5", isKioskMode && "w-6 h-6")} />
              {t.callEmergency}
            </Button>
          ) : (
            <Button
              variant="default"
              size={isKioskMode ? "kiosk" : "lg"}
              onClick={onBack}
            >
              {t.back}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Symptom Selection View
  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) acc[symptom.category] = [];
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, typeof symptoms>);

  const categoryLabels: Record<string, Record<string, string>> = {
    general: { en: 'General', hi: 'सामान्य', te: 'సాధారణ' },
    respiratory: { en: 'Respiratory', hi: 'श्वसन', te: 'శ్వాసకోశ' },
    digestive: { en: 'Digestive', hi: 'पाचन', te: 'జీర్ణ' },
    pain: { en: 'Pain', hi: 'दर्द', te: 'నొప్పి' },
    neurological: { en: 'Neurological', hi: 'तंत्रिका', te: 'నరాల' },
    skin: { en: 'Skin', hi: 'त्वचा', te: 'చర్మం' },
  };

  return (
    <div className={cn("space-y-6 animate-fade-in", isKioskMode && "text-xl")}>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className={cn("w-5 h-5", isKioskMode && "w-7 h-7")} />
        </Button>
        <div>
          <h1 className={cn("text-2xl font-display font-bold", isKioskMode && "text-3xl")}>{t.symptomChecker}</h1>
          <p className={cn("text-muted-foreground", isKioskMode && "text-lg")}>{t.howAreYouFeeling}</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
          <div key={category}>
            <h3 className={cn("font-semibold mb-3 text-muted-foreground uppercase text-sm tracking-wide", isKioskMode && "text-base")}>
              {categoryLabels[category]?.[language] || category}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {categorySymptoms.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    className={cn(
                      "p-4 rounded-xl text-left transition-all duration-200 touch-target",
                      isKioskMode && "p-6 text-lg min-h-[80px]",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-elevated"
                        : "bg-card shadow-card hover:shadow-elevated"
                    )}
                  >
                    <span className="font-medium">
                      {symptom.name[language] || symptom.name['en']}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          variant="kiosk"
          size="kiosk"
          className={cn("w-full", isKioskMode && "text-xl py-6")}
          onClick={handleCheck}
          disabled={selectedSymptoms.length === 0}
        >
          {t.check} ({selectedSymptoms.length})
        </Button>
      </div>
    </div>
  );
}
