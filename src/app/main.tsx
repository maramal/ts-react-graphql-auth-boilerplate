import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { AppStateContext, fetchAccessToken } from './provider';
import { useLogoutMutation } from '../gql/generated/graphql';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import { Profile } from './profile';
import { NotFound } from './not-found';
import { Confirm } from './confirm';
import { ResendConfirm } from './resend_confirm';
import { ForgotPassword } from './forgot_password';
import { ResetPassword } from './reset_password';

let initialized = false;

export const Main: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const { appState, appSetLogin, appSetLogout, gqlError } = useContext(AppStateContext);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    if (initialized) return;
    initialized = true;
    fetchAccessToken()
      .then((data: any) => {
        const failed = data === undefined || data?.access_token === undefined;
        failed ? appSetLogout() : appSetLogin(data?.access_token!);
      })
      .catch(e => { appSetLogout(); })
      .finally(() => { setLoading(false); });
  });

  const handleLogoutClick = async (e: React.FormEvent) => {
    try {
      setShow(false);
      const data = await logout();
      if (data === undefined || !data)
        throw new Error('Error del servidor');
      appSetLogout();
    } catch {
      setShow(true);
    }
  };

  if (loading)
    return <div>Cargando...</div>;

  return <BrowserRouter>
    <div>
      <header>
        {
          appState.loggedIn ?
            <div>
                <div><Link to='/'>Inicio</Link></div>
                <div><Link to='/perfil'>Perfil</Link></div>
                <div><Link to='#' onClick={handleLogoutClick}>Cerrar sesión</Link></div>
                {show ? <p>{gqlError.msg}</p> : undefined}
            </div> :
            <div>
              <div><Link to='/'>Inicio</Link></div>
              <div><Link to='/registro'>Registro</Link></div>
              <div><Link to='/ingreso'>Ingreso</Link></div>
          </div>
        }
      </header>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/registro'>{appState.loggedIn ? <Redirect to='/' /> : <Register />}</Route>
        <Route exact path='/confirmar/:token'>{appState.loggedIn ? <Redirect to='/' /> : <Confirm />}</Route>
        <Route exact path='/ingreso'>{appState.loggedIn ? <Redirect to='/' /> : <Login />}</Route>
        <Route exact path='/perfil'>{appState.loggedIn ? <Profile /> : <Redirect to='/ingreso' />}</Route>
        <Route exact path='/reenviar-confirmacion'>{appState.loggedIn ? <Redirect to='/' /> : <ResendConfirm />}</Route>
        <Route exact path='/contraseña-olvidada'>{appState.loggedIn ? <Redirect to='/' /> : <ForgotPassword />}</Route>
        <Route exact path='/reiniciar-contraseña/:token'>{appState.loggedIn ? <Redirect to='/' /> : <ResetPassword />}</Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>;
};