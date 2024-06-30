import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

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

/**
 * 游戏状态
 */
export enum GameState {
  init,
  playing,
  pause,
  over
}

export interface IGameViewer {
  /**
   * 下一个方块对象
   * @param tetris 
   */
  showNext(tetris: SquareGroup): void;

  /**
   * 
   * @param tetris 切换的方块对象
   */
  switch(tetris: SquareGroup): void;

  /**
   * 完成界面初始化
   */
  init(game: Game): void;

  /**
   * 显示分数
   * @param score 
   */
  showScore(score: number): void;

  onGamePause(): void;
  onGameStart():void;
  onGameOver(): void;
}