# LLM Onboarding - Kids Memory Game API

## Quick Project Summary

Backend API for a 4x4 memory card matching game built with NestJS, TypeScript, MongoDB, and Docker.

---

## Project Context

### What We're Building

- **Type**: REST API for a memory card matching game
- **Game Mechanics**: 4x4 grid (16 cards = 8 pairs), flip 2 cards per turn, match them all
- **Purpose**: Assessment project demonstrating best practices

### Technology Decisions (Confirmed)

- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose
- **Containerization**: Docker & Docker Compose
- **Testing**: Jest (built-in with NestJS)
- **Card Values**: cat, dog, horse, sheep, cow, bird, pig, fish (8 animals)
- **API Returns**: Actual card values + match status
- **Data Persistence**: Games stored indefinitely in DB

### Key Requirements

1. Start new game (generates unique session key, shuffles cards)
2. Submit 2 cards per round (identified by column A-D, row 1-4)
3. Match validation (match = cards removed, no match = cards stay)
4. History tracking (all attempts per game saved)
5. Leaderboard (top 5 games by fewest attempts, then quickest time)

### Validation Rules

- ✅ Prevent selecting already matched cards
- ✅ Validate position format (A1-D4)
- ✅ Prevent selecting same card twice
- ✅ Check game exists
- ✅ Reject plays on completed games
- ✅ Validate position bounds

---

## Project Structure (Expected)

```
kids-memory-game-api/
├── documents/              # Project documentation
│   ├── Kids Memory Game API and Persistence.md
│   ├── Implementation-Plan.md
│   ├── LLM-Onboarding.md (this file)
│   └── Progress.md
├── src/                    # Source code (NestJS app)
│   ├── game/              # Game module
│   ├── database/          # Database configuration
│   ├── common/            # Shared utilities
│   └── main.ts            # Entry point
├── test/                   # E2E tests
├── docker-compose.yml     # Docker services
├── Dockerfile             # API container
├── .env                   # Environment variables
├── package.json           # Dependencies
└── README.md              # Main documentation
```

---

## API Endpoints (Planned)

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/game/new`             | Start a new game            |
| POST   | `/game/:gameId/play`    | Submit 2 cards for matching |
| GET    | `/game/:gameId`         | Get current game state      |
| GET    | `/game/:gameId/history` | Get attempt history         |
| GET    | `/leaderboard`          | Get top 5 games             |

---

## Data Models

### Game Document

```typescript
{
  _id: string (UUID),              // Unique game session key
  board: string[][],               // 4x4 array of animal names
  matchedCards: string[],          // Array of matched positions ["A1", "B3", ...]
  status: 'in-progress' | 'completed',
  startTime: Date,
  endTime: Date | null,
  attemptCount: number
}
```

### Attempt Document

```typescript
{
  gameId: string,                  // Reference to Game
  attemptNumber: number,
  positions: [string, string],     // ["B1", "C3"]
  values: [string, string],        // ["cat", "dog"]
  isMatch: boolean,
  timestamp: Date
}
```

---

## Current Progress Status

**See `Progress.md` for detailed status**

**Current Phase**: Phase 1 - Project Setup & Infrastructure  
**Last Completed Step**: None yet  
**Next Step**: Step 1 - Initialize NestJS Project

---

## Important Notes

### Grid Position System

- **Columns**: A, B, C, D (left to right)
- **Rows**: 1, 2, 3, 4 (top to bottom)
- **Example positions**: A1, B3, D4

### Leaderboard Sorting Logic

1. Primary: Fewest attempts (ascending)
2. Secondary: Quickest time (game duration, ascending)
3. Limit: Top 5 only

### Best Practices to Follow (Assessment Criteria)

- ✅ Clean, readable, maintainable code
- ✅ Proper error handling and validation
- ✅ Comprehensive unit tests (80%+ coverage)
- ✅ Integration tests for endpoints
- ✅ Clear documentation (README.md + inline comments)
- ✅ TypeScript best practices
- ✅ NestJS architectural patterns (modules, services, controllers)
- ✅ MongoDB indexing for performance
- ✅ Docker best practices

---

## How to Resume Work

1. **Read `Progress.md`** - See what's been completed
2. **Check `Implementation-Plan.md`** - Review next steps
3. **Review last commits** - Understand recent changes
4. **Check terminal history** - See what commands were run
5. **Read this document** - Re-familiarize with project context

---

## Reference Documents

- `documents/Kids Memory Game API and Persistence.md` - Original requirements
- `documents/Implementation-Plan.md` - 25-step implementation plan
- `documents/Progress.md` - Detailed progress tracking
- `README.md` - Main project documentation (to be created)

---

## Quick Commands Reference

### Development

```bash
npm run start:dev          # Run in development mode
npm run test               # Run unit tests
npm run test:e2e           # Run integration tests
npm run test:cov           # Run tests with coverage
```

### Docker

```bash
docker-compose up          # Start all services
docker-compose down        # Stop all services
docker-compose logs -f     # View logs
```

---

**Last Updated**: 2025-10-04  
**Project Status**: Just starting - Phase 1, Step 1
