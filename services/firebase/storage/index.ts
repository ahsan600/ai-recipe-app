export interface UploadOptions {
	path: string
	file: Blob | Uint8Array | ArrayBuffer
	metadata?: any
}

export interface FileInfo {
	name: string
	fullPath: string
	size: number
	updated: string
	contentType: string
	downloadURL: string
}

// Upload a file
export const uploadFile = async () => {}

// Get download URL for a file
export const getFileURL = async () => {}

// Delete a file
export const deleteFile = async () => {}

// Storage service object
export const storageService = {
	upload: uploadFile,
	getURL: getFileURL,
	delete: deleteFile,
}
