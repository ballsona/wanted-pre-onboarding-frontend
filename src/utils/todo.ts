import { InternalAxiosRequestConfig } from 'axios';
import {
  ApiResult,
  customAxios,
  deleteAsync,
  getAsync,
  postAsync,
  putAsync,
} from './api';

export interface TodoItemType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

/**
 * todo 생성
 * @param todo 새로 생성할 todo 내용
 * @param password 회원가입에 사용할 비밀번호
 */
export async function createTodoAsync(todo: string): ApiResult<TodoItemType> {
  const result = postAsync<TodoItemType, { todo: string }>(`/todos`, {
    todo,
  });
  return result;
}

/**
 * todo list 요청
 * @param todo 새로 생성할 todo 내용
 * @param password 회원가입에 사용할 비밀번호
 */
export async function getTodosAsync(): ApiResult<TodoItemType[]> {
  const result = getAsync<TodoItemType[]>(`/todos`);
  return result;
}

/**
 * todo 수정
 * @param id 수정할 todo의 id
 * @param todo 수정할 todo
 * @param isCompleted 수정할 todo의 완료 유무
 */
export async function updateTodoAsync(
  id: number,
  todo: string,
  isCompleted: boolean,
): ApiResult<TodoItemType> {
  const result = putAsync<TodoItemType, { todo: string; isCompleted: boolean }>(
    `/todos/${id}`,
    {
      todo,
      isCompleted,
    },
  );
  return result;
}

/**
 * todo 삭제
 * @param id 삭제할 todo의 id
 */
export async function deleteTodoAsync(id: number): ApiResult<TodoItemType> {
  const result = deleteAsync<TodoItemType>(`/todos/${id}`);
  return result;
}

// 헤더에 Acess Token 추가하기
customAxios.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (config.headers.Authorization || !config.url?.includes('todos'))
      return config;

    const ACCESS_TOKEN = window.localStorage.getItem('wanted_user_token');
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    return config;
  },
);
