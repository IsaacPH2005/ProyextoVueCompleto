<template>
  <div class="container">
    <div class="row">
      <productosActivosVue tipoPrecio="compra" />                                <!-- pordemos enviar cualquier tipo de informacion -->
      <div class="col-12 col-md-6 mt-5">
        <div class="card">
          <div class="card-header bg-primary-subtle">
            <h5>Carrito</h5>
          </div>
          <div class="card-body">
            <div class="text-start">
              <label for="proveedor" class="form-label"><b>Prooveedor</b></label>
            </div>
            <select class="form-select" aria-label="Default select example" id="selectProveedor" v-model="proveedor">
              <option value="" selected>Seleccione</option>
              <option :value="item.id" v-for="(item, indice) in proveedores" :key="item.id">{{ item.nombre }}</option>
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
                    <tr v-for="(item, indice) in useStore.carritoCompras" :key="indice">
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
                        <button type="button" class="btn btn-danger btn-sm" @click="useStore.eliminarCarritoCompra">🗑</button>
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
        <button type="button" class="btn btn-danger me-3" @click='cambioPagina()' >Cancelar</button>
        <button type="button" class="btn btn-success" @click="guardar()">agregar</button>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
/* import { productosActivos } from '@/components/ProductosActivos.vue'; */
import productosActivosVue from '@/components/ProductosActivos.vue'
import { usecarritostore } from '@/stores/carrito';
import { onMounted, ref } from 'vue';
import { proveedoresActivos } from '../services/proveedoresService';
import { detatalleModal } from '../services/comprasService';
import { useRouter } from 'vue-router';

export default {
  components: {
    productosActivosVue
  },
  setup() {
   /*  const { carritoCompras } = usecarritostore(); */
    const useStore =  usecarritostore();
    const proveedores = ref([]);
    const proveedor = ref('');
   /*  const total = ref(0); */
    const router = useRouter();
    onMounted(() => {
      listarProveedores();
    })
    const listarProveedores = async () => {
      try {
        const { data } = await proveedoresActivos();
        proveedores.value = data.datos
      } catch (error) {
        console.log(error);
      }
    }
    /* const removeCarrito = (param) => {
      carritoCompras.splice(param, 1)
      obtenerTotal();
    } */
    const incrementar = (param) => {
      useStore.carritoCompras[param].cantidad++;
      useStore.carritoCompras[param].precio_total +=  useStore.carritoCompras[param].precio_unitario;
    }
    const decrementar = (param) => {
      if ( useStore.carritoCompras[param].cantidad > 1) {
        //voy a poder reducir cantidades
         useStore.carritoCompras[param].cantidad--;
         useStore.carritoCompras[param].precio_total -=  useStore.carritoCompras[param].precio_unitario;
      } else {
        alert('La cantidad no puede ser menos a 1, Graciass')
      }
    }
/*     const obtenerTotal = () => {
      total.value = 0;
      carritoCompras.forEach(param => {
        total.value += param.precio_total
      });
    }; */
    const guardar = async () => {
      try {
        let objeto = {
          total:  useStore.totalCompras,
          proveedor_id: proveedor.value,
          detalle:  useStore.carritoCompras,
        }
        const { data } = await detatalleModal(objeto);
        useStore.carritoCompras = [];
        Swal.fire({
  icon: "success",
  title: "Bien!",
  text: data.mensaje,
  timer: 1500
});
        cambioPagina();
      } catch (error) {
        console.log(error);
      }
    }
    const cambioPagina = ()=>{
      router.push({path: '/compras'})
    }
    return {
     /*  carritoCompras, */
      proveedores,
      proveedor,
   /*    removeCarrito, */
      incrementar,
      decrementar,
     /*  obtenerTotal, */
    /*   total, */
      guardar,
      cambioPagina,
      /* totalCompras, */
      useStore
     



    }
  }
}
</script>
<style></style>
