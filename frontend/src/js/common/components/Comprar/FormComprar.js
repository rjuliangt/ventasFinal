import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, renderCurrency, renderNumber } from "../Utils/renderField/";
import { validate, validators } from 'validate-redux-form';


const ComprarForm = (props) => {
    const { handleSubmit , data, match} = props;
    
    return (
        <div className="d-flex justify-content-center blue-gradient-bg2">
            <div className="d-flex card  text-white bg-secondary mt-3 p-4" style={{width: '32rem', height:'80%'}}>
                <form onSubmit={ handleSubmit }>
                    <h5 className="font-weight-bold mb-1 text-center">Detalle compra</h5>
                    <div className="d-flex justify-content-between">
                        <div className="form-group has-feedback w-100 input-sm font-weight-bold">
                            <label htmlFor="first_name" className="font-weight-bold my-1 ">Nombre</label>
                            <Field
                                name="first_name"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback my-1 ml-3 w-100 font-weight-bold">
                            <label htmlFor="last_name" className="font-weight-bold">Apellido</label>
                            <Field
                                name="last_name"
                                component={renderField}
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between m-0">
                        <div className="form-group has-feedback my-1 w-100">
                            <label htmlFor="direccion" className="font-weight-bold">Direcci&oacute;n</label>
                            <Field
                                name="direccion"
                                component={ renderField }
                                type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback my-1 ml-3 w-100">
                            <label htmlFor="nit" className="font-weight-bold">No. NIT</label>
                            <Field
                                name="nit"
                                component={ renderField }
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group  my-1 has-feedback w-100">
                            <label htmlFor="nombre" className="font-weight-bold">Producto</label>
                            <Field
                                name="nombre"
                                component={ renderField }
                                type="text"
                                disabled={true}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group my-1 has-feedback ml-3 w-100">
                            <label htmlFor="precio_venta" className="font-weight-bold">Precio Unidad</label>
                            <Field
                                id={'precio'}
                                name="precio_venta"
                                component={renderCurrency}
                                className="form-control"
                                disabled={true}
                            />
                        </div>
                    </div>
                    <div className="form-group w-20 my-1 has-feedback">
                            <label htmlFor="descripcion" className="font-weight-bold">Descripcion</label>
                            <Field
                                name="descripcion"
                                label="descripcion"
                                component={renderField}
                                className="form-control"
                                disabled={true}
                            />
                    </div>
                    <div class="d-flex justify-content-start">
                        <div className="form-group w-20 has-feedback my-1">
                            <label htmlFor="cantidad" className="font-weight-bold">Cantidad</label>
                            <Field
                                id={ 'cantidad'}
                                name="cantidad"
                                label="cantidad"
                                component={renderNumber}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback ml-3 my-1 w-25 justify-content-start">
                            <label htmlFor="subtotal" className="font-weight-bold">Subtotal </label>
                            <Field
                                id={'subtotal'}
                                name="subtotal"
                                component={renderCurrency}
                                className="form-control"
                                disabled={true}
                            />
                        </div>
                    </div>
                    
                    <div className="buttons-box">
                        { match.path == '/comprar/:id/comprar' ? (
                            <a className="btn btn-danger mx-2 align-self-center"
                                href="/#/"
                            > Regresar
                            </a>
                        
                        ) : (
                            <a className="btn btn-danger mx-2 align-self-center"
                                href="/#/catalogo"
                            > Regresar
                            </a>
                        ) }
                        <button
                            type="submit"
                            className="btn btn-primary m-1 align-self-center"
                        >
                            Comprar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default reduxForm({
    form: 'comprarProductoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            first_name: validators.exists()('Este campo es requerido'),
            last_name: validators.exists()('Este campo es requerido'),
            direccion : validators.exists()('Este campo es requerido'),
            nombre : validators.exists()('Este campo es requerido'),
            cantidad: validators.exists()( 'Este campo es requerido' ),
            // subtotal:  * precio_venta,
        });
    },
})(ComprarForm);