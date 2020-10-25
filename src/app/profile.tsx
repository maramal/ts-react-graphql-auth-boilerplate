import React from 'react';
import { useHistory } from 'react-router-dom';
import { useProfileQuery } from '../gql/generated/graphql';

export const Profile: React.FC = () => {
    const history = useHistory();
    const { data, loading, error } = useProfileQuery({ fetchPolicy: 'network-only' });

    if (loading) {
        return (
            <div>
                <h1>Página de perfil</h1>
                <div>Cargando ...</div>
            </div>
        );
    }

    if (error)
        history.replace('/');

    return <div>
        <h1>Página de perfil</h1>
        <p>Correo electrónico: {data?.profile?.email}</p>
    </div>;
};
