import React, { Component } from "react";
import ComprarForm from "./FormComprar";

class CrearCompra extends Component {
    componentWillMount = () => {
        const { match, leer } = this.props;
        if (match.params.id) {
            const id = match.params.id;
            leer(id);
        }
    };

    actualizarFormulario = (data) => {
        const { editar } = this.props;
        editar(data.id, data);
    };

    render() {
        const {
            match,
            crear,
            location,
        } = this.props;

        const funcionEnvio = match.params.id
            ? this.actualizarFormulario
            : crear;

        console.log("Crear producto", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <ComprarForm
                    onSubmit={funcionEnvio}
                    funcionRegistro={this.props.funcionEnvio}
                    actualizar={match.params.id ? true : false}
                    ver={location.pathname.includes("ver")}
                />
            </div>
        );
    }
}

export default CrearCompra;
