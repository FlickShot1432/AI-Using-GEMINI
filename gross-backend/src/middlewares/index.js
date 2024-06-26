import dotenv from 'dotenv'
import multer from 'multer'
import { Types } from 'mongoose'
import { STATUS_CODES, TYPES, UN_AUTHORIZED_USER } from '../utils/constant.js'
import { response, serverError } from '../utils/functions.js'
import JWT from '../utils/jwt.js'
import User from '../models/user/index.js'

class MiddleWare {

	constructor() {
		dotenv.config()
	}

	isValidObjectId = (req, res, next) => {
		const { _id, form_id, attr_id } = req.params
		if (Types.ObjectId.isValid(_id || form_id || attr_id)) next()
		else
			res
				.status(STATUS_CODES.UN_AUTHORIZED)
				.json(response({ type: TYPES.ERROR, message: 'Invalid objectId.' }))
	}

	authentication = async (req, res, next) => {
		try {
			const { token } = req.headers
			if (!token)
				res
					.status(STATUS_CODES.UN_AUTHORIZED)
					.json(response({ type: TYPES.ERROR, message: 'Provide token.' }))
			else if (await JWT.tokenExpired(token))
				res
					.status(STATUS_CODES.UN_AUTHORIZED)
					.json(response({ type: TYPES.ERROR, message: 'Invalid token.' }))
			else next()
		} catch (error) {
			serverError(error, res)
		}
	}

	isAdmin = async (req, res, next) => {
		try {
			const { token } = req.headers
			const isAdmin = await JWT.handleAccess(token)

			if (!isAdmin)
				res.status(STATUS_CODES.UN_AUTHORIZED).json(
					response({
						type: TYPES.ERROR,
						message: UN_AUTHORIZED_USER
					})
				)
			else next()
		} catch (error) {
			serverError(error, res)
		}
	}

	isUser = async (req, res, next) => {
		try {
			const { token } = req.headers
			const isUser = await JWT.handleAccess(token, true)

			if (!isUser)
				res.status(STATUS_CODES.UN_AUTHORIZED).json(
					response({
						type: TYPES.ERROR,
						message: UN_AUTHORIZED_USER
					})
				)
			else next()
		} catch (error) {
			serverError(error, res)
		}
	}

	bothAreAccessible = async (req, res, next) => {
		try {
			const { token } = req.headers
			const { _id } = req.params

			const verifiedUser = await JWT.verifyUserToken(token)
			const findUser = await User.findById(verifiedUser?.user_id)

			if (verifiedUser?.role !== 'admin' && findUser?._id?.toString() !== _id)
				res.status(STATUS_CODES.UN_AUTHORIZED).json(
					response({
						type: TYPES.ERROR,
						message: UN_AUTHORIZED_USER
					})
				)
			else return next()
		} catch (error) {
			serverError(error, res)
		}
	}

	getAccessByUserId = async (req, res, next) => {
		try {
			const { token } = req.headers
			const { _id } = req.params

			const verifiedUser = await JWT.verifyUserToken(token)
			const findUser = await User.findById(verifiedUser?.user_id)

			if (findUser?._id?.toString() !== _id)
				res.status(STATUS_CODES.UN_AUTHORIZED).json(
					response({
						type: TYPES.ERROR,
						message: UN_AUTHORIZED_USER
					})
				)
			else return next()
		} catch (error) {
			serverError(error, res)
		}
	}
	upload = (req, res, next) => {
		try {
			const storage = multer.diskStorage({
				destination: function (req, file, cb) {
					cb(null, 'src/uploads/')
				},
				filename: function (req, file, cb) {
					cb(null, Date.now() + '-' + file.originalname)
				}
			})
			return multer({ storage })
		} catch (error) {
			serverError(error, res)
		}
	}

}
export default new MiddleWare()
