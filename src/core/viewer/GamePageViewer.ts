import { Game } from "../Game";
import GameConfig from "../GameConfig";
import { SquareGroup } from "../SquareGroup";
import { GameState, IGameViewer } from "../types";
import PageConfig from "./PageConfig";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery';

export class GamePageViewer implements IGameViewer {
  onGamePause(): void {
    this.msgDom.css({
      display: 'flex'
    })
    this.msgDom.find('p').html("游戏暂停！")
  }
  onGameStart(): void {
    this.msgDom.hide();
  }
  onGameOver(): void {
    this.msgDom.css({
      display: 'flex'
    })
    this.msgDom.find('p').html("游戏结束！")
  }
  
  private nextDom = $("#next");
  private panelDom = $("#panel");
  private scoreDom = $("#score");
  private msgDom = $("#msg");

  showScore(score: number): void {
    this.scoreDom.html(score.toString());
  }

  init(game: Game): void {
    // 1. 设置宽高
    this.panelDom.css({
      width: GameConfig.panelSize.width * PageConfig.SquareSize.width,
      height: GameConfig.panelSize.height * PageConfig.SquareSize.height
    })
    this.nextDom.css({
      width: GameConfig.nextSize.width * PageConfig.SquareSize.width,
      height: GameConfig.nextSize.height * PageConfig.SquareSize.height
    })

    // 2. 注册键盘事件
    $(document).on('keydown', (e) => {
      if (e.code === 'ArrowUp') {
        game.controlRotate();
      } else if (e.code === 'ArrowDown') {
        game.controlDown();
      } else if (e.code === 'ArrowLeft') {
        game.controLeft();
      } else if (e.code === 'ArrowRight') {
        game.controlRight();
      } else if (e.code === 'Space') {
        if (game.gameStatus === GameState.playing) {
          game.pause();
        } else {
          game.start();
        }
      }
    })
  }
  showNext(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer = new SquarePageViewer(sq, $("#next"))
    })
  }
  switch(tetris: SquareGroup): void {
    tetris.squares.forEach(sq => {
      sq.viewer?.remove()
      sq.viewer = new SquarePageViewer(sq, $("#panel"))
    })
  }
  
}