import { User } from './user';
import { Location } from './location';

export class Vaccination {
  constructor(
    public id: number,
    public date: Date,
    public start: Date,
    public end: Date,
    public max_participants: number,
    public location_id: number,
    public location: Location,
    public users: User[]
  ) {
  }

}
