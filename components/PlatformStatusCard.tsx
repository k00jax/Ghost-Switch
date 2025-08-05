import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Check, X, Loader as Loader2, RotateCcw } from 'lucide-react-native';
import { Platform } from '@/types/platform';
import { usePlatforms } from '@/hooks/usePlatforms';

interface PlatformStatusCardProps {
  platform: Platform;
}

export function PlatformStatusCard({ platform }: PlatformStatusCardProps) {
  const { updatePlatformStatus } = usePlatforms();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'invisible': return '#6b7280';
      case 'away': return '#f59e0b';
      case 'busy': return '#ef4444';
      case 'offline': return '#374151';
      default: return '#6b7280';
    }
  };

  const getOperationIcon = () => {
    switch (platform.operationState) {
      case 'pending':
        return <Loader2 size={20} color="#8b5cf6" style={{ transform: [{ rotate: '45deg' }] }} />;
      case 'success':
        return <Check size={20} color="#10b981" />;
      case 'error':
        return <X size={20} color="#ef4444" />;
      default:
        return null;
    }
  };

  const handleRetry = () => {
    if (platform.operationState === 'error') {
      updatePlatformStatus(platform.id, 'invisible');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.platformInfo}>
          <Text style={styles.icon}>{platform.icon}</Text>
          <View style={styles.details}>
            <Text style={styles.name}>{platform.name}</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(platform.currentStatus) }]} />
              <Text style={[styles.status, { color: getStatusColor(platform.currentStatus) }]}>
                {platform.currentStatus.charAt(0).toUpperCase() + platform.currentStatus.slice(1)}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.operationStatus}>
          {getOperationIcon()}
          {platform.operationState === 'error' && (
            <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
              <RotateCcw size={16} color="#8b5cf6" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {platform.error && (
        <Text style={styles.errorText}>{platform.error}</Text>
      )}
      
      <Text style={styles.lastUpdated}>
        Last updated: {platform.lastUpdated.toLocaleTimeString()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  platformInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  operationStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  retryButton: {
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666',
  },
});