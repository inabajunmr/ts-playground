type GameStatus = 'init' | 'start' | 'gameover';
class Game {
    private key: Direction;
    private maxX: number;
    private maxY: number;
    private nowX: number = 15;
    private nowY: number = 15;
    private score: number = 0;
    private static SNAKE_LENGTH_COEFFICIENT = 5;
    private status: GameStatus = 'init';
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

    private snakeLength(): number {
        if (this.score === 0) {
            return 1;
        }
        return (this.score + 1) * Game.SNAKE_LENGTH_COEFFICIENT;
    }

    newTreasure() {
        while (true) {
            const x = Math.floor(Math.random() * Math.floor(this.maxX));
            const y = Math.floor(Math.random() * Math.floor(this.maxY));
            if (this.cells[x][y].getType() === 'none') {
                this.cells[x][y] = Cell.TREASURE;
                break;
            }
        }
    }

    private bumpObject() {
        // bump into treasure
        if (this.cells[this.nowY][this.nowX].getType() === 'treasure') {
            this.newTreasure();
            this.score += 1;
        }

        // bump into snake
        if (this.cells[this.nowY][this.nowX].getType() === 'snake') {
            this.status = 'gameover';
        }
    }

    private bumpWall(d: Direction) {
        if (d === 'up' && this.nowY === 0) {
            this.status = 'gameover';
            return;
        }
        if (d === 'down' && this.nowY === this.maxY) {
            this.status = 'gameover';
            return;
        }
        if (d === 'left' && this.nowX === 0) {
            this.status = 'gameover';
            return;
        }
        if (d === 'right' && this.nowX === this.maxX) {
            this.status = 'gameover';
            return;
        }
    }

    private async locate() {
        switch (this.key) {
            case 'up':
                this.bumpWall('up');
                this.nowY -= 1;
                this.bumpObject();
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                return;
            case 'down':
                this.bumpWall('down');
                this.nowY += 1;
                this.bumpObject();
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                return;
            case 'left':
                this.bumpWall('left');
                this.nowX -= 1;
                this.bumpObject();
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                return;
            case 'right':
                this.bumpWall('right');
                this.nowX += 1;
                this.bumpObject();
                this.cells[this.nowY][this.nowX] = new Cell(
                    'snake',
                    this.snakeLength()
                );
                break;
            default:
                break;
        }
    }

    private async elapse() {
        // TODO cache cells
        this.cells.forEach((y) => {
            y.forEach((x) => {
                x.elapse();
            });
        });
    }

    private async sleep(ms: number) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async start() {
        this.status = 'start';

        while (true) {
            if ((this.status as GameStatus) === 'gameover') {
                break;
            }

            await this.sleep(70);
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

        const score = document.getElementById('score');
        score!.innerHTML = String(this.score);
    }

    setDirection(key: string) {
        this.status = 'start';
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

    getStatus() {
        return this.status;
    }
}

type Direction = 'up' | 'down' | 'left' | 'right';

type CellType = 'snake' | 'treasure' | 'none';

class Cell {
    static OFF: Cell = new Cell('none', -1);
    static TREASURE: Cell = new Cell('treasure', -1);

    private type: CellType;
    private life: number;
    constructor(type: CellType, life: number) {
        this.type = type;
        this.life = life;
    }

    elapse() {
        if (this.type === 'snake') {
            this.life -= 1;
        }
        if (this.type === 'snake' && this.life === 0) {
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
            case 'treasure':
                return '★';
            case 'none':
                return '□';
            default:
                return '□';
        }
    }
}

document.getElementById('start')?.addEventListener('click', (e) => {
    const g = new Game(25, 25);
    g.newTreasure();
    g.print();
    document.addEventListener('keydown', (e) => {
        if (g.getStatus() == 'init') {
            g.start();
        }
        g.setDirection(e.key);
    });
});
