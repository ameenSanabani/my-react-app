const express = require('express');
const router = express.Router();
const {
  addVistor,
  getVistors,
  deleteVistor,
  updateVistor,
} = require('../../controller/vistorControl');
const protact = require('../../middleWare/protcetMiddle');

router.route('/').get(getVistors).post(protact, addVistor);
router.route('/:id').delete(deleteVistor).put(protact, updateVistor);

module.exports = router;
