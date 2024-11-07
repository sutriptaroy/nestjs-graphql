import { ArgsType, Field } from "@nestjs/graphql";
import { IsArray, IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserArgs {
    @Field()
    @IsNotEmpty()
    userId: string;
}

@ArgsType()
export class GetUsersArgs {
    @Field(() => [String])
    @IsArray()
    userIds: string[];
}
