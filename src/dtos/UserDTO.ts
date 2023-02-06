import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"

export interface CreateUserInputDTO {
    id: string,
    name: string,
    email: string,
    password: string
}

export interface CreateUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        createdAt: string
    }
}

export interface GetUserInputDTO {
    q: string | undefined
}

export interface GetUserOutputDTO {
    id: string,
    name: string,
    email: string,
    createdAt: string
}

export class UserDTO {

    public createUserInput(
        id: unknown,
        name: unknown,
        email: unknown,
        password: unknown
    ): CreateUserInputDTO {

        if (id === undefined) throw new BadRequestError("'id' é obrigatório")
        if (typeof id !== "string") throw new BadRequestError("'id' deve ser string")

        if (name === undefined) throw new BadRequestError("'name' é obrigatório")
        if (typeof name !== "string") throw new BadRequestError("'name' deve ser string")

        if (email === undefined) throw new BadRequestError("'email' é obrigatório")
        if (typeof email !== "string") throw new BadRequestError("'email' deve ser string")

        if (password === undefined) throw new BadRequestError("'password' é obrigatório")
        if (typeof password !== "string") throw new BadRequestError("'password' deve ser string")

        const dto: CreateUserInputDTO = {
            id,
            name,
            email,
            password
        }

        return dto
    }

    public createUserOutput(user: User): CreateUserOutputDTO {

        const dto: CreateUserOutputDTO = {
            message: "Cadastro realizado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                createdAt: user.getCreatedAt()
            }
        }

        return dto
    }

    public getUserInput(q: unknown): GetUserInputDTO {
        
        if (typeof q !== "string" && typeof q !== "undefined") {
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        const dto: GetUserInputDTO = { q }

        return dto
    }

    public getUsersOutput(users: User[]): GetUserOutputDTO[] {
        const dto: GetUserOutputDTO[] = users.map((user) => {
            return {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                createdAt: user.getCreatedAt()
            }
        })

        return dto
    }
}