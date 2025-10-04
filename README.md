# Kids Memory Game API# Kids Memory Game API<p align="center">

A RESTful API backend for a 4x4 memory card matching game with persistence and leaderboard functionality. Built with NestJS, TypeScript, and MongoDB.<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

## 🎮 Game OverviewA RESTful API backend for a 4x4 memory card matching game with persistence and leaderboard functionality. Built with NestJS, TypeScript, and MongoDB.</p>

The Kids Memory Game is a classic card-matching game where players flip two cards at a time trying to find matching pairs. The game features:## 🎮 Game Overview[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

- **4x4 Grid**: 16 cards total (8 pairs of matching animals)[circleci-url]: https://circleci.com/gh/nestjs/nest

- **Animal Cards**: cat, dog, horse, sheep, cow, bird, pig, fish

- **Position System**: Cards are identified by grid positions (A1-D4)The Kids Memory Game is a classic card-matching game where players flip two cards at a time trying to find matching pairs. The game features:

- **Persistent Storage**: All games and attempts are saved to MongoDB

- **Leaderboard**: Top 5 completed games ranked by fewest attempts <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## 📋 Table of Contents- **4x4 Grid**: 16 cards total (8 pairs of matching animals) <p align="center">

- [Features](#-features)- **Animal Cards**: cat, dog, horse, sheep, cow, bird, pig, fish<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

- [Technology Stack](#-technology-stack)

- [Prerequisites](#-prerequisites)- **Position System**: Cards are identified by grid positions (A1-D4)<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

- [Installation](#-installation)

- [Running the Application](#-running-the-application)- **Persistent Storage**: All games and attempts are saved to MongoDB<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

- [API Documentation](#-api-documentation)

- [Testing](#-testing)- **Leaderboard**: Top 5 completed games ranked by fewest attempts<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

- [Project Structure](#-project-structure)

- [Development](#-development)<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

- [Docker Deployment](#-docker-deployment)

## 📋 Table of Contents<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

## ✨ Features

<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

- ✅ **RESTful API** - Clean, well-documented endpoints

- ✅ **Game Management** - Create, play, and track games- [Features](#-features) <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

- ✅ **Attempt History** - Full history of all card flips

- ✅ **Leaderboard** - Top 5 games by performance- [Technology Stack](#-technology-stack) <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

- ✅ **Input Validation** - Comprehensive DTO validation

- ✅ **Error Handling** - Proper HTTP status codes and messages- [Prerequisites](#-prerequisites) <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

- ✅ **Testing** - 73 tests (49 unit + 24 E2E) with 83.7% coverage

- ✅ **Docker Support** - Containerized deployment ready- [Installation](#-installation)</p>

- ✅ **TypeScript** - Full type safety

- ✅ **Swagger/OpenAPI** - Interactive API documentation- [Running the Application](#-running-the-application) <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

## 🛠 Technology Stack- [API Documentation](#-api-documentation) [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

- **Framework**: [NestJS](https://nestjs.com/) 11.x- [Testing](#-testing)

- **Language**: TypeScript 5.7

- **Database**: MongoDB with Mongoose ODM- [Project Structure](#-project-structure)## Description

- **Validation**: class-validator & class-transformer

- **Testing**: Jest with mongodb-memory-server- [Development](#-development)

- **Documentation**: Swagger/OpenAPI

- **Containerization**: Docker & Docker Compose[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

- **Code Quality**: ESLint + Prettier

## ✨ Features

## 📦 Prerequisites

## Project setup

- **Node.js**: 18.x or higher

- **npm**: 9.x or higher- ✅ **RESTful API** - Clean, well-documented endpoints

- **MongoDB**: 6.x or higher (or use Docker)

- **Docker** (optional): For containerized deployment- ✅ **Game Management** - Create, play, and track games```bash

## 🚀 Installation- ✅ **Attempt History** - Full history of all card flips$ npm install

### 1. Clone the Repository- ✅ **Leaderboard** - Top 5 games by performance```

```bash- ✅ **Input Validation** - Comprehensive DTO validation

git clone https://github.com/yourusername/kids-memory-game-api.git

cd kids-memory-game-api- ✅ **Error Handling** - Proper HTTP status codes and messages## Compile and run the project

```

- ✅ **Testing** - 73 tests (49 unit + 24 E2E) with 83.7% coverage

### 2. Install Dependencies

- ✅ **Docker Support** - Containerized deployment ready```bash

```bash

npm install- ✅ **TypeScript** - Full type safety# development

```

$ npm run start

### 3. Environment Configuration

## 🛠 Technology Stack

Create a `.env` file in the root directory:

# watch mode

````env

# MongoDB Configuration- **Framework**: [NestJS](https://nestjs.com/) 11.x$ npm run start:dev

MONGODB_URI=mongodb://localhost:27017/kids-memory-game

- **Language**: TypeScript 5.7

# Application Configuration

PORT=3000- **Database**: MongoDB with Mongoose ODM# production mode

NODE_ENV=development

```- **Validation**: class-validator & class-transformer$ npm run start:prod



### 4. Start MongoDB- **Testing**: Jest with mongodb-memory-server```



**Option A: Using Docker**- **Containerization**: Docker & Docker Compose



```bash- **Code Quality**: ESLint + Prettier## Run tests

docker-compose up -d mongodb

```## 📦 Prerequisites```bash



**Option B: Local MongoDB**# unit tests



```bash- **Node.js**: 18.x or higher$ npm run test

# Make sure MongoDB is running on localhost:27017

mongod- **npm**: 9.x or higher

````

- **MongoDB**: 6.x or higher (or use Docker)# e2e tests

## 🏃 Running the Application

- **Docker** (optional): For containerized deployment$ npm run test:e2e

### Development Mode (with hot-reload)

## 🚀 Installation# test coverage

```bash

npm run start:dev$ npm run test:cov

```

### 1. Clone the Repository```

The API will be available at:

- **API**: `http://localhost:3000````bash## Deployment

- **Swagger Docs**: `http://localhost:3000/api/docs`

git clone https://github.com/yourusername/kids-memory-game-api.git

### Production Mode

cd kids-memory-game-apiWhen you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

````bash

# Build the application```

npm run build

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

# Start production server

npm run start:prod### 2. Install Dependencies

````

````bash

### Using Docker Compose (Full Stack)

```bash$ npm install -g @nestjs/mau

```bash

# Start both API and MongoDBnpm install$ mau deploy

docker-compose up

````

# Or run in detached mode

docker-compose up -d### 3. Environment ConfigurationWith Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

`````

Create a `.env` file in the root directory:## Resources

## 📚 API Documentation

````envCheck out a few resources that may come in handy when working with NestJS:

Base URL: `http://localhost:3000`

# MongoDB Configuration

**Interactive Documentation**: Visit `http://localhost:3000/api/docs` for the Swagger UI

MONGODB_URI=mongodb://localhost:27017/kids-memory-game- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

### Endpoints Overview

- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

| Method | Endpoint                | Description                   |

| ------ | ----------------------- | ----------------------------- |# Application Configuration- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

| POST   | `/game/new`             | Create a new game             |

| POST   | `/game/:gameId/play`    | Submit two cards for matching |PORT=3000- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

| GET    | `/game/:gameId`         | Get current game state        |

| GET    | `/game/:gameId/history` | Get attempt history           |NODE_ENV=development- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

| GET    | `/game/leaderboard`     | Get top 5 completed games     |

```- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

---

- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

### 1. Create New Game

### 4. Start MongoDB- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

**POST** `/game/new`



Creates a new memory game session with a shuffled 4x4 board.

**Option A: Using Docker**## Support

#### Request

```bash

No request body required.

docker-compose up -d mongodbNest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

#### Response

`````

```````json

{## Stay in touch

  "gameId": "550e8400-e29b-41d4-a716-446655440000",

  "message": "New game created successfully"**Option B: Local MongoDB**

}

``````bash- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)



#### Example# Make sure MongoDB is running on localhost:27017- Website - [https://nestjs.com](https://nestjs.com/)



```bashmongod- Twitter - [@nestframework](https://twitter.com/nestframework)

curl -X POST http://localhost:3000/game/new

```````

---## License

### 2. Play a Round## 🏃 Running the Application

**POST** `/game/:gameId/play`Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

Submit two card positions to attempt a match.### Development Mode (with hot-reload)

#### Request Parameters```bash

npm run start:dev

- `gameId` (path parameter) - The unique game identifier```

#### Request BodyThe API will be available at `http://localhost:3000`

````json### Production Mode

{

  "position1": "A1",```bash

  "position2": "B2"# Build the application

}npm run build

````

# Start production server

**Position Format**: Letter (A-D) + Number (1-4)npm run start:prod

````

- Columns: A, B, C, D (left to right)

- Rows: 1, 2, 3, 4 (top to bottom)### Using Docker Compose (Full Stack)



#### Response (Match Found)```bash

# Start both API and MongoDB

```jsondocker-compose up

{

  "card1": {# Or run in detached mode

    "position": "A1",docker-compose up -d

    "value": "cat"```

  },

  "card2": {## 📚 API Documentation

    "position": "B2",

    "value": "cat"Base URL: `http://localhost:3000`

  },

  "isMatch": true,### Endpoints Overview

  "attemptNumber": 3,

  "gameCompleted": false| Method | Endpoint                | Description                   |

}| ------ | ----------------------- | ----------------------------- |

```| POST   | `/game/new`             | Create a new game             |

| POST   | `/game/:gameId/play`    | Submit two cards for matching |

#### Response (No Match)| GET    | `/game/:gameId`         | Get current game state        |

| GET    | `/game/:gameId/history` | Get attempt history           |

```json| GET    | `/game/leaderboard`     | Get top 5 completed games     |

{

  "card1": {---

    "position": "A1",

    "value": "cat"### 1. Create New Game

  },

  "card2": {**POST** `/game/new`

    "position": "C3",

    "value": "dog"Creates a new memory game session with a shuffled 4x4 board.

  },

  "isMatch": false,#### Request

  "attemptNumber": 4,

  "gameCompleted": falseNo request body required.

}

```#### Response



#### Response (Game Won)```json

{

```json  "gameId": "550e8400-e29b-41d4-a716-446655440000",

{  "message": "New game created successfully"

  "card1": {}

    "position": "D3",```

    "value": "fish"

  },#### Example

  "card2": {

    "position": "D4",```bash

    "value": "fish"curl -X POST http://localhost:3000/game/new

  },```

  "isMatch": true,

  "attemptNumber": 12,---

  "gameCompleted": true,

  "message": "Congratulations! You've completed the game!"### 2. Play a Round

}

```**POST** `/game/:gameId/play`



#### ExampleSubmit two card positions to attempt a match.



```bash#### Request Parameters

curl -X POST http://localhost:3000/game/YOUR_GAME_ID/play \

  -H "Content-Type: application/json" \- `gameId` (path parameter) - The unique game identifier

  -d '{"position1": "A1", "position2": "A2"}'

```#### Request Body



#### Validation Rules```json

{

- Both positions must be in format: `[A-D][1-4]`  "position1": "A1",

- Cannot select the same position twice  "position2": "B2"

- Cannot select already matched cards}

- Cannot play on a completed game```



#### Error Responses**Position Format**: Letter (A-D) + Number (1-4)



**400 Bad Request** - Invalid positions or game completed- Columns: A, B, C, D (left to right)

- Rows: 1, 2, 3, 4 (top to bottom)

```json

{#### Response (Match Found)

  "statusCode": 400,

  "message": "Cannot select the same card twice",```json

  "error": "Bad Request"{

}  "card1": {

```    "position": "A1",

    "value": "cat"

**404 Not Found** - Game doesn't exist  },

  "card2": {

```json    "position": "B2",

{    "value": "cat"

  "statusCode": 404,  },

  "message": "Game not found",  "isMatch": true,

  "error": "Not Found"  "attemptNumber": 3,

}  "gameCompleted": false

```}

````

---

#### Response (No Match)

### 3. Get Game State

````json

**GET** `/game/:gameId`{

  "card1": {

Retrieve the current state of a game (does not reveal unmatched cards).    "position": "A1",

    "value": "cat"

#### Request Parameters  },

  "card2": {

- `gameId` (path parameter) - The unique game identifier    "position": "C3",

    "value": "dog"

#### Response  },

  "isMatch": false,

```json  "attemptNumber": 4,

{  "gameCompleted": false

  "gameId": "550e8400-e29b-41d4-a716-446655440000",}

  "status": "in-progress",```

  "matchedCards": ["A1", "B2", "C3", "D4"],

  "attemptCount": 5,#### Response (Game Won)

  "startTime": "2025-10-04T10:30:00.000Z"

}```json

```{

  "card1": {

#### Response (Completed Game)    "position": "D3",

    "value": "fish"

```json  },

{  "card2": {

  "gameId": "550e8400-e29b-41d4-a716-446655440000",    "position": "D4",

  "status": "completed",    "value": "fish"

  "matchedCards": [  },

    "A1",  "isMatch": true,

    "A2",  "attemptNumber": 12,

    "A3",  "gameCompleted": true,

    "A4",  "message": "Congratulations! You've completed the game!"

    "B1",}

    "B2",```

    "B3",

    "B4",#### Example

    "C1",

    "C2",```bash

    "C3",curl -X POST http://localhost:3000/game/YOUR_GAME_ID/play \

    "C4",  -H "Content-Type: application/json" \

    "D1",  -d '{"position1": "A1", "position2": "A2"}'

    "D2",```

    "D3",

    "D4"#### Validation Rules

  ],

  "attemptCount": 12,- Both positions must be in format: `[A-D][1-4]`

  "startTime": "2025-10-04T10:30:00.000Z",- Cannot select the same position twice

  "endTime": "2025-10-04T10:35:23.000Z",- Cannot select already matched cards

  "durationMs": 323000- Cannot play on a completed game

}

```#### Error Responses



#### Example**400 Bad Request** - Invalid positions or game completed



```bash```json

curl http://localhost:3000/game/YOUR_GAME_ID{

```  "statusCode": 400,

  "message": "Cannot select the same card twice",

---  "error": "Bad Request"

}

### 4. Get Attempt History```



**GET** `/game/:gameId/history`**404 Not Found** - Game doesn't exist



Retrieve the complete history of all card flip attempts for a game.```json

{

#### Request Parameters  "statusCode": 404,

  "message": "Game not found",

- `gameId` (path parameter) - The unique game identifier  "error": "Not Found"

}

#### Response```



```json---

{

  "gameId": "550e8400-e29b-41d4-a716-446655440000",### 3. Get Game State

  "attempts": [

    {**GET** `/game/:gameId`

      "attemptNumber": 1,

      "position1": "A1",Retrieve the current state of a game (does not reveal unmatched cards).

      "position2": "B1",

      "value1": "cat",#### Request Parameters

      "value2": "dog",

      "isMatch": false,- `gameId` (path parameter) - The unique game identifier

      "timestamp": "2025-10-04T10:30:15.000Z"

    },#### Response

    {

      "attemptNumber": 2,```json

      "position1": "A1",{

      "position2": "A2",  "gameId": "550e8400-e29b-41d4-a716-446655440000",

      "value1": "cat",  "status": "in-progress",

      "value2": "cat",  "matchedCards": ["A1", "B2", "C3", "D4"],

      "isMatch": true,  "attemptCount": 5,

      "timestamp": "2025-10-04T10:30:28.000Z"  "startTime": "2025-10-04T10:30:00.000Z"

    }}

  ]```

}

```#### Response (Completed Game)



#### Example```json

{

```bash  "gameId": "550e8400-e29b-41d4-a716-446655440000",

curl http://localhost:3000/game/YOUR_GAME_ID/history  "status": "completed",

```  "matchedCards": [

    "A1",

---    "A2",

    "A3",

### 5. Get Leaderboard    "A4",

    "B1",

**GET** `/game/leaderboard`    "B2",

    "B3",

Retrieve the top 5 completed games, ranked by fewest attempts (with duration as tiebreaker).    "B4",

    "C1",

#### Request    "C2",

    "C3",

No parameters required.    "C4",

    "D1",

#### Response    "D2",

    "D3",

```json    "D4"

[  ],

  {  "attemptCount": 12,

    "gameId": "550e8400-e29b-41d4-a716-446655440000",  "startTime": "2025-10-04T10:30:00.000Z",

    "attemptCount": 8,  "endTime": "2025-10-04T10:35:23.000Z",

    "durationMs": 245000,  "durationMs": 323000

    "completedAt": "2025-10-04T10:15:00.000Z"}

  },```

  {

    "gameId": "6fa459ea-ee8a-3ca4-894e-db77e160355e",#### Example

    "attemptCount": 8,

    "durationMs": 278000,```bash

    "completedAt": "2025-10-04T11:20:00.000Z"curl http://localhost:3000/game/YOUR_GAME_ID

  },```

  {

    "gameId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",---

    "attemptCount": 9,

    "durationMs": 312000,### 4. Get Attempt History

    "completedAt": "2025-10-04T09:45:00.000Z"

  }**GET** `/game/:gameId/history`

]

```Retrieve the complete history of all card flip attempts for a game.



**Sorting Logic**:#### Request Parameters



1. Primary: Fewest attempts (ascending)- `gameId` (path parameter) - The unique game identifier

2. Secondary: Fastest time (ascending) - used when attempts are equal

3. Limit: Top 5 games only#### Response



#### Example```json

{

```bash  "gameId": "550e8400-e29b-41d4-a716-446655440000",

curl http://localhost:3000/game/leaderboard  "attempts": [

```    {

      "attemptNumber": 1,

---      "position1": "A1",

      "position2": "B1",

## 🧪 Testing      "value1": "cat",

      "value2": "dog",

The project includes comprehensive test coverage:      "isMatch": false,

      "timestamp": "2025-10-04T10:30:15.000Z"

- **Unit Tests**: 49 tests covering services, utilities, and constants    },

- **E2E Tests**: 24 tests covering all API endpoints and edge cases    {

- **Coverage**: 83.7% code coverage      "attemptNumber": 2,

      "position1": "A1",

### Run All Tests      "position2": "A2",

      "value1": "cat",

```bash      "value2": "cat",

npm test      "isMatch": true,

```      "timestamp": "2025-10-04T10:30:28.000Z"

    }

### Run Unit Tests  ]

}

```bash```

npm run test

#### Example

# With coverage report

npm run test:cov```bash

```curl http://localhost:3000/game/YOUR_GAME_ID/history

````

### Run E2E Tests

---

```bash

npm run test:e2e### 5. Get Leaderboard

```

**GET** `/game/leaderboard`

### Run Tests in Watch Mode

Retrieve the top 5 completed games, ranked by fewest attempts (with duration as tiebreaker).

```bash

npm run test:watch#### Request

```

No parameters required.

### Test Output Example

#### Response

````

Test Suites: 5 passed, 5 total```json

Tests:       73 passed, 73 total[

Snapshots:   0 total  {

Time:        12.456 s    "gameId": "550e8400-e29b-41d4-a716-446655440000",

    "attemptCount": 8,

Coverage:    "durationMs": 245000,

Statements   : 83.7%    "completedAt": "2025-10-04T10:15:00.000Z"

Branches     : 83.3%  },

Functions    : 82.5%  {

Lines        : 84.2%    "gameId": "6fa459ea-ee8a-3ca4-894e-db77e160355e",

```    "attemptCount": 8,

    "durationMs": 278000,

## 📁 Project Structure    "completedAt": "2025-10-04T11:20:00.000Z"

  },

```  {

kids-memory-game-api/    "gameId": "7c9e6679-7425-40de-944b-e07fc1f90ae7",

├── src/    "attemptCount": 9,

│   ├── game/                       # Game module    "durationMs": 312000,

│   │   ├── constants/              # Game constants & helpers    "completedAt": "2025-10-04T09:45:00.000Z"

│   │   │   └── game.constants.ts   # Card types, validation  }

│   │   ├── dto/                    # Data Transfer Objects]

│   │   │   ├── index.ts```

│   │   │   └── play-round.dto.ts   # Play round validation

│   │   ├── schemas/                # Mongoose schemas**Sorting Logic**:

│   │   │   ├── attempt.schema.ts   # Attempt history model

│   │   │   └── game.schema.ts      # Game state model1. Primary: Fewest attempts (ascending)

│   │   ├── utils/                  # Utility functions2. Secondary: Fastest time (ascending) - used when attempts are equal

│   │   │   └── card-shuffle.util.ts # Fisher-Yates shuffle3. Limit: Top 5 games only

│   │   ├── game.controller.ts      # API endpoints

│   │   ├── game.module.ts          # Module definition#### Example

│   │   └── game.service.ts         # Business logic

│   ├── app.controller.ts           # Root controller```bash

│   ├── app.module.ts               # Root modulecurl http://localhost:3000/game/leaderboard

│   ├── app.service.ts              # Root service```

│   └── main.ts                     # Application entry point

├── test/                           # E2E tests---

│   ├── game.e2e-spec.ts           # Game API E2E tests

│   └── jest-e2e.json              # E2E test config## 🧪 Testing

├── documents/                      # Project documentation

│   ├── Implementation-Plan.md     # Detailed implementation planThe project includes comprehensive test coverage:

│   ├── LLM-Onboarding.md         # Quick context guide

│   └── Progress.md                # Progress tracking- **Unit Tests**: 49 tests covering services, utilities, and constants

├── docker-compose.yml             # Docker compose configuration- **E2E Tests**: 24 tests covering all API endpoints and edge cases

├── docker-compose.prod.yml        # Production Docker config- **Coverage**: 83.7% code coverage

├── Dockerfile                     # Multi-stage Docker build

├── .env                          # Environment variables### Run All Tests

├── package.json                  # Dependencies & scripts

└── README.md                     # This file```bash

```npm test

````

## 🔧 Development

### Run Unit Tests

### Code Quality

````bash

```bashnpm run test

# Lint code

npm run lint# With coverage report

npm run test:cov

# Format code```

npm run format

```### Run E2E Tests



### Building```bash

npm run test:e2e

```bash```

# Build for production

npm run build### Run Tests in Watch Mode



# The compiled output will be in the dist/ folder```bash

```npm run test:watch

````

### Environment Variables

### Test Output Example

| Variable | Description | Default |

| ------------- | --------------------------- | -------------------------------------------- |```

| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kids-memory-game` |Test Suites: 5 passed, 5 total

| `PORT` | Application port | `3000` |Tests: 73 passed, 73 total

| `NODE_ENV` | Environment (dev/prod/test) | `development` |Snapshots: 0 total

Time: 12.456 s

### Adding New Features

Coverage:

1. Create feature branch: `git checkout -b feature/your-feature`Statements : 83.7%

2. Make changes and add testsBranches : 83.3%

3. Run tests: `npm test`Functions : 82.5%

4. Lint code: `npm run lint`Lines : 84.2%

5. Commit: `git commit -m "Add your feature"````

6. Push: `git push origin feature/your-feature`

## 📁 Project Structure

## 🐳 Docker Deployment

````

### Development Environmentkids-memory-game-api/

├── src/

```bash│   ├── game/                       # Game module

# Start both API and MongoDB│   │   ├── constants/              # Game constants & helpers

docker-compose up│   │   │   └── game.constants.ts   # Card types, validation

│   │   ├── dto/                    # Data Transfer Objects

# Run in detached mode│   │   │   ├── index.ts

docker-compose up -d│   │   │   └── play-round.dto.ts   # Play round validation

│   │   ├── schemas/                # Mongoose schemas

# View logs│   │   │   ├── attempt.schema.ts   # Attempt history model

docker-compose logs -f│   │   │   └── game.schema.ts      # Game state model

│   │   ├── utils/                  # Utility functions

# Stop all services│   │   │   └── card-shuffle.util.ts # Fisher-Yates shuffle

docker-compose down│   │   ├── game.controller.ts      # API endpoints

```│   │   ├── game.module.ts          # Module definition

│   │   └── game.service.ts         # Business logic

### Production Environment│   ├── app.controller.ts           # Root controller

│   ├── app.module.ts               # Root module

```bash│   ├── app.service.ts              # Root service

# Start production stack│   └── main.ts                     # Application entry point

docker-compose -f docker-compose.prod.yml up -d├── test/                           # E2E tests

│   ├── game.e2e-spec.ts           # Game API E2E tests

# View logs│   └── jest-e2e.json              # E2E test config

docker-compose -f docker-compose.prod.yml logs -f├── documents/                      # Project documentation

│   ├── Implementation-Plan.md     # Detailed implementation plan

# Stop production stack│   ├── LLM-Onboarding.md         # Quick context guide

docker-compose -f docker-compose.prod.yml down│   └── Progress.md                # Progress tracking

```├── docker-compose.yml             # Docker compose configuration

├── docker-compose.prod.yml        # Production Docker config

### Docker Configuration├── Dockerfile                     # Multi-stage Docker build

├── .env                          # Environment variables

The production setup includes:├── package.json                  # Dependencies & scripts

└── README.md                     # This file

- **Multi-stage build** for smaller image size```

- **Health checks** for both API and MongoDB

- **Volume persistence** for MongoDB data## 🔧 Development

- **Optimized** for production use

### Code Quality

### Building the Docker Image

```bash

```bash# Lint code

# Build development imagenpm run lint

docker build -t kids-memory-game-api:dev .

# Format code

# Build production imagenpm run format

docker build --target production -t kids-memory-game-api:prod .```

````

### Building

### Environment Variables for Docker

````bash

When using Docker, set these variables in `docker-compose.yml` or `docker-compose.prod.yml`:# Build for production

npm run build

```yaml

environment:# The compiled output will be in the dist/ folder

  - MONGODB_URI=mongodb://mongodb:27017/kids-memory-game```

  - PORT=3000

  - NODE_ENV=production### Environment Variables

````

| Variable | Description | Default |

## 📊 Game Rules| ------------- | --------------------------- | -------------------------------------------- |

| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kids-memory-game` |

1. **Objective**: Match all 8 pairs of cards in the fewest attempts| `PORT` | Application port | `3000` |

2. **Grid Layout**: 4 rows × 4 columns (A-D, 1-4)| `NODE_ENV` | Environment (dev/prod/test) | `development` |

3. **Cards**: 8 animal types, 2 of each (16 cards total)

4. **Turn**: Select two card positions### Adding New Features

5. **Match**: If cards match, they stay revealed

6. **No Match**: Cards are hidden again1. Create feature branch: `git checkout -b feature/your-feature`

7. **Win Condition**: All 8 pairs matched2. Make changes and add tests

8. **Scoring**: Fewer attempts = better score3. Run tests: `npm test`

9. Lint code: `npm run lint`

### Card Animals5. Commit: `git commit -m "Add your feature"`

6. Push: `git push origin feature/your-feature`

- 🐱 cat

- 🐶 dog## 🐳 Docker Deployment

- 🐴 horse

- 🐑 sheep### Development Environment

- 🐄 cow

- 🐦 bird```bash

- 🐷 pigdocker-compose up

- 🐟 fish```

## 🤝 Contributing### Production Environment

Contributions are welcome! Please:```bash

docker-compose -f docker-compose.prod.yml up -d

1. Fork the repository```

2. Create a feature branch

3. Add tests for new functionalityThe production setup includes:

4. Ensure all tests pass

5. Submit a pull request- Multi-stage build for smaller image size

- Health checks for both API and MongoDB

## 📄 License- Optimized for production use

This project is licensed under the UNLICENSED license.## 📊 Game Rules

## 👥 Authors1. **Objective**: Match all 8 pairs of cards in the fewest attempts

2. **Grid Layout**: 4 rows × 4 columns (A-D, 1-4)

- Abed Matini - Initial work3. **Cards**: 8 animal types, 2 of each (16 cards total)

4. **Turn**: Select two card positions

## 🙏 Acknowledgments5. **Match**: If cards match, they stay revealed

6. **No Match**: Cards are hidden again

- NestJS team for the amazing framework7. **Win Condition**: All 8 pairs matched

- MongoDB team for the database8. **Scoring**: Fewer attempts = better score

- All contributors and testers

### Card Animals

---

- 🐱 cat

**Happy Gaming! 🎮✨**- 🐶 dog

- 🐴 horse
- 🐑 sheep
- 🐄 cow
- 🐦 bird
- 🐷 pig
- 🐟 fish

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the UNLICENSED license.

## 👥 Authors

- Abed Matini - Initial work

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- MongoDB team for the database
- All contributors and testers

---

**Happy Gaming! 🎮✨**
