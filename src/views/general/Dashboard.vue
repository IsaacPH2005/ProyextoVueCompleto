<template>
  <div class="container mt-5">
    <div class="row gy-3">
      <div class="col-12 col-md-3 mt-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-12 col-md-7">
                <span class="h5">Total Clientes <b>{{ datos.totalClientes }}</b></span>
              </div>
              <div class="col-12 col-md-5">
                <i class="fas fa-users display-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 mt-3">
        <div class="card bg-danger text-white">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-12 col-md-7">
                <span class="h5">Total Compras <b>{{ datos.totalCompras }}</b></span>
              </div>
              <div class="col-12 col-md-5">
                <i class="fas fa-shopping-cart display-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 mt-3">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-12 col-md-7">
                <span class="h5">Total Productos <b>{{ datos.totalProductos }}</b></span>
              </div>
              <div class="col-12 col-md-5">
                <i class="fas fa-cubes display-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-3 mt-3">
        <div class="card bg-warning text-white">
          <div class="card-body">
            <div class="row text-center">
              <div class="col-12 col-md-7">
                <span class="h5">Total ventas <b>{{ datos.totalVentas }}</b></span>
              </div>
              <div class="col-12 col-md-5">
                <i class="fas fa-shop display-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <Bar id="my-chart-id" :options="opcionesBarra" :data="datosBarras" />
      </div>
      <div class="col-12 col-md-6">
        <Pie id="my-chart-id" :options="opcionesTorta" :data="datosTorta" />
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { index } from '../services/dashboardService';
/* Importaciones cue-chartjs */
import { Bar, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)
/* Termino de las importaciones */

export default {
  components: {
    Bar,
    Pie
  },
  setup() {
    const datos = ref({
      totalClientes: null,
      totalProveedores: null,
      totalProductos: null,
      totalVentas: null,
      totalCompras: null
    })
    const datosBarras = ref({
      labels: [],
      datasets: [
        { 
          backgroundColor:[],
          data: [] 
        }
      ]
    })
    const opcionesBarra = ref({
      responsive: true
    })
    const datosTorta = ref({
      labels: [],
      datasets: [
        { 
          backgroundColor:[],
          data: [] 
        }
      ]
    })
    const opcionesTorta = ref({
      responsive: true
    })
    const listar = async () => {
      let nombreBarra = [];
      let totalBarra = [];
      let nombreTorta = [];
      let totalTorta = [];
      try {
        const { data } = await index()
        console.log(data);
        datos.value.totalClientes = data.total_clientes;
        datos.value.totalProveedores = data.total_prorveedores;
        datos.value.totalProductos = data.total_productos;
        datos.value.totalVentas = data.total_ventas;
        datos.value.totalCompras = data.total_compras
        data.chartCompras.forEach(element => {
          nombreBarra.push(element.nombre_producto);
          totalBarra.push(element.total_compras)        
        });
        data.chartVentas.forEach(element => {
          nombreTorta.push(element.nombre_producto);
          totalTorta.push(element.total_ventas)        
        });
        datosBarras.value = {
          labels: nombreBarra,
          datasets: [{
            backgroundColor: ['red', 'green', 'blue','yellow', 'pink', ],
            data: totalBarra
          }]
        }
        datosTorta.value = {
          labels: nombreTorta,
          datasets: [{
            backgroundColor: ['red', 'green', 'blue','yellow', 'pink', ],
            data: totalTorta
          }]
        }
      /*   const generarColor = () =>{
    const red = Math.floor(Math.random()*256);
    const green = Math.floor(Math.random()*256);
    const blue = Math.floor(Math.random()*256);
 
    return `rgb(${red},${green},${blue})`;
} */
      } catch (error) {
        console.log(error);
      }
    }
    onMounted(() => {
      listar();
    })
    return {
      datos,
      datosBarras,
      opcionesBarra,
      datosTorta,
      opcionesTorta
    }
  }
}
</script>
<style></style>