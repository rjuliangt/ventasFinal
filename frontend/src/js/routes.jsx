import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { Login, Profile, Registro } from './common/components/LoginRegister';
import Demo from './common/components/Demo/Demo';
import Producto from './common/components/Producto/ProductoCrearContainer';
import Comprar from './common/components/Comprar/ComprarContainer';
import Catalogo from './common/components/Catalogo/CatalogoListarContainer';
import Inicio from './common/components/Inicio/Inicio';
import Reporte from './common/components/Reporte/ReporteContainer';
import ProductoListar from './common/components/Producto/ListarProductoContainer';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from './common/components/Examples/Grids';
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/inicio" component={Inicio} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/registro" component={Registro} />
                <Route exact path="/catalogo" component={Catalogo} />
                <Route exact path="/decatalogo/:id/comprar" component={Comprar} />
                <ProtectedRoute exact path="/" component={ Demo } />
                {/* Ruutas para ver, crear, actualizar y listar producto */}
                <ProtectedRoute exact path="/producto" component={ProductoListar} />
                <ProtectedRoute exact path="/producto/:id/ver" component={Producto} />
                <ProtectedRoute exact path="/producto/:id/editar" component={Producto} />
                <ProtectedRoute exact path="/producto/crear" component={ Producto } />
                
                {/* Ruutas para ver, crear, actualizar una compra */}
                {/* Rutas para reporteria */ }
                <ProtectedRoute exact path="/reporte" component={ Reporte } />
                
                {/* <ProtectedRoute exact path="/comprar" component={ProductoListar} />
                <ProtectedRoute exact path="/comprar/:id/ver" component={Comprar} />
                <ProtectedRoute exact path="/comprar/:id/editar" component={Comprar} />*/}
                <ProtectedRoute exact path="/comprar/crear" component={ Comprar } /> 
                
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute
                    exact
                    path="/user-profile"
                    component={Profile}
                />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute
                    exact
                    path="/notifications"
                    component={Notificaciones}
                />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />
                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
