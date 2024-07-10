import { urlBase, http } from "./Http";
export const index =  (objeto) => {
    return http().post(`${urlBase}ventas`, objeto)
}
export const mostrar = (page)=>{
    return http().get(`${urlBase}ventas?page=${page}`)
}
export const datosDetalle = (param)=>{
    return http().get(`${urlBase}ventas/${param}`)
}
export const estado = (id) =>{
    return http().delete(`${urlBase}ventas/${id}`)
}