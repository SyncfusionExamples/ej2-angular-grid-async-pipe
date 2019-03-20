import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const customers = [
      { id: 1, name: 'HANAR' },
      { id: 2, name: 'VINER' },
      { id: 3, name: 'JOHN' },
      { id: 4, name: 'TOMSP' },
      { id: 5, name: 'SUPRD' }
    ];
    return {customers};
  }
}
