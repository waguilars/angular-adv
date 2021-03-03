import { EventEmitter } from '@angular/core';

export class Player {
  public hp: number;
  public changeHp = new EventEmitter<number>();

  constructor() {
    this.hp = 100;
  }

  takeDmg(dmg: number) {
    if (dmg >= this.hp) {
      this.hp = 0;
    } else {
      this.hp = this.hp - dmg;
    }

    this.changeHp.emit(this.hp);
  }
}
