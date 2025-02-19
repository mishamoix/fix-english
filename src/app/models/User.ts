import mongoose from 'mongoose';
import toJSON from './plugins/toJSON';

// USER SCHEMA
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
			lowercase: true,
			private: true,
		},
		isBlocked: {
			type: Boolean,
			default: false,
		},
		numberOfRequests: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
	}
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model('User', userSchema);
