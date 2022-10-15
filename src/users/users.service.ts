import { Injectable } from '@nestjs/common';
import UserDto from './userDto.model';
import UsersRepository from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    getUsers() {
        return this.usersRepository.getAll();
    }

    getUserById(id: number){
        return this.usersRepository.getUserById(id)
    }

    createUser(userDate:UserDto){
        return this.usersRepository.createUser(userDate)
    }

    deleteUser(id: number){
        return this.usersRepository.deleteUser(id)
    }

    updateUser(id: number, userData: UserDto){
        return this.usersRepository.updateUser(id, userData)
    }
}
