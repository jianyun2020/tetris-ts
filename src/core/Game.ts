import GameConfig from "./GameConfig";
import { SquareGroup } from "./SquareGroup";
import { createTetris } from "./Tetris";
import { TetrisRule } from "./TetrisRule";
import { GameState, IGameViewer, MoveDirection } from "./types";

/**
 * 游戏类
 */
export class Game {
  // 游戏状态
  private _gameState: GameState = GameState.init;
  // 当前玩家操作的方块
  private _curTetris?: SquareGroup;
  // 下一个方块
  private _nextTetris: SquareGroup = createTetris({ x: 0, y: 0 });
  // 计时器
  private _timer?: number;
  // 自动下落的间隔时间
  private _duration: number = 1000;

  constructor(private _viewer: IGameViewer) {
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
    this._viewer.showNext(this._nextTetris);
  }

  /**
   * 游戏开始
   */
  start() {
    // 游戏状态的改变
    if (this._gameState === GameState.playing) {
      return;
    }
    this._gameState = GameState.playing;
    if (!this._curTetris) {
      // 给当前玩家操作的方块赋值
      this.switchTetris();
    }

    this.autoDrop();
  }

  /**
   * 游戏暂停
   */
  pause() {
    if (this._gameState === GameState.playing) {
      this._gameState = GameState.pause;
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }

  controLeft() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.move(this._curTetris, MoveDirection.left);
    }
  }

  controlRight() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.move(this._curTetris, MoveDirection.right);
    }
  }

  controlDown() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.move(this._curTetris, MoveDirection.down);
    }
  } 

  controlRotate() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.rotate(this._curTetris);
    }
  }



  /**
   * 切换方块
   */
  private switchTetris() {
    this._curTetris = this._nextTetris;
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris);
    this._nextTetris = createTetris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
    this._viewer.switch(this._curTetris);
    this._viewer.showNext(this._nextTetris);
  }

  /**
   * 当前方块自由下落
   */
  private autoDrop() {
    if (this._timer && this._gameState !== GameState.playing) {
      return;
    }

    this._timer = setInterval(() => {
      if (this._curTetris) {
        TetrisRule.move(this._curTetris, MoveDirection.down);
      }
    }, this._duration)
  }

  /**
   * 设置中心点坐标，以达到让该方块出现在区域的中上方
   * @param width 
   * @param tetris 
   */
  private resetCenterPoint(width: number, tetris: SquareGroup) {
    const x = Math.ceil(width / 2) - 1;
    const y = 0;
    tetris.centerPoint = { x, y };
    while (tetris.squares.some(s => s.point.y < 0)) {
      tetris.squares.forEach(sq => sq.point = { x: sq.point.x, y: sq.point.y + 1 });
    }
  }
}