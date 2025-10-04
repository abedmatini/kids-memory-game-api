# Kids Memory Game API - Implementation Plan

## Project Overview

Building a backend API for a 4x4 memory card matching game with persistence and leaderboard functionality.

## Technology Stack

- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose
- **Containerization**: Docker & Docker Compose
- **Testing**: Jest (built-in with NestJS)
- **Validation**: class-validator & class-transformer

---

## Implementation Steps

### Phase 1: Project Setup & Infrastructure

**Status**: ✅ COMPLETED (4/4 completed)

1. **Initialize NestJS Project** ✅ **COMPLETED**
   - ✅ Install NestJS CLI
   - ✅ Generate new NestJS project
   - ✅ Configure TypeScript settings
   - ✅ Set up project structure

2. **Configure MongoDB Connection** ✅ **COMPLETED**
   - ✅ Install Mongoose and NestJS Mongoose integration
   - ✅ Set up MongoDB connection module
   - ✅ Configure environment variables (.env file)
   - ✅ Create database configuration

3. **Docker Configuration** ✅ **COMPLETED**
   - ✅ Create Dockerfile for the API
   - ✅ Create docker-compose.yml (API + MongoDB)
   - ✅ Set up development and production configurations
   - ✅ Add .dockerignore file

4. **Project Dependencies** ✅ **COMPLETED**
   - ✅ Install required npm packages
   - ✅ Set up ESLint and Prettier
   - ✅ Configure Git ignore

---

### Phase 2: Database Schema Design

**Status**: ✅ COMPLETED (3/3 completed)

5. **Design Game Schema** ✅ **COMPLETED**
   - ✅ Game ID (unique session key)
   - ✅ Board state (4x4 grid with card values)
   - ✅ Matched cards tracking
   - ✅ Game status (in-progress, completed)
   - ✅ Start time and end time
   - ✅ Total attempts count

6. **Design Attempt History Schema** ✅ **COMPLETED**
   - ✅ Game reference
   - ✅ Attempt number
   - ✅ Card positions selected (e.g., B1, C3)
   - ✅ Card values revealed
   - ✅ Match result (true/false)
   - ✅ Timestamp

7. **Create Mongoose Models** ✅ **COMPLETED**
   - ✅ Game model with schema
   - ✅ Attempt model with schema
   - ✅ Add indexes for performance
   - ✅ Add validation rules

---

### Phase 3: Core Game Logic

**Status**: ✅ COMPLETED (3/3 completed)

8. **Card Shuffle Service** ✅ **COMPLETED**
   - ✅ Define card types/values (8 pairs = 16 cards)
   - ✅ Implement Fisher-Yates shuffle algorithm
   - ✅ Map cards to 4x4 grid positions
   - ✅ Create position-to-index converter (A1-D4 to array indexes)

9. **Game State Service** ✅ **COMPLETED**
   - ✅ Generate unique session keys (UUID or similar)
   - ✅ Create new game logic
   - ✅ Store initial game state in DB
   - ✅ Retrieve game state by session key

10. **Match Validation Service** ✅ **COMPLETED**
    - ✅ Parse card position inputs (e.g., "B1", "C3")
    - ✅ Validate card positions (A-D, 1-4)
    - ✅ Check if cards are already matched
    - ✅ Prevent selecting same card twice
    - ✅ Compare card values for match

---

### Phase 4: API Endpoints

**Status**: ✅ COMPLETED (5/5 completed)

11. **POST /game/new - Start New Game** ✅ **COMPLETED**
    - Generate unique game ID
    - Shuffle and create board
    - Save to database
    - Return game ID and success message

12. **POST /game/:gameId/play - Submit Card Pair** ✅ **COMPLETED**
    - Accept game ID and 2 card positions
    - Validate inputs
    - Check game status (not completed)
    - Reveal card values
    - Check for match
    - Update game state
    - Save attempt history
    - Return match result and card values
    - Check if game is won (all cards matched)

13. **GET /game/:gameId - Get Game State** ✅ **COMPLETED**
    - Retrieve current game state
    - Return matched cards positions
    - Return game status and attempt count
    - Don't reveal unmatched card values

14. **GET /game/:gameId/history - Get Attempt History** ✅ **COMPLETED**
    - Retrieve all attempts for a game
    - Return chronological list of attempts

15. **GET /leaderboard - Get Top 5 Games** ✅ **COMPLETED**
    - Query completed games
    - Sort by: attempts (ascending), then duration (ascending)
    - Limit to top 5
    - Return game ID, attempts, and completion time

---

### Phase 5: Validation & Error Handling

**Status**: ✅ COMPLETED (1/3 completed, 2 skipped)

16. **Input Validation** ✅ **COMPLETED**
    - DTOs (Data Transfer Objects) for all endpoints
    - Validate card position format
    - Validate game ID format
    - Custom validation pipes

17. **Error Handling** ⏭️ **SKIPPED** (Using built-in NestJS exceptions)
    - Game not found errors (handled via NotFoundException)
    - Invalid card position errors (handled via BadRequestException)
    - Already matched cards errors (handled in service layer)
    - Game already completed errors (handled in service layer)
    - Global exception filter (NestJS provides default)

18. **Response Standardization** ⏭️ **SKIPPED** (Using NestJS defaults)
    - Create response interceptor
    - Consistent success/error formats
    - Proper HTTP status codes

---

### Phase 6: Testing

**Status**: ✅ COMPLETED (3/3 completed)

19. **Unit Tests** ✅ **COMPLETED**
    - Test card shuffle logic
    - Test position parsing
    - Test match validation
    - Test game state transitions
    - Aim for 80%+ code coverage (✅ Achieved 83.7%)
    - Test individual service methods
    - Mock database dependencies

20. **Integration Tests (E2E)** ✅ **COMPLETED**
    - ✅ Test API endpoints end-to-end (18 tests passing)
    - ✅ Test database operations (mongodb-memory-server)
    - ✅ Test error scenarios (404s, 400s, validation)
    - ✅ Test leaderboard calculations
    - ✅ Use in-memory MongoDB for testing
    - ✅ Full request/response validation
    - ✅ Test complete game workflow

21. **Edge Case Testing** ✅ **COMPLETED**
    - ✅ Invalid inputs (malformed positions - lowercase, missing parts, special chars)
    - ✅ Playing on completed games
    - ✅ Position out of bounds (E1, A5, Z9)
    - ✅ Empty leaderboard (covered in E2E)
    - ✅ Game completion detection (workflow test)
    - ✅ Invalid game IDs (404 handling, special characters)
    - ✅ Leaderboard tiebreaker (same attempts, sorted by duration)
    - ✅ Total: 24 E2E tests passing

---

### Phase 7: Documentation & Deployment

**Status**: Pending

22. **API Documentation**
    - Create comprehensive README.md
    - Document all endpoints with examples
    - Add request/response samples
    - Setup and run instructions

23. **Swagger/OpenAPI**
    - Install @nestjs/swagger
    - Add API decorators
    - Generate interactive API docs
    - Available at /api/docs endpoint

24. **Docker Documentation**
    - Document how to build images
    - Document how to run containers
    - Include environment variable list
    - Add troubleshooting section

25. **Final Testing & Polish**
    - Test full Docker deployment
    - Verify all endpoints work
    - Check MongoDB persistence
    - Review code quality
    - Final code cleanup

---

## Data Models Preview

### Game Document

```json
{
  "_id": "uuid-game-session-key",
  "board": [
    ["dog", "cat", "bird", "fish"],
    ["horse", "dog", "cat", "bird"],
    ["fish", "horse", "lion", "tiger"],
    ["lion", "tiger", "elephant", "elephant"]
  ],
  "matchedCards": ["A1", "B2", "C3", ...],
  "status": "in-progress",
  "startTime": "2025-10-04T12:00:00Z",
  "endTime": null,
  "attemptCount": 5
}
```

### Attempt Document

```json
{
  "gameId": "uuid-game-session-key",
  "attemptNumber": 1,
  "positions": ["B1", "C3"],
  "values": ["cat", "bird"],
  "isMatch": false,
  "timestamp": "2025-10-04T12:01:00Z"
}
```

---

## API Endpoints Summary

| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/game/new`             | Start a new game            |
| POST   | `/game/:gameId/play`    | Submit 2 cards for matching |
| GET    | `/game/:gameId`         | Get current game state      |
| GET    | `/game/:gameId/history` | Get attempt history         |
| GET    | `/leaderboard`          | Get top 5 games             |

---

## Notes & Considerations

- Use UUIDs for game session keys
- Store timestamps for leaderboard tiebreaker
- Index MongoDB collections for leaderboard queries
- Validate all inputs to prevent cheating
- Consider rate limiting for production
- Add health check endpoint for Docker
- Use environment variables for configuration
- Keep card values simple (use animal names initially)

---

## Current Status

**Phase**: Not Started  
**Next Step**: Phase 1 - Project Setup & Infrastructure  
**Blockers**: Awaiting confirmation on framework and card type preferences
