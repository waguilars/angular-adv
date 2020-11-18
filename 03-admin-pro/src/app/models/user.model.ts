import { environment } from '../../environments/environment.prod';

const { base_url } = environment;

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public uid?: string,
    public role?: string
  ) {}

  get imageUrl(): string {
    if (this.google === true) {
      return this.img;
    }

    return this.img
      ? `${base_url}/upload/users/${this.img}`
      : `${base_url}/upload/users/no-img`;
  }
}
