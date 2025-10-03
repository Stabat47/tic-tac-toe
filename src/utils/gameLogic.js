// src/utils/gameLogic.js
export function checkWinner(board, sym, boardSize) {
  let winLength = boardSize === 3 ? 3 : 4;

  // rows
  for (let r = 0; r < boardSize; r++) {
    for (let c = 0; c <= boardSize - winLength; c++) {
      if (Array.from({ length: winLength }, (_, i) => board[r * boardSize + c + i]).every(v => v === sym))
        return true;
    }
  }

  // columns
  for (let c = 0; c < boardSize; c++) {
    for (let r = 0; r <= boardSize - winLength; r++) {
      if (Array.from({ length: winLength }, (_, i) => board[(r + i) * boardSize + c]).every(v => v === sym))
        return true;
    }
  }

  // diagonals
  for (let r = 0; r <= boardSize - winLength; r++) {
    for (let c = 0; c <= boardSize - winLength; c++) {
      if (Array.from({ length: winLength }, (_, i) => board[(r + i) * boardSize + c + i]).every(v => v === sym))
        return true;
      if (Array.from({ length: winLength }, (_, i) => board[(r + i) * boardSize + c + winLength - 1 - i]).every(v => v === sym))
        return true;
    }
  }
  return false;
}

export function randomMove(board) {
  const empty = board.map((v, i) => v ? null : i).filter(v => v !== null);
  return empty[Math.floor(Math.random() * empty.length)];
}

export function findBlockingMove(board, playerSymbol, boardSize) {
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = playerSymbol;
      if (checkWinner(board, playerSymbol, boardSize)) {
        board[i] = null;
        return i;
      }
      board[i] = null;
    }
  }
  return null;
}

export function minimax(board, player, computerSymbol, playerSymbol, boardSize, depth = 0, alpha = -Infinity, beta = Infinity) {
  const avail = board.map((v, i) => v ? null : i).filter(v => v !== null);

  if (checkWinner(board, computerSymbol, boardSize)) return { score: 10 - depth };
  if (checkWinner(board, playerSymbol, boardSize)) return { score: -10 + depth };
  if (avail.length === 0) return { score: 0 };
  if (depth > 5 && boardSize > 3) return { score: 0 }; // depth limit for big boards

  const moves = [];

  for (let idx of avail) {
    board[idx] = player;
    const result = minimax(
      board,
      player === computerSymbol ? playerSymbol : computerSymbol,
      computerSymbol,
      playerSymbol,
      boardSize,
      depth + 1,
      alpha,
      beta
    );
    moves.push({ index: idx, score: result.score });
    board[idx] = null;

    if (player === computerSymbol) {
      alpha = Math.max(alpha, result.score);
      if (beta <= alpha) break;
    } else {
      beta = Math.min(beta, result.score);
      if (beta <= alpha) break;
    }
  }

  return player === computerSymbol
    ? moves.reduce((a, b) => (b.score > a.score ? b : a))
    : moves.reduce((a, b) => (b.score < a.score ? b : a));
}
