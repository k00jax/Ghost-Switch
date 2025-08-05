import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { usePlatforms } from '@/hooks/usePlatforms';
import { PlatformStatusCard } from '@/components/PlatformStatusCard';
import { GhostButton } from '@/components/GhostButton';
import { StatusSummary } from '@/components/StatusSummary';

export default function Dashboard() {
  const { user } = useAuth();
  const { platforms, goInvisibleAll } = usePlatforms();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Ghost Switch</Text>
          <Text style={styles.subtitle}>Welcome back, {user?.name || 'User'}</Text>
        </View>

        <StatusSummary platforms={platforms} />

        <GhostButton onPress={goInvisibleAll} platforms={platforms} />

        <View style={styles.platformsList}>
          <Text style={styles.sectionTitle}>Connected Platforms</Text>
          {platforms.map((platform) => (
            <PlatformStatusCard key={platform.id} platform={platform} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
  },
  platformsList: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
});