import { addDataDao, getDataDao } from "../database";
import { DataType } from "../types/types";

export async function addDataRepository(data: DataType): Promise<string> {
    return new Promise((resolve, reject) => {

        if (data.name.trim() === "") {
            resolve("Introduza o seu nome")
        } else if (data.email.trim() === "") {
            resolve("Introduza o seu email")
        } else if (data.phone.trim() === "0") {
            resolve("Introduza o contacto")
        } else if (data.address.trim() === "0") {
            resolve("Introduza o seu endereço")
        } else {
            addDataDao(data)
                .then((response) => {
                    data.id = response
                    resolve(response)
                })
                .catch(() => {
                    reject('')
                })
        }
    })
}

export function getDataRepository(id:string): Promise<DataType | string>{
    return new Promise((resolve, reject) => {
        getDataDao(id)
        .then((response)=>{
            resolve(response)
        })
        .catch((response)=>{
            reject(response)
        })
    })
}
