import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { OfflineIndicator } from '@/components/OfflineIndicator';
import { LanguageSelector } from '@/components/LanguageSelector';
import { SymptomChecker } from '@/components/SymptomChecker';
import { PatientRecords } from '@/components/PatientRecords';
import { EmergencyGuide } from '@/components/EmergencyGuide';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Stethoscope, 
  Users, 
  AlertTriangle, 
  Activity,
  Heart,
  Shield
} from 'lucide-react';

type View = 'dashboard' | 'symptoms' | 'records' | 'emergency';

const Dashboard = () => {
  const { t } = useLanguage();
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
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elevated">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gradient">{t.appName}</h1>
            <p className="text-sm text-muted-foreground">{t.tagline}</p>
          </div>
        </div>
        <LanguageSelector />
      </header>

      {/* Offline Status */}
      <OfflineIndicator />

      {/* Emergency Quick Access */}
      <Button
        variant="kioskEmergency"
        size="kiosk"
        className="w-full gap-3"
        onClick={() => setCurrentView('emergency')}
      >
        <AlertTriangle className="w-6 h-6" />
        {t.emergencyHelp}
      </Button>

      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-display font-semibold mb-4">{t.quickActions}</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card 
            variant="interactive"
            className="cursor-pointer"
            onClick={() => setCurrentView('symptoms')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Stethoscope className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold">{t.checkSymptoms}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t.symptomAssessment}
              </p>
            </CardContent>
          </Card>

          <Card 
            variant="interactive"
            className="cursor-pointer"
            onClick={() => setCurrentView('records')}
          >
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold">{t.viewRecords}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t.patientRecords}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Overview */}
      <section>
        <h2 className="text-lg font-display font-semibold mb-4">Features</h2>
        <div className="space-y-3">
          <Card variant="outline">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{t.offlineReady}</h4>
                <p className="text-sm text-muted-foreground">
                  All data stored locally on your device
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{t.symptomAssessment}</h4>
                <p className="text-sm text-muted-foreground">
                  Rule-based risk evaluation system
                </p>
              </div>
            </CardContent>
          </Card>

          <Card variant="outline">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{t.firstAidGuide}</h4>
                <p className="text-sm text-muted-foreground">
                  Step-by-step emergency guidance
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-border">
        <p className="text-sm text-muted-foreground">
          MedRelay v1.0 • Designed for rural healthcare
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
