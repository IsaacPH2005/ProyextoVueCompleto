<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5 class="card-title">Ventas registrados</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-12 col-md-8 mt-3">
                        <input type="search" class="form-control" placeholder="Buscar...">
                    </div>
                    <div class="col-12 col-md-4 text-center mt-3">
                        <button type="button" class="btn btn-primary" @click="agregar()">Agregar</button>
                    </div>
                    <div class="col-12 col-sm-12 mt-4">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead class="table-primary">
                                    <tr>
                                        <th>Item</th>
                                        <th>Cliente</th>
                                        <th>Identificacion</th>
                                        <th>Total <span class="text-danger">(Compra)</span></th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, indice) in datos" :key="item.id">
                                        <td>{{ indice + 1 }}</td>
                                        <td>{{ item.clientes.nombre }} {{ item.clientes.apellido }}</td>
                                        <td>{{ item.clientes.identificacion }}</td>
                                        <td>{{ item.total }}</td>

                                        <td><span class="badge" :class="item.estado ? 'bg-success' : 'bg-danger'">{{
                                            item.estado ? 'Activo' : 'Inactivo' }}</span></td>
                                        <td>
                                            <div class="btn-group">
                                                <button class="btn btn-secondary btn-sm"
                                                    @click="verDetalle(item.id)">❕</button>
                                                <button type="button" class="btn btn-sm" :class="item.estado ? 'btn-danger' : 'btn-success'" @click="cambiarEstado(item.id)">{{ item.estado == 1 ? '🔴' : '🟢' }}</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                    <button type="button" class="page-link" aria-label="Previous" @click="paginaPrev()">
                                        <span aria-hidden="true">&laquo;</span>
                                    </button>
                                </li>
                                <li class="page-item" :class="{ 'active': item == paginacion.pagina }"
                                    v-for="item in paginacion.total"><button type="button" class="page-link"
                                        @click="paginaCambio(item)">{{ item }}</button>
                                </li>
                                <li class="page-item" :class="{ 'disabled': paginacion.pagina >= paginacion.total }">
                                    <button type="button" class="page-link" aria-label="Next" @click="paginaNext()">
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
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary-subtle">
                    <h1 class="modal-title fs-5" id="exampleModalLabel"><i class="fas fa-edit me-2"></i>Detalle de
                        compras</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="table-responsive">
                                <table class="table table-bordered table-striped table-hover" id="tabla5">
                                    <thead class="table-secondary">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Codigo</th>
                                            <th>Precio unitario</th>
                                            <th>Cantidad</th>
                                            <th>Sub total</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, indice) in dato.detalle_venta" :key="indice">
                                            <td>{{ item.producto.nombre }}</td>
                                            <td>{{ item.producto.codigo }}</td>
                                            <td>{{ item.precio_unitario }}</td>
                                            <td>{{ item.cantidad }} </td>
                                            <td>{{ item.total }}</td>
                                            <td>
                                                <button type="button" class="btn btn-danger btn-sm"
                                                    @click="removeCarrito(indice)">🗑</button>
                                            </td>
                                            <!-- <td>
                                              <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                                <button type="button" class="btn btn-danger btn-sm">-</button>
                                                <button type="button" class="btn btn-light btn-sm">1</button>
                                                <button type="button" class="btn btn-success btn-sm">+</button>
                                              </div>
                                            </td>
                                           
                                            <td>
                                              <div class="btn">
                                                <button data-bs-toggle="modal" data-bs-target="#exampleModal-editar-1" type="type"
                                                  class="btn btn-outline-danger btn-sm ">-</button>
                                              </div>
                                            </td> -->
                                        </tr>

                                    </tbody>
                                    <tfoot>
                                        <th colspan="4" class="text-center">TOTAL</th>
                                        <th class="text-end">{{ dato.total }}</th>
                                    </tfoot>
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
                                        <button type="button" class="page-link" aria-label="Next" @click="paginaNext()">
                                            <span aria-hidden="true">&raquo;</span>
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"><i
                            class="fas fa-close me-2"></i>Cerrar</button>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { Modal } from 'bootstrap';
import { useRouter } from 'vue-router';
import { estado, mostrar } from '../services/ventasService';
import { datosDetalle } from '../services/ventasService';
export default {
    setup() {
        const datos = ref([]);
        const paginacion = ref({
            total: null,
            pagina: 1
        });
        const dato = ref([])
        let modal = null;
        let instanciaModal = null;
        const router = useRouter();
        onMounted(() => {
            modal = document.getElementById('modal');
            instanciaModal = new Modal(modal);
            listar();
        })
        const listar = async () => {
            const { data } = await mostrar(paginacion.value.pagina);
            datos.value = data.datos.data
            paginacion.value.total = data.datos.last_page;
            
        }
        const cambiarEstado = async (param) => {
            try {
                const { data } = await estado(param)
                listar();
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
        const paginaCambio = (param) => {
            paginacion.value.pagina = param;
            listar();
        }
        const verDetalle = async (param) => {
            const { data } = await datosDetalle(param)
            dato.value = data.datos;
            abrirModal();
        }
        const abrirModal = () => {
            instanciaModal.show();
        }
        const agregar = () => {
            router.push({ path: '/ventas-formulario' })
        }
        return {
            datos,
            paginacion,
            dato,
            modal,
            paginaPrev,
            paginaNext,
            paginaCambio,
            verDetalle,
            abrirModal,
            agregar,
            cambiarEstado
        }
    }
}
</script>
<style></style>