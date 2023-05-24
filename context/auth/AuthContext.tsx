import { IUser } from '@/interfaces';
import { createContext } from 'react';

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
}

export const AuthContext = createContext({} as ContextProps);

// El Context es lo que yo quiero que los componentes hijos puedan ver fuera del provider.
