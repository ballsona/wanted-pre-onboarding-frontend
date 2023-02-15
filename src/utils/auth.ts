import { ApiResult, postAsync } from './api';

export type AuthType = 'signin' | 'signup';

export interface AuthData {
  email: string;
  password: string;
}

export type AuthResult = { access_token: string };

/**
 * 회원가입 or 로그인 API
 * @param email 회원가입에 사용할 이메일
 * @param password 회원가입에 사용할 비밀번호
 */
export async function authAsync(
  type: AuthType,
  email: string,
  password: string,
): ApiResult<AuthResult> {
  const result = postAsync<AuthResult, AuthData>(`/auth/${type}`, {
    email,
    password,
  });
  return result;
}
