import { collection, doc, DocumentData, runTransaction, writeBatch } from 'firebase/firestore'
import { db } from 'firebaseConfig'

// Create a new document
export const createDocument = async () => {}

// Get a single document by ID
export const getDocument = async () => {}

// Get documents with query options
export const getDocuments = async () => {}

// Update a document
export const updateDocument = async () => {}

// Delete a document
export const deleteDocument = async () => {}

// Run a transaction
export const runFirestoreTransaction = async <T>(transactionHandler: (transaction: any) => Promise<T>): Promise<T> => {
	try {
		return await runTransaction(db, transactionHandler)
	} catch (error) {
		throw new Error(`Error executing transaction: ${error}`)
	}
}
// Execute a batch operation
export const executeBatch = async (
	operations: Array<{
		type: 'create' | 'update' | 'delete'
		collection: string
		data?: DocumentData
		id?: string
		updates?: DocumentData
	}>
): Promise<boolean> => {
	try {
		const batch = writeBatch(db)

		operations.forEach((op) => {
			if (op.type === 'create' && op.data) {
				const docRef = doc(collection(db, op.collection))
				batch.set(docRef, {
					...op.data,
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				})
			} else if (op.type === 'update' && op.id && op.updates) {
				const docRef = doc(db, op.collection, op.id)
				batch.update(docRef, {
					...op.updates,
					updatedAt: new Date().toISOString(),
				})
			} else if (op.type === 'delete' && op.id) {
				const docRef = doc(db, op.collection, op.id)
				batch.delete(docRef)
			}
		})

		await batch.commit()
		return true
	} catch (error) {
		throw new Error(`Error executing batch: ${error}`)
	}
}
// Firestore service object
export const firestoreService = {
	create: createDocument,
	get: getDocument,
	getAll: getDocuments,
	update: updateDocument,
	delete: deleteDocument,
	transaction: runFirestoreTransaction,
	batch: executeBatch,
}
