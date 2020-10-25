import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useLoginMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const Login: React.FC = () => {
    const history = useHistory();
    const { appSetLogin, gqlError } = useContext(AppStateContext);
    const [login] = useLoginMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setShow(false);
            const { data } = await login({ variables: { email, password }});
            if (data === undefined || data?.login === undefined || data.login?.access_token === undefined)
                throw new Error('Credenciales incorrectas');
            appSetLogin(data.login?.access_token!);
            history.replace('/');
        } catch (err) {
            setShow(true);
        }
    };

    return (
        <div>
            <h1>Página de ingreso</h1>
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
                <div>
                    <input
                        value={password}
                        placeholder='Contraseña'
                        type='password'
                        onChange={e => { setPassword(e.target.value); }}
                    />
                </div>
                <button type='submit'>Ingresar</button>
            </form>
            <div>
                <p>
                    <Link to='/contraseña-olvidada'>¿Olvidaste tu contraseña?</Link>
                </p>
                <p>
                    <Link to='/reenviar-confirmacion'>¿Reenviar confirmación?</Link>
                </p>
            </div>
        </div>
    );
};