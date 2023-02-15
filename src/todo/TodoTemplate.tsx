import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createTodoAsync,
  deleteTodoAsync,
  updateTodoAsync,
  getTodosAsync,
  TodoItemType,
} from '../utils/todo';
import * as styles from './TodoTemplate.css';

const DEAFULT_ITEM = {
  id: -9999,
  todo: '',
  isCompleted: false,
};

const TodoTemplate = () => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState('');
  const [todoItems, setTodoItems] = useState<TodoItemType[]>([]);
  const [modifyItem, setModifyItem] = useState(DEAFULT_ITEM);

  async function getTodoItems() {
    const res = await getTodosAsync();
    if (res.isSuccess) {
      setTodoItems(res.result);
    }
  }

  useEffect(() => {
    getTodoItems();
  }, []);

  const createTodo = async () => {
    const res = await createTodoAsync(todo);
    if (res.isSuccess) {
      getTodoItems();
    }
    setTodo('');
  };

  const deleteTodo = async (id: number) => {
    const res = await deleteTodoAsync(id);
    if (res.isSuccess) {
      getTodoItems();
    }
  };

  const onClickTodo = async (id: number) => {
    const target = todoItems.find((item) => item.id === id); // 바꿀 todo
    const res = await updateTodoAsync(
      id,
      target?.todo ?? '',
      !target?.isCompleted,
    );
    if (res.isSuccess) {
      setTodoItems(
        todoItems.map((item: TodoItemType) => {
          if (item.id === id)
            return { ...item, isCompleted: !item.isCompleted };
          return item;
        }),
      );
    }
  };

  const onModifyTodo = async () => {
    const { id, todo, isCompleted } = modifyItem;
    const res = await updateTodoAsync(id, todo, isCompleted);
    if (res.isSuccess) {
      setTodoItems(
        todoItems.map((item: TodoItemType) => {
          if (item.id === id) return { ...item, id, todo, isCompleted };
          return item;
        }),
      );
      setModifyItem(DEAFULT_ITEM);
    }
  };

  useEffect(() => {
    if (!window.localStorage.getItem('wanted_user_token')) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.todobox}>
        <div className={styles.title}>TODO</div>
        <div className={styles.todoform}>
          <input
            data-testid="new-todo-input"
            className={styles.todoinput}
            type="text"
            value={todo}
            placeholder="비밀번호를 입력해주세요"
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            data-testid="new-todo-add-button"
            className={styles.newTodoAddButton}
            onClick={createTodo}
          >
            추가
          </button>
        </div>
        <ul className={styles.todolist}>
          {todoItems.map((item: TodoItemType) => (
            <li key={item.id} className={styles.todoitem}>
              {modifyItem.id !== item.id ? (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => onClickTodo(item.id)}
                    />
                    <span>{item.todo}</span>
                  </label>
                  <div className={styles.itemButtonsWrap}>
                    <button
                      data-testid="modify-button"
                      className={styles.itemButton}
                      onClick={() =>
                        setModifyItem({
                          id: item.id,
                          todo: item.todo,
                          isCompleted: item.isCompleted,
                        })
                      }
                    >
                      수정
                    </button>
                    <button
                      data-testid="delete-button"
                      className={styles.itemButton}
                      onClick={() => deleteTodo(item.id)}
                    >
                      삭제
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    data-testid="modify-input"
                    className={styles.modifyInput}
                    value={modifyItem.todo}
                    onChange={(e) =>
                      setModifyItem({ ...modifyItem, todo: e.target.value })
                    }
                  />
                  <div className={styles.itemButtonsWrap}>
                    <button
                      data-testid="submit-button"
                      className={styles.itemButton}
                      onClick={onModifyTodo}
                    >
                      제출
                    </button>
                    <button
                      data-testid="cancel-button"
                      className={styles.itemButton}
                      onClick={() => setModifyItem(DEAFULT_ITEM)}
                    >
                      취소
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoTemplate;
