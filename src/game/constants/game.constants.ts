// Card types (animals)
export const CARD_TYPES = [
  'cat',
  'dog',
  'horse',
  'sheep',
  'cow',
  'bird',
  'pig',
  'fish',
] as const;

export type CardType = (typeof CARD_TYPES)[number];

// Grid configuration
export const GRID_COLUMNS = ['A', 'B', 'C', 'D'] as const;
export const GRID_ROWS = ['1', '2', '3', '4'] as const;

// Aliases for backward compatibility and testing
export const COLUMNS = GRID_COLUMNS;
export const ROWS = GRID_ROWS;

export const GRID_SIZE = {
  COLUMNS: 4,
  ROWS: 4,
  TOTAL_CARDS: 16,
  TOTAL_PAIRS: 8,
} as const;

// Position types
export type GridColumn = (typeof GRID_COLUMNS)[number];
export type GridRow = (typeof GRID_ROWS)[number];
export type CardPosition = `${GridColumn}${GridRow}`; // e.g., "A1", "B3", "D4"

// Helper to validate position format
export function isValidPosition(position: string): position is CardPosition {
  if (position.length !== 2) return false;
  const col = position[0];
  const row = position[1];
  return (
    GRID_COLUMNS.includes(col as GridColumn) &&
    GRID_ROWS.includes(row as GridRow)
  );
}

// Convert position to array indices
export function positionToIndices(position: CardPosition): {
  row: number;
  col: number;
} {
  const colIndex = GRID_COLUMNS.indexOf(position[0] as GridColumn);
  const rowIndex = GRID_ROWS.indexOf(position[1] as GridRow);
  return { row: rowIndex, col: colIndex };
}

// Convert array indices to position
export function indicesToPosition(row: number, col: number): CardPosition {
  return `${GRID_COLUMNS[col]}${GRID_ROWS[row]}`;
}
