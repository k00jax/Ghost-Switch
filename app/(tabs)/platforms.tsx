import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { usePlatforms } from '@/hooks/usePlatforms';
import { PlatformCard } from '@/components/PlatformCard';

export default function Platforms() {
  const { platforms, togglePlatform } = usePlatforms();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Platforms</Text>
          <Text style={styles.subtitle}>Manage your connected social platforms</Text>
        </View>

        <View style={styles.platformsList}>
          {platforms.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              onToggle={() => togglePlatform(platform.id)}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#8b5cf6" />
          <Text style={styles.addButtonText}>Add Platform</Text>
        </TouchableOpacity>
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
    gap: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#333',
    borderStyle: 'dashed',
  },
  addButtonText: {
    color: '#8b5cf6',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});