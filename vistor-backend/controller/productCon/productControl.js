const asyncHandler = require('express-async-handler');

const Product = require('../../moduls/product/productModel');
const ProductUpdated = require('../../moduls/product/productUpdate');

const addProduct = asyncHandler(async (req, res) => {
  const {
    product,
    category,
    brand,
    display,
    model,
    units,
    specialCode,
    barcode,
    explanation,
    content,
    documents,
  } = req.body;

  const exsistProduct = await Product.findOne({ product });

  if (exsistProduct) {
    res.status(400);
    throw new Error('product alrady exsist');
  } else {
    const allProduct = await Product.find({});
    const specOnly = allProduct.map((product) => product.specialCode);
    const spCode = specOnly.length > 0 ? Math.max(...specOnly) + 1 : 1;
    const newProduct = await Product.create({
      user: req.user._id,
      product,
      active: true,
      display,
      category,
      brand,
      model,
      units,
      specialCode: specialCode ? +specialCode : spCode,
      barcode: +barcode,
      explanation,
      content,
      documents,
    });

    res.status(201).json(newProduct);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { _id, data } = req.body;

  const product = await Product.findById(_id);

  if (product.active) {
    const updatedProduct = await Product.findByIdAndUpdate(_id, data, {
      new: true,
    });
    if (updatedProduct) {
      const allProduct = await Product.find({});
      res.status(200).json(allProduct);

      await ProductUpdated.create({
        user: req.user._id,
        kind: 'update',
        before: product,
        after: updatedProduct,
      });
    } else {
      res.status(400);
      throw new Error('no conniction try agin');
    }
  } else {
    res.status(400);
    throw new Error('no product active find');
  }
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productid);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400);
    throw new Error('no product exsist');
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  const allProduct = await Product.find({});

  if (allProduct) {
    res.status(200).json(allProduct);
  } else {
    res.status(400);
    throw new Error('no product exsist');
  }
});

module.exports = {
  addProduct,
  updateProduct,
  getProduct,
  getAllProduct,
};
