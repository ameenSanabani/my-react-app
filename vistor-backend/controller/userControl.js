const User = require('../moduls/users/userModul');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHnadler = require('express-async-handler');

const LoginInfo = require('../moduls/users/loginInfo');
const UpdatedInfo = require('../moduls/users/updatedInfo');

const createUser = asyncHnadler(async (req, res) => {
  const { name, userId, password } = req.body;

  const user = await User.findOne({ userId });

  if (user) {
    res.status(400);
    throw new Error('user alrady exsist');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const userCreated = await User.create({
    name,
    userId,
    password: hashPassword,
    isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
    group: req.body.group ? req.body.group : 1,
  });

  if (userCreated) {
    res.status(201).json({
      _id: userCreated._id,
      name: userCreated.name,
      userId: userCreated.userId,
      active: userCreated.active,
      isAdmin: userCreated.isAdmin,
      group: userCreated.group,
      token: createToken(userCreated._id),
    });

    await LoginInfo.create({
      user: userCreated._id,
      name: userCreated.name,
      userId: userCreated.userId,
      active: userCreated.active,
    });
  } else {
    res.status(401);
    throw new Error('user not created try agin');
  }
});

const login = asyncHnadler(async (req, res) => {
  const { userId, password } = req.body;

  const user = await User.findOne({ userId });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.active) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        userId: user.userId,
        active: user.active,
        isAdmin: user.isAdmin,
        group: user.group,
        photo: user.photo,
        token: createToken(user._id),
      });

      await LoginInfo.create({
        user: user._id,
        name: user.name,
        userId: user.userId,
        active: user.active,
      });
    } else {
      res.status(402);
      throw new Error('user is not active contact adminstrator');
    }
  } else {
    res.status(400);
    throw new Error('user or bassword not correct');
  }
});

const updatUser = asyncHnadler(async (req, res) => {
  const { updateType, _id, data } = req.body;
  const user = await User.findById(_id);

  switch (updateType) {
    case 'CHANGE-Password':
      const { oldpass, newpass } = data;

      if (user && (await bcrypt.compare(oldpass, user.password))) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(newpass, salt);

        const changedUser = await User.findByIdAndUpdate(
          _id,
          { password: hashPass },
          { new: true }
        );
        res.status(200).json(changedUser);
      } else {
        res.status(400);
        throw new Error('old password not correct');
      }
      break;

    case 'UPDATE-FILED':
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(_id, data, {
          new: true,
        });

        if (updatedUser) {
          const allUsers = await User.find({});
          res.status(200).json(allUsers);
        } else {
          res.status(400);
          throw new Error('data you provied not correct try agin');
        }
      } else {
        res.status(400);
        throw new Error('_id not correct');
      }
      break;

    case 'USER-UPDATE':
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(_id, data, {
          new: true,
        });

        if (updatedUser) {
          res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            userId: updatedUser.userId,
            active: updatedUser.active,
            isAdmin: updatedUser.isAdmin,
            group: updatedUser.group,
            token: createToken(updatedUser._id),
          });

          await UpdatedInfo.create({
            user: req.user._id,
            pefore: user,
            after: updatedUser,
          });
        } else {
          res.status(400);
          throw new Error('data you provied not correct try agin');
        }
      } else {
        res.status(400);
        throw new Error('_id not correct');
      }
      break;

    case 'ADD-GROUP':
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { $push: { group: { $each: data } } },
          {
            new: true,
          }
        );

        if (updatedUser) {
          const allUsers = await User.find({});
          res.status(200).json(allUsers);

          await UpdatedInfo.create({
            user: req.user._id,
            pefore: user,
            after: updatedUser,
          });
        } else {
          res.status(400);
          throw new Error('data you provied not correct try agin');
        }
      } else {
        res.status(400);
        throw new Error('_id not correct');
      }
      break;

    case 'DELETE-GROUP':
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          _id,
          { $pull: { group: { $in: data } } },
          {
            new: true,
          }
        );

        if (updatedUser) {
          const allUsers = await User.find({});
          res.status(200).json(allUsers);

          await UpdatedInfo.create({
            user: req.user._id,
            pefore: user,
            after: updatedUser,
          });
        } else {
          res.status(400);
          throw new Error('data you provied not correct try agin');
        }
      } else {
        res.status(400);
        throw new Error('_id not correct');
      }
      break;

    case 'UPLOAD-IMAG':
      if (req.files === null) {
        res.status(400);
        throw new Error('No file to uplod');
      }

      const file = req.files.file;
      file.mv(
        `/Users/sanabani/Desktop/regaster-vistors/vistor-frontend/public/imags/${file.name}`,
        (err) => {
          if (err) {
            return res.status(500).json(err);
          }
          res.status(200).json({
            fileName: file.name,
            filePath: `/imags/${file.name}`,
          });
        }
      );
      break;

    default:
      return;
  }
});

const logUsers = asyncHnadler(async (req, res) => {
  const date = await LoginInfo.find({ user: req.params.userId });

  const lastLog = date.map((da) => da.createdAt).sort((a, b) => b - a);

  await LoginInfo.deleteOne({
    $and: [{ user: req.params.userId }, { createdAt: lastLog[2] }],
  });

  res.status(200).json(lastLog[1]);
});

const getMe = asyncHnadler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      userId: user.userId,
      active: user.active,
      isAdmin: user.isAdmin,
      group: user.group,
      token: createToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('bad data user');
  }
});

const getAll = asyncHnadler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error('no users found');
  }
});

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '15d' });
};

module.exports = {
  createUser,
  login,
  getMe,
  updatUser,
  logUsers,
  getAll,
};
