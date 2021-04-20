import {Address} from './address';

export class Location {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public address_id: number,
    public address: Address
  ) {
  }
}
