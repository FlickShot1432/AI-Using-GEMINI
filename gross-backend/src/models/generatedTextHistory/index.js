import mongoose, { Schema } from 'mongoose'

const generatedTextSchema = new Schema({
    inputText: String,
    generatedText: String,
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model("GeneratedText", generatedTextSchema)