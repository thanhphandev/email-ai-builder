# Technical Architecture Document
## AI-Powered Email Builder SaaS

**Version:** 1.0  
**Date:** August 5, 2025  
**Author:** Engineering Team  

---

## 1. System Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │  External APIs  │
│   (Next.js)     │◄──►│   (Next.js)     │◄──►│   (AI Services) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Browser       │    │   Database      │    │  File Storage   │
│   (React)       │    │  (PostgreSQL)   │    │   (AWS S3)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### 1.2 Current Technology Stack

#### Frontend
- **Framework:** Next.js 14 (App Router)
- **UI Library:** React 18 with TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** React Query for server state, React hooks for local state
- **Code Editor:** Monaco Editor or CodeMirror
- **Form Handling:** React Hook Form with Zod validation

#### Backend
- **Runtime:** Node.js 18+
- **Framework:** Next.js API Routes
- **Database:** PostgreSQL 15+ (planned)
- **ORM:** Prisma (planned)
- **Authentication:** NextAuth.js (planned)
- **File Upload:** Multer + AWS SDK (planned)

#### External Services
- **AI Providers:** OpenAI GPT-4, Google Gemini
- **Email Testing:** Litmus API (planned)
- **Analytics:** Mixpanel (planned)
- **Monitoring:** Sentry (planned)

#### Infrastructure
- **Hosting:** Vercel (current), AWS (planned for scale)
- **Database:** PlanetScale or AWS RDS
- **CDN:** Vercel Edge Network
- **File Storage:** AWS S3
- **Cache:** Redis (planned)

---

## 2. Database Design

### 2.1 Entity Relationship Diagram

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255),
    avatar_url TEXT,
    plan_type VARCHAR(50) DEFAULT 'free',
    usage_count INTEGER DEFAULT 0,
    usage_limit INTEGER DEFAULT 5,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INTEGER REFERENCES users(id),
    plan_type VARCHAR(50) DEFAULT 'starter',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team memberships
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    team_id INTEGER REFERENCES teams(id),
    user_id INTEGER REFERENCES users(id),
    role VARCHAR(50) DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id, user_id)
);

-- Email templates
CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    team_id INTEGER REFERENCES teams(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    prompt TEXT NOT NULL,
    html_content TEXT NOT NULL,
    css_content TEXT,
    preview_image_url TEXT,
    category VARCHAR(100),
    tags TEXT[], -- PostgreSQL array
    is_public BOOLEAN DEFAULT false,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Template versions
CREATE TABLE template_versions (
    id SERIAL PRIMARY KEY,
    template_id INTEGER REFERENCES templates(id),
    version_number INTEGER NOT NULL,
    html_content TEXT NOT NULL,
    css_content TEXT,
    changelog TEXT,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI generations log
CREATE TABLE ai_generations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    provider VARCHAR(50) NOT NULL, -- 'openai' or 'gemini'
    prompt TEXT NOT NULL,
    generated_html TEXT NOT NULL,
    generation_time_ms INTEGER,
    token_count INTEGER,
    cost_cents INTEGER,
    success BOOLEAN DEFAULT true,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics events
CREATE TABLE analytics_events (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2.2 Indexing Strategy

```sql
-- Performance indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_templates_user_id ON templates(user_id);
CREATE INDEX idx_templates_team_id ON templates(team_id);
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_templates_created_at ON templates(created_at DESC);
CREATE INDEX idx_ai_generations_user_id ON ai_generations(user_id);
CREATE INDEX idx_ai_generations_created_at ON ai_generations(created_at DESC);
CREATE INDEX idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);

-- Full-text search indexes
CREATE INDEX idx_templates_search ON templates 
USING gin(to_tsvector('english', title || ' ' || description || ' ' || array_to_string(tags, ' ')));
```

---

## 3. API Design

### 3.1 REST API Endpoints

#### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

#### AI Generation
```
POST   /api/generate
GET    /api/generate/history
DELETE /api/generate/:id
```

#### Templates
```
GET    /api/templates
POST   /api/templates
GET    /api/templates/:id
PUT    /api/templates/:id
DELETE /api/templates/:id
POST   /api/templates/:id/duplicate
GET    /api/templates/:id/versions
POST   /api/templates/:id/versions
```

#### Teams
```
GET    /api/teams
POST   /api/teams
GET    /api/teams/:id
PUT    /api/teams/:id
DELETE /api/teams/:id
GET    /api/teams/:id/members
POST   /api/teams/:id/members
DELETE /api/teams/:id/members/:userId
```

#### User Management
```
GET    /api/users/profile
PUT    /api/users/profile
GET    /api/users/usage
GET    /api/users/billing
POST   /api/users/upgrade
```

### 3.2 API Response Format

```typescript
// Success Response
interface APISuccess<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// Error Response
interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
}

// Example: Template List Response
interface TemplateListResponse {
  success: true;
  data: {
    templates: Template[];
  };
  meta: {
    pagination: {
      page: 1;
      limit: 20;
      total: 156;
      totalPages: 8;
    };
  };
}
```

### 3.3 Rate Limiting

```typescript
// Rate limiting rules by plan
const RATE_LIMITS = {
  free: {
    generations: { requests: 5, window: '1d' },
    api: { requests: 100, window: '1h' }
  },
  starter: {
    generations: { requests: 100, window: '1d' },
    api: { requests: 1000, window: '1h' }
  },
  professional: {
    generations: { requests: 500, window: '1d' },
    api: { requests: 5000, window: '1h' }
  },
  enterprise: {
    generations: { requests: -1 }, // unlimited
    api: { requests: 10000, window: '1h' }
  }
};
```

---

## 4. Security Architecture

### 4.1 Authentication & Authorization

```typescript
// JWT Token Structure
interface JWTPayload {
  userId: number;
  email: string;
  role: 'user' | 'admin';
  planType: 'free' | 'starter' | 'professional' | 'enterprise';
  teamIds: number[];
  iat: number;
  exp: number;
}

// Role-based access control
const PERMISSIONS = {
  'template:read': ['user', 'admin'],
  'template:write': ['user', 'admin'],
  'template:delete': ['user', 'admin'],
  'team:read': ['user', 'admin'],
  'team:write': ['team_owner', 'team_admin', 'admin'],
  'team:delete': ['team_owner', 'admin'],
  'admin:read': ['admin'],
  'admin:write': ['admin']
};
```

### 4.2 Data Protection

```typescript
// Encryption for sensitive data
const encryptSensitiveData = (data: string): string => {
  return encrypt(data, process.env.ENCRYPTION_KEY!);
};

// Input validation with Zod
const templateSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  prompt: z.string().min(1).max(5000),
  category: z.enum(['newsletter', 'promotional', 'transactional']),
  tags: z.array(z.string()).max(10)
});
```

### 4.3 Security Headers

```typescript
// Next.js security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];
```

---

## 5. Performance & Scalability

### 5.1 Caching Strategy

```typescript
// Redis caching layers
const CACHE_KEYS = {
  user: (id: number) => `user:${id}`,
  template: (id: number) => `template:${id}`,
  userTemplates: (userId: number) => `user:${userId}:templates`,
  publicTemplates: 'templates:public',
  aiProvider: (provider: string) => `ai:${provider}:status`
};

// Cache TTL settings
const CACHE_TTL = {
  user: 300, // 5 minutes
  template: 900, // 15 minutes
  publicTemplates: 1800, // 30 minutes
  aiProvider: 60 // 1 minute
};
```

### 5.2 Database Optimization

```sql
-- Connection pooling configuration
-- Max connections: 100
-- Min connections: 10
-- Idle timeout: 300s
-- Connection timeout: 5s

-- Query optimization
EXPLAIN ANALYZE SELECT * FROM templates 
WHERE user_id = $1 
AND created_at > $2 
ORDER BY created_at DESC 
LIMIT 20;

-- Partitioning for analytics
CREATE TABLE analytics_events_2025_08 PARTITION OF analytics_events
FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');
```

### 5.3 CDN & Asset Optimization

```typescript
// Image optimization
const imageConfig = {
  domains: ['cdn.emailbuilder.com'],
  formats: ['image/webp', 'image/avif'],
  sizes: [16, 32, 48, 64, 96, 128, 256, 384],
  quality: 75
};

// Static asset caching
const cacheHeaders = {
  'Cache-Control': 'public, max-age=31536000, immutable'
};
```

---

## 6. Monitoring & Observability

### 6.1 Application Monitoring

```typescript
// Error tracking with Sentry
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Postgres({ tracing: true })
  ]
});

// Custom metrics
const metrics = {
  emailGenerated: (provider: string, duration: number) => {
    // Send to analytics
  },
  templateSaved: (userId: number) => {
    // Send to analytics
  },
  userRegistered: (plan: string) => {
    // Send to analytics
  }
};
```

### 6.2 Health Checks

```typescript
// Health check endpoint
export async function GET() {
  const checks = await Promise.allSettled([
    checkDatabase(),
    checkRedis(),
    checkAIProviders(),
    checkFileStorage()
  ]);

  const healthy = checks.every(check => check.status === 'fulfilled');
  
  return NextResponse.json({
    status: healthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks: checks.map((check, index) => ({
      name: ['database', 'redis', 'ai', 'storage'][index],
      status: check.status
    }))
  }, { status: healthy ? 200 : 503 });
}
```

### 6.3 Logging Strategy

```typescript
// Structured logging with Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'email-builder' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

---

## 7. Deployment & DevOps

### 7.1 CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm run test
      - name: Run E2E tests
        run: npm run test:e2e
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 7.2 Environment Configuration

```bash
# Production environment variables
NODE_ENV=production
NEXTAUTH_URL=https://emailbuilder.com
NEXTAUTH_SECRET=your-secret-key
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=sk-...
GEMINI_API_KEY=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=emailbuilder-assets
SENTRY_DSN=https://...
MIXPANEL_TOKEN=...
```

### 7.3 Infrastructure as Code

```typescript
// AWS CDK stack (planned)
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class EmailBuilderStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // VPC
    const vpc = new ec2.Vpc(this, 'EmailBuilderVPC');

    // Database
    const database = new rds.DatabaseInstance(this, 'EmailBuilderDB', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_15_3
      }),
      vpc,
      credentials: rds.Credentials.fromGeneratedSecret('postgres'),
      multiAz: true,
      deleteAutomatedBackups: false
    });

    // S3 bucket for assets
    const assetsBucket = new s3.Bucket(this, 'AssetsBucket', {
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED
    });
  }
}
```

---

## 8. Migration Strategy

### 8.1 Database Migrations

```sql
-- Migration: 001_initial_schema.sql
-- Create initial database schema
\i initial_schema.sql

-- Migration: 002_add_teams.sql
-- Add team functionality
CREATE TABLE teams (...);
CREATE TABLE team_members (...);
ALTER TABLE templates ADD COLUMN team_id INTEGER;

-- Migration: 003_add_analytics.sql
-- Add analytics tracking
CREATE TABLE analytics_events (...);
CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
```

### 8.2 Data Migration Scripts

```typescript
// Migrate existing templates to new schema
export async function migrateTemplates() {
  const templates = await db.template.findMany();
  
  for (const template of templates) {
    // Transform old structure to new structure
    const migratedTemplate = transformTemplate(template);
    await db.template.update({
      where: { id: template.id },
      data: migratedTemplate
    });
  }
}
```

---

## 9. Testing Strategy

### 9.1 Unit Testing

```typescript
// Jest + React Testing Library
import { render, screen } from '@testing-library/react';
import { EmailPreview } from '@/components/EmailPreview';

describe('EmailPreview', () => {
  it('renders email content correctly', () => {
    const html = '<h1>Test Email</h1>';
    render(<EmailPreview html={html} />);
    expect(screen.getByText('Test Email')).toBeInTheDocument();
  });
});
```

### 9.2 Integration Testing

```typescript
// API route testing
import { POST } from '@/app/api/generate/route';
import { NextRequest } from 'next/server';

describe('/api/generate', () => {
  it('generates email from prompt', async () => {
    const request = new NextRequest('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ 
        prompt: 'Create a welcome email',
        provider: 'openai'
      })
    });

    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.html).toContain('<html>');
  });
});
```

### 9.3 E2E Testing

```typescript
// Playwright E2E tests
import { test, expect } from '@playwright/test';

test('user can generate email', async ({ page }) => {
  await page.goto('/');
  await page.fill('[data-testid="prompt-input"]', 'Create a newsletter');
  await page.click('[data-testid="generate-button"]');
  await expect(page.locator('[data-testid="email-preview"]')).toBeVisible();
});
```

---

## 10. Future Architecture Considerations

### 10.1 Microservices Migration

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   User Service  │
│   Service       │◄──►│   (Kong/AWS)    │◄──►│   (Node.js)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                    ┌───────────┼───────────┐
                    ▼           ▼           ▼
              ┌─────────┐ ┌─────────┐ ┌─────────┐
              │Template │ │   AI    │ │Analytics│
              │Service  │ │ Service │ │Service  │
              └─────────┘ └─────────┘ └─────────┘
```

### 10.2 AI/ML Pipeline

```typescript
// Future ML model training pipeline
interface ModelTrainingPipeline {
  dataCollection: () => void; // Collect user interactions
  featureEngineering: () => void; // Extract features
  modelTraining: () => void; // Train custom models
  modelDeployment: () => void; // Deploy to production
  monitoring: () => void; // Monitor performance
}
```

### 10.3 International Expansion

```typescript
// Multi-region deployment strategy
const REGIONS = {
  'us-east-1': { primary: true, latency: 'low' },
  'eu-west-1': { primary: false, latency: 'low' },
  'ap-southeast-1': { primary: false, latency: 'medium' }
};

// Localization support
const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'ja', 'zh'];
```

---

*This document will be updated as the architecture evolves and new requirements emerge.*
