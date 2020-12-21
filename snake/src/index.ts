type GameStatus = 'start' | 'stop';
class Game {
    private key: Direction;
    private maxX: number;
    private maxY: number;
    private nowX: number = 15;
    private nowY: number = 15;
    private score: number = 0;
    private static SNAKE_LENGTH_COEFFICIENT = 3;
    private status: GameStatus = 'start';
    private cells: Array<Array<Cell>>;

    constructor(cellNumX: number, cellNumY: number) {
        this.maxX = cellNumX - 1;
        this.maxY = cellNumY - 1;
        this.cells = new Array<Array<Cell>>(cellNumX);
        this.cells[0] = new Array();
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = new Array(cellNumY).fill(Cell.OFF);
        }
        this.cells[this.nowY][this.nowX] = new Cell('snake', 1);
        this.key = 'up';
    }

    snakeLength(): number {
        if (this.score == 0) {
            return 1;
        }
        return this.score + 1 * Game.SNAKE_LENGTH_COEFFICIENT;
    }

    async locate() {
        if (this.status === 'stop') {
            return;
        }

        switch (this.key) {
            case 'up':
                if (this.nowY === 0) {
                    this.status = 'stop';
                    return;
                }
                this.nowY -= 1;
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                return;
            case 'down':
                if (this.nowY === this.maxY) {
                    this.status = 'stop';
                    return;
                }
                this.nowY += 1;
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                return;
            case 'left':
                if (this.nowX === 0) {
                    this.status = 'stop';
                    return;
                }
                this.nowX -= 1;
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                return;
            case 'right':
                if (this.nowX === this.maxX) {
                    this.status = 'stop';
                    return;
                }
                this.nowX += 1;
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                break;
            default:
                break;
        }
    }

    async elapse() {
        // TODO cache cells
        this.cells.forEach((y) => {
            y.forEach((x) => {
                x.elapse();
            });
        });
    }

    async sleep(ms: number) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async start() {
        while (true) {
            await this.sleep(100);
            await this.elapse();
            await this.locate();
            await this.print();
        }
    }

    async print() {
        const game = document.getElementById('game');
        let html = '';
        this.cells.forEach((x) => {
            x.forEach((y) => {
                html += y.toString();
            });
            html += '<br>';
        });
        game!.innerHTML = html;

        const key = document.getElementById('key');
        key!.innerHTML = this.key;

        const status = document.getElementById('status');
        status!.innerHTML = this.status;
    }

    setDirection(key: string) {
        switch (key) {
            case 'ArrowUp':
                this.key = 'up';
                break;
            case 'ArrowDown':
                this.key = 'down';
                break;
            case 'ArrowLeft':
                this.key = 'left';
                break;
            case 'ArrowRight':
                this.key = 'right';
                break;
            default:
                break;
        }
    }
}

type Direction = 'up' | 'down' | 'left' | 'right';

type CellType = 'snake' | 'none';

class Cell {
    private type: CellType;
    private life: number;
    static OFF: Cell = new Cell('none', 0);
    constructor(type: CellType, life: number) {
        this.type = type;
        this.life = life;
    }

    elapse() {
        if (this.type == 'snake') {
            this.life -= 1;
        }
        if (this.life == 0) {
            this.type = 'none';
        }
    }

    getType() {
        return this.type;
    }

    toString() {
        switch (this.type) {
            case 'snake':
                return '■';
            case 'none':
                return '□';
            default:
                return '□';
        }
    }
}

const g = new Game(25, 25);
g.start();

document.addEventListener('keydown', (e) => {
    g.setDirection(e.key);
});
