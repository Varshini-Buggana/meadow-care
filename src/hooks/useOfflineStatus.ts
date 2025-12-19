import { useState, useEffect, useCallback } from 'react';

interface UseOfflineStatusReturn {
  isOnline: boolean;
  lastSyncTime: Date | null;
  isSyncing: boolean;
  triggerSync: () => Promise<void>;
}

export function useOfflineStatus(): UseOfflineStatusReturn {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(() => {
    const saved = localStorage.getItem('medrelay-last-sync');
    return saved ? new Date(saved) : null;
  });
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const triggerSync = useCallback(async () => {
    if (!isOnline || isSyncing) return;

    setIsSyncing(true);
    
    // Simulate sync operation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const now = new Date();
    setLastSyncTime(now);
    localStorage.setItem('medrelay-last-sync', now.toISOString());
    setIsSyncing(false);
  }, [isOnline, isSyncing]);

  return { isOnline, lastSyncTime, isSyncing, triggerSync };
}
