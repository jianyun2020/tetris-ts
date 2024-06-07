import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery';

const sq = new Square();
sq.viewer = new SquarePageViewer(sq, $('#root'))

sq.point = {
  x: 2,
  y: 3
}
sq.color = 'red';

$("#btnDown").on('click', function() {
    sq.point = {
      x: sq.point.x,
      y: sq.point.y + 1,
    }
})

$('#btnRemove').on('click', function() {
  if (sq.viewer) {
    sq.viewer.remove();
  }
})

$('#btnAdd').on('click', function() {
  sq.viewer = new SquarePageViewer(sq, $('#root'));
})