import api from '@/api/axios';
import { ForgotPasswordDto } from '@/common/dtos/forgot-password';
import { ResetPasswordDto } from '@/common/dtos/reset-password';
import { SignInDto } from '@/common/dtos/signin';

export class AuthService {
	static async signin(data: SignInDto): Promise<any> {
		return api.post('/auth/login', data);
	}

	static async forgotPassword(data: ForgotPasswordDto): Promise<any> {
		return api.post('/auth/forgot-password', data);
	}

	static async resetPassword(data: ResetPasswordDto, token: string): Promise<any> {
		return api.post(`/auth/reset-password/${token}`, data);
	}
}
