import mongoose from 'mongoose'

const { Schema, model, ObjectId } = mongoose

const File = new Schema({
    name: { type: String, required: true },
    type: {type: String, required: true},
    access_link: { type: String },
    size: { type: Number, default: 0 },
    path: { type: String, default: '' },
    user: { type: ObjectId, ref: 'User' },
    parent: { type: ObjectId, ref: 'File' },
    child: [{ type: ObjectId, ref: 'File' }],
})

export default model('File', File)
