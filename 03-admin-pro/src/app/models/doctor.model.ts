import { Hospital } from './hospital.model';
// tslint:disable-next-line: class-name
interface _DoctorUser {
  _id: string;
  name: string;
  img: string;
}

export class Doctor {
  constructor(
    public name?: string,
    public _id?: string,
    public img?: string,
    public user?: _DoctorUser,
    public hospital?: Hospital
  ) {}
}
