import { PlatformConnector } from '@/types/platform';
import { SlackConnector } from './connectors/SlackConnector';
import { DiscordConnector } from './connectors/DiscordConnector';
import { WhatsAppConnector } from './connectors/WhatsAppConnector';

/**
 * Registry for managing platform connectors
 * Provides a centralized way to register and retrieve connectors
 */
export class ConnectorRegistry {
  private static connectors = new Map<string, () => PlatformConnector>();

  /**
   * Register a new connector class
   */
  static register(id: string, connectorFactory: () => PlatformConnector): void {
    this.connectors.set(id, connectorFactory);
  }

  /**
   * Get a connector instance by ID
   */
  static getConnector(id: string): PlatformConnector | null {
    const factory = this.connectors.get(id);
    return factory ? factory() : null;
  }

  /**
   * Get all available connector IDs
   */
  static getAvailableConnectors(): string[] {
    return Array.from(this.connectors.keys());
  }

  /**
   * Check if a connector is registered
   */
  static hasConnector(id: string): boolean {
    return this.connectors.has(id);
  }
}

// Register built-in connectors
ConnectorRegistry.register('slack', () => new SlackConnector());
ConnectorRegistry.register('discord', () => new DiscordConnector());
ConnectorRegistry.register('whatsapp', () => new WhatsAppConnector());