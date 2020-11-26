import React from "react";
import { Field, reduxForm } from "redux-form";
import { renderField, renderCurrency, renderSwitch, renderNumber } from "../Utils/renderField/";
import { validate, validators } from 'validate-redux-form';


const ProductoForm = (props) => {
    const { handleSubmit, actualizar, ver } = props;

    return (
        <div className="d-flex flex-column card  text-white bg-secondary mt-3 p-4" style={{width: '25rem'}}>
            <form onSubmit={handleSubmit}>
                <div className="form-group has-feedback font-weight-bold">
                    <label htmlFor="nombre" className="font-weight-bold">Nombre</label>
                    <Field
                        name="nombre"
                        label="Nombre"
                        placeholder="ingrese nombre producto"
                        component={renderField}
                        type="text"
                        disabled={ver}
                        className="form-control"
                    />
                </div>
                <div className="form-group has-feedback">
                    <label htmlFor="descripcion" className="font-weight-bold">Descripcion</label>
                    <Field
                        name="descripcion"
                        label="Descripcion"
                        component={ renderField }
                        placeholder="Descripcion del producto"
                        type="text"
                        disabled={ver}
                        className="form-control"
                    />
                </div>
                <div class="d-flex justify-content-between">
                    <div className="form-group has-feedback">
                        <label htmlFor="precio_compra" className="font-weight-bold">Precio compra </label>
                        <Field
                            name="precio_compra"
                            label="Preciocompra "
                            placeholder="Q 00.00"
                            component={renderCurrency}
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="precio_venta" className="font-weight-bold">Precio venta</label>
                        <Field
                            name="precio_venta"
                            label="Precio_venta"
                            placeholder="Q 00.00"
                            component={renderCurrency}
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <div className="form-group has-feedback">
                        <label htmlFor="existencia" className="font-weight-bold">Existencia</label>
                        <Field
                            name="existencia"
                            label="Existencia"
                            placeholder="0"
                            component={renderNumber}
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                    <div className="form-group has-feedback mr-5 pr-5 justify-content-start">
                        <label htmlFor="activo" className="font-weight-bold">Estado </label>
                        <Field
                            name="activo"
                            component={renderSwitch}
                            className="form-control"
                            disabled={ver}
                        />
                    </div>
                </div>
                { ver ? (
                    <a
                        className="btn btn-danger mx-2 align-self-center"
                        href="/#/producto"
                    >
                        Regresar
                    </a>
                )
                : (<div className="buttons-box">
                        <a
                            className="btn btn-danger mx-2 align-self-center"
                            href="/#/producto"
                        >
                            Cancelar
                        </a>
                        <button
                            type="submit"
                            className="btn btn-primary m-1 align-self-center"
                        >
                            { actualizar ? 'Actualizar' : 'Registrar' }
                        </button>
                    </div>
                    ) }
                
            </form>
        </div>
    );
};


export default reduxForm({
    form: 'productoForm', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            nombre: validators.exists()('Este campo es requerido'),
            descripcion: validators.exists()('Este campo es requerido'),
            precio_venta : validators.exists()('Este campo es requerido'),
            precio_compra : validators.exists()('Este campo es requerido'),
        });
    },
})(ProductoForm);