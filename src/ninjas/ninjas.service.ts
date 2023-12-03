import { Injectable } from '@nestjs/common';

@Injectable()
export class NinjasService {
  GetAllNinjas() {
    return 'All Ninjas';
  }

  GetNinjaById(id: number) {
    return `Returned Ninja with id ${id}`;
  }

  CreateNewNinja(data: { name: string }) {
    return data;
  }
}
