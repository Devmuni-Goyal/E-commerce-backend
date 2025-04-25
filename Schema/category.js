import { Schema } from 'mongoose';

import mongoose from 'mongoose';

const category = new Schema({
    userRef: Schema.Types.ObjectId,
    name: String,
    deletedOn: Date,
    createdOn: Date,
    updatedOn: Date,
});

const Category = mongoose.model('Category', category);
export default Category;