import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import UserDto from './userDto.model';

@Injectable()
class UsersRepository {
    constructor(private readonly databaseService: DatabaseService) { }


    async getAll() {
        const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM users
    `);
        return databaseResponse.rows;
    }

    async getUserById(id: number){
        const databaseResponse = await this.databaseService.runQuery(`SELECT * FROM users WHERE id=${id}`);
        const entity = databaseResponse.rows[0];
        if(!entity){
            throw new NotFoundException(404, "User not found")
        }
        return entity
    }

    async createUser(userData: UserDto){
        const databaseResponse = await this.databaseService.runQuery(
            `INSERT INTO users(
                id, name, email)
                VALUES ($1, $2, $3) RETURNING *`, [userData.id, userData.name, userData.email],
        );
        const entity = databaseResponse.rows[0]
        if(!entity){
            throw new InternalServerErrorException(500, "User not inserted")
        }
        return entity;
    }

    async deleteUser(id:number){
        const databaseResponse = await this.databaseService.runQuery(
            `DELETE FROM users WHERE id=$1`,
            [id]
        )
        if(databaseResponse.rowCount == 0){
            throw new NotFoundException(404, "User not Found")
        }
        return "Deleted record with id "+id;
    }

    async updateUser(id:number, userData: UserDto){
        const databaseResponse = await this.databaseService.runQuery(
            `UPDATE users
            SET id=$1, name=$2, email=$3
            WHERE id=$4`,
            [userData.id, userData.name, userData.email, id]
        )
        if(databaseResponse.rowCount==0){
            throw new NotFoundException(404, "User not Found")
        }
        return "Updated record with id "+id;
    }
}

export default UsersRepository;