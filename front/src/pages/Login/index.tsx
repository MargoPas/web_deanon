import * as React from 'react';
import NavBar from "../../components/NavBar";
import LoginForm from '../../components/Login';

export const Login: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <LoginForm/>
    </div>
  );
}
