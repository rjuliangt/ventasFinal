import React, { Component } from "react";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { reduxForm } from "redux-form";


class ReporteListar extends Component {
    componentWillMount = () => {
        this.props.listar();
    };
    
    render() {
        function priceFormatter(cell, row) {
            return `Q.  ${cell}`;
        }
        const {
            data,
            loader,
            searchChange,
            onSortChange,
            listar,
            page,
        } = this.props;

        return (
            <div className="d-flex flex-column w-100 px-3">
                <div className="page-header pl-1 pt-3 no-gutters row">
                    <div className="text-sm-left text-center text-md-left mb-sm-0 col-12 col-sm-4">
                        <div
                            style={{
                                border: "1px solid #B3B8BC",
                                borderRadius:
                                    "0.8640833497047424px 22px 22px 0.8640833497047424px",
                                width: 100,
                                height: 25,
                                lineHeight: "23px",
                                textAlign: "center",
                                letterSpacing: "-0.36px",
                            }}
                            className="txt-12"
                        >
                            Reporteria
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap mb-2  mt-4">
                    <h3 className="txt-22-n color-003 w-50">Total de ventas por producto</h3>

                    <div className="d-flex flex-row w-50 align-items-center justify-content-end">
                        <div className="flex-fill d-flex align-items-center ml-3">
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => searchChange(e.target.value)}
                                placeholder="buscar producto..."
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
                </div>
                <Grid
                    data={data}
                    loading={loader}
                    onPageChange={listar}
                    page={page}
                    onSortChange={ onSortChange }
                    className="table table-striped"
                >
                    <TableHeaderColumn isKey dataField="producto__nombre" dataSort>
                        Nombre
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="producto__descripcion" dataSort>
                        Descripcion
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="producto__precio_venta" dataFormat={ priceFormatter } dataSort>
                        Precio de venta
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="producto__existensia"  dataSort>
                        Existencia
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="cantidad_vendido" dataSort>
                        Cantidad vendido
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="total_ganado" dataFormat={ priceFormatter } dataSort>
                        Total en moneda
                    </TableHeaderColumn>
                </Grid>
            </div>
        );
    }
}

export default ReporteListar;
export default reduxForm({
    form: 'reporteForm', // a unique identifier for this form
})(ReporteListar);