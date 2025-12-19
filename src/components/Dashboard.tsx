import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SymptomChecker } from '@/components/SymptomChecker';
import { PatientRecords } from '@/components/PatientRecords';
import { EmergencyGuide } from '@/components/EmergencyGuide';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Stethoscope, 
  Users, 
  AlertTriangle,
  Heart,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';

type View = 'dashboard' | 'symptoms' | 'records' | 'emergency';

const Dashboard = () => {
  const { t, isKioskMode, setKioskMode } = useLanguage();
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (currentView === 'symptoms') {
    return <SymptomChecker onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'records') {
    return <PatientRecords onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'emergency') {
    return <EmergencyGuide onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className={cn("space-y-6 animate-fade-in", isKioskMode && "text-xl")}>
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elevated", isKioskMode && "w-16 h-16")}>
            <Heart className={cn("w-6 h-6 text-primary-foreground", isKioskMode && "w-8 h-8")} />
          </div>
          <div>
            <h1 className={cn("text-2xl font-display font-bold text-gradient", isKioskMode && "text-3xl")}>{t.appName}</h1>
            <p className={cn("text-sm text-muted-foreground", isKioskMode && "text-base")}>{t.tagline}</p>
          </div>
        </div>
        <LanguageSelector />
      </header>

      {/* Offline Status */}
      <OfflineIndicator />

      {/* Kiosk Mode Toggle */}
      <div className={cn("flex items-center justify-between p-4 bg-card rounded-xl border border-border", isKioskMode && "p-6")}>
        <div className="flex items-center gap-3">
          <Monitor className={cn("w-5 h-5 text-muted-foreground", isKioskMode && "w-6 h-6")} />
          <Label htmlFor="kiosk-mode" className={cn("font-medium", isKioskMode && "text-lg")}>
            {t.kioskMode}
          </Label>
        </div>
        <Switch
          id="kiosk-mode"
          checked={isKioskMode}
          onCheckedChange={setKioskMode}
        />
      </div>

      {/* Emergency Quick Access */}
      <Button
        variant="kioskEmergency"
        size="kiosk"
        className={cn("w-full gap-3", isKioskMode && "text-2xl py-8")}
        onClick={() => setCurrentView('emergency')}
      >
        <AlertTriangle className={cn("w-6 h-6", isKioskMode && "w-8 h-8")} />
        {t.emergencyHelp}
      </Button>

      {/* Quick Actions */}
      <section>
        <h2 className={cn("text-lg font-display font-semibold mb-4", isKioskMode && "text-2xl")}>{t.quickActions}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            variant="interactive"
            className="cursor-pointer"
            onClick={() => setCurrentView('symptoms')}
          >
            <CardContent className={cn("p-6 text-center", isKioskMode && "p-8")}>
              <div className={cn("w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3", isKioskMode && "w-20 h-20")}>
                <Stethoscope className={cn("w-7 h-7 text-primary", isKioskMode && "w-10 h-10")} />
              </div>
              <h3 className={cn("font-semibold", isKioskMode && "text-xl")}>{t.symptomChecker}</h3>
              <p className={cn("text-sm text-muted-foreground mt-1", isKioskMode && "text-base")}>
                {t.checkSymptoms}
              </p>
            </CardContent>
          </Card>

          <Card 
            variant="interactive"
            className="cursor-pointer"
            onClick={() => setCurrentView('records')}
          >
            <CardContent className={cn("p-6 text-center", isKioskMode && "p-8")}>
              <div className={cn("w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3", isKioskMode && "w-20 h-20")}>
                <Users className={cn("w-7 h-7 text-primary", isKioskMode && "w-10 h-10")} />
              </div>
              <h3 className={cn("font-semibold", isKioskMode && "text-xl")}>{t.patientRecords}</h3>
              <p className={cn("text-sm text-muted-foreground mt-1", isKioskMode && "text-base")}>
                {t.viewRecords}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-border">
        <p className={cn("text-sm text-muted-foreground", isKioskMode && "text-base")}>
          MedRelay v1.0 • {t.offlineReady}
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
