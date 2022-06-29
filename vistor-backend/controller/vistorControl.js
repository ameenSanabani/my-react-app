const asyncHandler = require('express-async-handler');

const Vistor = require('../moduls/vistors/vistorModul');
const UpdateVistor = require('../moduls/vistors/updateVistorModels');

const addVistor = asyncHandler(async (req, res) => {
  const { name, company, mobile, resone } = req.body;

  if (!name) {
    res.status(400);
    throw new Error('plase insert vistor name');
  }

  const vistorCreate = await Vistor.create({
    user: req.user._id,
    name,
    company,
    mobile,
    resone,
  });

  if (vistorCreate) {
    res.status(201).json(vistorCreate);
  }
});

const getVistors = asyncHandler(async (req, res) => {
  const vistors = await Vistor.find({});

  if (vistors) {
    res.status(200).json(vistors);
  } else {
    res.status(404);
    throw new Error('no vistor regaster');
  }
});

const deleteVistor = asyncHandler(async (req, res) => {
  const obj = [...req.params.editid.split(',')];

  const vistorsDels = await Vistor.find({ _id: { $in: obj } });

  await Vistor.deleteMany({ _id: { $in: obj } });

  await UpdateVistor.create({
    user: req.user._id,
    kind: 'delete',
    before: vistorsDels,
  });

  const vistors = await Vistor.find();

  res.status(200).json(vistors);
});

const updateVistor = asyncHandler(async (req, res) => {
  const { name, company, mobile, resone } = req.body;

  const vistor = await Vistor.findById(req.params.id);

  if (vistor.user.toString() === req.user._id.toString()) {
    const vistorUpd = {
      user: req.user._id,
      name,
      company,
      mobile,
      resone,
    };

    const updatedVistor = await Vistor.findByIdAndUpdate(
      req.params.id,
      vistorUpd,
      { new: true }
    );
    res.status(200).json(updatedVistor);

    await UpdateVistor.create({
      user: req.user._id,
      kind: 'update',
      before: vistor,
      after: updatedVistor,
    });
  } else {
    res.status(400);
    throw new Error('not authorized to update vistor');
  }
});

module.exports = {
  addVistor,
  getVistors,
  deleteVistor,
  updateVistor,
};
