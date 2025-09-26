import { DocumentData, QueryDocumentSnapshot, WhereFilterOp } from 'firebase/firestore'

export interface QueryOptions {
	conditions?: { field: string; operator: WhereFilterOp; value: any }[]
	orderByField?: string
	orderDirection?: 'asc' | 'desc'
	limitCount?: number
	startAfterDoc?: QueryDocumentSnapshot<DocumentData> | null
	endBeforeDoc?: QueryDocumentSnapshot<DocumentData> | null
}

export interface PaginationResult<T> {
	data: T[]
	lastVisible: QueryDocumentSnapshot<DocumentData> | null
	firstVisible: QueryDocumentSnapshot<DocumentData> | null
	hasNext: boolean
	hasPrev: boolean
}
