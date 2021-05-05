import {Link, useHistory} from 'react-router-dom';
import * as React from 'react';
import Routes, { RoutesNames } from '../../pages/routes';
import s from './NavBar.module.scss';
import {useEffect, useState} from "react";
import {fetchData} from "../../utils/API";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {changeIsAuth, makeIsAuthFalse} from "../RootBar/@slice";


const NavBar: React.FC = () => {
  const [isAuthNav, alterIsAuth] = useState(false);
  const history = useHistory();
  const dispatch = useAppDispatch();
  let isAuth = useAppSelector(state => state.rootState.isAuth);

  function GetIsAuth() {
    fetchData('/api/cookie', {
      credentials: "include",
      method: 'GET',
      referrerPolicy: "unsafe-url",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Cache": "no-cache"
      }
    })
        .then(response => {
          if (response.ok) {
            alterIsAuth(true);
          }
          console.log(response.ok)
          return response.json();
        })
        .then(data => {
          console.log(data);
        });
  }
  function logout() {
    fetchData('/api/log-out', {
      credentials: "include",
      method: 'POST',
    })
        .then(response => {
          if (response.ok) {
            alterIsAuth(false);
            if(isAuth) {dispatch(makeIsAuthFalse());}
            history.push('/');
          }
          console.log(response.ok)
          return response.json();
        });
  }
  useEffect(()=>{GetIsAuth();}, [isAuthNav]);
  return (
    <div className={s.root}>
      <div className={s.grid}>
          {!isAuthNav ? <nav className={s.appbar}>
              <Link className={s.appbarLink} to={Routes.ROOT}>
                  {RoutesNames.ROOT}
              </Link>
              <Link className={s.appbarLink} to={Routes.SEARCH}>
                  {RoutesNames.SEARCH}
              </Link>
              <Link className={s.appbarLink} to={Routes.LOGIN}>
                  {RoutesNames.LOGIN}
              </Link>
              <Link className={s.appbarLink} to={Routes.REGISTER}>
                  {RoutesNames.REGISTER}
              </Link>
              <Link className={s.appbarLink} to={Routes.STAT}>
                  {RoutesNames.STAT}
              </Link>
          </nav> :
              <nav className={s.appbar}>
                  <Link className={s.appbarLink} to={Routes.ROOT}>
                      {RoutesNames.ROOT}
                  </Link>
                  <Link className={s.appbarLink} to={Routes.SEARCH}>
                      {RoutesNames.SEARCH}
                  </Link>
                  <label className={s.appbarLink} onClick={() => {logout();}}>
                      {RoutesNames.LOGOUT}
                  </label>
                  <Link className={s.appbarLink} to={Routes.STAT}>
                      {RoutesNames.STAT}
                  </Link>
              </nav>
          }
      </div>
    </div>
  );
};

export default NavBar;
