<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title">Modificar datos </h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-3">
                            <div class="col-12 col-md-6">
                                <label for="usuario" class="form-label">Usuario :</label>
                                <input type="text" class="form-control" id="usuario" placeholder="Escriba..." v-model="dato.name">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="email" class="form-label">Email :</label>
                                <input type="text" class="form-control" id="email" placeholder="Escriba..." v-model="dato.email">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="password" class="form-label">Password :</label>
                                <input type="text" class="form-control" id="password" placeholder="Escriba..." v-model="dato.password">
                            </div>
                            <div class="col-12 col-md-6">
                                <label for="confirmPassword" class="form-label">Confirm password :</label>
                                <input type="text" class="form-control" id="confirmPassword" placeholder="Escriba..." v-model="dato.password_confirmation">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-end">
                            <button type="button" class="btn btn-success btn-lg" @click="editarDatos()">Modificar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header bg-primary-subtle">
                        <h5 class="card-title">Modificar foto</h5>
                    </div>
                    <div class="card-body">
                        <div class="row gy-4">
                            <div class="col-12 text-center" v-if="urlImage != null">
                                <img :src="urlImage" width="150px" height="150pc"class="rounded-circle" alt="fotoPerfil">
                            </div>
                            <div class="col-12">
                                <input type="file" class="form-control" id="imagen" @change="obtenerImagen">
                            </div>
                        <!--     <div class="col-12">
                                <input type="text" class="form-control" @change="obtenerImagen($event)">
                                <span id="texto"></span>
                            </div> -->
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="col-12 text-end">
                            <button type="button" class="btn btn-success btn-lg" @click='editarImagen()'>Modificar foto</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useUserStore } from '@/stores/usuario';
import { onMounted, ref } from 'vue';
import { actualizarImagen, show, update } from '../services/usuarioService';
import Swal from 'sweetalert2';
export default {    
    setup() {
        const userStore = useUserStore();
        const dato = ref({
            name: null,
            email: null,
            password: "",
            password_confirmation: ''
        });
      
        const listar = async () => {
            try {
                const {data} = await show(userStore.usuario.id)
                dato.value.name = data.name,
                dato.value.email = data.email

            } catch (error) {
                console.log(error);
            }
        }
        onMounted(() => {
            listar();
        })
        const editarDatos = async () => {
            try {
                const {data} = await update(userStore.usuario.id, dato.value)
                let objeto = {
                    nombre: data.datos.name,
                    email: data.datos.email,
                    id: data.datos.id,
                    image: data.datos.foto_perfil,
                }
                localStorage.setItem('usuario', JSON.stringify(objeto))
                userStore.obtenerPerfil();
                Swal.fire({
                    text: data.mensaje,
                    title: 'Bien!',
                    icon: 'success'
                })
            } catch (error) {
                console.log(error);
            }
        }
        const image =ref(null)
        const urlImage = ref(null)  /* Aqui podemos poner una url por defecto  */
        const obtenerImagen = (event)=>{
          /*   document.getElementById('texto').innerHTML = event.target.value */ /* Usar el evento event al subir informacion cargar  */

            image.value = event.target.files[0]
            if(image.value != null){
                const reader = new FileReader();  /* para leer archivos multimedia  en todo caso un lector*/
                reader.onload = (e) =>   urlImage.value = e.target.result;                        /* e  de  event */ 
                reader.readAsDataURL(image.value);

            }
            console.log(image.value);
        }
        const editarImagen = async()=>{
            try {
                let formulario = new FormData();
                formulario.append('imagen', image.value);
                formulario.append('id', userStore.usuario.id)
                console.log(formulario); 
                const {data} = await actualizarImagen(formulario);
                console.log(data);
                let objeto = {
                    nombre: data.datos.name,
                    email: data.datos.email,
                    id: data.datos.id,
                    image: data.datos.foto_perfil,
                }
                localStorage.setItem('usuario', JSON.stringify(objeto))
                userStore.obtenerPerfil();
                Swal.fire({
                    text: data.mensaje,
                    title: 'Bien!',
                    icon: 'success'
                })
            } catch (error) {
                console.log(error);
            }
        }
        return{
            userStore,
            dato,
            editarDatos,
            obtenerImagen,
            image,
            editarImagen,
            urlImage
        }
    }
}
</script>
<style>
    
</style>