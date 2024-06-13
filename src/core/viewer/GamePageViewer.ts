import { SquareGroup } from "../SquareGroup";
import { IGameViewer } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery';

export class GamePageViewer implements IGameViewer {
  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, $("#next"))
    })
  }
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer?.remove()
      sq.viewer = new SquarePageViewer(sq, $("#panel"))
    })
  }
  
}