export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diags
];

export interface GameState {
  board: Board;
  nextPlayer: Player;
  winner: Player | null;
  winningLine: number[] | null;
  isDraw: boolean;
}

/**
 * Check if the current board has a winner.
 * Returns the winning player and the winning line indices when found.
 */
export function calculateWinner(board: Board): { winner: Player | null; line: number[] | null } {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return { winner: null, line: null };
}

/**
 * Returns true when the board is full (no null cells).
 */
export function isBoardFull(board: Board): boolean {
  return board.every((c) => c !== null);
}

/**
 * Initializes a fresh game state.
 */
export function initialState(): GameState {
  return {
    board: Array<Cell>(9).fill(null),
    nextPlayer: "X",
    winner: null,
    winningLine: null,
    isDraw: false,
  };
}

/**
 * Attempts to place the current player's mark at the given index.
 * Returns the new game state (immutably) or the same state if move is invalid.
 */
export function playMove(state: GameState, index: number): GameState {
  // Ignore if game is over or cell occupied
  if (state.winner || state.isDraw || state.board[index] !== null) {
    return state;
  }

  const newBoard = state.board.slice();
  newBoard[index] = state.nextPlayer;

  const { winner, line } = calculateWinner(newBoard);
  const draw = !winner && isBoardFull(newBoard);

  return {
    board: newBoard,
    nextPlayer: state.nextPlayer === "X" ? "O" : "X",
    winner: winner,
    winningLine: line,
    isDraw: draw,
  };
}
