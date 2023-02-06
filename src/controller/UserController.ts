import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDTO } from "../dtos/UserDTO"
import { BaseError } from "../errors/BaseError"

export class UserController {
    constructor(
        private userDTO: UserDTO,
        private userBusiness: UserBusiness
    ) {}

    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = this.userDTO.getUserInput(req.query.q)

            const output = await this.userBusiness.getUsers(input)

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

            const input = this.userDTO.createUserInput(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password
            )

            const output = await this.userBusiness.createUser(input)

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