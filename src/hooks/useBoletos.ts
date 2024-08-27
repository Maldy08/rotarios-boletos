import { useEffect, useState } from "react";
import { FirebaseDB, FirebaseStorage } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Boleto } from "../models/boletos";
import { boletosCollectionFirebase } from "../firebase/collections";

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
    };
    getBoletos();
  }, []);

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
        console.log("Boleto saved");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const editBoletos = async (boletos: Boleto, file: File) => {
    let docRef: any;
    let publicImageUrl: string;
    const q = query(boletosCollectionFirebase, where("id", "==", boletos.id));
    const boleto = await getDocs(q);
    boleto.forEach((doc) => {
      docRef = doc.id;
    });

    if (boletos.paymentReceipt.length > 0) {
      const storageRef = ref(FirebaseStorage, `receipts/${boletos.id}`);
      await uploadBytes(storageRef, file);
      publicImageUrl = await getDownloadURL(storageRef);
      boletos.paymentReceipt = publicImageUrl;
    } else {
      publicImageUrl = boletos.paymentReceipt;
    }

    const boletoRef = doc(FirebaseDB, "boletos", docRef);
    await updateDoc(boletoRef, { ...boletos })
      .then(() => {
        console.log("Boleto edited");
      })
      .catch((error) => {
        console.error("Error editing document: ", error);
      });
  };

  return {
    saveBoletos,
    boletosCollection,
    editBoletos,
  };
};
