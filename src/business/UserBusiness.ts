import { UserDatabase } from "../database/UserDatabase"
import { CreateUserInputDTO, CreateUserOutputDTO, GetUserInputDTO, GetUserOutputDTO, UserDTO } from "../dtos/UserDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserBusiness {
    constructor(
        private userDTO: UserDTO,
        private userDatabase: UserDatabase
    ) {}

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

        const userDBExists = await this.userDatabase.findUserById(id)

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

        await this.userDatabase.insertUser(newUserDB)

        const output = this.userDTO.createUserOutput(newUser)

        return output
    }

    public getUsers = async (input: GetUserInputDTO): Promise<GetUserOutputDTO[]> => {
        const { q } = input

        const usersDB = await this.userDatabase.findUsers(q)

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.created_at
        ))


        const output = this.userDTO.getUsersOutput(users)

        return output
    }
}