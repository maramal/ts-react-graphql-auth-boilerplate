import React, { useState, useContext } from 'react';
import { useForgotPasswordMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const ForgotPassword: React.FC = () => {
    const [forgotPassword] = useForgotPasswordMutation();
    const { gqlError } = useContext(AppStateContext);
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setShow(false);
            const { data } = await forgotPassword({ variables: { email }});
            if (data === undefined || data?.forgotPassword === undefined || !data?.forgotPassword)
                throw new Error('Datos inválidos');
            setSuccess(true);
        } catch {
            setShow(true);
        }
    };
    
    if (success) {
        return (
            <div>
                <h1>Página de contraseña olvidada</h1>
                <p>Un enlace de reinicio de contraseña se envió a tu correo.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Página de contraseña olvidada</h1>
            {show ? <p>{gqlError.msg}</p> : undefined}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        value={email}
                        placeholder='Correo electrónico'
                        onChange={e => { setEmail(e.target.value); }}
                    />
                </div>
                <button type='submit'>Enviar enlace de reinicio de contraseña</button>
            </form>
        </div>
    );
};