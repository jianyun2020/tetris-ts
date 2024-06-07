import { IPoint, IViewer } from "./types";

export class Square {

  // 属性：显示者
  private _viewer?: IViewer;

  public get viewer() {
    return this._viewer;
  }

  public set viewer(value) {
    this._viewer = value;
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

  public constructor(private _point: IPoint, private _color: string) {}
}