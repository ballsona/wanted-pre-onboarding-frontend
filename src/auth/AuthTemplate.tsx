import { useEffect, useState } from 'react';
import { AuthData, authAsync, AuthType } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import * as styles from './AuthTemplate.css';

const AuthTemplate = ({ type }: { type: AuthType }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState<AuthData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    // 만약 토큰 있다면 todo 페이지로 바로 이동
    if (window.localStorage.getItem('wanted_user_token')) {
      navigate('/todo');
    }
  }, [navigate]);

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onAuthHandler = async () => {
    const res = await authAsync(type, inputs.email, inputs.password);
    if (res.isSuccess) {
      if (type === 'signin') {
        window.localStorage.setItem(
          'wanted_user_token',
          res.result.access_token,
        );
      }
      navigate(type === 'signin' ? '/todo' : '/signin');
    }
    setInputs({ email: '', password: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.authbox}>
        <div className={styles.title}>
          {type === 'signin' ? '로그인' : '회원가입'}
        </div>
        <input
          data-testid="email-input"
          className={styles.input}
          type="text"
          name="email"
          value={inputs.email}
          placeholder="아이디를 입력해주세요"
          onChange={onTextChange}
        />
        <input
          data-testid="password-input"
          className={styles.input}
          type="password"
          name="password"
          value={inputs.password}
          placeholder="비밀번호를 입력해주세요"
          onChange={onTextChange}
        />
        <button
          data-testid={`${type}-button`}
          className={styles.button}
          onClick={onAuthHandler}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AuthTemplate;
