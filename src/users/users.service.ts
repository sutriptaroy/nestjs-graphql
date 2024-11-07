import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { User } from './models/user';
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/inputs/user.inputs';
import { GetUserArgs, GetUsersArgs } from './dto/args/user.args';

@Injectable()
export class UsersService {
    private users: User[] = []

    public createUser(createUserInput: CreateUserInput): User {
        const user: User = {
            userId: uuidv4(),
            ...createUserInput
        }
        this.users.push(user)

        return user
    }

    public updateUser(updateUserInput: UpdateUserInput): User {
        const user = this.users.find((user) => user.userId === updateUserInput.userId)

        Object.assign(user, updateUserInput)

        return user
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find((user) => user.userId === getUserArgs.userId)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map((userId) => this.getUser({ userId }))
    }

    public deleteUser(deleteUserInput: DeleteUserInput): User {
        const userIndex = this.users.findIndex((user) => user.userId === deleteUserInput.userId)

        const user = this.users[userIndex]

        this.users.splice(userIndex)
        
        return user
    }
}
