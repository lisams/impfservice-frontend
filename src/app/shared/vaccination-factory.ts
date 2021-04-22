import {Vaccination} from './vaccination';
import {Location} from './location';
import {Address} from './address';

export class VaccinationFactory {

  static empty(): Vaccination {
    return new Vaccination(
      null,
      null,
      null,
      null,
      null,
      null,
      new Location(
        null,
        null,
        null,
        null,
        new Address(null,
          null,
          null,
          null)),
      []);
  }


  static fromObject(rawVaccination: any): Vaccination {
    return new Vaccination(
      rawVaccination.id,
      rawVaccination.date,
      rawVaccination.start,
      rawVaccination.end,
      rawVaccination.max_participants,
      null,
      new Location(
        null,
        null,
        null,
        null,
        new Address(null,
          null,
          null,
          null)),
      []
      /*typeof (rawVaccination.published) === 'string' ?
        new Date(rawVaccination.published) : rawVaccination.published,
      rawVaccination.user_id,
      rawVaccination.subtitle,
      rawVaccination.rating*/
    );
  }

}
