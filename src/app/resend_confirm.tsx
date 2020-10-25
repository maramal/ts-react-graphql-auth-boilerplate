import React, { useState, useContext } from 'react';
import { useResendConfirmationMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const ResendConfirm: React.FC = () => {
    const [resendConfirmation] = useResendConfirmationMutation();
    const { gqlError } = useContext(AppStateContext);
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setShow(false);
            const { data } = await resendConfirmation({ variables: { email }});
            if( data === undefined || data?.resendConfirmation === undefined || !data?.resendConfirmation)
                throw new Error('Datos inválidos');
            setSuccess(true);
        } catch {
            setShow(true);
        }
    };

    if (success) {
        return (
            <div>
                <h1>Página de reenvío de confirmación</h1>
                <p>Un enlace de confirmación fue enviado a tu correo.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Página de reenvío de confirmación</h1>
            {show ? <p>{gqlError.msg}</p> : undefined}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        value={email}
                        placeholder='Correo electrónico'
                        onChange={e => { setEmail(e.target.value); }}
                    />
                </div>
                <button type='submit'>Enviar correo de confirmación</button>
            </form>
        </div>
    );
};