import { UserDatabase } from "../database/UserDatabase"
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserInputDTO, GetUserOutputDTO, UserDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserBusiness {
    public createUser = async (input: CreateUserInputDTO): Promise<CreateUserOutputDTO> => {
        const { id, name, email, password } = input

        if (name.length < 2) {
            throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
        }

        if (!email.includes('@')) {
            throw new BadRequestError("'email' inválido")
        }

        if (password.length < 4) {
            throw new BadRequestError("'password' deve possuir pelo menos 4 caracteres")
        }

        const userDatabase = new UserDatabase()
        const userDBExists = await userDatabase.findUserById(id)

        if (userDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            new Date().toISOString()
        ) // yyyy-mm-ddThh:mm:sssZ

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            created_at: newUser.getCreatedAt()
        }

        await userDatabase.insertUser(newUserDB)

        const userDTO = new UserDTO()

        const output = userDTO.createUserOutput(newUser)

        return output
    }

    public getUsers = async (input: GetUserInputDTO): Promise<GetUserOutputDTO[]> => {
        const { q } = input

        const userDatabase = new UserDatabase()
        const usersDB = await userDatabase.findUsers(q)

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.created_at
        ))


        const userDTO = new UserDTO()

        const output = userDTO.getUsersOutput(users)

        return output
    }
}