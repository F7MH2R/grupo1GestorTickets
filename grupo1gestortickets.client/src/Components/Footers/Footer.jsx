import React from 'react';
import './Footer.css';

const Footer = ({ user }) => {

    if (!user) {
        return (
            <footer className="mi-footer">
                <div className="mi-footer__contenedor">
                    <div className="mi-footer__seccion">
                        <h3 className="mi-footer__titulo">Acerca de nosotros</h3>
                        <p>Somos una empresa dedicada a...</p>
                    </div>
                    <div className="mi-footer__seccion">
                        <h3 className="mi-footer__titulo">Enlaces</h3>
                        <ul className="mi-footer__enlaces">
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Servicios</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="mi-footer__seccion">
                        <h3 className="mi-footer__titulo">Síguenos</h3>
                        <ul className="mi-footer__redes-sociales">
                            <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        );
    } else {
        return null; // Otra opción es retornar null si hay un usuario, lo que haría que el componente no se renderice
    }
}

export default Footer;
