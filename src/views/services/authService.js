import {urlBase, http} from './Http' /* ./ para laa misma carpeta */ /*  ../ para retroceder una carpeta  */
export const iniciarSesion = (data)=>{
    return http().post(`${urlBase}login`, data);
}
export const registroUsuario = (data)=>{
    return http().post(`${urlBase}usuario`, data);
}
export const cerrarSesion = () =>{
    return http().post(`${urlBase}logout`)
}

