import { Square } from "./Square";
import { IPoint, Shape } from "./types";

/**
 * 方块组合类
 */
export class SquareGroup {
  private _squares: ReadonlyArray<Square>;

  public get shape() {
    return this._shape;
  }

  public get squares() {
    return this._squares;
  }

  public get centerPoint() {
    return this._centerPoint;
  }

  public set centerPoint(value) {
    this._centerPoint = value;
    // 同时设置所有小方块对象的坐标
    this.setSquarePoints();
  }

  /**
   * 根据中心点坐标，以及形状，设置每一个小方块的坐标
   */
  private setSquarePoints() {
    this._shape.forEach((p, i) => {
      this._squares[i].point = {
        x: this._centerPoint.x + p.x,
        y: this._centerPoint.y + p.y,
      }
    })
  }

  constructor(
    private _shape: Shape,
    private _centerPoint: IPoint,
    private _color: string
  ) {
    // 设置小方块数组
    const arr: Square[] = [];
    this._shape.forEach(p => {
      const sq = new Square();
      sq.color = this._color;
      arr.push(sq);
    })

    this._squares = arr;
    this.setSquarePoints();
  }

  /**
   * 旋转方向是否为顺时针
   */
  protected isClockwise = true;

  /**
   * 获取旋转之后的形状数组
   */
  afterRotateShape(): Shape {
    if (this.isClockwise) {
      return this._shape.map(p => {
        return {
          x: -p.y,
          y: p.x
        }
      })
    } else {
      return this._shape.map(p => {
        return {
          x: p.y,
          y: -p.x
        }
      })
    }
  }

  rotate() {
    const newShape = this.afterRotateShape();
    this._shape = newShape;
    this.setSquarePoints();
  }
}