import { PlatformConnector, PlatformStatus } from '@/types/platform';

/**
 * Abstract base class for all platform connectors
 * Provides common functionality and enforces the connector interface
 */
export abstract class BaseConnector implements PlatformConnector {
  public abstract readonly id: string;
  public abstract readonly name: string;
  public abstract readonly icon: string;
  
  protected credentials: any = null;
  protected isInitialized = false;

  /**
   * Initialize the connector with user credentials
   */
  abstract initialize(credentials: any): Promise<boolean>;

  /**
   * Get current status from the platform
   */
  abstract getCurrentStatus(): Promise<PlatformStatus>;

  /**
   * Change status on the platform
   */
  abstract changeStatus(status: PlatformStatus): Promise<boolean>;

  /**
   * Check if the connector is properly configured
   */
  isConfigured(): boolean {
    return this.isInitialized && this.credentials != null;
  }

  /**
   * Disconnect from the platform
   */
  async disconnect(): Promise<void> {
    this.credentials = null;
    this.isInitialized = false;
  }

  /**
   * Simulate network delay for realistic mock behavior
   */
  protected async simulateDelay(min = 500, max = 2000): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Simulate occasional failures for testing error handling
   */
  protected simulateFailure(failureRate = 0.1): boolean {
    return Math.random() < failureRate;
  }
}

export { BaseConnector }