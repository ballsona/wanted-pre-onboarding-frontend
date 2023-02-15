import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export type ApiError = {
  statusCode: number;
  message: string;
  info?: unknown;
};

export type ApiResult<T> = Promise<
  | {
      isSuccess: true;
      result: T;
    }
  | {
      isSuccess: false;
      result: ApiError;
    }
>;

function handleError(
  error: unknown,
  errorMessage?: Record<number, string>,
): ApiError {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // 요청 성공, 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
      return {
        statusCode: error.response.status,
        message:
          error.response.data.message ??
          errorMessage?.[error.response.status] ??
          '문제가 발생했습니다.',
        info: error.response.data,
      };
    } else if (error.request) {
      // 요청 성공, 서버 응답 없음
      return {
        statusCode: -1,
        message: '서버 연결에 실패했습니다.',
        info: error.request,
      };
    }
  }

  // 에러 원인 알 수 없음
  return {
    statusCode: -1,
    message: '문제가 발생했습니다.',
    info: error,
  };
}

// Axios Instance
export const customAxios = axios.create({
  baseURL: 'https://pre-onboarding-selection-task.shop',
  responseType: 'json',
});

/**
 *
 * @param T 서버 응답 response 타입
 * @param D parameter or body 로 전달할 데이터 타입
 *
 * @param path
 * @param config
 * @param errorMessage 에러 status code에 따른 에러 메세지
 * @returns
 */
export async function getAsync<T>(
  path: string,
  config?: AxiosRequestConfig,
  errorMessage?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await customAxios.get<T, AxiosResponse<T>>(path, {
      ...config,
    });
    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: handleError(error, errorMessage) };
  }
}

/**
 *
 * @param T 서버 응답 response 타입
 * @param D parameter or body 로 전달할 데이터 타입
 *
 * @param path
 * @param data
 * @param config
 * @param errorMessage 에러 status code에 따른 에러 메세지
 * @returns
 */
export async function postAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessage?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await customAxios.post<T, AxiosResponse<T, D>, D>(
      path,
      data,
      { ...config, headers: { 'Content-Type': 'application/json' } },
    );
    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: handleError(error, errorMessage) };
  }
}

/**
 *
 * @param T 서버 응답 response 타입
 * @param D parameter or body 로 전달할 데이터 타입
 *
 * @param path
 * @param data
 * @param config
 * @param errorMessage 에러 status code에 따른 에러 메세지
 * @returns
 */
export async function putAsync<T, D>(
  path: string,
  data?: D,
  config?: AxiosRequestConfig,
  errorMessage?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await customAxios.put<T, AxiosResponse<T, D>, D>(
      path,
      data,
      { ...config },
    );
    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: handleError(error, errorMessage) };
  }
}

/**
 *
 * @param T 서버 응답 response 타입
 *
 * @param path
 * @param config
 * @param errorMessage 에러 status code에 따른 에러 메세지
 * @returns
 */
export async function deleteAsync<T>(
  path: string,
  config?: AxiosRequestConfig,
  errorMessage?: Record<number, string>,
): ApiResult<T> {
  try {
    const response = await customAxios.delete<T, AxiosResponse<T>>(path, {
      ...config,
    });
    return { isSuccess: true, result: response.data };
  } catch (error) {
    return { isSuccess: false, result: handleError(error, errorMessage) };
  }
}
