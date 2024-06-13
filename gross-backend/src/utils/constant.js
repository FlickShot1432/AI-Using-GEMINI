const STATUS_CODES = {
	CREATED: 201,
	SUCCESS: 200,
	REDIRECT: 302,
	BAD_REQUEST: 400,
	UN_AUTHORIZED: 401,
	NOT_FOUND: 404,
	SERVER_ERROR: 500
}

const TYPES = {
	SUCCESS: 'success',
	ERROR: 'error'
}

const PAYLOAD_TYPES = {
	TEXT_WITH_IMG: 'text_with_img',
	ONLY_IMG: 'only_img',
	ONLY_TEXT: 'only_text'
}

const MODEL_TYPES = {
	[PAYLOAD_TYPES.ONLY_IMG]: 'gemini-1.5-flash',
	[PAYLOAD_TYPES.TEXT_WITH_IMG]: 'gemini-1.5-flash',
	[PAYLOAD_TYPES.ONLY_TEXT]: 'gemini-1.0-pro',
	'': 'gemini-1.0-pro'
}

const SERVER_ERROR = 'Something went wrong.'
const UN_AUTHORIZED_USER = 'Unauthorized user.'

export { STATUS_CODES, TYPES, SERVER_ERROR, MODEL_TYPES, UN_AUTHORIZED_USER, PAYLOAD_TYPES }