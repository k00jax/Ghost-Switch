import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Platform, PlatformContextType, PlatformStatus, PlatformConnector } from '@/types/platform';
import { ConnectorRegistry } from '@/services/ConnectorRegistry';

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

// Mock platform data for demonstration
const createMockPlatform = (connector: PlatformConnector): Platform => ({
  id: connector.id,
  name: connector.name,
  icon: connector.icon,
  isConnected: true,
  currentStatus: 'online',
  operationState: 'idle',
  lastUpdated: new Date(),
});

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  useEffect(() => {
    // Initialize with mock connected platforms
    const mockPlatforms = [
      createMockPlatform(ConnectorRegistry.getConnector('slack')!),
      createMockPlatform(ConnectorRegistry.getConnector('discord')!),
      createMockPlatform(ConnectorRegistry.getConnector('whatsapp')!),
    ];
    
    setPlatforms(mockPlatforms);
  }, []);

  const addPlatform = (connector: PlatformConnector) => {
    const newPlatform = createMockPlatform(connector);
    setPlatforms(prev => [...prev, newPlatform]);
  };

  const removePlatform = (platformId: string) => {
    setPlatforms(prev => prev.filter(p => p.id !== platformId));
  };

  const togglePlatform = (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, isConnected: !platform.isConnected }
        : platform
    ));
  };

  const updatePlatformStatus = async (platformId: string, status: PlatformStatus) => {
    // Set to pending state
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, operationState: 'pending' as const }
        : platform
    ));

    try {
      const connector = ConnectorRegistry.getConnector(platformId);
      if (!connector) {
        throw new Error(`Connector not found for platform: ${platformId}`);
      }

      // Initialize with mock credentials if not already done
      if (!connector.isConfigured()) {
        await connector.initialize({ mockCredentials: true });
      }

      // Attempt to change status
      await connector.changeStatus(status);

      // Update to success state
      setPlatforms(prev => prev.map(platform => 
        platform.id === platformId 
          ? { 
              ...platform, 
              currentStatus: status,
              operationState: 'success' as const,
              lastUpdated: new Date(),
              error: undefined,
            }
          : platform
      ));

      // Reset to idle after a delay
      setTimeout(() => {
        setPlatforms(prev => prev.map(platform => 
          platform.id === platformId 
            ? { ...platform, operationState: 'idle' as const }
            : platform
        ));
      }, 2000);

    } catch (error) {
      // Update to error state
      setPlatforms(prev => prev.map(platform => 
        platform.id === platformId 
          ? { 
              ...platform, 
              operationState: 'error' as const,
              error: error instanceof Error ? error.message : 'Unknown error',
            }
          : platform
      ));
    }
  };

  const goInvisibleAll = async () => {
    const connectedPlatforms = platforms.filter(p => p.isConnected);
    
    // Update all connected platforms to invisible status
    const promises = connectedPlatforms.map(platform => 
      updatePlatformStatus(platform.id, 'invisible')
    );

    await Promise.allSettled(promises);
  };

  const value: PlatformContextType = {
    platforms,
    addPlatform,
    removePlatform,
    togglePlatform,
    updatePlatformStatus,
    goInvisibleAll,
  };

  return (
    <PlatformContext.Provider value={value}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatforms(): PlatformContextType {
  const context = useContext(PlatformContext);
  if (context === undefined) {
    throw new Error('usePlatforms must be used within a PlatformProvider');
  }
  return context;
}