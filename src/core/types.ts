export interface IPoint {
  readonly x: number;
  readonly y: number;
}

export interface IViewer {
  /**
   * 显示
   */
  show(): void;

  /**
   * 移除，不再显示
   */
  remove(): void;
}

/**
 * 形状
 */
export type Shape = IPoint[];

/**
 * 移动方向
 */
export enum MoveDirection {
  left,
  right,
  down
}