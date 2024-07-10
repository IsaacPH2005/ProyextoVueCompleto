<template>
    <div class="container">
            <div class="col-12 mt-5">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title">Clientes</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-4">
                            <div class="col-8">
                                <input type="text" class="form-control">
                            </div>
                            <div class="col-4">
                                <button type="button" class="btn btn-success"  @click="agregar()">Agregar</button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover table-striped">
                                        <thead>
                                            <tr>
                                                <th>Item</th>
                                                <th># Id</th>
                                                <th>Nombre</th>
                                                <th>Apellido</th>
                                                <th>Identificacion</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, index) in datos" :key="item.id">
                                                <td>{{index + 1}}</td>
                                                <td>{{item.id}}</td>
                                                <td>{{item.nombre}}</td>
                                                <td>{{item.apellido}}</td>
                                                <td>{{item.identificacion}}</td>
                                                <td><span class="badge" :class="item.estado == 1 ? 'bg-success' : 'bg-danger'">{{item.estado == 1 ? 'Activo' : 'Inactivo'}}</span></td>
                                                <td>
                                                    <div class="btn-group">
                                                        <button type="button" @click="estado(item.id)" class="btn btn-sm" :class="item.estado == 1 ? 'btn-danger' : 'btn-success'">{{item.estado ? '🔴' : '🟢'}}</button>
                                                        <!-- <button type="button" class="btn btn-danger btn-sm" v-show="item.estado != 1">Eliminar</button> -->
                                                        <button type="button" class="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="mostrar(item.id)">✏</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item" :class="{ 'disabled' : paginacion2.pagina <= 1}">
                                            <button type="button" class="page-link" aria-label="Previous"
                                                @click="paginaPrev()">
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item" :class="{'active' : item == paginacion2.pagina}" v-for="item in paginacion2.total"><button type="button" class="page-link" @click="paginaCambio(item)">{{item}}</button>
                                        </li>
                                        <li class="page-item"
                                            :class="{ 'disabled' : paginacion2.pagina >= paginacion2.total}">
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
           <!--  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">{{posicion == null ? 'Agregar registro' : 'Editar registro'}}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12">
                            <label for="nombre">Nombre :</label>
                            <input type="text" class="form-control" id="nombre" v-model="dato.nombre">
                            <label for="apellido">Apellido :</label>
                            <input type="text" class="form-control" id="apellido"  v-model="dato.apellido">
                            <label for="Identificacion">Identificacion :</label>
                            <input type="text" class="form-control" id="Identificacion" v-model="dato.identificacion">
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn btn-warning" @click="editar()" >Editar</button>
                    </div>
                  </div>
                </div>
              </div>  -->
    
        </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
import { index, changeStatus, show, update } from '../services/clientesService';
export default {
    setup() {
        const router = useRouter();
        const datos = ref([]);
        const posicion = ref(null);
        const paginacion2 = ref({
            total: null,
            pagina: 1
        });
        const dato = ref({});
        let modal = null;
        let instanciaModal = null;
        onMounted(() => {
            listar();
        })
        const listar = async ()=>{
            try {
                const {data} = await index(paginacion2.value.pagina)
                datos.value = data.datos.data;
                paginacion2.value.total = data.datos.last_page
            } catch (error) {
                console.log(error);
            }
        }
        const paginaPrev = () => {
            paginacion2.value.pagina--;
            listar();
        }
        const paginaNext = () => {
            paginacion2.value.pagina++;
            listar();
        }
        const paginaCambio = param => {
            paginacion2.value.pagina = param;
            listar();
        }
        const agregar = () => {
            router.push({ path: '/cliente-formulario' });
        }
        const estado = async (param) => {
            try {
                const { data } = await changeStatus(param)
                listar()
            } catch (error) {
                console.log(error);
            }
        }
       /*  const mostrar = async (param) => {
           
           try {
               const { data } = await show(param);
               console.log(data);
               dato.value.nombre = data.datos.nombre,
                   dato.value.apellido = data.datos.apellido,
                   dato.value.identificacion = data.datos.identificacion,
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
                    position: "top-center",
                    icon: "success",
                    title: mensaje,
                    showConfirmButton: false,
                    timer: 1500
                });
                instanciaModal.hide();
                listar();
              
            } catch (error) {
                console.log(error);
            }
        } */
        const mostrar = (param)=>{
            router.push({path: `/cliente-formulario/${param}`})
        }
        return{
            paginacion2,
            datos,
            paginaPrev,
            paginaNext,
            paginaCambio,
            agregar,
            estado,
           /*  mostrar, */
           mostrar,
            dato,
            posicion,
            /* editar */
        }
    }
}
</script>
<style>
    
</style>