import React from "react";
import { reduxForm } from "redux-form";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Catalogo = (props) => {
    const {
            data,
            loader,
            searchChange,
            onSortChange,
            listar,
            page,
            match,
        } = props;
    console.log('datos catalogo', data)
    console.log('loader catalogo', loader)
    return (
        
        <div className="blue-gradient-bg2">
            <div className="sticky d-flex">
                <h2 className="text-center w-100 font-weight-bold text-white pt-3">Catalogo</h2>
                <div className="d-flex flex-row w-50 align-items-center justify-content-end">
                        <div className="flex-fill d-flex align-items-center ml-3">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => searchChange(e.target.value)}
                                placeholder="Buscar por nombre o descripcion"
                                style={{
                                    border: "2px solid #E5E5E5",
                                    borderRadius: "12px",
                                    paddingRight: "35px",
                                }}
                            />
                            <FontAwesomeIcon
                                icon={faSearch}
                                className="icono color-4AC"
                                style={{
                                    marginLeft: -35,
                                }}
                            />
                    </div>
                 </div>   
                { match.url == '/catalogo' ? ( 
                    <React.Fragment>
                        <a href={`/#/login`} className="btn btn-primary font-weight-bold text-white justifiy-content-end m-3">Iniciar sesi&oacute;n</a>
                        <a href={ `/#/registro` } className="btn btn-warning font-weight-bold text-white justifiy-content-end m-3">Registrarse</a>
                    </React.Fragment>
                ):null}
                
            </div>
            { data && data.results? (
                <React.Fragment>
                    { data.results.map( (producto) => (
                        <div className="card text-center text-white m-2 bg-primary " style={{width:"15rem", display: "inline-block"}}>
                            <img className="card-img-top" src="https://image.freepik.com/vector-gratis/manos-comprando-tablet-e-iconos-compras_23-2147661056.jpg" alt="Card image cap"/>
                            <div className="card-body py-2">
                                <h5 className="card-title my-1 font-weight-bold">{ producto.nombre }</h5>
                                <p className="card-text my-1">{producto.descripcion}</p>
                                <p className="card-text my-1">{ 'Precio Q. ' + producto.precio_venta  + '  ' +' Exis. ' + producto.existencia}</p>
                                <p className="card-text my-1">{ 'De: ' + producto.vendedor.nombre }</p>
                            </div>
                            <div className="card-footer text-center m-1 py-2">
                                { match.url == '/' ? (
                                    <a href={ `/#/comprar/${ producto.id }/comprar` } className="btn btn-success">comprar</a>
                                ) : (
                                    <a href={ `/#/decatalogo/${ producto.id }/comprar` } className="btn btn-success">comprar</a>
                                ) }
                            </div>
                        </div>
                    ) ) }
                </React.Fragment>
                ) : null
            }
        </div>
    );
};

export default reduxForm({
    form: 'cataloProductoForm', // a unique identifier for this form
})(Catalogo);