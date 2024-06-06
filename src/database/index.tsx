import { db } from "../config/firebase";
import { DataType } from "../types/types"
import { collection, addDoc, updateDoc, getDoc, doc } from "firebase/firestore";

export async function addDataDao(data: DataType): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, "data"), data)
        await updateDoc(docRef, { id: docRef.id });

        return docRef.id;
    } catch (error) {
        console.error("Erro ao salvar documento: ", error);
        throw new Error("Erro ao salvar documento");
    }
}
export async function getDataDao(id: string): Promise<DataType | string> {
    try {
        const docSnap = await getDoc(doc(db, "data", id));

        if (docSnap.exists()) {            
            return docSnap.data() as DataType;
        } else {
            console.log("Nenhum documento encontrado com o ID fornecido");
            return 'Nenhum documento encontrado com o ID fornecido';
        }
    } catch (error) {
        console.error("Erro ao obter documento: ", error);
        throw new Error("Erro ao obter documento");
    }
}