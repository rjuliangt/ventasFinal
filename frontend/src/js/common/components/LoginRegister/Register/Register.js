import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import LoadMask from '../../Utils/LoadMask/LoadMask';

class Registro extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem('token')) {
            return <Redirect to="/" />;
        }
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <p>Página de registro</p>
                    <a href={`/#/catalogo`} className="btn btn-success">catalogo</a>
                </div>
                <div className="login-wrapper mt-0">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">REGISTRO</h5>
                        <LoadMask loading={loader} light>
                            <RegisterForm onSubmit={onSubmit} />
                            <span>
                                ¿Ya tienes cuenta?&nbsp;
                                <Link to="/login">Ingresa aquí</Link>
                            </span>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registro;
