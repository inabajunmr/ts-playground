class Game {
    private key: Direction;
    private maxX: number;
    private maxY: number;
    private cells: Array<Array<Cell>>;

    constructor(maxX: number, maxY: number) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.cells = new Array<Array<Cell>>(maxX);
        this.cells[0] = new Array();
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = new Array(maxY).fill(new Cell('off'));
        }
        this.key = 'up';
    }

    async flip() {
        if (this.cells[0][0].getType() == 'on') {
            this.cells[0][0] = new Cell('off');
        } else {
            this.cells[0][0] = new Cell('on');
        }
    }

    async sleep(ms: number) {
        return new Promise((r) => setTimeout(r, ms));
    }

    async start() {
        while (true) {
            await this.sleep(100);
            await this.flip();
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

class Cell {
    private type: CellType;
    constructor(type: CellType) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    toString() {
        switch (this.type) {
            case 'on':
                return '■';
            case 'off':
                return '□';
            default:
                return '□';
        }
    }
}
type CellType = 'on' | 'off';

const g = new Game(25, 25);
g.start();

document.addEventListener('keydown', (e) => {
    g.setDirection(e.key);
});
