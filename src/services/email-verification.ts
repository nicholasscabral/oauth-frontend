import api from "@/api/axios";
import { VERIFY_EMAIL_ROUTE } from "@/common/routes";

export class EmailVerificationService {
  static verifyEmailToken(token: string): Promise<any> {
    return api.get(`${VERIFY_EMAIL_ROUTE}?token=${token}`);
  }
}
