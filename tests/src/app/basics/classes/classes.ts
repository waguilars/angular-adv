export class Player {
  public hp: number;

  constructor() {
    this.hp = 100;
  }

  takeDmg(dmg: number) {
    if (dmg >= this.hp) {
      this.hp = 0;
    } else {
      this.hp = this.hp - dmg;
    }

    return this.hp;
  }
}
