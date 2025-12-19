import { Wifi, WifiOff } from 'lucide-react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { isOnline } = useOfflineStatus();
  const { t, isKioskMode } = useLanguage();

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
      isKioskMode && "px-6 py-4",
      isOnline 
        ? "bg-success/10 text-success" 
        : "bg-warning/20 text-warning border-2 border-warning/40"
    )}>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className={cn("w-5 h-5", isKioskMode && "w-7 h-7")} />
        ) : (
          <WifiOff className={cn("w-5 h-5 animate-pulse", isKioskMode && "w-7 h-7")} />
        )}
        <span className={cn("font-semibold text-sm", isKioskMode && "text-lg")}>
          {isOnline ? t.online : t.offlineModeEnabled}
        </span>
      </div>
    </div>
  );
}
