"use client";

import React from "react";
import styles from "./TicTacToe.module.css";
import { GameState, initialState, playMove } from "./logic";

// PUBLIC_INTERFACE
export function TicTacToe(): React.ReactElement {
  /** A modern, client-side Tic Tac Toe component.
   * - Responsive 3x3 grid
   * - Player turn indicator and status
   * - Win/draw detection with highlight
   * - Reset/New Game button
   * - Ocean Professional styling via CSS module
   */
  const [state, setState] = React.useState<GameState>(initialState);
  const { board, nextPlayer, winner, winningLine, isDraw } = state;

  const onCellClick = (idx: number) => {
    setState((s) => playMove(s, idx));
  };

  const onReset = () => setState(initialState());

  const statusText = React.useMemo(() => {
    if (winner) return `Player ${winner} wins!`;
    if (isDraw) return "It's a draw.";
    return `Next: Player ${nextPlayer}`;
  }, [winner, isDraw, nextPlayer]);

  const statusBadge = React.useMemo(() => {
    if (winner) {
      return (
        <span className={`${styles.badge} ${winner === "X" ? styles.badgeX : styles.badgeO}`} aria-live="polite">
          • Winner: {winner}
        </span>
      );
    }
    if (isDraw) {
      return (
        <span className={styles.badge} style={{ color: "#EF4444" }} aria-live="polite">
          • Draw
        </span>
      );
    }
    return (
      <span
        className={`${styles.badge} ${nextPlayer === "X" ? styles.badgeX : styles.badgeO}`}
        aria-live="polite"
      >
        • Turn: {nextPlayer}
      </span>
    );
  }, [winner, isDraw, nextPlayer]);

  const gameOver = Boolean(winner || isDraw);

  return (
    <div className={styles.wrapper}>
      <section className={styles.card} aria-label="Tic Tac Toe">
        <header className={styles.header}>
          <h1 className={styles.title}>Tic Tac Toe</h1>
          <p className={styles.subtitle}>Ocean Professional theme • Smooth and simple</p>
        </header>

        <div className={styles.statusBar} role="status">
          {statusBadge}
          <span className={styles.statusText}>{statusText}</span>
        </div>

        <div
          className={styles.board}
          role="grid"
          aria-label="Game board"
          aria-rowcount={3}
          aria-colcount={3}
        >
          {board.map((cell, i) => {
            const isWinningCell = winningLine?.includes(i) ?? false;
            const disabled = gameOver || cell !== null;
            return (
              <button
                key={i}
                type="button"
                role="gridcell"
                aria-colindex={(i % 3) + 1}
                aria-rowindex={Math.floor(i / 3) + 1}
                aria-label={`Cell ${i + 1}${cell ? `: ${cell}` : ""}`}
                className={`${styles.cell} ${disabled ? styles.cellDisabled : ""} ${
                  isWinningCell ? styles.winning : ""
                }`}
                onClick={() => onCellClick(i)}
                disabled={disabled && !isWinningCell && cell !== null}
              >
                <span
                  className={`${styles.cellMark} ${
                    cell === "X" ? styles.markX : cell === "O" ? styles.markO : ""
                  }`}
                  style={{ transform: cell ? "scale(1)" : "scale(0.9)", opacity: cell ? 1 : 0.6 }}
                >
                  {cell ?? ""}
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button className={`${styles.button} ${styles.primary}`} onClick={onReset}>
            {gameOver ? "New Game" : "Reset"}
          </button>
        </div>

        <footer className={styles.footer}>
          <span>Built with Next.js • No backend required</span>
        </footer>
      </section>
    </div>
  );
}
