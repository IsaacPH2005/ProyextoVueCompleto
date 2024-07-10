<template>
  <div class="container">
    <div class="row">
      <productosActivosVue tipoPrecio="venta"/>
      <div class="col-12 col-md-6 mt-5">
        <div class="card">
          <div class="card-header bg-primary-subtle">
            <h5>Carrito</h5>
          </div>
          <div class="card-body">
            <div class="text-start">
              <label for="proveedor" class="form-label"><b>Cliente</b></label>
            </div>
            <select class="form-select" aria-label="Default select example" id="selectProveedor" v-model="cliente">
              <option value="" selected>Seleccione</option>
              <option :value="item.id" v-for="(item, indice) in clientes" :key="item.id">{{ item.nombre }}</option>
            </select>
            <div class="col-12 col-sm-12 mt-4">
              <div class="table-responsive">
                <table class="table table-bordered table-striped table-hover" id="tabla5">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Codigo</th>
                      <th>Precio unitario</th>
                      <th>Cantidad</th>
                      <th>Precio total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, indice) in useStore.carritoVentas" :key="indice">
                      <td>{{ item.nombre }}</td>
                      <td>{{ item.codigo }}</td>
                      <td>{{ item.precio_unitario }}</td>
                      <!-- <td><input type="number" class="form-control form-control-sm" @change="modificarPrecio(indice)" ></td> -->
                      <td>
                        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                          <button type="button" class="btn btn-danger btn-sm" @click="decrementar(indice)">-</button>
                          <button type="button" class="btn btn-light btn-sm">{{ item.cantidad }}</button>
                          <button type="button" class="btn btn-success btn-sm" @click="incrementar(indice)">+</button>
                        </div>
                      </td>
                      <td>{{ item.precio_total }}</td>
                      <td>
                        <button type="button" class="btn btn-danger btn-sm" @click="useStore.eliminarCarritoVenta()">🗑</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row">
                <div class="col-5 offset-7 col-md-4 offset-md-8">
                  <label for="" class="form-label fs-5"><b>Total</b></label> 
                  <p class="text-end fs-3 fw-bold"> {{ useStore.totalCompras }} Bs.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      <div class="text-center mt-4">
        <button type="button" class="btn btn-danger me-2" @click="cancelar()">Cancelar</button>
        <button type="button" class="btn btn-success ma-2" @click="guardar()">agregar</button>
      </div>
    </div>
  </div>
</template>
<script>
import productosActivosVue from '@/components/ProductosActivos.vue'
import { clientesActivos } from '../services/clientesService';
import { onMounted, ref } from 'vue';
import { usecarritostore, } from '@/stores/carrito';
import { useRouter } from 'vue-router';
import { index } from '../services/ventasService';
import Swal from 'sweetalert2';
export default {
  components: {
    productosActivosVue
  },
  setup() {
    const clientes = ref([]);
    const cliente = ref("");
    const useStore =  usecarritostore();
    const router = useRouter()
    onMounted(() => {
      listarClientes();
    })
    const listarClientes = async () => {
      try {
        const { data } = await clientesActivos();
        clientes.value = data.datos;
      } catch (error) {
        console.log(error);
      }
    }

    const incrementar = (param) => {
      useStore.carritoVentas[param].cantidad++;
      useStore.carritoVentas[param].precio_total += useStore.carritoVentas[param].precio_unitario;
      
    }
    const decrementar = (param) => {
      if (useStore.carritoVentas[param].cantidad > 1) {
        //voy a poder reducir cantidades
        useStore.carritoVentas[param].cantidad--;
        useStore.carritoVentas[param].precio_total -= useStore.carritoVentas[param].precio_unitario;
        
      } else {
        alert('La cantidad no puede ser menos a 1, Graciass')
      }
    }

    const guardar = async () => {
      try {
        let objeto = {
          total: useStore.totalVentas,
          cliente_id: cliente.value,
          detalle: useStore.carritoVentas,
        }
        const { data } = await index(objeto);
        useStore.carritoVentas = [];
        Swal.fire({
          icon: "success",
          title: "Correcto!",
          text: data.mensaje,
        });
        cambioPagina();
      } catch (error) {
        if (error.response.status == 422) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.message
                    });
                } else {
                    console.log(error);
                }
      }
    }
    const cambioPagina = () => {
      router.push({ path: '/ventas' })
    }
    const cancelar = ()=> {
      router.push({path: '/ventas'})
    }
    return {
      clientes,
      cliente,
      incrementar,
      decrementar,
      guardar,
      useStore,
      cancelar
    }
  }
}
</script>
<style></style>