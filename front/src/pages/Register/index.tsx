import * as React from 'react';
import NavBar from "../../components/NavBar";
import RegisterForm from '../../components/Register';

export const Register: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <RegisterForm/>
    </div>
  );
}