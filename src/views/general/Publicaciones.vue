<template>
    <div class="container mt-5">
        <div class="row">
            <h1 class="text-center">PUBLICACIONES</h1>
            <div class="col-12">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title">Publicaciones registradas</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-12 text-center">
                                <button type="button" class="btn btn-primary" @click="agregar()"><i
                                        class="fas fa-plus me-2"></i>Agregar</button>
                            </div>
                            <div class="col-12">
                                <div class="table-responsive">
                                    <table class="table table-hover">
                                        <thead class="table-primary">
                                            <tr>
                                                <th>Item</th>
                                                <th>Imagen</th>
                                                <th>Titulo</th>
                                                <th>Categoria</th>
                                                <th>Contenido</th>
                                                <th>Estado</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(item, indice) in datos" :key="item.id">
                                                <td>{{ indice + 1 }}</td>
                                                <td><img :src="item.image != null ? item.image : 'https://th.bing.com/th/id/OIP.tLfu1NXAoDvv4URcgNTlVwHaHa?rs=1&pid=ImgDetMain'"
                                                        alt="" width="60px" height="60px"></td>
                                                <td>{{ item.titulo }}</td>
                                                <td>{{ item.categoria }}</td>
                                                <td>{{ item.contenido }}</td>
                                                <td><span class="badge"
                                                        :class="item.estado ? 'bg-success' : 'bg-danger'">{{
                                                            item.estado ? 'Activo' : 'Inactivo' }}</span></td>
                                                <td class="text-center">
                                                    <div class="btn-group">
                                                        <button type="button" class="btn btn-warning btn-sm"
                                                            @click="verPost(item.id)"><i
                                                                class="fas fa-pencil"></i></button>
                                                        <button type="button" class="btn btn-sm"
                                                            :class="item.estado ? 'btn-danger' : 'btn-success'"
                                                            @click="estado(item.id)"><i class="fas"
                                                                :class="item.estado ? 'fa-times' : 'fa-check'"></i></button>
                                                        <button type="button" class="btn btn-danger btn-sm"
                                                            v-show="!item.estado" @click="eliminar(item.id)"><i
                                                                class="fas fa-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-12">
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item" :class="{ 'disabled': paginacion.pagina <= 1 }">
                                            <button type="button" class="page-link" aria-label="Previous"
                                                @click="paginaPrev()">
                                                <span aria-hidden="true">&laquo;</span>
                                            </button>
                                        </li>
                                        <li class="page-item" v-for="item in paginacion.total"><button type="button"
                                                class="page-link"
                                                :class="{ 'bg-primary text-white': item == paginacion.pagina }"
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
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger-subtle">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel"><i class="fas fa-edit me-2"></i>{{
                            posicion == null ? 'Agregar registro' : 'Editar Registro' }}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row gy-4">
                            <div class="col-12 mb-3">
                                <div class="form-floating">
                                    <input type="text" class="form-control" v-model="formulario.titulo" id="titulo">
                                    <!--     :class="{ 'border-danger' : errors.titulo}" -->
                                    <label for="titulo">Titulo</label>
                                </div>
                                <!--  <small class="text-danger" v-if="errors.titulo"><i
                                            class="fas fa-times me-1"></i>{{errors.titulo[0]}}</small> -->
                            </div>
                        </div>
                        <div class="col-12 mb-3">
                            <div class="form-floating">
                                <select class="form-select" v-model="formulario.categoria" id="categoria"
                                    aria-label="Categoria"> <!-- :class="{ 'border-danger' : errors.categoria}" -->
                                    <option value="" selected>Seleccione</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Viajes">Viajes</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Arte">Arte</option>
                                    <option value="Ciencia">Ciencia</option>
                                    <option value="Moda">Moda</option>
                                    <option value="Cine">Cine</option>
                                    <option value="Música">Música</option>
                                    <option value="Gastronomía">Gastronomía</option>
                                    <option value="Literatura">Literatura</option>
                                </select>
                                <label for="categoria">Categoria</label>
                            </div>
                            <!--  <small class="text-danger" v-if="errors.categoria"><i
                                        class="fas fa-times me-1"></i>{{errors.categoria[0]}}</small> -->
                        </div>
                        <div class="col-12 mb-3">
                            <div class="form-floating">
                                <input type="text" class="form-control" v-model="formulario.image" id="image">
                                <!-- :class="{ 'border-danger' : errors.image}" -->
                                <label for="image">Url imagen</label>
                            </div>
                            <!--       <small class="text-danger" v-if="errors.image"><i
                                        class="fas fa-times me-1"></i>{{errors.image[0]}}</small> -->
                        </div>
                        <div class="col-12">
                            <div class="form-floating">
                                <textarea class="form-control" v-model="formulario.contenido" id="contenido"></textarea>
                                <!-- :class="{ 'border-danger' : errors.contenido}" -->
                                <label for="contenido">Contenido</label>
                            </div>
                            <!-- <small class="text-danger" v-if="errors.contenido"><i
                                        class="fas fa-times me-1"></i>{{errors.contenido[0]}}</small> -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success"  :class="posicion != null? 'btn-warning': 'btn-success'" @click="guardar()">{{ posicion != null ? 'Editar' : 'Guardar' }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import { cambiarEstado, datosDetalle, index,  update,  postPubli } from '../services/publicacionesSerivice';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
    setup(props) {
        const datos = ref([]);
        const paginacion = ref({
            pagina: 1,
            total: null,
        });
        let modal = null;
        let instanciaModal = null;
        const formulario = ref({
            titulo: '',
            contenido: '',
            categoria: '',
            image: ""
        });
        const posicion = ref(null);
        const router = useRouter();
        const idPublicacion = router.currentRoute.value.params.idPublicacion;
        onMounted(() => {
            modal = document.getElementById('staticBackdrop');
            instanciaModal = new Modal(modal);
            if (idPublicacion != "") {
                verPost();
            } 
            listar();
        })
        const listar = async () => {
            try {
                const { data } = await index(paginacion.value.pagina);
                datos.value = data.datos.data;
                paginacion.value.total = data.datos.last_page;
            } catch (error) {
                console.log(error);
            }
        };
        const paginaPrev = () => {
            paginacion.value.pagina--;
            listar();
        };
        const paginaNext = () => {
            paginacion.value.pagina++;
            listar();
        };
        const paginaCambio = param => {
            paginacion.value.pagina = param;
            listar();
        };
        const guardar = async () => {
            try {
                if (posicion.value == null) {
                    const { data } = await postPubli(formulario.value)
                    
                  
                } else {
                    const { data } = await update(posicion.value, formulario.value)
                }
                vaciar();
                listar();
                instanciaModal.hide();
            } catch (error) {
                console.log(error);
            }
        }
        const vaciar = () => {
            formulario.value.titulo = '';
            formulario.value.categoria = '';
            formulario.value.contenido = '';
            formulario.value.image = '';
        };
        const verPost = async (param) => {
            try {
                const { data } = await datosDetalle(param);
                formulario.value.titulo = data.datos.titulo;
                formulario.value.categoria = data.datos.categoria;
                formulario.value.contenido = data.datos.contenido;
                formulario.value.image = data.datos.image;
                instanciaModal.show();
                posicion.value = param;
            } catch (error) {
                console.log(error);
            }
        }
        const estado = async (param) =>{
            try {
                const {data} = await cambiarEstado(param);
                listar();
            } catch (error) {
                console.log(error);
            }
        }
        const eliminar = param =>{
            try {
                Swal.fire({
                title: "¿Esta seguro?",
                text: "Está a punto de eliminar del registro!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, eliminar",
                cancelButtonText: "No, cancelar"
            }).then(async function (result) {
                if (result.isConfirmed) {
                    const { data } = await cambiarEstado(param)
                    listar();
                }
            });
            } catch (error) {
                console.log(error);
            }
        }
        const  mostrar = (param)=>{
            router.push({path: `/publicaciones/${param}`})
        }
        const agregar = () => {
        instanciaModal.show();
        vaciar();
        posicion.value = null;
    };
        return {
            datos,
            paginacion,
            paginaPrev,
            paginaNext,
            paginaCambio,
            formulario,
            guardar,
            posicion,
            vaciar,
            estado,
            eliminar,
            agregar,
            mostrar,
            verPost,
            idPublicacion
        }
    }
}
</script>
<style></style>