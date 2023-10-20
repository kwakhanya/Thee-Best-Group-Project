class Player
{
    constructor(tetris)
    {
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;

        this.pos = {x: 0, y: 0};
        this.matrix = null;
        this.score = 0;
        // this.SCORE_FOR_SPEED_INCREASE = 20;
        this.reset();
    }
    

    drop() {
        this.pos.y++;
        if (this.arena.collide(this)) {
            this.pos.y--;
            this.arena.merge(this);
            if (this.arena.isGameOver()) {
                // Display "Game Over" or take any appropriate game-over action
                console.log("Game Over");
                this.reset();
                this.score = 0;
                this.tetris.updateScore(this.score);
            } else {
                this.reset();
                this.score += this.arena.sweep();
                this.tetris.updateScore(this.score);
            }
        }
        this.dropCounter = 0;
    }
    

    move(dir)
    {
        this.pos.x += dir;
        if (this.arena.collide(this)) {
            this.pos.x -= dir;
        }
    }

    reset()
    {
        const pieces = 'ILJOTSZ';
        this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0;
        this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
                     (this.matrix[0].length / 2 | 0);
        if (this.arena.collide(this)) {
            this.arena.clear();
            this.score = 0;
            updateScore();
        }
    }

    rotate(dir)
    {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                this._rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    _rotateMatrix(matrix, dir)
    {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }

        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    update(deltaTime)
    {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
        // Check score and adjust drop interval
        if (this.score >= 50) {
            window.alert("Game Over,player 1 Wins" + this.score)
            // displayWinPopup();
            // this.reset()
        }
    }
}
// Get references to the pop-up and close button
const winPopup = document.getElementById("win-popup");
const closePopupButton = document.getElementById("close-popup");

// Function to display the win pop-up
function displayWinPopup() {
    winPopup.style.display = "flex";
}

// Function to close the win pop-up
function closeWinPopup() {
    winPopup.style.display = "none";
}

// Check score and display the win pop-up if the score is 50
function checkScoreAndDisplayPopup(score) {
    if (score >= 50) {
        displayWinPopup();
    }
}

// Attach click event to close the pop-up
closePopupButton.addEventListener("click", closeWinPopup);

// Example usage
// Call checkScoreAndDisplayPopup(score) with the player's current score
// It will display the pop-up if the score is 50 or higher
