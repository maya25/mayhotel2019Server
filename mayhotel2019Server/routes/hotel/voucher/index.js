const ctrl = require('../../../controllers/hotel/voucher');
const router = require('express').Router();
const {resError, resSuccess} = require("../../../consts");

router.post('/', async (req, res) => { 
  ctrl.addVoucher(req.body).then(order => resSuccess(res, order)).catch(err => resError(res, err));
});

router.delete('/:voucher_id', async (req, res) => { 
  ctrl.completeVoucher(req.params).then(order => resSuccess(res, order)).catch(err => resError(res, err));
});

module.exports = router;