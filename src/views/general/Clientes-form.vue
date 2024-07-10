<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 mt-5">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5>{{ idCliente != "" ? 'Editar registro': 'Guardar registro' }}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6">
                                <label for="nombre" class="form-label">Nombre :</label>
                                <input type="text" class="form-control" id="nombre" v-model="formulario.nombre">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="apellido" class="form-label">Apellido :</label>
                                <input type="text" class="form-control" id="apellido" v-model="formulario.apellido">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="identificacion" class="form-label">Identificacion :</label>
                                <input type="text" class="form-control" id="identificacion"
                                    v-model="formulario.identificacion">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="col-12 text-end">
                            <RouterLink to="/clientes" type="button" class="btn btn-danger me-3">Cancelar
                            </RouterLink>
                            <button type="button" class="btn" :class="idCliente != ''? 'btn-warning': 'btn-success'" @click="guardar()">{{ idCliente != "" ? 'Editar' : 'Guardar' }}</button>
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
import { store, show, update } from '../services/clientesService';
import { RouterLink, useRouter } from 'vue-router';

export default {
    setup() {
        const formulario = ref({});
        const router = useRouter();
        let mensajeExitoso = "";
        let mensajeError = "";
        const idCliente = router.currentRoute.value.params.idCliente;
        onMounted(() => {
            if (idCliente != "") {
                verRegistro();
            }
          
        })
        const guardar = async () => {
            try {
                if (idCliente != "") {
                    const {data} = await update(idCliente, formulario.value);
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
                guardarCliente();
                
            } catch (error) {
                if (error.response.status == 422) {
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
        const guardarCliente = () => {
            router.push({ path: '/clientes' })
        }
        const verRegistro = async () => {
            try {
                const { data } = await show(idCliente);
                formulario.value = {
                    nombre: data.datos.nombre,
                    apellido: data.datos.apellido,
                    identificacion: data.datos.identificacion,
                }
            } catch (error) {
                console.log(error);
            }
        }
        return {
            formulario,
            guardar,
            guardarCliente,
            idCliente
        }
    }
}
</script>
<style>
    
</style>