import { makeRegisterUseCase } from "@/use-cases/factories/make-register"
import type { RegisterBody } from "./model"

export abstract class AuthService {
  static register(data: RegisterBody) {
    const registerUseCase = makeRegisterUseCase()
    return registerUseCase.execute(data)
  }
  static signIn(data: SignInBody) {
    const signInUseCase = makeSignInUseCase()
    return signInUseCase.execute(data)
  }
}
