# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is an AI-powered SaaS interview platform that conducts voice-based mock job interviews using Hume AI's empathic voice technology, with AI-generated feedback powered by Google Gemini. The application uses Next.js 15 with App Router and features user authentication, job information management, interview sessions, and AI-driven performance analysis.

## Development Commands

### Setup & Installation
```bash
npm install
```

### Database Operations
```bash
# Start local PostgreSQL database
docker-compose up -d

# Generate new database migrations
npm run db:generate

# Apply database migrations
npm run db:migrate

# Push schema changes (development)
npm run db:push

# Open Drizzle Studio for database inspection
npm run db:studio
```

### Development Server
```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Testing Individual Components
Since there's no formal test suite, test components manually by:
- Running the dev server and navigating to specific routes
- Using Drizzle Studio to inspect database state
- Checking network requests in browser dev tools for API routes

## Architecture Overview

### Core Stack
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Clerk for user management and session handling
- **AI Services**: 
  - Hume AI for voice-based interviews with emotion analysis
  - Google Gemini (2.5-flash) for interview feedback generation
- **Security**: Arcjet for rate limiting, bot detection, and attack protection
- **UI**: Shadcn/ui components with Tailwind CSS and next-themes

### Directory Structure

#### `/src/app/` - Next.js App Router
- Uses nested layouts and route groups
- Contains both public routes (landing, auth) and protected app routes
- Environment configuration split between client and server

#### `/src/drizzle/` - Database Layer
- **`schema/`**: Individual table definitions (user, jobInfo, interview, question)
- **`migrations/`**: Auto-generated SQL migration files
- **`db.ts`**: Database connection and configuration
- **`schemaHelpers.ts`**: Reusable schema utilities (id, timestamps)

#### `/src/features/` - Domain-Driven Feature Organization
Each feature contains:
- **`actions.ts`**: Server actions for mutations
- **`db.ts`**: Database queries and operations  
- **`dbCache.ts`**: Cache tags and invalidation logic
- **`permissions.ts`**: Authorization and access control
- **`schemas.ts`**: Validation schemas (where applicable)

Current features:
- `interviews/`: Interview session management and AI feedback
- `jobInfos/`: Job posting information and requirements
- `questions/`: Interview questions generation and storage
- `users/`: User profile and account management
- `resumeAnalyses/`: Resume analysis functionality

#### `/src/services/` - External Service Integrations
- **`ai/`**: AI model integrations (Google Gemini)
- **`clerk/`**: Authentication service utilities
- **`hume/`**: Voice AI integration for interviews

#### `/src/components/` - Reusable UI Components
- **`ui/`**: Shadcn/ui components (buttons, forms, dialogs, etc.)
- Root-level components for app-specific functionality

### Database Schema
The application uses a relational structure:
- **Users** (Clerk-managed IDs) have many **JobInfos**
- **JobInfos** have many **Questions** and **Interviews**  
- **Interviews** contain voice session data and AI-generated feedback
- All foreign keys use CASCADE deletes for data consistency

### Key Patterns

#### Server Actions Pattern
All mutations use Next.js server actions with:
- Authentication checks via `getCurrentUser()`
- Permission validation through feature-specific permission functions
- Rate limiting via Arcjet token buckets
- Cache invalidation using Next.js cache tags

#### Caching Strategy
- Uses Next.js "use cache" directive for database queries
- Cache tags organized by feature and entity ID
- Automatic cache invalidation on mutations

#### Error Handling
- Standardized error responses with `{ error: boolean; message?: string }`
- Consistent error messages through `lib/errorToast.tsx`
- Rate limiting and plan limit messaging

#### Type Safety
- Full end-to-end type safety with Drizzle ORM
- Environment variables validated with Zod schemas
- Separate client/server environment configurations

### AI Integration Details

#### Interview Flow
1. User creates job info with title, description, and experience level
2. System generates relevant interview questions
3. Hume AI conducts voice interview with emotion analysis
4. Google Gemini analyzes transcript and emotions to generate detailed feedback

#### Feedback Generation
The AI feedback system analyzes:
- Communication clarity and articulation
- Confidence levels based on emotional cues
- Response quality relative to job requirements  
- Pacing and timing of responses
- Overall role fit and alignment

### Security & Rate Limiting
- Arcjet protection against SQL injection, bot traffic
- Per-user rate limiting: 12 requests per day, refill 4/day
- Authentication required for all app routes
- Environment-based configuration for different deployment stages

## Development Workflow

### Adding New Features
1. Create feature directory in `/src/features/[featureName]/`
2. Define database schema in `/src/drizzle/schema/[featureName].ts`
3. Generate and run migrations with `npm run db:generate && npm run db:migrate`
4. Implement database operations, actions, and permissions
5. Create UI components and integrate with app routes
6. Add cache tags and invalidation logic

### Working with Database
- Use Drizzle Studio (`npm run db:studio`) for data inspection
- All schema changes require migrations in production
- Test migrations against production-like data before deployment

### Environment Variables Required
**Server:**
- Database credentials (DB_HOST, DB_PASSWORD, etc.)
- ARCJET_KEY, CLERK_SECRET_KEY
- HUME_API_KEY, HUME_SECRET_KEY  
- GOOGLE_GENERATIVE_AI_API_KEY

**Client:**
- NEXT_PUBLIC_CLERK_* for authentication
- NEXT_PUBLIC_HUME_CONFIG_ID for voice integration

### Performance Considerations
- Database queries are cached with selective invalidation
- Turbopack used for faster development builds
- AI operations are rate-limited to manage costs
- Emotion analysis data is processed client-side when possible