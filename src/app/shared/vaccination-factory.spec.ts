import { VaccinationFactory } from './vaccination-factory';

describe('VaccinationFactory', () => {
  it('should create an instance', () => {
    expect(new VaccinationFactory()).toBeTruthy();
  });
});
