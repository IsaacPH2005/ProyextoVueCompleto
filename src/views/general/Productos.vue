<template>
       <div class="container">
            <div class="row">
                <div class="col-12 mt-5">
                    <div class="card">
                        <div class="card-header bg-primary-subtle">
                            <h3 class="card-title">Productos</h3>
                        </div>
                        <div class="card-body">
                            <div class="row gy-3">
                                <div class="col-8">
                                    <input type="text" class="form-control">
                                </div>
                                <div class="col-4">
                                    <button type="button" class="btn btn-success" @click="agregar()">Agregar</button>
                                </div>
                                <div class="col-12">
                                    <div class="table-responsive">
                                        <table class="table table-hover table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Item</th>
                                                    <th>Codigo</th>
                                                    <th>Nombre</th>
                                                    <th>Cantidad</th>
                                                    <th>Precio <span class="text-danger">(Venta)</span></th>
                                                    <th>Precio <span class="text-danger">(Compra)</span></th>
                                                    <th>Estado</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(item, index) in datos" :key="item.id" >
                                                    <td>{{index + 1}}</td>
                                                    <td>{{item.codigo}}</td>
                                                    <td>{{item.nombre}}</td>
                                                    <td>{{item.cantidad}}</td>
                                                    <td>{{item.precio_venta}}</td>
                                                    <td>{{item.precio_compra}}</td>
                                                    <td><span class="badge" :class="item.estado == 1 ? 'bg-success' : 'bg-danger'">{{item.estado == 1 ? 'Activo' : 'Inactivo'}}</span></td>
                                                    <td>
                                                        <div class="btn-group">
                                                            <button type="button" class="btn btn-warning btn-sm" @click="mostrar(item.id)">✏</button>
                                                            <button type="button" class="btn" :class="item.estado ? 'btn-danger' : 'btn-success'" @click="estado(item.id)">{{item.estado == 1 ? '🔴' : '🟢'}}</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination">
                                            <li class="page-item" :class="{ 'disabled' : paginacion.pagina <= 1}">
                                                <button type="button" class="page-link" aria-label="Previous"
                                                    @click="paginaPrev()">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </button>
                                            </li>
                                            <li class="page-item" :class="{'active' : item == paginacion.pagina}" v-for="item in paginacion.total"><button type="button" class="page-link" @click="paginaCambio(item)">{{item}}</button>
                                            </li>
                                            <li class="page-item"
                                                :class="{ 'disabled' : paginacion.pagina >= paginacion.total}">
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
                            <input type="text" class="form-control" id="nombre" v-model="formulario.nombre">
                            <label for="codigo">Codigo :</label>
                            <input type="text" class="form-control" id="codigo" v-model="formulario.codigo">
                            <label for="precioVenta">Precio <span class="text-danger">(Venta)</span></label>
                            <input type="text" class="form-control" id="precioVenta" v-model="formulario.precio_venta">
                            <label for="precioCompra">Precio <span class="text-danger">(Compra)</span></label>
                            <input type="text" class="form-control" id="precioCompra" v-model="formulario.precio_compra"> 
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                      <button type="button" class="btn" :class="posicion == null ? 'btn-success' : 'btn-warning'" @click="guardar()">{{posicion == null ? "Guardar" : "Editar"}}</button>
                    </div>
                  </div>
                </div>
              </div> -->
   
</template>
<script>
import { onMounted, ref } from 'vue';
import { index, changeStatus } from '../services/productosService';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const datos = ref([]);
        const paginacion = ref({
            total: null,
            pagina: 1
        });
        const router = useRouter();
        onMounted(() => {
            listar()
        })
        const listar = async () => {
            const { data } = await index(paginacion.value.pagina)
            datos.value = data.datos.data;
            paginacion.value.total = data.datos.last_page
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
            router.push({ path: '/productos-form' });
        }
        const mostrar = (param)=>{
            router.push({path: `/productos-form/${param}`})
        }
        return {
            datos,
            paginacion,
            paginaPrev,
            paginaNext,
            paginaCambio,
            estado,
            agregar,
            mostrar
        }
    }
}
</script>
<style></style>