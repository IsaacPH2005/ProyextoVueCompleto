<template>

        <div class="container mt-4">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header bg-primary-subtle">
                            <h4 class="card-title">Proveedores</h4>
                        </div>
                        <div class="card-body">
                            <div class="row gy-4">
                                <div class="col-8">
                                    <input type="text" class="form-control">
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-primary" @click="agregar()">Agregar</button>
                                   <!--  <RouterLink type="button" class="btn btn-success" to="/proveedor-formulario">Agregar
                                    </RouterLink> -->
                                </div>
                                <div class="col-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-striped">
                                            <thead class="table table-secondary">
                                                <tr>
                                                    <th>Item</th>
                                                    <th># Id</th>
                                                    <th>Nombre</th>
                                                    <th>Apellido</th>
                                                    <th>Identificacion</th>
                                                    <th>Contacto</th>
                                                    <th>Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in datos" :key="item.id">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>{{ item.id }}</td>
                                                    <td>{{ item.nombre }}</td>
                                                    <td>{{ item.apellido }}</td>
                                                    <td>{{ item.identificacion }}</td>
                                                    <td>{{ item.contacto }}</td>
                                                    <td><span class="badge"
                                                            :class="item.estado == 1 ? 'bg-success' : 'bg-danger'">{{
                                                                item.estado
                                                                    == 1 ? 'Activo' : 'Inactivo' }}</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <button type="button" class="btn btn-warning btn-sm"
                                                                
                                                                @click="mostrar(item.id)">✏</button>
                                                            <button type="button" class="btn btn-sm"
                                                                :class="item.estado == 1 ? 'bg-danger' : 'bg-success'"
                                                                @click="estado(item.id)">{{ item.estado == 1 ? '🔴' :
                                                                    '🟢' }}</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                                v-for="item in paginacion.total"><button type="button" class="page-link"
                                                    @click="paginaCambio(item)">{{ item }}</button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                                <button type="button" class="page-link" aria-label="Next"
                                                    @click="paginaNext()">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar registro</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-12">
                                    <label for="nombre">Nombre :</label>
                                    <input type="text" class="form-control" id="nombre" v-model="dato.nombre">
                                    <label for="apellido">Apellido :</label>
                                    <input type="text" class="form-control" id="apellido" v-model="dato.apellido">
                                    <label for="Identificacion">Identificacion</label>
                                    <input type="text" class="form-control" id="Identificacion"
                                        v-model="dato.identificacion">
                                    <label for="contacto">Contacto</label>
                                    <input type="text" class="form-control" id="contacto" v-model="dato.contacto">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-warning" @click="editar(item.id)">Editar</button>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { changeStatus, index, show, update } from '@/views/services/proveedoresService'
import { RouterLink, useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

export default {
    setup() {
        const datos = ref([]);
        const dato = ref({});
        const paginacion = ref({
            total: null,
            pagina: 1
        });
        const posicion = ref(null);
        const router = useRouter();

        onMounted(() => {

            listar();

        })
        const listar = async () => {
            try {
                const { data } = await index(paginacion.value.pagina);
                datos.value = data.datos.data;
                paginacion.value.total = data.datos.last_page
            } catch (error) {
                console.log(error);
            }
        }
        const paginaPrev = () => {
            paginacion.value.pagina--;
            listar();
        }
        const paginaNext = () => {
            paginacion.value.pagina++;
            listar();
        }
        const paginaCambio = param => {
            paginacion.value.pagina = param;
            listar();
        }
        const estado =  (param) => {
            try {
                

                Swal.fire({
                    title: "Estas seguro?",
                    text: "Esta a punto de modificar el estado!",
                    icon: "warning", showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33", confirmButtonText: "Si, modificar!",
                    cancelButtonColor: 'No, cancelar'
                }).then( async (result) =>  {
                    if (result.isConfirmed) {
                        const { data } = await changeStatus(param);
                        listar()
                        Swal.fire({ title: "Bien!", text: data.mensaje, icon: "success" });
                    }
                });  
            } catch (error) {
                console.log(error);
            }
        }
        const agregar = () => {
            router.push({ path: '/proveedor-formulario' });
        }
     /*    const mostrar = async (param) => {

            try {
                const { data } = await show(param);
                console.log(data);
                dato.value.nombre = data.datos.nombre,
                    dato.value.apellido = data.datos.apellido,
                    dato.value.identificacion = data.datos.identificacion,
                    dato.value.contacto = data.datos.contacto
                posicion.value = param;
            } catch (error) {
                console.log(error);
            }
        } */
        /* const editar = async () => {
            let mensaje = "";
            try {
                const { data } = await update(posicion.value, dato.value)
                console.log(data);
                mensaje = data.mensaje
                Swal.fire({
                    icon: "success",
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 1500
                });

                listar();

            } catch (error) {
                console.log(error);
            }
        } */
        const mostrar = (param)=>{
            router.push({path: `/proveedor-formulario/${param}`})
        }
        return {
            datos,
            paginacion,
            paginaPrev,
            paginaNext,
            paginaCambio,
            estado,
            agregar,
            mostrar,
            dato,
           
            posicion

        }
    }
}
</script>
<style></style>