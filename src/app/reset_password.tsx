import React, { useState, useContext } from 'react';
import { useResetPasswordMutation } from '../gql/generated/graphql';
import { useHistory, useParams } from 'react-router-dom';
import { AppStateContext } from './provider';

export const ResetPassword: React.FC = () => {
    const history = useHistory();
    const { appSetAuthToken, appClearAuthToken, gqlError } = useContext(AppStateContext);
    const [resetPassword] = useResetPasswordMutation();
    const { token } = useParams<{ token: string }>();
    
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [show, setShow] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setShow(false);
            appSetAuthToken(token);
            const { data } = await resetPassword({ variables: { password, confirmation }});
            if (data === undefined || data?.resetPassword === undefined || !data?.resetPassword)
                throw new Error('Credenciales incorrectas');
            appClearAuthToken();
            history.replace('/ingreso');
        } catch {
            appClearAuthToken();
            setShow(true);
        }
    };

    return (
        <div>
            <h1>Página de reinicio de contraseña</h1>
            {show ? <p>{gqlError.msg}</p> : undefined}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        value={password}
                        type='password'
                        placeholder='Contraseña'
                        onChange={e => { setPassword(e.target.value); }}
                    />
                </div>
                <div>
                    <input
                        value={confirmation}
                        type='password'
                        placeholder='Confirmar contraseña'
                        onChange={e => { setConfirmation(e.target.value); }}
                    />
                </div>
                <button type='submit'>Cambiar contraseña</button>
            </form>
        </div>
    );
};