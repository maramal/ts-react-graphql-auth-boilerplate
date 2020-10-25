import React, { useContext } from 'react';
import { AppStateContext } from './provider';

export const Home: React.FC = () => {
    const { appState } = useContext(AppStateContext);
    return appState.loggedIn ?
        <div>Landing Page de Usuario logueado</div> :
        <div>Landing Page</div>;
}