/**
 * Represents the current status of a platform connection
 */
export type PlatformStatus = 'online' | 'invisible' | 'away' | 'busy' | 'offline';

/**
 * Represents the current operation state
 */
export type OperationState = 'idle' | 'pending' | 'success' | 'error';

/**
 * Core platform interface that all connectors must implement
 */
export interface Platform {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
  currentStatus: PlatformStatus;
  operationState: OperationState;
  lastUpdated: Date;
  error?: string;
}

/**
 * Interface for platform connector implementations
 */
export interface PlatformConnector {
  id: string;
  name: string;
  icon: string;
  
  /**
   * Initialize the connector with user credentials
   */
  initialize(credentials: any): Promise<boolean>;
  
  /**
   * Get current status from the platform
   */
  getCurrentStatus(): Promise<PlatformStatus>;
  
  /**
   * Change status on the platform
   */
  changeStatus(status: PlatformStatus): Promise<boolean>;
  
  /**
   * Check if the connector is properly configured
   */
  isConfigured(): boolean;
  
  /**
   * Disconnect from the platform
   */
  disconnect(): Promise<void>;
}

/**
 * User authentication interface
 */
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

/**
 * Authentication context interface
 */
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

/**
 * Platform management context interface
 */
export interface PlatformContextType {
  platforms: Platform[];
  addPlatform: (connector: PlatformConnector) => void;
  removePlatform: (platformId: string) => void;
  togglePlatform: (platformId: string) => void;
  updatePlatformStatus: (platformId: string, status: PlatformStatus) => Promise<void>;
  goInvisibleAll: () => Promise<void>;
}