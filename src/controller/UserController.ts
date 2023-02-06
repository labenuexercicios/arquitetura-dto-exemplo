import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../database/UserDatabase"
import { BaseError } from "../errors/BaseError"
import { User } from "../models/User"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined

            const userDatabase = new UserDatabase()
            const usersDB = await userDatabase.findUsers(q)

            const users: User[] = usersDB.map((userDB) => new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.created_at
            ))

            res.status(200).send(users)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }

            // instanciar a business
            const userBusiness = new UserBusiness()

            // chamar o método da business correspondente
            const output = await userBusiness.createUser(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}