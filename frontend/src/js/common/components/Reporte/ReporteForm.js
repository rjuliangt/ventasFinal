import React, { Component } from "react";
import { TableHeaderColumn } from "react-bootstrap-table";
import Grid from "../Utils/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {  reduxForm } from "redux-form";
// import {
//      RadialChart
// } from 'react-vis'; 
import {
     XYPlot,
     XAxis,
     YAxis,
     VerticalBarSeries
} from 'react-vis'; 

class ReporteListar extends Component {
    componentWillMount = () => {
        this.props.getDataGrafica();
        this.props.getDataPromedio();
        this.props.getVentasPorProducto();
    };
    
    render() {
        function priceFormatter(cell, row) {
            return `Q.  ${cell}`;
        }
        const {
            data,
            loader,
            datosGrafica,
            datosPromedio,
        } = this.props;
        console.log('grafica ',datosGrafica)
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
                { data ? (
                    <Grid
                        data={data}
                        loading={loader}
                        // onPageChange={listar}
                        page={null}
                        className="table table-striped"
                    >
                        <TableHeaderColumn isKey dataField="nombre" dataSort>
                            Nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="descripcion" dataSort>
                            Descripcion
                        </TableHeaderColumn>
                        {/* <TableHeaderColumn dataField="producto__precio_venta" dataFormat={ priceFormatter } dataSort>
                            Precio de venta
                        </TableHeaderColumn> */}
                        <TableHeaderColumn dataField="existencia"  dataSort>
                            Existencia
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="cantidad_vendido" dataSort>
                            Cantidad vendido
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="precio" dataFormat={ priceFormatter } dataSort>
                            Precio 
                        </TableHeaderColumn>
                        <TableHeaderColumn dataField="total_ganado" dataFormat={ priceFormatter } dataSort>
                            Total en moneda
                        </TableHeaderColumn>
                    </Grid>
                ): null}
                <div className="d-flex justify-content-between">
                    <div className="form-group has-feedback my-1 ml-3 text-center font-weight-bold w-50">
                        { datosGrafica ? (
                            <React.Fragment>
                                <label htmlFor="last_name" className="font-weight-bold text-center">Total facturado Q. { datosGrafica.ganado}</label>
                                
                                <XYPlot
                                    xType="ordinal"
                                    width={300}
                                    height={ 300 }
                                >
                                    <VerticalBarSeries
                                        className="vertical-bar-series-example"
                                        color={'red','yellow'}
                                        data={ [
                                            {x: `${datosGrafica.vendidos} vendido`, y: 0 + datosGrafica.vendidos, color: "red"},
                                            {x: `${datosGrafica.novendido} no vendido`, y: 0 + datosGrafica.novendido, color: "yellow"}
                                        ] }
                                    />
                                    <XAxis style={{
                                             line: {stroke: "0c0c9e"},
                                             ticks: {stroke: '#ADDDE1'},
                                             text: {stroke: 'none', fill: '#ff4f00', fontWeight: 600}
                                             } }
                                             marginTop={ 20 }
                                             marginLeft={40}/>
                                    <YAxis style={{
                                             line: {stroke: "0c0c9e"},
                                             ticks: {stroke: '#ADDDE1'},
                                             text: { stroke: '#0c0c9e', fill: '#0c0c9e', fontWeight: 600 }
                                        } }
                                             marginLeft={ 35 }
                                             marginRight={ 0 }
                                             className={'ml-2'}/>
                                </XYPlot>

                                
                            </React.Fragment>
                        ): null }
                    </div>
                    <div className="form-group has-feedback my-1 ml-3 text-center font-weight-bold w-50">
                        <label htmlFor="last_name" className="font-weight-bold text-center">Precio Promedio</label>
                        { datosPromedio ? (
                            <div className="text-center ">
                                <h3>
                                    { 'Q.' + datosPromedio.promedio}
                                </h3>
                            </div>
                        ): null }
                        <label htmlFor="last_name" className="font-weight-bold text-center mt-5">Productos Activos</label>
                        { datosPromedio ? (
                            <div className="text-center ">
                                <h3>
                                    { datosPromedio.noproductos}
                                </h3>
                            </div>
                        ): null }
                    </div>
                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'reporteForm', // a unique identifier for this form
})(ReporteListar);