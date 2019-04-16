import { BlockTypes } from "./blockTypes";
import { Cell } from "./cell";
import { Color } from "p5";
import { cols, rows } from "./globals";

export class Block {
    color: Color;
    cells: Cell[] = [];
    public isStopped: boolean = false;

    constructor(private p: p5, public type: BlockTypes) {
        this.color = this.p.color(p.floor(p.random(0, 255)), p.floor(p.random(0, 255)), p.floor(p.random(0, 255)));

        switch(this.type) {
            case BlockTypes.L:
                this.cells[0] = new Cell(this.p, -2, 2);
                this.cells[1] = new Cell(this.p, -1, 2);
                this.cells[2] = new Cell(this.p, 0, 2);
                this.cells[3] = new Cell(this.p, 0, 3);
                break;
            case BlockTypes.Line:
                this.cells[0] = new Cell(this.p, -2, 2);
                this.cells[1] = new Cell(this.p, -1, 2);
                this.cells[2] = new Cell(this.p, 0, 2);
                break;
            case BlockTypes.T:
                this.cells[0] = new Cell(this.p, -2, 2);
                this.cells[1] = new Cell(this.p, -1, 2);
                this.cells[2] = new Cell(this.p, 0, 2);
                this.cells[3] = new Cell(this.p, -2, 1);
                this.cells[4] = new Cell(this.p, -2, 3);
                break;
        }
    }

    draw() {
        this.cells.forEach(x => x.draw(this.color));
    }

    move(stopIndex: number, callBack) {
        if (stopIndex > 1000) {
            stopIndex = rows;
        }
        if (!this.isStopped) {
            let maxRows = Math.max(...this.cells.map(x => x.i));
            if (maxRows !== (stopIndex - 1)) {
                this.cells.forEach(x => x.i++);
            } else {
                this.isStopped = true;
                callBack(this.p);
            }
        }
    }
}