import GameConfig from "./GameConfig";
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
  static canIMove(shape: Shape, targetPoint: IPoint): boolean {
    // 假设，中心点已经移动到了目标位置，算出每个小方块得坐标
    const targetSquarePoints: IPoint[] = shape.map(it => {
      return {
        x: it.x + targetPoint.x,
        y: it.y + targetPoint.y
      }
    })

    // 边界判断
    const result = targetSquarePoints.some(p => {
      // 是否超出了边界
      return p.x < 0 || p.x > GameConfig.panelSize.width - 1 || p.y < 0 || p.y > GameConfig.panelSize.height - 1
    })

    if (result) {
      return false
    } else {
      return true
    }
  }


  static move(tetris: SquareGroup, targetPoint: IPoint): boolean;
  static move(tetris: SquareGroup, direction: MoveDirection): boolean;
  static move(tetris: SquareGroup, targetPointOrDirection: IPoint | MoveDirection): boolean {
    if (isPoint(targetPointOrDirection)) {
      if (this.canIMove(tetris.shape, targetPointOrDirection)) {
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

      return this.move(tetris, targetPoint);
    }
  }

  /**
   * 将当前得方块，移动到目标方向得终点
   * @param tetris 
   * @param direction 
   */
  static moveDirectly(tetris: SquareGroup, direction: MoveDirection) {
    while (this.move(tetris, direction)) {
      // 循环移动，直到不能移动为止
    }
  }
}