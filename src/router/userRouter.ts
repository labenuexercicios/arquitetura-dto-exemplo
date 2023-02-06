import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { UserDTO } from "../dtos/UserDTO"

export const userRouter = express.Router()

const userController = new UserController(
    new UserDTO(),
    new UserBusiness(
        new UserDTO(),
        new UserDatabase()
    )
)

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.createUser)

// teríamos outros endpoints aqui, como o de edição e deleção
// mas por questão de simplicidade só teremos o GET e o POST

// userRouter.put("/:id", userController.editUser)
// userRouter.delete("/:id", userController.deleteUser)