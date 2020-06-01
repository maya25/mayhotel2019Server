const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
// const User = require('./user');


// const OrderSchema = new Schema({
//   meal:       {type: ObjectId, ref : 'Meal', required: false},
//   user:       {type: String ,  ref : 'User', required: true},
//   at:         {type: Number, required: true} //INT -> YYYYMMDD
// });

// OrderSchema.pre('save', function(next){
//   User.findById(this.user).exec((err, user) => {
//     if(err) next(err);
//     if(!user) next(new Error("user_id not exists"));
//     next();
//   })
// });


const TableSchema = new Schema({
  hotel: { type: ObjectId, ref: 'Hotel', required: true },
  number: { type: Number, required: true, min: [1, 'table number illegal'] },
  seats: { type: Number, required: true, min: [1, 'at least 1 seat'] },
  curr_user: { type: String, ref: 'User', default: null },
  counter: { type: Number, default: 0 },
  orders: [{
    order: {
      type: ObjectId,
      ref: 'Order',
      required: true
    },
    _id: false
  }]
}, { collection: 'tables' });

TableSchema.index({ hotel: 1, number: 1 }, { unique: true }); //(hotel, number) = unique key

// TableSchema.pre('save', function (next) {
//   var table = this;

//   Hotel.findById(table.hotel).exec((err, hotel) => {
//     if (err) next(err);
//     if (!hotel) next(new Error("hotel id not exists"));
//     next();
//   })
// });

// TableSchema.statics.clearOrders = function (table_id) {
//   var Table = this;
//   return new Promise((resolve, reject) => {
//     Table.findById(table_id).then((table) => {
//       if (!table) reject(new Error(`table_id: ${table_id} not exists`));

//       table.orders = [];
//       table.save((e, table) => {
//         if (e) reject(new Error(e.message));

//         resolve(table);
//       })
//     }).catch(e => reject(new Error(e.message)));
//   });
// }


// var Table = (mongoose.models.Table) ? mongoose.model('Table') : mongoose.model('Table', TableSchema);
const Table = mongoose.model('Table', TableSchema);
module.exports = Table;
