import api from "@/api/axios";
import { SignInDto } from "@/common/dtos/signin";

export class AuthService {
  static async signin(data: SignInDto): Promise<any> {
    return api.post("/auth/login", data);
  }
}
