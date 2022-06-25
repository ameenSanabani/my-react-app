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
router
  .route('/:editid')
  .delete(protact, deleteVistor)
  .put(protact, updateVistor);

module.exports = router;
