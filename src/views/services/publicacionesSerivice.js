import { urlBase, http } from "./Http";
export const index = (page)=>{
    return http().get(`${urlBase}publicaciones?page=${page}`)
}
export const postPubli =  (objeto) => {
    return http().post(`${urlBase}publicaciones`, objeto)
}
export const datosDetalle = (param)=>{
    return http().get(`${urlBase}publicaciones/${param}`)
}
export const cambiarEstado = (id) =>{
    return http().delete(`${urlBase}publicaciones/${id}`)
}
export const update = (id, formulario)=>{
    return http().put(`${urlBase}publicaciones/${id}`, formulario);
}