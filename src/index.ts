import { Square } from "./core/Square";
import { SquareGroup } from "./core/SquareGroup";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery';

const group = new SquareGroup([
  {x: 0, y: -1}, {x: -1, y: 0}, {x: 0, y: 0}, {x: 0, y: 1}
], {x: 4, y: 5}, 'red')

group.squares.forEach(sq => {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
})

$("#btnDown").on('click', function() {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y + 1
  }
})

$("#btnUp").on('click', function() {
  group.centerPoint = {
    x: group.centerPoint.x,
    y: group.centerPoint.y - 1
  }
})

$("#btnLeft").on('click', function() {
  group.centerPoint = {
    x: group.centerPoint.x - 1,
    y: group.centerPoint.y
  }
})

$("#btnRight").on('click', function() {
  group.centerPoint = {
    x: group.centerPoint.x + 1,
    y: group.centerPoint.y
  }
})