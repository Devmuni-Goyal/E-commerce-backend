import { Schema } from 'mongoose';

import mongoose from 'mongoose';

const subcategory = new Schema({
    userRef: Schema.Types.ObjectId,
    categoryRef:Schema.Types.ObjectId,
    name: String,
    deletedOn: Date,
    createdOn: Date,
    updatedOn: Date,
});

const Subcategory = mongoose.model('Subcategory', subcategory);
export default Subcategory;