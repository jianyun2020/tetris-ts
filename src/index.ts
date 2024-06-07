import { Square } from "./core/Square";
import { IViewer } from "./core/types";

class SquareConsoleViewer implements IViewer {
  constructor(
    private square: Square,
  ) {}
  show(): void {
    console.log(this.square.point, this.square.color);
    
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  
}

const sq = new Square({ x: 1, y: 2 }, "red");
sq.viewer = new SquareConsoleViewer(sq);
sq.point = {
  x: 5,
  y: 7
}