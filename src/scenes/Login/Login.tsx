import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory, useLocation } from 'react-router-dom';
import { Hello } from 'ttlpta-first-lib';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login, authState, getCurrentUser } from '../../redux/slices/authSlice';
import { showAlert } from '../../redux/slices/uiSlice';
import { TextFieldForm, Button, Card, Form, CheckboxForm } from '../../components';
import { ILoginSchema, LoginSchema } from '../../schemas';
import LoginStyled from './LoginStyled';
import { LoginRequestForm } from '../../type/api';

interface LocationState {
  from: {
    pathname: string;
  };
}

export default function Login() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<LocationState>();
  const handleSubmit = async (data: LoginRequestForm) => {
    try {
      const result = await dispatch(login(data));
      unwrapResult(result);
      dispatch(getCurrentUser());
      const { from } =
        location.state && location.state.from.pathname !== '/logout'
          ? location.state
          : {
              from: { pathname: '/' },
            };

      history.replace(from);
    } catch (error) {
      dispatch(
        showAlert({
          show: true,
          message: error.message,
          type: 'error',
        }),
      );
    }
  };

  const auth = useAppSelector(authState);

  return (
    <LoginStyled>
      <Card className="loginForm__wrapper">
        <p>{Hello('world')}</p>
        <Form<LoginRequestForm, ILoginSchema>
          onSubmit={handleSubmit}
          schema={LoginSchema}
          loading={auth.status === 'loading'}
        >
          <TextFieldForm name="username" label="Username" fullWidth className="loginForm__txtField--username" />
          <TextFieldForm
            type="password"
            name="password"
            label="Password"
            fullWidth
            className="loginForm__txtField--pw"
          />
          <CheckboxForm label="Remember me" name="isRememberMe" />
          <Button label="Submit" fullWidth type="submit" color="secondary" className="loginForm__btn--submit" />
        </Form>
      </Card>
    </LoginStyled>
  );
}
