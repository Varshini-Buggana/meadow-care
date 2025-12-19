import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft, 
  User, 
  Plus, 
  Heart,
  Droplets,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  allergies?: string[];
  conditions?: string[];
  lastVisit?: string;
}

interface PatientRecordsProps {
  onBack: () => void;
}

export function PatientRecords({ onBack }: PatientRecordsProps) {
  const { t } = useLanguage();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState<Partial<Patient>>({
    gender: 'male',
  });

  useEffect(() => {
    const saved = localStorage.getItem('medrelay-patients');
    if (saved) {
      setPatients(JSON.parse(saved));
    }
  }, []);

  const savePatients = (updatedPatients: Patient[]) => {
    setPatients(updatedPatients);
    localStorage.setItem('medrelay-patients', JSON.stringify(updatedPatients));
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age) return;

    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      age: newPatient.age,
      gender: newPatient.gender as 'male' | 'female' | 'other',
      bloodType: newPatient.bloodType,
      allergies: newPatient.allergies?.toString().split(',').map(s => s.trim()).filter(Boolean),
      conditions: newPatient.conditions?.toString().split(',').map(s => s.trim()).filter(Boolean),
      lastVisit: new Date().toISOString(),
    };

    savePatients([...patients, patient]);
    setNewPatient({ gender: 'male' });
    setIsDialogOpen(false);
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold">{t.patientRecords}</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="gap-2">
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
                  value={newPatient.name || ''}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">{t.age}</Label>
                  <Input
                    id="age"
                    type="number"
                    value={newPatient.age || ''}
                    onChange={(e) => setNewPatient({ ...newPatient, age: parseInt(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">{t.gender}</Label>
                  <Select
                    value={newPatient.gender}
                    onValueChange={(value) => setNewPatient({ ...newPatient, gender: value as 'male' | 'female' | 'other' })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t.male}</SelectItem>
                      <SelectItem value="female">{t.female}</SelectItem>
                      <SelectItem value="other">{t.other}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="bloodType">{t.bloodType}</Label>
                <Select
                  value={newPatient.bloodType}
                  onValueChange={(value) => setNewPatient({ ...newPatient, bloodType: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="allergies">{t.allergies}</Label>
                <Input
                  id="allergies"
                  placeholder="Separate with commas"
                  value={newPatient.allergies || ''}
                  onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value as any })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="conditions">{t.conditions}</Label>
                <Input
                  id="conditions"
                  placeholder="Separate with commas"
                  value={newPatient.conditions || ''}
                  onChange={(e) => setNewPatient({ ...newPatient, conditions: e.target.value as any })}
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="secondary" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  {t.cancel}
                </Button>
                <Button className="flex-1" onClick={handleAddPatient}>
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
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">{t.noRecords}</p>
            <Button 
              variant="default" 
              className="mt-4 gap-2"
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
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      <CardDescription>
                        {patient.age} years • {patient.gender === 'male' ? t.male : patient.gender === 'female' ? t.female : t.other}
                      </CardDescription>
                    </div>
                  </div>
                  {patient.bloodType && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-emergency/10 text-emergency rounded-full text-sm font-medium">
                      <Droplets className="w-4 h-4" />
                      {patient.bloodType}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {patient.allergies && patient.allergies.length > 0 && (
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.allergies}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {patient.allergies.map((allergy, i) => (
                          <span key={i} className="px-2 py-0.5 bg-warning/10 text-warning text-xs rounded-full">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {patient.conditions && patient.conditions.length > 0 && (
                  <div className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">{t.conditions}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {patient.conditions.map((condition, i) => (
                          <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                            {condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {patient.lastVisit && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                    <Calendar className="w-4 h-4" />
                    Last updated: {new Date(patient.lastVisit).toLocaleDateString()}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
