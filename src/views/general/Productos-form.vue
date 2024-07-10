<template>
    <div class="container">
        <div class="row d-flex justify-content-center">
            <div class="col-12 col-md-10 mt-5">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                    <h5>{{idProducto != "" ? 'Editar registro' : "Agregar registro"}}</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                        <div class="col-12">
                            <label for="nombre">Nombre :</label>
                            <input type="text" class="form-control" id="nombre" v-model="formulario.nombre">
                        </div>
                        <div class="col-12">
                            <label for="codigo">Codigo :</label>
                            <input type="text" class="form-control" id="codigo" v-model="formulario.codigo">
                        </div>
                        <div class="col-12">
                            <label for="precioVenta">Precio <span class="text-danger">(Venta)</span></label>
                            <input type="text" class="form-control" id="precioVenta" v-model="formulario.precio_venta">
                        </div>
                        <div class="col-12">
                            <label for="precioCompra">Precio <span class="text-danger">(Compra)</span></label>
                            <input type="text" class="form-control" id="precioCompra" v-model="formulario.precio_compra"> 
                        </div>
                      </div>
                    </div>
                    <div class="card-footer">
                        <div class="col-12 text-end">
                            <RouterLink to="/productos" type="button" class="btn btn-danger me-3">Cancelar
                            </RouterLink>
                            <button type="button" class="btn" :class="idProducto != '' ? 'btn-warning': 'btn-success'" @click="guardar()">{{ idProducto != '' ? 'Editar' : 'Guardar' }} </button>
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
import { show, store, update } from '../services/productosService';
import { RouterLink, useRouter } from 'vue-router';
export default {
    setup() {
        const formulario = ref({})
        const router = useRouter();
        let mensajeExitoso = "";
        let mensajeError = "";
        const errors = ref({});
        const idProducto = router.currentRoute.value.params.idProducto; 
        onMounted(() => {
            if(idProducto != ""){
                verRegistro(); /* Se ejecuta automatico en el doom */
            }
            
        })
        const guardar = async () => {
            errors.value = {};
            try {
                if (idProducto != "") {
                    const {data} = await update(idProducto, formulario.value)
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
                    guardarProducto();

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
        const guardarProducto = () => {
            router.push({ path: '/productos' })
        }
        const verRegistro = async () => {
            try {
                const { data } = await show(idProducto);
                formulario.value.nombre = data.datos.nombre;
            formulario.value.codigo = data.datos.codigo;
            formulario.value.precio_compra = data.datos.precio_compra;
            formulario.value.precio_venta = data.datos.precio_venta
            } catch (error) {
                console.log(error);
            }
        }
        return{
            formulario,
            guardar,
            guardarProducto,
            errors,
            idProducto
        }
    }
}
</script>
<style>
    
</style>