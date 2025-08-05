# Ghost Switch

A cross-platform mobile app for managing online status across multiple social platforms. Built with React Native, Expo, and TypeScript.

## 🏗️ Architecture Overview

Ghost Switch uses a modular, plugin-based architecture designed for scalability and maintainability:

### Core Components

1. **Platform Connectors** - Pluggable modules for each social platform
2. **Connector Registry** - Centralized management of available connectors
3. **State Management** - React Context for authentication and platform state
4. **UI Components** - Reusable, themed components with real-time updates
5. **Mock Implementations** - Realistic simulations for development and testing

### Architecture Benefits

- **Modular Design**: Each platform connector is independent and pluggable
- **Type Safety**: Full TypeScript coverage with strict typing
- **Testable**: Clean interfaces and dependency injection
- **Scalable**: Easy to add new platforms and features
- **Maintainable**: Clear separation of concerns

## 📱 Features

- **Multi-Platform Status Management**: Control visibility across connected platforms
- **Real-Time Updates**: Live status changes with visual feedback
- **Batch Operations**: "Go Invisible" across all platforms simultaneously
- **Error Handling**: Graceful failure handling with retry options
- **Mock Implementations**: Realistic platform simulations for development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Expo CLI
- iOS Simulator or Android Emulator (for mobile testing)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ghost-switch

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Development

```bash
# Start development server
npm run dev

# Build for web
npm run build:web

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Dashboard screen
│   │   ├── platforms.tsx  # Platform management
│   │   └── profile.tsx    # User profile
│   └── _layout.tsx        # Root layout with providers
├── components/            # Reusable UI components
│   ├── GhostButton.tsx    # Central action button
│   ├── PlatformCard.tsx   # Platform toggle card
│   ├── PlatformStatusCard.tsx # Status display card
│   └── StatusSummary.tsx  # Overview statistics
├── hooks/                 # React hooks and context
│   ├── useAuth.tsx        # Authentication management
│   └── usePlatforms.tsx   # Platform state management
├── services/              # Business logic and connectors
│   ├── connectors/        # Platform connector implementations
│   │   ├── BaseConnector.ts      # Abstract base class
│   │   ├── SlackConnector.ts     # Slack integration
│   │   ├── DiscordConnector.ts   # Discord integration
│   │   └── WhatsAppConnector.ts  # WhatsApp integration
│   └── ConnectorRegistry.ts      # Connector management
└── types/                 # TypeScript type definitions
    └── platform.ts        # Core interfaces and types
```

## 🔌 Adding New Platform Connectors

### 1. Create a New Connector

```typescript
// services/connectors/NewPlatformConnector.ts
import { BaseConnector } from './BaseConnector';
import { PlatformStatus } from '@/types/platform';

export class NewPlatformConnector extends BaseConnector {
  public readonly id = 'newplatform';
  public readonly name = 'New Platform';
  public readonly icon = '🔗';

  async initialize(credentials: any): Promise<boolean> {
    // Initialize connection with platform API
    // Handle authentication, tokens, etc.
  }

  async getCurrentStatus(): Promise<PlatformStatus> {
    // Fetch current status from platform
  }

  async changeStatus(status: PlatformStatus): Promise<boolean> {
    // Update status on platform
  }
}
```

### 2. Register the Connector

```typescript
// services/ConnectorRegistry.ts
import { NewPlatformConnector } from './connectors/NewPlatformConnector';

ConnectorRegistry.register('newplatform', () => new NewPlatformConnector());
```

### 3. Update Mock Data (Optional)

Add the new platform to the initial mock data in `hooks/usePlatforms.tsx`.

## 🧪 Mock Implementations

The app includes realistic mock implementations for:

- **Slack** - Simulates Slack Web API with workspace integration
- **Discord** - Mimics Discord's presence API with user status
- **WhatsApp** - Emulates WhatsApp Business API integration

### Mock Features

- **Realistic Delays**: Network latency simulation (300ms - 2s)
- **Failure Simulation**: Configurable error rates for testing
- **Status Mapping**: Platform-specific status translations
- **Error Messages**: Platform-appropriate error responses

## 🎨 UI Design System

### Theme

- **Primary**: Purple (#8b5cf6) - Ghost/mystical theme
- **Background**: Dark (#0a0a0a, #1a1a1a) - Modern dark theme
- **Text**: White/Gray scale for optimal contrast
- **Status Colors**: Green (online), Gray (invisible), Yellow (away), Red (busy)

### Components

- **Cards**: Rounded, shadowed containers with consistent spacing
- **Buttons**: Touch-friendly with proper feedback states
- **Icons**: Lucide React Native for consistent iconography
- **Typography**: Clear hierarchy with appropriate font weights

## 🔒 Security Considerations

### For Production Implementation

1. **Secure Credential Storage**: Use platform-specific secure storage
2. **Token Management**: Implement refresh token handling
3. **API Security**: Use HTTPS and proper authentication headers
4. **Rate Limiting**: Implement backoff strategies for API calls
5. **Privacy**: Minimize data collection and provide transparency

### Current Mock Security

- Credentials are simulated and not stored
- All operations are local to the app
- No actual external API calls are made

## 🧪 Testing Strategy

### Unit Tests

```typescript
// Example connector test
describe('SlackConnector', () => {
  it('should initialize with valid credentials', async () => {
    const connector = new SlackConnector();
    const result = await connector.initialize({ token: 'valid-token' });
    expect(result).toBe(true);
  });

  it('should handle status changes', async () => {
    const connector = new SlackConnector();
    await connector.initialize({ token: 'valid-token' });
    const result = await connector.changeStatus('invisible');
    expect(result).toBe(true);
  });
});
```

### Integration Tests

- Test full platform workflows
- Verify error handling and recovery
- Test batch operations

### UI Tests

- Component rendering tests
- User interaction flows
- State management verification

## 🚀 Production Deployment

### Environment Setup

1. **API Keys**: Configure platform API credentials
2. **Environment Variables**: Set up staging/production configs
3. **Build Configuration**: Optimize for production builds
4. **Error Tracking**: Integrate crash reporting (Sentry, Bugsnag)

### Platform-Specific Setup

#### Slack
- Create Slack App in developer console
- Configure OAuth scopes: `users:write`, `users:read`
- Set up workspace installation

#### Discord
- Create Discord application
- Configure bot permissions
- Handle Discord's gateway connection

#### WhatsApp
- Set up WhatsApp Business API account
- Configure webhook endpoints
- Handle message templates and compliance

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow TypeScript strict mode
2. **Components**: Use functional components with hooks
3. **Testing**: Write tests for new connectors and components
4. **Documentation**: Update README and inline docs
5. **Type Safety**: Maintain full TypeScript coverage

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Implement changes with tests
4. Update documentation
5. Submit pull request with description

### Adding New Platforms

1. Implement connector following `BaseConnector` interface
2. Add comprehensive error handling
3. Include realistic mock implementation
4. Write unit tests for connector
5. Update documentation

## 📄 License

MIT License - see LICENSE file for details.

## 🙋‍♂️ Support

For questions, issues, or contributions:

1. Check existing GitHub issues
2. Create new issue with detailed description
3. Join community discussions
4. Contribute to documentation

---

**Ghost Switch** - Making social status management effortless across all platforms.