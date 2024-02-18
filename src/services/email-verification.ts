import api from "@/api/axios";
import {
  RESEND_VERIFICATION_EMAIL_ROUTE,
  VERIFY_EMAIL_ROUTE,
} from "@/common/routes";

export class EmailVerificationService {
  static resendVerifictionLink(token: string): Promise<any> {
    return api.post(`${RESEND_VERIFICATION_EMAIL_ROUTE}?token=${token}`);
  }
}
