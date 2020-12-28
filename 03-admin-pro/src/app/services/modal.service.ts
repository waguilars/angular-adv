import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  // tslint:disable-next-line: variable-name
  private _hideModal = true;
  public img: string;
  public id: string;
  public type: 'users' | 'doctors' | 'hospitals';

  public newImage$: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  showModal(
    type: 'users' | 'doctors' | 'hospitals',
    img: string,
    id: string
  ): void {
    this.img = img;
    this.id = id;
    this.type = type;
    this._hideModal = false;
  }

  closeModal(): void {
    this._hideModal = true;
  }

  get hideModal(): boolean {
    return this._hideModal;
  }
}
