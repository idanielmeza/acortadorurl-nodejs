const {Router} = require('express');
const {acortarURL, redireccionar} = require('../controllers/acortador')

const router = Router();

router.post('/api', acortarURL);
router.get('/:id', redireccionar);


module.exports = router;