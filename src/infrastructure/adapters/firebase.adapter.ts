

export abstract class FirebaseAdapter {
    abstract get<T>(path: string): Promise<T>
    abstract getAll<T>(path: string): Promise<T[]>
    abstract add<T>(path: string, data: T): Promise<void>
    abstract update<T>(path: string, data: T): Promise<void>
}