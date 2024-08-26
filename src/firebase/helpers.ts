import { collection, CollectionReference, DocumentData } from "firebase/firestore"
import { FirebaseDB } from "./config"


const createCollection = <T = DocumentData>(collectionName: string) => {
    return collection(FirebaseDB, collectionName) as CollectionReference<T>
  }

export { createCollection }