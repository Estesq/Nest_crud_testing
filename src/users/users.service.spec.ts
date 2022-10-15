import { Test, TestingModule } from '@nestjs/testing'
import UsersRepository from './users.repository';
import { UsersService } from './users.service'

describe('User Service', ()=>{
    let service: UsersService;

    const dto = {
        id:32,
        name: 'ijk',
        email: 'ijk@gmail.com'
    }

    const inputDto = {
        id:32,
        name: 'ijk',
        email: 'ijk@gmail.com'
    }

    const arrUser = [
        {
            id:32,
            name: 'ijk',
            email: 'ijk@gmail.com'
        },
        {
            id:33,
            name: 'mno',
            email: 'mno@gmail.com'
        }
    ]

    const mockRepo = {
        createUser: jest.fn((dto)=>{
            return {...dto}
        }),
        updateUser: jest.fn((id, dto)=>{
            return "Updated record with id "+id;
        }),
        deleteUser: jest.fn((id=>{
            return "Deleted record with id "+id;
        })),
        getUserById: jest.fn(id=>{
            return dto;
        }),
        getAll: jest.fn(()=>{
            return arrUser;
        })
    }

    beforeEach(async ()=>{
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersService],
            providers:[UsersRepository]
        }).overrideProvider(UsersRepository)
        .useValue(mockRepo)
        .compile();

        service = app.get<UsersService>(UsersService) 
    });


    test('create user',()=>{
        expect(service.createUser(dto)).toEqual({
            id:32,
            name: 'ijk',
            email: 'ijk@gmail.com'
        })
    })

    test('update user',()=>{
        expect(service.updateUser(32, inputDto)).toEqual("Updated record with id 32")
        expect(mockRepo.updateUser).toHaveBeenCalledWith(32, inputDto)
    })

    test('delete a user',()=>{
        expect(service.deleteUser(32)).toEqual("Deleted record with id 32")
        expect(mockRepo.deleteUser).toHaveBeenCalledWith(32)
    })

    test('get all users',()=>{
        expect(service.getUsers()).toEqual(arrUser)
        expect(mockRepo.getAll).toHaveBeenCalledWith()
    })

    test('get one user',()=>{
        expect(service.getUserById(32)).toEqual(dto)
        expect(mockRepo.getUserById).toHaveBeenCalledWith(32)    
    })
})