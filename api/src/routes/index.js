const { Router } = require('express');
const axios = require ('axios');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require ("./countryRoute");
const activityRouter = require ("./activityRoute");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//Configuro a donde tiene que ir (middleware)
router.use('/countries', countryRouter) //Buscara su endpoint en countryRoute o activityRoute
router.use('/activities', activityRouter)


module.exports = router;
