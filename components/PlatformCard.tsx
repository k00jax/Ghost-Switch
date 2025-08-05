import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Platform } from '@/types/platform';

interface PlatformCardProps {
  platform: Platform;
  onToggle: () => void;
}

export function PlatformCard({ platform, onToggle }: PlatformCardProps) {
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

  return (
    <View style={[styles.container, !platform.isConnected && styles.disconnected]}>
      <View style={styles.content}>
        <View style={styles.platformInfo}>
          <Text style={styles.icon}>{platform.icon}</Text>
          <View style={styles.details}>
            <Text style={styles.name}>{platform.name}</Text>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(platform.currentStatus) }]} />
              <Text style={[styles.status, { color: getStatusColor(platform.currentStatus) }]}>
                {platform.isConnected 
                  ? platform.currentStatus.charAt(0).toUpperCase() + platform.currentStatus.slice(1)
                  : 'Disconnected'
                }
              </Text>
            </View>
          </View>
        </View>
        
        <Switch
          value={platform.isConnected}
          onValueChange={onToggle}
          trackColor={{ false: '#374151', true: '#8b5cf6' }}
          thumbColor={platform.isConnected ? '#fff' : '#9ca3af'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  disconnected: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
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
});