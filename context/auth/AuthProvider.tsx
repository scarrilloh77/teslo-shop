import { useEffect, useReducer } from 'react';
import { IUser } from '@/interfaces';
import { AuthContext, authReducer } from './';
import { tesloApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const { data } = await tesloApi.get('/user/validate-token'); // OJO: Axios manda las cookies en la request, pero para fetch toca especificar dicho mandato.
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      Cookies.remove('token');
    }
  };

  // Antes de servir cada page, por medio de las cookies, yo puedo saber si el user esta autenticado o no.
  // Static Page: Todo se sirve (crea) estaticamente de hacer una request.

  const loginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await tesloApi.post('/user/login', { email, password });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await tesloApi.post('/user/register', {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: '[Auth] - Login', payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: 'No se puedo crear el usuario - intente de nuevo',
      };
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

//El provider es lo que se tendra en el estado global.
