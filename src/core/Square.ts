import { IPoint, IViewer } from "./types";

export class Square {
  private _point: IPoint = {x: 0, y: 0};
  private _color: string = "red";

  // 属性：显示者
  private _viewer?: IViewer;

  public get viewer() {
    return this._viewer;
  }

  public set viewer(value) {
    this._viewer = value;
    if (value) {
      value.show();
    }
  }
  
  public get point() {
    return this._point;
  }

  public set point(value) {
    this._point = value;
    
    // 完成显示
    if (this._viewer) {
      this._viewer.show();
    }
  }

  public get color() {
    return this._color;
  }

  public set color(value) {
    this._color = value;
  }
}