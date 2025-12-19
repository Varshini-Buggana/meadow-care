import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { symptoms, assessSymptoms, RiskLevel } from '@/lib/symptomData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AlertCircle, 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  RefreshCw,
  AlertTriangle,
  Info,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SymptomCheckerProps {
  onBack: () => void;
}

export function SymptomChecker({ onBack }: SymptomCheckerProps) {
  const { language, t } = useLanguage();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleAssess = () => {
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
      critical: { 
        icon: XCircle, 
        color: 'text-emergency', 
        bg: 'bg-emergency/20', 
        border: 'border-emergency',
        label: t.critical 
      },
    };
    return configs[level];
  };

  if (showResults && result) {
    const riskConfig = getRiskConfig(result.riskLevel);
    const RiskIcon = riskConfig.icon;

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold">{t.symptomAssessment}</h1>
        </div>

        <Card className={cn("border-2", riskConfig.border, riskConfig.bg)}>
          <CardHeader className="text-center pb-4">
            <RiskIcon className={cn("w-16 h-16 mx-auto mb-4", riskConfig.color)} />
            <CardTitle className="text-2xl">{t.riskLevel}</CardTitle>
            <div className={cn("text-3xl font-bold mt-2", riskConfig.color)}>
              {riskConfig.label.toUpperCase()}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {t.guidance}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {result.guidance[language]}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Immediate Actions:</h3>
              <ul className="space-y-2">
                {result.immediateActions[language].map((action, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 p-3 bg-card rounded-lg"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleStartOver}
            className="gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            {t.startOver}
          </Button>
          
          {result.riskLevel === 'critical' || result.riskLevel === 'high' ? (
            <Button
              variant="emergency"
              size="lg"
              className="gap-2"
              onClick={() => window.location.href = 'tel:112'}
            >
              <Phone className="w-5 h-5" />
              {t.callEmergency}
            </Button>
          ) : (
            <Button
              variant="default"
              size="lg"
              onClick={onBack}
            >
              {t.back}
            </Button>
          )}
        </div>
      </div>
    );
  }

  const groupedSymptoms = symptoms.reduce((acc, symptom) => {
    if (!acc[symptom.category]) acc[symptom.category] = [];
    acc[symptom.category].push(symptom);
    return acc;
  }, {} as Record<string, typeof symptoms>);

  const categoryLabels: Record<string, Record<string, string>> = {
    general: { en: 'General', hi: 'सामान्य', ta: 'பொது' },
    respiratory: { en: 'Respiratory', hi: 'श्वसन', ta: 'சுவாசம்' },
    digestive: { en: 'Digestive', hi: 'पाचन', ta: 'செரிமான' },
    pain: { en: 'Pain', hi: 'दर्द', ta: 'வலி' },
    neurological: { en: 'Neurological', hi: 'तंत्रिका', ta: 'நரம்பியல்' },
    skin: { en: 'Skin', hi: 'त्वचा', ta: 'தோல்' },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-display font-bold">{t.symptomChecker}</h1>
          <p className="text-muted-foreground">{t.howAreYouFeeling}</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSymptoms).map(([category, categorySymptoms]) => (
          <div key={category}>
            <h3 className="font-semibold mb-3 text-muted-foreground uppercase text-sm tracking-wide">
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
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-elevated"
                        : "bg-card shadow-card hover:shadow-elevated"
                    )}
                  >
                    <span className="font-medium">
                      {symptom.name[language]}
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
          className="w-full"
          onClick={handleAssess}
          disabled={selectedSymptoms.length === 0}
        >
          {t.assessRisk} ({selectedSymptoms.length} {t.selectSymptoms})
        </Button>
      </div>
    </div>
  );
}
