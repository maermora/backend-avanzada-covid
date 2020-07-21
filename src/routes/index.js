const { Router } = require('express');
const router = Router();
const { getPacientes,
        getPacientesM,
        getPacientesF,
        login, 
        signup} = require('../controllers/index.controller');

router.get('/pacientes', getPacientes);
router.post('/login', login);
router.post('/signup',signup)
router.get('/pacientesM', getPacientesM);
router.get('/pacientes/mujeres', getPacientesF);

module.exports = router;