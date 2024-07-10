<template>

    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 mt-5">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5>{{ idProveedor != '' ? 'Editar registro' : 'Agregar registro' }}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="form-label">Nombre :</label>
                                <input type="text" class="form-control" :class="{ 'border-danger': errors.nombre }"
                                    id="nombre" v-model="formulario.nombre">
                                <small class="text-danger" v-if="errors.nombre"><i class="fas fa-times me-1"></i> {{
                                    errors.nombre[0] }}</small>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="apellido" class="form-label">Apellido :</label>
                                <input type="text" class="form-control" :class="{ 'border-danger': errors.apellido }"
                                    id="apellido" v-model="formulario.apellido">
                                <small class="text-danger" v-if="errors.apellido"><i class="fas fa-times me-1"></i> {{
                                    errors.apellido[0] }}</small>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="identificacion" class="form-label">Identificacion :</label>
                                <input type="text" class="form-control"
                                    :class="{ 'border-danger': errors.identificacion }" id="identificacion"
                                    v-model="formulario.identificacion">
                                <small class="text-danger" v-if="errors.identificacion"><i
                                        class="fas fa-times me-1"></i> {{ errors.identificacion[0] }}</small>
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="Contacto" class="form-label">Contacto :</label>
                                <input type="text" class="form-control" :class="{ 'border-danger': errors.contacto }"
                                    id="Contacto" v-model="formulario.contacto">
                                <small class="text-danger" v-if="errors.contacto"><i class="fas fa-times me-1"></i> {{
                                    errors.contacto[0] }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="col-12 text-end">
                            <RouterLink to="/proveedores" type="button" class="btn btn-danger me-3">Cancelar
                            </RouterLink>
                            <button type="button" class="btn" :class="idProveedor != '' ? 'btn-warning': 'btn-success'" @click="guardar()">{{ idProveedor != '' ? 'Editar' : 'Guardar' }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { show, store, update } from '../services/proveedoresService';
import { RouterLink, useRouter } from 'vue-router';

export default {
    setup() {
        const formulario = ref({});
        const router = useRouter();
        let mensajeExitoso = "";
        let mensajeError = "";
        const errors = ref({});
        const idProveedor = router.currentRoute.value.params.idProveedor;  /* obtenemos el id al apretar el boton editar podemos obtener varios params */
        onMounted(() => {
            if(idProveedor != ""){
                verRegistro(); /* Se ejecuta automatico en el doom */
            }
            
        })
        const guardar = async () => {
            errors.value = {};
            try {
                if (idProveedor != "") {
                    const {data} = await update(idProveedor, formulario.value)
                    mensajeExitoso = data.mensaje
                } else {
                    const { data } = await store(formulario.value);
                    mensajeExitoso = data.mensaje
                }
                Swal.fire({
                        icon: "success",
                        title: "Correcto!",
                        text: mensajeExitoso,
                    });
                    guardarProveedor();

            } catch (error) {
                if (error.response.status == 422) {
                    errors.value = error.response.data.errors;
                    mensajeError = error.response.data.message
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: mensajeError,
                    });
                } else {
                    console.log(error);
                }
            }
        }
        const guardarProveedor = () => {
            router.push({ path: '/proveedores' })
        }
        const verRegistro = async () => {
            try {
                const { data } = await show(idProveedor);
                formulario.value = {
                    nombre: data.datos.nombre,
                    apellido: data.datos.apellido,
                    identificacion: data.datos.identificacion,
                    contacto: data.datos.contacto
                }
            } catch (error) {
                console.log(error);
            }
        }
        return {
            formulario,
            guardar,
            guardarProveedor,
            errors,
            idProveedor
        }
    }
}
</script>
<style></style>