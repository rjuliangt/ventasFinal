import React from "react";

const Inicio = () => {
    return (
        <div className="blue-gradient-bg2">
            <div>
                <h2 className="text-center w-100 font-weight-bold text-white pt-5">Ventas</h2>
                <div className="d-flex justify-content-center pt-5">
                    <div className=" text-center m-3 py-2">
                        <a href={ `/#/catalogo` }
                            className="btn btn-warning py-3 px-5 font-weight-bold"
                            style={{fontSize:'2rem', borderRadius:'18px'}}
                        >
                            Ir a catalogos</a>
                    </div>
                    
                    <div className=" text-center m-3 py-2">
                        <a href={ '/#/login' }
                            className="btn btn-danger px-5 py-3 font-weight-bold"
                            style={{fontSize:'2rem', borderRadius:'18px'}}
                        >
                            Logearse</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inicio;