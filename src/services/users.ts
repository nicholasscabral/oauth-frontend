import api from "@/api/axios";
import { type SignUpDto } from "@/common/dtos/signup";
import { SIGNUP_ROUTE } from "@/common/routes";

export default class UsersService {
  static async create(data: SignUpDto): Promise<any> {
    return await api.post(SIGNUP_ROUTE, data);
  }
}
