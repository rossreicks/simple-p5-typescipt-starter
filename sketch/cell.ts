import { w } from './globals';
import p5 = require('p5');
import { Color } from 'p5';

export class Cell {
    constructor(public p: p5, public i: number, public j: number) {}

    draw(color: Color) {
        let x = this.j * w;
        let y = this.i * w;

        if (color) {
            this.p.fill(color);
        } else {
            this.p.fill(255);
        }

        this.p.rect(x, y, w, w);
    }
}