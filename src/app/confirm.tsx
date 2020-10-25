import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useConfirmMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const Confirm: React.FC = () => {
    const history = useHistory();
    const { appSetAuthToken, appClearAuthToken, gqlError } = useContext(AppStateContext);

    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [confirm] = useConfirmMutation();
    const { token } = useParams<{ token?: string }>();

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setShow(false);
            appSetAuthToken(token!);
            const { data } = await confirm({ variables: { email } });
            appClearAuthToken();
            if (data === undefined || data?.confirm === undefined || !data.confirm)
                throw new Error('No autorizado');
            history.replace('/ingreso');
        } catch {
            setShow(true);
        }
    };

    if (token === undefined || token === '')
        return <div>Enlace de confirmación de usuario inválido</div>;

    return (
        <div>
            <div>Página de confirmación de usuario</div>
            {show ? <p>{gqlError.msg}</p> : undefined}
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input
                        value={email}
                        placeholder='Correo electrónico'
                        type='email'
                        onChange={e => { setEmail(e.target.value); }}
                    />
                </div>
                <button type='submit'>Confirmar</button>
            </form>
        </div>
    );
};