import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Platform } from '@/types/platform';

interface StatusSummaryProps {
  platforms: Platform[];
}

export function StatusSummary({ platforms }: StatusSummaryProps) {
  const connectedPlatforms = platforms.filter(p => p.isConnected);
  const onlinePlatforms = connectedPlatforms.filter(p => p.currentStatus === 'online');
  const invisiblePlatforms = connectedPlatforms.filter(p => p.currentStatus === 'invisible');
  const pendingOperations = platforms.filter(p => p.operationState === 'pending');

  if (connectedPlatforms.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Connected Platforms</Text>
        <Text style={styles.subtitle}>Connect platforms to start managing your status</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Status Overview</Text>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{connectedPlatforms.length}</Text>
          <Text style={styles.statLabel}>Connected</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: '#10b981' }]}>{onlinePlatforms.length}</Text>
          <Text style={styles.statLabel}>Online</Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statNumber, { color: '#6b7280' }]}>{invisiblePlatforms.length}</Text>
          <Text style={styles.statLabel}>Invisible</Text>
        </View>
      </View>
      
      {pendingOperations.length > 0 && (
        <Text style={styles.pendingText}>
          {pendingOperations.length} operation{pendingOperations.length !== 1 ? 's' : ''} in progress...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pendingText: {
    fontSize: 12,
    color: '#8b5cf6',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
});