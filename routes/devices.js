import express from 'express';
import MobilePhone from '../models/device.js';

const router = express.Router();

router.get('/:brand?', async (req, res) => {
  try {
    const query = req.params.brand ? { brand: req.params.brand } : {};
    const mobilephones = await MobilePhone.find(query);
    res.status(200).json({ message: 'ok', mobilephones });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const mobilephone = new MobilePhone({
      brand: req.body.brand,
      model: req.body.model
    });
    const currentMobilePhone = await mobilephone.save();
    res.status(201).json({
      message: 'created',
      mobilephone: currentMobilePhone,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
});

router.put('/:_id', async (req, res) => {
  try {
    const currentMobilePhone = await MobilePhone.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!currentMobilePhone) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({
      message: 'updated',
      mobilephone: currentMobilePhone
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
});

router.delete('/:_id', async (req, res) => {
  try {
    const currentMobilePhone = await MobilePhone.findByIdAndDelete(req.params._id);
    if (!currentMobilePhone) {
      return res.status(404).json({ message: 'Device not found' });
    }
    res.status(200).json({
      message: 'deleted',
      mobilephone: currentMobilePhone
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error' });
  }
});

export default router;