import {
  createCardDeck,
  shuffleArray,
  createShuffledBoard,
} from './card-shuffle.util';
import { CARD_TYPES } from '../constants/game.constants';

describe('Card Shuffle Utility', () => {
  describe('createCardDeck', () => {
    it('should create a deck of 16 cards (8 pairs)', () => {
      const deck = createCardDeck();
      expect(deck).toHaveLength(16);
    });

    it('should have exactly 2 of each card type', () => {
      const deck = createCardDeck();
      CARD_TYPES.forEach((cardType) => {
        const count = deck.filter((card) => card === cardType).length;
        expect(count).toBe(2);
      });
    });

    it('should contain only valid card types', () => {
      const deck = createCardDeck();
      deck.forEach((card) => {
        expect(CARD_TYPES).toContain(card);
      });
    });
  });

  describe('shuffleArray', () => {
    it('should return an array of the same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray([...original]);
      expect(shuffled).toHaveLength(original.length);
    });

    it('should contain all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray([...original]);
      original.forEach((item) => {
        expect(shuffled).toContain(item);
      });
    });

    it('should shuffle the array (statistically)', () => {
      // Run shuffle multiple times and check if order changes
      const original = [1, 2, 3, 4, 5, 6, 7, 8];
      let hasShuffled = false;

      // Try 10 times - at least one should be different
      for (let i = 0; i < 10; i++) {
        const shuffled = shuffleArray([...original]);
        if (JSON.stringify(shuffled) !== JSON.stringify(original)) {
          hasShuffled = true;
          break;
        }
      }

      expect(hasShuffled).toBe(true);
    });

    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5];
      const copy = [...original];
      const result = shuffleArray(original);
      // shuffleArray creates a copy, so original should be unchanged
      expect(original).toEqual(copy);
      // Result should be a different array instance
      expect(result).not.toBe(original);
      // But contain the same elements
      expect(result.sort()).toEqual(copy.sort());
    });
  });

  describe('createShuffledBoard', () => {
    it('should create a 4x4 board', () => {
      const board = createShuffledBoard();
      expect(board).toHaveLength(4);
      board.forEach((row) => {
        expect(row).toHaveLength(4);
      });
    });

    it('should contain 16 cards total', () => {
      const board = createShuffledBoard();
      const allCards = board.flat();
      expect(allCards).toHaveLength(16);
    });

    it('should have exactly 2 of each card type across the board', () => {
      const board = createShuffledBoard();
      const allCards = board.flat();

      CARD_TYPES.forEach((cardType) => {
        const count = allCards.filter((card) => card === cardType).length;
        expect(count).toBe(2);
      });
    });

    it('should contain only valid card types', () => {
      const board = createShuffledBoard();
      const allCards = board.flat();

      allCards.forEach((card) => {
        expect(CARD_TYPES).toContain(card);
      });
    });

    it('should create different boards on multiple calls (statistically)', () => {
      const board1 = createShuffledBoard();
      const board2 = createShuffledBoard();
      const board3 = createShuffledBoard();

      // At least one of the boards should be different
      const areDifferent =
        JSON.stringify(board1) !== JSON.stringify(board2) ||
        JSON.stringify(board2) !== JSON.stringify(board3);

      expect(areDifferent).toBe(true);
    });
  });
});
