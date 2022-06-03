const express = require('express');
const router = express.Router();
const {
  createUser,
  getMe,
  login,
  updatUser,
  logUsers,
} = require('../../controller/userControl');
const protact = require('../../middleWare/protcetMiddle');

router.route('/').get(protact, getMe).post(createUser);
router.post('/login', login);
router.put('/update', updatUser);
router.post('/:userId', logUsers);

module.exports = router;
