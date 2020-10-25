import React, { useState, useContext } from 'react';
import { useRegisterMutation } from '../gql/generated/graphql';
import { AppStateContext } from './provider';

export const Register: React.FC = () => {
    const { gqlError } = useContext(AppStateContext);
    const [register] = useRegisterMutation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setShow(false);
            const { data } = await register({ variables: { email, password, confirmation }});
            if (data === undefined || data?.register === undefined)
                throw new Error('Credenciales inválidas');
            setSuccess(true);
        } catch (err) {
            setShow(true);
        }
    }

    if (success) {
        return (
            <div>
                <h1>Página de registro</h1>
                <p>¡Registro correcto! Por favor revisa tu correo para tu enlace de verificación de correo electrónico</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Página de registro</h1>
            {show ? <p>{gqlError.msg}</p> : undefined }
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
                <div>
                    <input 
                        value={confirmation} 
                        placeholder='Confirmar contraseña' 
                        type='password' 
                        onChange={e => { setConfirmation(e.target.value); }} 
                    />
                </div>
                <button type="submit">Registro</button>
            </form>
        </div>
    );
};