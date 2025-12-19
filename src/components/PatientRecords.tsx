import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  User, 
  Plus,
  Trash2,
  Stethoscope
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Patient {
  id: string;
  name: string;
  age: number;
  symptoms: string;
  createdAt: string;
}

interface PatientRecordsProps {
  onBack: () => void;
}

export function PatientRecords({ onBack }: PatientRecordsProps) {
  const { t, isKioskMode } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    symptoms: '',
  });

  // Load patients from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('medrelay-patients');
    if (saved) {
      try {
        setPatients(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse patients from localStorage');
      }
    }
  }, []);

  // Save patients to localStorage
  const savePatients = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients);
    localStorage.setItem('medrelay-patients', JSON.stringify(updatedPatients));
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age) return;

    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name.trim(),
      age: parseInt(newPatient.age),
      symptoms: newPatient.symptoms.trim(),
      createdAt: new Date().toISOString(),
    };

    savePatients([...patients, patient]);
    setNewPatient({ name: '', age: '', symptoms: '' });
    setIsDialogOpen(false);
  };

  const handleDeletePatient = (patientId: string) => {
    const updatedPatients = patients.filter(p => p.id !== patientId);
    savePatients(updatedPatients);
  };

  return (
    <div className={cn("space-y-6 animate-fade-in", isKioskMode && "text-xl")}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className={cn("w-5 h-5", isKioskMode && "w-7 h-7")} />
          </Button>
          <h1 className={cn("text-2xl font-display font-bold", isKioskMode && "text-3xl")}>{t.patientRecords}</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className={cn("gap-2", isKioskMode && "text-lg px-6 py-3")}>
              <Plus className="w-4 h-4" />
              {t.addPatient}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t.addPatient}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="name">{t.name}</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="mt-1"
                  placeholder="Enter patient name"
                />
              </div>
              <div>
                <Label htmlFor="age">{t.age}</Label>
                <Input
                  id="age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  className="mt-1"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <Label htmlFor="symptoms">{t.symptoms}</Label>
                <Textarea
                  id="symptoms"
                  value={newPatient.symptoms}
                  onChange={(e) => setNewPatient({ ...newPatient, symptoms: e.target.value })}
                  className="mt-1"
                  placeholder="Enter symptoms (e.g., fever, headache)"
                  rows={3}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  {t.cancel}
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={handleAddPatient}
                  disabled={!newPatient.name || !newPatient.age}
                >
                  {t.save}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {patients.length === 0 ? (
        <Card variant="outline" className="text-center py-12">
          <CardContent>
            <User className={cn("w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50", isKioskMode && "w-20 h-20")} />
            <p className={cn("text-muted-foreground", isKioskMode && "text-xl")}>{t.noRecords}</p>
            <Button 
              variant="default" 
              className={cn("mt-4 gap-2", isKioskMode && "text-lg px-6 py-3")}
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              {t.addPatient}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {patients.map((patient) => (
            <Card key={patient.id} variant="interactive">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center", isKioskMode && "w-16 h-16")}>
                      <User className={cn("w-6 h-6 text-primary", isKioskMode && "w-8 h-8")} />
                    </div>
                    <div>
                      <CardTitle className={cn("text-lg", isKioskMode && "text-2xl")}>{patient.name}</CardTitle>
                      <CardDescription className={isKioskMode ? "text-lg" : ""}>
                        {patient.age} {t.age.toLowerCase() === 'age' ? 'years' : ''}
                      </CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeletePatient(patient.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className={cn("w-5 h-5", isKioskMode && "w-6 h-6")} />
                  </Button>
                </div>
              </CardHeader>
              {patient.symptoms && (
                <CardContent className="pt-0">
                  <div className="flex items-start gap-2">
                    <Stethoscope className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.symptoms}</span>
                      <p className={cn("text-sm mt-1", isKioskMode && "text-base")}>{patient.symptoms}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
