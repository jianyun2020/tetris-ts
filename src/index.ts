import { createTetris } from "./core/Tetris";
import { TetrisRule } from "./core/TetrisRule";
import { MoveDirection } from "./core/types";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery';

const tetris = createTetris({x: 3, y: 2})

tetris.squares.forEach(sq => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
})

$("#btnDown").on('click', function() {
  TetrisRule.moveDirectly(tetris, MoveDirection.down)
})

$("#btnUp").on('click', function() {
  TetrisRule.move(tetris, {x: tetris.centerPoint.x, y: tetris.centerPoint.y - 1})
})

$("#btnLeft").on('click', function() {
  TetrisRule.move(tetris, MoveDirection.left)
})

$("#btnRight").on('click', function() {
  TetrisRule.move(tetris, MoveDirection.right)
})