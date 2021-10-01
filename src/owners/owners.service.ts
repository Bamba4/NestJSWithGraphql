import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private ownerRepisotory: Repository<Owner>,
  ) {}

  create(createOwnerInput: CreateOwnerInput) {
    const newOwner = this.ownerRepisotory.create(createOwnerInput);
    return this.ownerRepisotory.save(newOwner);
  }

  findAll() {
    return this.ownerRepisotory.find();
  }

  findOne(id: number) {
    return this.ownerRepisotory.findOneOrFail(id);
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    const updateOwner = this.ownerRepisotory.create(updateOwnerInput);
    return this.ownerRepisotory.update(id, updateOwner);
  }

  remove(id: number) {
    return this.ownerRepisotory.delete(id);
  }
}
