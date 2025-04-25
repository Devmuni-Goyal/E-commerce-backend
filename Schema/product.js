import { Schema } from 'mongoose';

import mongoose from 'mongoose';

const product = new Schema({
    userRef: Schema.Types.ObjectId,
    categoryRef:Schema.Types.ObjectId,
    subCategoryRef:Schema.Types.ObjectId,
    name: String,
    productcode:Number,
    description:String,
    deletedOn: Date,
    createdOn: Date,
    updatedOn: Date,
});

const Product = mongoose.model('Product', product);
export default Product;