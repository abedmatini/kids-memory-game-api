import { CARD_TYPES, GRID_SIZE, CardType } from '../constants/game.constants';

/**
 * Fisher-Yates shuffle algorithm
 * Shuffles an array in place
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Creates a deck of cards with pairs
 * Returns 16 cards (8 pairs) for a 4x4 grid
 */
export function createCardDeck(): CardType[] {
  // Create pairs: each card type appears twice
  const deck: CardType[] = [];
  CARD_TYPES.forEach((cardType) => {
    deck.push(cardType, cardType); // Add two of each type
  });
  return deck;
}

/**
 * Creates a shuffled 4x4 game board
 * Returns a 2D array representing the board layout
 */
export function createShuffledBoard(): string[][] {
  // Create and shuffle the deck
  const deck = createCardDeck();
  const shuffledDeck = shuffleArray(deck);

  // Convert flat array to 4x4 grid
  const board: string[][] = [];
  for (let row = 0; row < GRID_SIZE.ROWS; row++) {
    const rowCards: string[] = [];
    for (let col = 0; col < GRID_SIZE.COLUMNS; col++) {
      const index = row * GRID_SIZE.COLUMNS + col;
      rowCards.push(shuffledDeck[index]);
    }
    board.push(rowCards);
  }

  return board;
}

