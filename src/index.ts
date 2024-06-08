import { createTetris } from "./core/Tetris";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery';

const tetris = createTetris({x: 3, y: 2})

tetris.squares.forEach(sq => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
})

$("#btnDown").on('click', function() {
  tetris.centerPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y + 1
  }
})

$("#btnUp").on('click', function() {
  tetris.centerPoint = {
    x: tetris.centerPoint.x,
    y: tetris.centerPoint.y - 1
  }
})

$("#btnLeft").on('click', function() {
  tetris.centerPoint = {
    x: tetris.centerPoint.x - 1,
    y: tetris.centerPoint.y
  }
})

$("#btnRight").on('click', function() {
  tetris.centerPoint = {
    x: tetris.centerPoint.x + 1,
    y: tetris.centerPoint.y
  }
})