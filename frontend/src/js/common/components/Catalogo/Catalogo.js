import React, { Component } from "react";
import Catalogo from "./CatalogoListar";

class CrearCompra extends Component {
    componentWillMount = () => {
        const { match, getCatalogo, getOtrosCatalogos } = this.props;
        if ( match.url == '/' ) {
            getOtrosCatalogos()
        } 
        if ( match.url == '/catalogo' ) {
            getCatalogo()
        } 
        
    };
    render() {
        const { data, loader, match } = this.props;
        console.log("los props de mi catalogo", this.props);
        return (
            <div className="d-flex flex-column w-100">
                <Catalogo
                    data={ data }
                    loader={ loader }
                    match={match}
                />
            </div>
        );
    }
}

export default CrearCompra;
