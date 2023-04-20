import express from "express"
import { UserController } from "../controller/UserController"

export const userRouter = express.Router()

const userController = new UserController()

userRouter.get("/", userController.getUsers)
userRouter.post("/", userController.createUser)

// teríamos outros endpoints aqui, como o de edição e deleção
    // userRouter.put("/:id", userController.editUser)
    // userRouter.delete("/:id", userController.deleteUser)

// mas por questão de simplicidade só teremos o GET e o POST
