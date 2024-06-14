import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { IPoint, MoveDirection, Shape } from "./types";

/**
 * 类型保护函数
 * @param obj 
 * @returns
 */
function isPoint(obj: any): obj is IPoint {
  return obj.x !== undefined && obj.y !== undefined
}

/**
 * 该类中提供一系列得函数，根据游戏规则判断各种情况
 */
export class TetrisRule {
  /**
   * 判断某个形状得方块，是否能够移动到目标位置
   * @param shape 
   * @param targetPoint 
   */
  static canIMove(shape: Shape, targetPoint: IPoint, existsSquares: Square[]): boolean {
    // 假设，中心点已经移动到了目标位置，算出每个小方块得坐标
    const targetSquarePoints: IPoint[] = shape.map(it => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y
      }
    })

    // 边界判断
    let result = targetSquarePoints.some(p => {
      // 是否超出了边界
      return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1
    })

    if (result) {
      return false;
    }

    result = targetSquarePoints.some(p => {
      // 是否和已有方块重叠
      return existsSquares.some(sq => sq.point.x === p.x && sq.point.y === p.y)
    })

    if (result) {
      return false;
    }

    return true
  }


  static move(tetris: SquareGroup, targetPoint: IPoint, existsSquares: Square[]): boolean;
  static move(tetris: SquareGroup, direction: MoveDirection, existsSquares: Square[]): boolean;
  static move(tetris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection, existsSquares: Square[]): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(tetris.shape, targetPointOrDirection, existsSquares)) {
        tetris.centerPoint = targetPointOrDirection;
        return true;
      }
      return false;
    } else {
      const direction = targetPointOrDirection;
      let targetPoint: IPoint;
      if (direction === MoveDirection.left) {
        targetPoint = {
          x: tetris.centerPoint.x - 1,
          y: tetris.centerPoint.y
        }
      } else if (direction === MoveDirection.right) {
        targetPoint = {
          x: tetris.centerPoint.x + 1,
          y: tetris.centerPoint.y
        }
      } else {
        targetPoint = {
          x: tetris.centerPoint.x,
          y: tetris.centerPoint.y + 1
        }
      }

      return this.move(tetris, targetPoint, existsSquares);
    }
  }

  /**
   * 将当前得方块，移动到目标方向得终点
   * @param tetris 
   * @param direction 
   */
  static moveDirectly(tetris: SquareGroup, direction: MoveDirection, existsSquares: Square[]) {
    while (this.move(tetris, direction, existsSquares)) {
      // 循环移动，直到不能移动为止
    }
  }


  /**
   * 方块旋转
   */
  static rotate(tetris: SquareGroup, existsSquares: Square[]): boolean {
    const newShape = tetris.afterRotateShape(); // 得到旋转之后新的形状
    if (this.canIMove(newShape, tetris.centerPoint, existsSquares)) {
      tetris.rotate();
      return true;
    }
    return false;
  }

  /**
   * 从已存在的方块中进行消除，并返回消除的行数
   * @param existsSquares 
   */
  static deleteSquares(existsSquares: Square[]): number {
    // 1. 获得y坐标数组
    const ys = existsSquares.map(sq => sq.point.y);
    // 3. 获取最大和最小的坐标
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    // 3. 循环判断每一行是否可以消除
    let num = 0;
    for (let y = minY; y <= maxY; y++) {
      if (this.deleteLine(existsSquares, y)) {
        num++;
      }
    }
    return num;
  }

  /**
   * 消除一行
   * @param existsSquares 
   * @param y 
   */
  private static deleteLine(existsSquares: Square[], y: number): boolean {
    const squares = existsSquares.filter(sq => sq.point.y === y);
    if (squares.length === GameConfig.panelSize.width) {
      // 这一行可以消除
      squares.forEach(sq => {
        if (sq.viewer) {
          // 1. 从界面中移除
          sq.viewer.remove();
        }
        // 2. 剩下的，y坐标比当前的y小的方块，y + 1
        existsSquares.filter(sq => sq.point.y < y).forEach(sq => {
          sq.point = {
            x: sq.point.x,
            y: sq.point.y + 1
          }
        })

        // 3. 删除当前的方块
        const index = existsSquares.indexOf(sq);
        existsSquares.splice(index, 1);
      })
      return true;
    }

    return false;
  }
}