import {Address} from './address';

export class User {
  constructor(
    public id: number,
    public isAdmin: boolean,
    public sv_nr: string,
    public firstname: string,
    public lastname: string,
    public gender: string,
    public date_of_birth: string,
    public email: string,
    public email_verified_at: string | null,
    public phone: string,
    public vaccinated: boolean,
    public vaccination_id: number,
    public address_id: number,
    public address: Address
  ) {
  }
}
