import { addDoc, collection, doc, getDoc, getDocs } from "firebase/firestore"
import { FirebaseAdapter } from "./firebase.adapter"
import { FirebaseDB } from "../../firebase/config"


export class FirebaseAdapterImplementation extends FirebaseAdapter {
    async get<T>(path: string): Promise<T> {
        const docRef = doc(FirebaseDB,path)
        const docSnap = await getDoc(docRef)
        if ( docSnap.exists() ) {
            return docSnap.data() as T
        }
        else {
            throw new Error('Document not found')
        }
        
    }

    async getAll<T>(path: string): Promise<T[]> {
        const collectionRef = collection(FirebaseDB, path);
        const querySnapshot = await getDocs(collectionRef);
        return querySnapshot.docs.map(doc => doc.data() as T);
    }

    async add<T>(path: string, data: T): Promise<void> {
        const collectionRef = collection(FirebaseDB, path);
        await addDoc(collectionRef, data);
    }

    async update<T>(path: string, data: T): Promise<void> {
      
    }
}