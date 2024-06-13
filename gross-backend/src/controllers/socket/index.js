import { GoogleGenerativeAI } from "@google/generative-ai";
import { Server } from "socket.io";
import dotenv from 'dotenv'
import GeneratedText from "../../models/generatedTextHistory/index.js"
import Helper from '../../utils/helper.js'
import { serverError } from '../../utils/functions.js'
import { MODEL_TYPES } from "../../utils/constant.js";


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

class GenerateTextController {
    constructor() {
        dotenv.config()
    }

    getReadImagesWithChunk = async (res, images = []) => {
        if (!images.length) return []
        try {
            let chunks = []
            for (const file of images) {
                const mimeType = Helper.getMimeType(file.path)
                const part = await Helper.fileToGenerativePart(file.path, mimeType);
                chunks.push(part)
            }
            return chunks
        } catch (error) {
            return serverError(error, res)
        }
    }

    generateText = async (req, res) => {
        try {
            const { prompt } = req.body;

            const payload = {
                ...req.body
            }
            if (req.files && req.files?.length) {
                payload['images'] = req.files
            }

            const payload_type = Helper.payloadTypes(payload)
            const model = genAI.getGenerativeModel({ model: MODEL_TYPES[payload_type] });
            const chunkData = await this.getReadImagesWithChunk(res, req.files)
            const result = await model.generateContent([prompt || '', ...chunkData]);

            const response = result.response;
            const generatedText = response.text();
            // Store the generated text in the database
            const newGeneratedText = new GeneratedText({
                inputText: prompt,
                generatedText,
            });
            await newGeneratedText.save();

            return res.status(200).json({
                data: generatedText
            })



            // Check if any image files were uploaded
            // if (imageFiles.length > 0) {
            //     // Process uploaded images
            //     const imageParts = [];
            //     for (const file of imageFiles) {
            //         try {
            //             const mimeType = Helper.getMimeType(file.path)
            //             const part = await Helper.fileToGenerativePart(file.path, mimeType);
            //             imageParts.push(part);
            //         } catch (error) {
            //             console.error(`Error reading image: ${file.filename}`, error);
            //             res.status(400).json({ error: 'Failed to read image file' });
            //             return;
            //         }
            //     }

            //     //!Generate text with images
            //     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
            //     try {
            //         const result = await model.generateContent([prompt || '', ...imageParts]);
            //         const response = await result.response;
            //         const generatedText = response.text();

            //         // Store the generated text in the database
            //         const newGeneratedText = new GeneratedText({
            //             inputText: prompt,
            //             generatedText,
            //         });
            //         await newGeneratedText.save();
            //         // Broadcast the generated text to all connected clients
            //         // io.emit('newText', newGeneratedText);

            //         res.send(generatedText);
            //     } catch (error) {
            //         console.error(error);
            //     }
            // } else {
            //     //!Generate text without images
            //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            //     try {
            //         const result = await model.generateContent([prompt]);
            //         const response = await result.response;
            //         const generatedText = response.text();

            //         // Store the generated text in the database
            //         const newGeneratedText = new GeneratedText({
            //             inputText: prompt,
            //             generatedText,
            //         });
            //         await newGeneratedText.save();
            //         // Broadcast the generated text to all connected clients
            //         // io.emit('newText', newGeneratedText);

            //         res.send(generatedText);
            //     } catch (error) {
            //         console.error(error);
            //         res.status(500).json({ error: 'Failed to generate text' });
            //     }
            // }
        } catch (error) {
            serverError(error, res)
        }
    }
}
export default new GenerateTextController()

