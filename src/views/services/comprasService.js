import { urlBase, http } from "./Http";
export const detatalleModal =  (objeto) => {
    return http().post(`${urlBase}compras`, objeto)
}
export const mostrar = (page)=>{
    return http().get(`${urlBase}compras?page=${page}`)
}
export const datosDetalle = (param)=>{
    return http().get(`${urlBase}compras/${param}`)
}
export const estado = (id) =>{
    return http().delete(`${urlBase}compras/${id}`)
}
