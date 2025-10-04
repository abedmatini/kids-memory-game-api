Kids Memory Game API and Persistence
How the game works
Shuffle the cards and lay them face down in columns and rows (4x4 in this game). The
player turns around 2 cards at a time. If the cards match, the player keeps the cards and
continues with the next round. If they do not match, the cards are turned over again and
will still be part of the game. When all cards have been matched, the game is over. The aim
is to remember where cards were seen and try to match them all with as little attempts as
possible.
Assignment
You can assume that the front-end application (UI) already exists. Create an API service
and data storage as the backend for the game to persist the state of the current game. For
simplicity, no authentication or user session management must be developed.

1. The player must be able to start a new game.
   o A unique key can be used to manage a “session” for a player and a game.
   You can use your own discretion here but try to keep it simple!
   o The API service must shuffle the cards and store a new game state in the
   database that can be identified with the unique key (the player).
2. The player must be able to submit 2 cards for each round, identified by column (A,
   B, C or D) and row (1, 2, 3 or 4):
   o An example of player choice can be (B1, B3).
   o The player is not allowed to submit cards that are already “won” and out of
   the current game.
3. If the cards match, the player will be informed, and the cards are removed (or
   locked) from the current game:
   o Example of a matching pair - (B1, B3) will be (Dog, Dog) and a match!
4. If the cards do not match, the player will be informed and allowed to continue with
   next round:
   o Example of nonmatching pair - (B1, C4) will be (Dog, Horse) and not a match.
5. A history of all players' attempts per game must be saved.
6. A leaderboard must be available to show the top 5 games won with the fewest
   attempts. If the same number of attempts occurred, the winner will be the quickest
   time from the game started until it was completed.
   Requirements
   HTTP endpoints to manage the above functionality on the backend with all data stored in
   MongoDB. Please containerize your API service.
   Compulsory technology to use:
   • Node.js & Express web framework (NestJS preferred)
   • TypeScript
   • MongoDB
   • Docker
   Any other frameworks, libraries etc. are welcome!
   Evaluation Criteria
   Functionality: Does the application meet the specified requirements?
   Code Quality: Is the code well-structured, readable, and maintainable? Are best practices
   followed and enforced?
   Testing: Are there sufficient unit tests covering critical parts of the application? Do the
   tests effectively validate the functionality and handle edge cases?
   Documentation: Is the README.md file clear and comprehensive? Does the
   documentation provide insights into the API's usage and any additional features?
