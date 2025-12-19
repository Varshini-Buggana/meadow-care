import { Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function OfflineIndicator() {
  const { isOnline, lastSyncTime, isSyncing, triggerSync } = useOfflineStatus();
  const { t } = useLanguage();

  const formatLastSync = () => {
    if (!lastSyncTime) return t.neverSynced;
    const now = new Date();
    const diff = now.getTime() - lastSyncTime.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return lastSyncTime.toLocaleDateString();
  };

  return (
    <div className={cn(
      "flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300",
      isOnline 
        ? "bg-success/10 text-success" 
        : "bg-warning/10 text-warning"
    )}>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <Wifi className="w-5 h-5" />
        ) : (
          <WifiOff className="w-5 h-5 animate-pulse-soft" />
        )}
        <span className="font-medium text-sm">
          {isOnline ? t.online : t.offline}
        </span>
      </div>
      
      {isOnline && (
        <div className="flex items-center gap-2 pl-3 border-l border-current/20">
          <span className="text-xs opacity-75">
            {t.lastSync}: {formatLastSync()}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={triggerSync}
            disabled={isSyncing}
            className="h-7 px-2"
          >
            <RefreshCw className={cn("w-4 h-4", isSyncing && "animate-spin")} />
          </Button>
        </div>
      )}
    </div>
  );
}
