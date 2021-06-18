var express = require('express');
var nedb = require('nedb');
var expressNedbRest = require('express-nedb-rest');

// setup express app
var oApp = express();

// create  NEDB datastore
var datastore = new nedb({filename: __dirname + '/data/banco.dat', autoload: true});

// buscar si existe registro
datastore.find({ rut: '13049587-7' }, function (err, docs) {

    //si no existe registro, crearlo
    if ( docs.length < 1) {
       
        datastore.insert(
            {
                activo: true,
                rut: "13049587-7",
                nombre: "Daniel Roa Petrasic",
                telefono: "+56940135096",
                correo: "danielroapetrasic@gmail.com",
                numCuenta: "111-11111-111",
                password: "123",
                monto: "1000000",
                movimientos: [{
                        destinatario: {
                            activo: true,
                            nombre: "Carlos Menem",
                            rut: "19901163-4",
                            correo: "carlos@gmail,com",
                            telefono: "123456789",
                            cuenta: [{
                                activo: true,
                                banco: "Banco Desarrollo",
                                tipo: "vista",
                                numCuenta: "222-22222-222",
                                transaccion: [{
                                    egresoIngreso: "egreso",
                                    monto: "500"
                                }]
                            }]
                        }
                    },
                    {
                        destinatario: {
                            activo: true,
                            nombre: "Cecilia Bolocco",
                            rut: "6926419-0",
                            correo: "cecilia@gmail.com",
                            telefono: "123456789",
                            cuenta: [{
                                activo: true,
                                banco: "Banco Desarrollo",
                                tipo: "vista",
                                numCuenta: "222-22222-222",
                                transaccion: [{
                                    egresoIngreso: "ingreso",
                                    monto: "10000"
                                }]
                            }]
                        }
                    }
                ]
            }, function(err, record) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(record);
        
        });
    }

  });

// create rest api router and connect it to datastore  
var restApi = expressNedbRest();
restApi.addDatastore('banco', datastore);

// setup express server to serve rest service
oApp.use('/', restApi);

oApp.listen(9090, function () {
    console.log('you may use nedb rest api at port 9090');
});

/* https://www.npmjs.com/package/express-nedb-rest */