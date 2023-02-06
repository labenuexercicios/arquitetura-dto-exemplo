import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDTO } from "../dtos/UserDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const userDTO = new UserDTO()
            const input = userDTO.getUserInput(req.query.q)

            const userBusiness = new UserBusiness()
            const output = await userBusiness.getUsers(input)

            res.status(200).send(output)
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
            const userDTO = new UserDTO()

            const input = userDTO.createUserInput(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            )

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