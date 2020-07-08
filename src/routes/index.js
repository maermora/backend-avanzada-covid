const { Router } = require('express');
const router = Router();
const { getPacientes,
        getPacientesM,
        getPacientesF } = require('../controllers/index.controller');

router.get('/pacientes', getPacientes);
router.get('/pacientes/hombres', getPacientesM);
router.get('/pacientes/mujeres', getPacientesF);

module.exports = router;