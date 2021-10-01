import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dot/create-pet.input';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petRespisotory: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petRespisotory.create(createPetInput); // newPet = new Pet(); newPet.name = createPetInput.name
    return this.petRespisotory.save(newPet); // insert
  }

  async findAll(): Promise<Pet[]> {
    return this.petRespisotory.find();
  }

  find(id: number): Promise<Pet> {
    return this.petRespisotory.findOneOrFail(id);
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }

  remove(id: number) {
    return this.petRespisotory.delete(id);
  }
}
