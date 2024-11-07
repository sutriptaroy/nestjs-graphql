import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './models/user';
import { UsersService } from './users.service';
import { GetUserArgs, GetUsersArgs } from './dto/args/user.args';
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/inputs/user.inputs';

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly userService: UsersService) {}

    @Query(() => User, { name: 'user', nullable: true })
    getUser(@Args() getUserArgs: GetUserArgs): User {
        return this.userService.getUser(getUserArgs)
    }

    @Query(() => [User], { name: 'users', nullable: 'items' })
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.userService.getUsers(getUsersArgs)
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserInput: CreateUserInput): User {
        return this.userService.createUser(createUserInput)
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserData') updateUserInput: UpdateUserInput): User {
        return this.userService.updateUser(updateUserInput)
    }

    @Mutation(() => User)
    deleteUser(@Args('deleteUserData') deleteUserInput: DeleteUserInput): User {
        return this.userService.deleteUser(deleteUserInput)
    }
}
