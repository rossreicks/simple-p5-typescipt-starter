import p5 = require('p5');
import { rows, cols, height, width } from './globals';
import { Cell } from './cell';
import { Block } from './block';
import { BlockTypes } from './blockTypes';
let grid = [];
let blocks: Block[] = [];

var sketch = (p: p5) => {
    
    p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (var i = 0; i < rows; i++) {
            grid[i] = new Array();
        }

        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                grid[i][j] = new Cell(p, i, j);
            }
        }

        blocks[0] = new Block(p, BlockTypes.L);
    }

    p.windowResized = () => {
        //p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.draw = () => {
        p.frameRate(4);
        p.background(100);
        for (var i = 0; i < rows; i++) {
            for (var j = 0; j < cols; j++) {
                grid[i][j].draw();
            }
        }

        blocks.forEach(x => x.draw());
        //  need to determine the max height of the current row
        let iVals = blocks.filter(x => x.isStopped).map(x => x.cells.filter(y => y.j == 2).map(y => y.i));
        console.log(iVals);
        var minI = Math.min(...[].concat.apply([], iVals));
        console.log(minI);
        blocks.forEach(x => x.move(minI, addBlock));
    }
}

let addBlock = function(p: p5) {
    let rand = p.floor(p.random(0, 3));
    let blockType = BlockTypes.Line;
    if (rand == 0) {
        blockType = BlockTypes.L;
    }
    if (rand == 1) {
        blockType = BlockTypes.T;
    }
    blocks.push(new Block(p, blockType));
}

var sketchP = new p5(sketch);