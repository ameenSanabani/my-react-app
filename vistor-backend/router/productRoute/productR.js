const express = require('express');
const router = express.Router();
const {
  addProduct,
  updateProduct,
  getProduct,
  getAllProduct,
} = require('../../controller/productCon/productControl');
const protact = require('../../middleWare/protcetMiddle');

router.route('/').post(protact, addProduct).get(getAllProduct);
router.put('/update', protact, updateProduct);
router.get('/:productid', getProduct);

module.exports = router;
