/**
 * This schema represents the users profile schema
 * @author {{app_author}}
 * @since {{app_date}}
 */
import { Schema } from 'mongoose';
// import database from '../database';
import mongoose from 'mongoose';

const user = new Schema({
	name: String,
	email: String,
	password: String,
	deletedOn: Date,
	createdOn: Date,
	updatedOn: Date,
});

const User = mongoose.model('User', user);
export default User;