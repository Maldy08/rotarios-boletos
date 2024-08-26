import { useEffect, useState } from "react";
import { FirebaseDB, FirebaseStorage } from '../firebase/config';
import { addDoc, collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Boleto } from "../models/boletos";


export const useBoletos = () => {

    const [boletosCollection, setBoletosCollection] = useState<Boleto[]>([]);

    useEffect(() => {
        const getBoletos = async () => {
            const querySnapshot = await getDocs(collection(FirebaseDB, "boletos"));
            const boletos: Boleto[] = [];
            querySnapshot.forEach((doc) => {
                boletos.push({ ...doc.data(), id: doc.id } as Boleto);
            });

            //order by id
            boletos.sort((a, b) => {
                return a.id.localeCompare(b.id);
            });

            setBoletosCollection(boletos);
        }
        getBoletos();
    }
        , []);


    const saveBoletos = async (boletos: Boleto, file: File) => {

        let paymentReceiptUrl: string;

        if (boletos.paymentReceipt.length > 0) {
            const storageRef = ref(FirebaseStorage, `receipts/${boletos.id}`);
            await uploadBytes(storageRef, file);
            paymentReceiptUrl = await getDownloadURL(storageRef);
            boletos.paymentReceipt = paymentReceiptUrl;
        }

        await addDoc(collection(FirebaseDB, "boletos"), boletos)
            .then(() => {
                console.log('Boleto saved');
            }
            ).catch((error) => {
                console.error('Error adding document: ', error);
            }
            );
    }

    return {
        saveBoletos,
        boletosCollection,
    }
}
