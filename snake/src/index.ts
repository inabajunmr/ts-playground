class Game {
    private maxX: number;
    private maxY: number;
    private cells: Array<Array<boolean>>;

    constructor(maxX: number, maxY: number) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.cells = new Array<Array<boolean>>(maxX);
        this.cells[0] = new Array();
        for (let index = 0; index < this.cells.length; index++) {
            this.cells[index] = new Array(maxY).fill(false);
        }
    }

    async flip() {
        this.cells[0][0] = !this.cells[0][0];
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
        const a = document.getElementById('game');
        let html = '';
        this.cells.forEach((x) => {
            x.forEach((y) => {
                if (y) {
                    html += '■';
                } else {
                    html += '□';
                }
            });
            html += '<br>';
        });
        a!.innerHTML = html;
    }
}

new Game(20, 20).start();
