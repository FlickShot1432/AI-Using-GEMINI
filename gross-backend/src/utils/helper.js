import crypto from 'crypto'
import mongoose from 'mongoose'
import path from 'path';
import fs from 'fs';
import { PAYLOAD_TYPES } from './constant.js';

class Helper {

	allFieldsAreRequired = (data = []) => {
		if (!data?.length) return true
		const cloneData = [...data]
		return cloneData?.some(
			(fields) =>
				fields === undefined ||
				fields === '' ||
				String(fields).trim() === '' ||
				fields?.length === 0
		)
	}

	objectId = (id) => new mongoose.Types.ObjectId(id)

	uniqueId = (size) => {
		const MASK = 0x3d
		const LETTERS = 'abcdefghijklmnopqrstuvwxyz'
		const NUMBERS = '1234567890'
		const charset = `${NUMBERS}${LETTERS}${LETTERS.toUpperCase()}`.split('')
		const bytes = new Uint8Array(size)
		crypto.webcrypto.getRandomValues(bytes)
		return bytes.reduce((acc, byte) => `${acc}${charset[byte & MASK]}`, '')
	}

	removeField = (fields = [], body = {}) => {
		if (!Object.keys(body)?.length) return {}
		const cloneFields = [...fields]
		const filteredResponse = { ...body }
		cloneFields.forEach((data) => {
			if (data in body) {
				delete filteredResponse[data]
			}
		})
		return filteredResponse
	}

	getMimeType = (filePath) => {
		const mimeTypes = {
			'.png': 'image/png',
			'.jpeg': 'image/jpeg',
			'.webp': 'image/webp',
			'.jpg': 'image/jpg'
			// Add more MIME types as needed
		};
		const extension = path.extname(filePath).toLowerCase();
		return mimeTypes[extension] || 'application/octet-stream';
	}

	fileToGenerativePart = (filePath, mimeType) => {
		return new Promise((resolve, reject) => {
			fs.readFile(filePath, (err, data) => {
				if (err) {
					console.error(`Error reading image: ${filePath}`, err);
					reject(err);
				} else {
					resolve({
						inlineData: {
							data: data.toString("base64"),
							mimeType
						},
					});
				}
			});
		});
	}

	payloadTypes = (payload = {}) => {
		const clone = { ...payload }
		return clone.hasOwnProperty('prompt') && clone.hasOwnProperty('images') ?
			PAYLOAD_TYPES.TEXT_WITH_IMG : clone.hasOwnProperty('prompt') && !clone.hasOwnProperty('images') ?
				PAYLOAD_TYPES.ONLY_TEXT : !clone.hasOwnProperty('prompt') && clone.hasOwnProperty('images') ? PAYLOAD_TYPES.ONLY_IMG : ''
	}

}

export default new Helper()