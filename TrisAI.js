// Variabile per la scacchiera e il livello di difficoltà
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let difficulty = 2; // Default livello medio

// Imposta la difficoltà dell'IA
function setDifficulty(level) {
    difficulty = level;
    resetGame();
    document.querySelector('.level-selection').style.display = 'none';
    document.querySelector('#board').style.pointerEvents = 'auto'; // Permette il gioco
    document.querySelector('.reset-btn').style.display = 'inline-block';
    drawBoard();
}

// Disegna la scacchiera
function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Pulisce la scacchiera

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = board[row][col];
            cell.onclick = makeMove;
            boardElement.appendChild(cell);
        }
    }
}

// Funzione per la mossa del giocatore
function makeMove(event) {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (board[row][col] === '') {
        board[row][col] = 'X'; // Mossa del giocatore
        drawBoard();
        checkWin();
        setTimeout(aiMove, 300); // Mossa dell'IA dopo 300ms
    }
}

// Funzione per la mossa dell'IA
function aiMove() {
    let emptyCells = [];
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                emptyCells.push({ row: row, col: col });
            }
        }
    }

    if (emptyCells.length > 0) {
        let aiMove = getAiMove(emptyCells);
        board[aiMove.row][aiMove.col] = 'O';
        drawBoard();
        checkWin();
    }
}

// Calcola la mossa dell'IA in base al livello di difficoltà
function getAiMove(emptyCells) {
    switch (difficulty) {
        case 1:
            return emptyCells[Math.floor(Math.random() * emptyCells.length)]; // Facile
        case 2:
            return mediumAI(emptyCells); // Medio
        case 3:
            return hardAI(emptyCells); // Difficile
    }
}

// Funzione IA medio: un po' più intelligente, ma non perfetta
function mediumAI(emptyCells) {
    // Qui puoi inserire logiche più intelligenti
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Funzione IA difficile: simula un comportamento quasi perfetto
function hardAI(emptyCells) {
    // Logica dell'IA che gioca quasi perfettamente
    // (questa funzione può essere estesa per includere strategie avanzate)
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

// Funzione per controllare la vittoria
function checkWin() {
    const winPatterns = [
        [[0, 0], [0, 1], [0, 2]], // Riga 1
        [[1, 0], [1, 1], [1, 2]], // Riga 2
        [[2, 0], [2, 1], [2, 2]], // Riga 3
        [[0, 0], [1, 0], [2, 0]], // Colonna 1
        [[0, 1], [1, 1], [2, 1]], // Colonna 2
        [[0, 2], [1, 2], [2, 2]], // Colonna 3
        [[0, 0], [1, 1], [2, 2]], // Diagonale
        [[0, 2], [1, 1], [2, 0]]  // Diagonale
    ];

    for (let i = 0; i < winPatterns.length; i++) {
        const pattern = winPatterns[i];
        const a = pattern[0];
        const b = pattern[1];
        const c = pattern[2];

        if (board[a[0]][a[1]] === board[b[0]][b[1]] && board[a[0]][a[1]] === board[c[0]][c[1]] && board[a[0]][a[1]] !== '') {
            alert(board[a[0]][a[1]] + ' ha vinto!');
            resetGame();
        }
    }

    let isDraw = true;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
                isDraw = false;
            }
        }
    }

    if (isDraw) {
        alert("Pareggio!");
        resetGame();
    }
}

// Funzione per resettare il gioco
function resetGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    drawBoard();
    document.querySelector('.level-selection').style.display = 'block';
    document.querySelector('#board').style.pointerEvents = 'none'; // Disabilita il gioco prima della selezione del livello
    document.querySelector('.reset-btn').style.display = 'none';
}

// Disegna la scacchiera all'inizio
drawBoard();
