import { addDataDao, getDataDao, uploadImageDao } from "../database";
import { DataType } from "../types/types";

export async function addDataRepository(image: File, data: DataType): Promise<string> {
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
            uploadImageDao(image)
                .then(async imageUrl => {
                    if (imageUrl) {
                        data.image = imageUrl
                    }
                    addDataDao(data)
                        .then((response) => {
                            data.id = response
                            resolve(response)
                        })
                        .catch(() => {
                            reject('')
                        })
                })
                .catch(reject)
        }
    })
}

export function getDataRepository(id: string): Promise<DataType | string> {
    return new Promise((resolve, reject) => {
        getDataDao(id)
            .then((response) => {
                resolve(response)
            })
            .catch((response) => {
                reject(response)
            })
    })
}
