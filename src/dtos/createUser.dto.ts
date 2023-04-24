import z from 'zod'

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

// export const CreateUserSchema = z.object({
//   id: z.string().min(1),
//   name: z.string().min(2),
//   email: z.string().email(),
//   password: z.string().min(4)
// }).transform(data => data as CreateUserInputDTO)

export const CreateUserSchema = z.object({
  id: z.string({
      required_error: "'id' é obrigatória",
      invalid_type_error: "'id' deve ser do tipo string"
    }).min(1, "'id' deve possuir no mínimo 1 caractere"),

  name: z
    .string({
      required_error: "'name' é obrigatório",
      invalid_type_error: "'name' deve ser do tipo string"
    })
    .min(2, "'name' deve possuir no mínimo 2 caracteres"),

  email: z
    .string({
      required_error: "'email' é obrigatório",
      invalid_type_error: "'email' deve ser do tipo string"
    })
    .email("'email' inválido"),

  password: z
    .string({
      required_error: "'password' é obrigatório",
      invalid_type_error: "'password' deve ser do tipo string"
    })
    .min(4, "'password' deve possuir no mínimo 4 caracteres")
    
}).transform(data => data as CreateUserInputDTO)