/**
 *  path : api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateSingUp } = require('../middlewares/validate');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

// api/auth/new
//url , middleware , controller 
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateSingUp
], createUser);

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateSingUp
], loginUser);

router.get('/renew', [validateJWT], renewToken);

module.exports = router;