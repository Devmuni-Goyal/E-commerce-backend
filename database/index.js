import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		await mongoose.connect('mongodb+srv://devmunigoyal2:nVCG9n2ONawEjdwo@devmuni.inosbre.mongodb.net/?retryWrites=true&w=majority&appName=devmuni');
		console.log('Database connected');
	} catch (error) {
		console.log('Database not connected', error);
		process.exit(1);
	}
};
// connectDB();

// export default connectDB;