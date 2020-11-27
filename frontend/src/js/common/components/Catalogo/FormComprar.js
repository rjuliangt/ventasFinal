import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, renderCurrency, renderSwitch, renderNumber } from "../Utils/renderField/";
import { validate, validators } from 'validate-redux-form';


const ComprarForm = (props) => {
    const { handleSubmit, actualizar, ver } = props;

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex card  text-white bg-secondary mt-3 p-4" style={{width: '50rem'}}>
                <form onSubmit={ handleSubmit }>
                    <h3 className="font-weight-bold mb-1 text-center">Detalle compra</h3>
                    <div className="d-flex justify-content-between">
                        <div className="form-group has-feedback w-100 font-weight-bold">
                            <label htmlFor="first_name" className="font-weight-bold">Nombre</label>
                            <Field
                                name="first_name"
                                component={renderField}
                                type="text"
                                disabled={ver}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback ml-3 w-100 font-weight-bold">
                            <label htmlFor="last_name" className="font-weight-bold">Apellido</label>
                            <Field
                                name="last_name"
                                component={renderField}
                                type="text"
                                disabled={ver}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group has-feedback w-100">
                            <label htmlFor="direccion" className="font-weight-bold">Direcci&oacute;n</label>
                            <Field
                                name="direccion"
                                component={ renderField }
                                type="text"
                                disabled={ver}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback  ml-3 w-100">
                            <label htmlFor="nit" className="font-weight-bold">No. NIT</label>
                            <Field
                                name="nit"
                                component={ renderField }
                                type="text"
                                disabled={ver}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="form-group has-feedback w-100">
                            <label htmlFor="nombre" className="font-weight-bold">Producto</label>
                            <Field
                                name="nombre"
                                component={ renderField }
                                placeholder="Descripcion del producto"
                                type="text"
                                disabled={ver}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group has-feedback ml-3 w-100">
                            <label htmlFor="precio_venta" className="font-weight-bold">Precio Unidad</label>
                            <Field
                                name="precio_venta"
                                component={renderCurrency}
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    <div class="d-flex justify-content-start">
                        <div className="form-group w-20 has-feedback">
                            <label htmlFor="cantidad" className="font-weight-bold">Cantidad</label>
                            <Field
                                name="cantidad"
                                label="cantidad"
                                placeholder="0"
                                component={renderNumber}
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                        <div className="form-group has-feedback ml-3 w-25 justify-content-start">
                            <label htmlFor="subtotal" className="font-weight-bold">Subtotal </label>
                            <Field
                                name="subtotal"
                                component={renderCurrency}
                                className="form-control"
                                disabled={ver}
                            />
                        </div>
                    </div>
                    { ver ? (
                        <a
                            className="btn btn-danger mx-2 align-self-center"
                            href="/#/catalogo"
                        >
                            Regresar
                        </a>
                    )
                    : (<div className="buttons-box">
                            <a
                                className="btn btn-danger mx-2 align-self-center"
                                href="/#/catalogo"
                            >
                                Cancelar
                            </a>
                            <button
                                type="submit"
                                className="btn btn-primary m-1 align-self-center"
                            >
                                { actualizar ? 'Actualizar' : 'Comprar' }
                            </button>
                        </div>
                        ) }
                    
                </form>
            </div>
        </div>
    );
};


export default reduxForm({
    form: 'comprarProductoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
            precio_venta : validators.exists()('Este campo es requerido'),
            precio_compra : validators.exists()('Este campo es requerido'),
        });
    },
})(ComprarForm);