import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";
import $ from 'jquery';

const g = new Game(new GamePageViewer());


$("#btnStart").on('click', function() {
  g.start();
})

$("#btnPause").on('click', function() {
  g.pause();
})

$("#btnLeft").on('click', function() {
  g.controLeft();
})

$("#btnRight").on('click', function() {
  g.controlRight();
})

$("#btnDown").on('click', function() {
  g.controlDown();
})

$("#btnRotate").on('click', function() {
  g.controlRotate();
})

