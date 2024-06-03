import React from "react";

import { Audio } from "react-loader-spinner";

const Loading = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
            }}
        >
            <Audio
                color="#4A261F"
                height={100}
                width={100}
                ariaLabel="Loading"
                timeout={3000} // Duraci�n m�xima de carga en milisegundos
            />
            <p>Cargando...</p>
        </div>
    );
};

export default Loading;