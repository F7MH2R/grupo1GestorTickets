// withLoader.jsx
import React, { useState, useEffect } from 'react';
import Loader from './Loading';

const withLoader = (WrappedComponent) => {
    return (props) => {
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000); // Duración del cargador en milisegundos

            return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
        }, []);

        return (
            <div>
                {loading ? <Loader /> : <WrappedComponent {...props} />}
            </div>
        );
    };
};

export default withLoader;





