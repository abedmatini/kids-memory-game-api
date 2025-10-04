import {
  CARD_TYPES,
  COLUMNS,
  ROWS,
  isValidPosition,
  positionToIndices,
} from './game.constants';

describe('Game Constants', () => {
  describe('CARD_TYPES', () => {
    it('should have 8 unique card types', () => {
      expect(CARD_TYPES).toHaveLength(8);
      const uniqueCards = new Set(CARD_TYPES);
      expect(uniqueCards.size).toBe(8);
    });

    it('should contain expected animal names', () => {
      const expectedAnimals = [
        'cat',
        'dog',
        'horse',
        'sheep',
        'cow',
        'bird',
        'pig',
        'fish',
      ];
      expect(CARD_TYPES).toEqual(expectedAnimals);
    });
  });

  describe('COLUMNS and ROWS', () => {
    it('should have 4 columns (A-D)', () => {
      expect(COLUMNS).toEqual(['A', 'B', 'C', 'D']);
    });

    it('should have 4 rows (1-4)', () => {
      expect(ROWS).toEqual(['1', '2', '3', '4']);
    });
  });

  describe('isValidPosition', () => {
    it('should return true for valid positions', () => {
      const validPositions = [
        'A1',
        'A4',
        'B1',
        'B4',
        'C1',
        'C4',
        'D1',
        'D4',
        'A2',
        'B3',
        'C2',
        'D3',
      ];

      validPositions.forEach((position) => {
        expect(isValidPosition(position)).toBe(true);
      });
    });

    it('should return false for invalid column', () => {
      const invalidPositions = ['E1', 'F2', 'Z1', 'X4'];

      invalidPositions.forEach((position) => {
        expect(isValidPosition(position)).toBe(false);
      });
    });

    it('should return false for invalid row', () => {
      const invalidPositions = ['A0', 'B5', 'C9', 'D6'];

      invalidPositions.forEach((position) => {
        expect(isValidPosition(position)).toBe(false);
      });
    });

    it('should return false for malformed positions', () => {
      const invalidPositions = [
        'AA',
        '11',
        'A',
        '1',
        'AB1',
        'A11',
        '',
        'a1',
        'A1B',
      ];

      invalidPositions.forEach((position) => {
        expect(isValidPosition(position)).toBe(false);
      });
    });
  });

  describe('positionToIndices', () => {
    it('should convert A1 to [0, 0]', () => {
      expect(positionToIndices('A1')).toEqual({ row: 0, col: 0 });
    });

    it('should convert D4 to [3, 3]', () => {
      expect(positionToIndices('D4')).toEqual({ row: 3, col: 3 });
    });

    it('should convert B3 to [2, 1]', () => {
      expect(positionToIndices('B3')).toEqual({ row: 2, col: 1 });
    });

    it('should convert C2 to [1, 2]', () => {
      expect(positionToIndices('C2')).toEqual({ row: 1, col: 2 });
    });

    it('should convert all valid positions correctly', () => {
      const testCases = [
        { position: 'A1', expected: { row: 0, col: 0 } },
        { position: 'A2', expected: { row: 1, col: 0 } },
        { position: 'A3', expected: { row: 2, col: 0 } },
        { position: 'A4', expected: { row: 3, col: 0 } },
        { position: 'B1', expected: { row: 0, col: 1 } },
        { position: 'C1', expected: { row: 0, col: 2 } },
        { position: 'D1', expected: { row: 0, col: 3 } },
        { position: 'D4', expected: { row: 3, col: 3 } },
      ];

      testCases.forEach(({ position, expected }) => {
        expect(positionToIndices(position)).toEqual(expected);
      });
    });
  });
});
