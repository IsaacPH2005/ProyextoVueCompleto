<template>
    <div class="col-12 col-md-6 mt-5">
        <div class="card">
            <div class="card-header bg-primary-subtle">
                <h5>Lista de productos</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover">
                            <thead class="table-primary-subtle">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Codigo</th>
                                    <th>Precio <span class="text-danger">{{tipoPrecio == 'compra' ? 'Compra' : 'Venta'}}</span></th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in datos" :key="item.id">
                                    <td>{{ item.nombre }}</td>
                                    <td>{{ item.codigo }}</td>
                                    <td>{{ item.precio_compra }}</td>
                                    <td>{{ item.cantidad }}</td>
                                    <td>
                                        <button type="button" class="btn btn-success"
                                            @click="tipoPrecio == 'compra' ? addCarritoCompras(item): addCarritoVentas(item)">➕</button>
                                       <!--  <button type="button" class="btn btn-danger" 
                                            @click="addCarritoVentas(item)">➕</button> -->
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
</template>
<script>
import Swal from 'sweetalert2';
/* import { productosActivos } from '@/components/ProductosActivos.vue'; */
import { onMounted, ref } from 'vue';
import { productosActivos } from '@/views/services/productosService';
import { usecarritostore, } from '@/stores/carrito';

export default {
    props: {tipoPrecio: {
        type: String,
        required: true
    }},
    setup(props) {
        const datos = ref([]);
        const paginacion = ref({
            total: null,
            pagina: 1,
        });
        const { carritoCompras, addCarritoCompras, addCarritoVentas } = usecarritostore();  /* pinia se mantiene manejo de estados */
       /*  const propiedades = defineProps({
            type: String ,
            required: true
           }) */ /* otra manera */
        onMounted(() => {
            listar()

        })
        const listar = async () => {
            try {
                const { data } = await productosActivos(paginacion.value.pagina);
                datos.value = data.datos.data
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
        return {
            datos,
            paginacion,
            paginaPrev,
            paginaNext,
            paginaCambio,
            addCarritoCompras,
            addCarritoVentas,
        }
    }
}
</script>
<style></style>