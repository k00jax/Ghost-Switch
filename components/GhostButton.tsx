import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ghost, Loader as Loader2 } from 'lucide-react-native';
import { Platform } from '@/types/platform';

interface GhostButtonProps {
  onPress: () => Promise<void>;
  platforms: Platform[];
}

export function GhostButton({ onPress, platforms }: GhostButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const connectedPlatforms = platforms.filter(p => p.isConnected);
  const hasPendingOperations = platforms.some(p => p.operationState === 'pending');
  
  const handlePress = async () => {
    if (isLoading || hasPendingOperations) return;
    
    setIsLoading(true);
    try {
      await onPress();
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading || hasPendingOperations) return 'Going Invisible...';
    if (connectedPlatforms.length === 0) return 'No Platforms Connected';
    return 'Go Invisible';
  };

  const isDisabled = connectedPlatforms.length === 0 || isLoading || hasPendingOperations;

  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.disabled]}
      onPress={handlePress}
      disabled={isDisabled}
    >
      <View style={styles.content}>
        {isLoading || hasPendingOperations ? (
          <Loader2 size={24} color="#fff" style={{ transform: [{ rotate: '45deg' }] }} />
        ) : (
          <Ghost size={24} color="#fff" />
        )}
        <Text style={styles.text}>{getButtonText()}</Text>
      </View>
      
      {connectedPlatforms.length > 0 && (
        <Text style={styles.subtitle}>
          {connectedPlatforms.length} platform{connectedPlatforms.length !== 1 ? 's' : ''} connected
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8b5cf6',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  disabled: {
    backgroundColor: '#374151',
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
});