import GameConfig from "./GameConfig";
import { Square } from "./Square";
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
  private _nextTetris: SquareGroup;
  // 计时器
  private _timer?: number;
  // 自动下落的间隔时间
  private _duration: number = 1000;
  // 当前游戏中，已经存在的方块
  private _existSquares: Square[] = [];
  // 积分
  private _score: number = 0;

  constructor(private _viewer: IGameViewer) {
    this._nextTetris = createTetris({ x: 0, y: 0 }); // 没有实际含义的代码，只是为了不让TS报错
    this.createNext();
  }

  private createNext() {
    this._nextTetris = createTetris({ x: 0, y: 0 });
    this.resetCenterPoint(GameConfig.nextSize.width, this._nextTetris);
    this._viewer.showNext(this._nextTetris);
  }

  private init() {
    this._existSquares.forEach(sq => {
      if (sq.viewer) {
        sq.viewer.remove();
      }
    })
    this._existSquares = [];
    this.createNext();
    this._curTetris = undefined;
    this._score = 0;
  }

  /**
   * 游戏开始
   */
  start() {
    // 游戏状态的改变
    if (this._gameState === GameState.playing) {
      return;
    }

    // 从游戏结束到开始
    if (this._gameState === GameState.over) {
      // 初始化操作
      this.init();
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
      TetrisRule.move(this._curTetris, MoveDirection.left, this._existSquares);
    }
  }

  controlRight() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.move(this._curTetris, MoveDirection.right, this._existSquares);
    }
  }

  controlDown() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.moveDirectly(this._curTetris, MoveDirection.down, this._existSquares);
      this.hitBottom();
    }
  } 

  controlRotate() {
    if (this._curTetris && this._gameState === GameState.playing) {
      TetrisRule.rotate(this._curTetris, this._existSquares);
    }
  }



  /**
   * 切换方块
   */
  private switchTetris() {
    this._curTetris = this._nextTetris;
    this._curTetris.squares.forEach(sq => {
      if (sq.viewer) {
        sq.viewer.remove();
      }
    })
    this.resetCenterPoint(GameConfig.panelSize.width, this._curTetris);

    // 有可能出问题：当方块一出现时，就已经和之前的方块重叠了
    if (!TetrisRule.canIMove(this._curTetris.shape, this._curTetris.centerPoint, this._existSquares)) {
      // 游戏结束
      this._gameState = GameState.over;
      clearInterval(this._timer);
      this._timer = undefined;
      return;
    }

    this.createNext();
    this._viewer.switch(this._curTetris);
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
        if (!TetrisRule.move(this._curTetris, MoveDirection.down, this._existSquares)) {
          // 触底
          this.hitBottom();
        }
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
      tetris.centerPoint = {
        x: tetris.centerPoint.x,
        y: tetris.centerPoint.y + 1
      }
    }
  }

  /**
   * 触底之后的操作
   */
  private hitBottom() {
    // 将当前的俄罗斯方块包含的小方块，加入到已存在的方块数组中
    this._existSquares = this._existSquares.concat(this._curTetris!.squares);
    // 处理移除
    const num = TetrisRule.deleteSquares(this._existSquares);
    // 增加积分
    this.addScore(num);
    // 切换方块
    this.switchTetris();
  }

  addScore(lineNum: number) {
    if (lineNum) {
      return;
    } else if (lineNum === 1) {
      this._score += 10;
    } else if (lineNum === 2) {
      this._score += 25;
    } else if (lineNum === 3) {
      this._score += 50;
    } else {
      this._score += 100;
    }
  }
}