<template>
    <div class="loginPrincipal">
        <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true">
            <div class="signup">
                <label class="labelLogin" for="chk" aria-hidden="true">Sign up</label>
                <input type="text" class="inputLogin" name="txt" placeholder="User name" required=""
                    v-model="registro.name" :class="{ 'error': errors.name }">
                <!--<small style="color: red;" v-if="errors.name">{{ errors.name }}</small>-->
                <input type="email" class="inputLogin" name="email" placeholder="Email" required=""
                    v-model="registro.email" :class="{ 'error': errors.email }">
                <input type="text" class="inputLogin" name="broj" placeholder="Password" required=""
                    v-model="registro.password" :class="{ 'error': errors.password }">
                <input type="text" class="inputLogin" name="pswd" placeholder="Confirmacion password" required=""
                    v-model="registro.password_confirmation" :class="{ 'error': errors.password_confirmation }">
                <button class="buttonLogin" @click="registrar()">Sign up</button>
            </div>
            <div class="login">
                <label class="labelLogin" for="chk" aria-hidden="true">Login</label>
                <input type="email" class="inputLogin" name="email" placeholder="Email" v-model="formulario.email"
                    required="" :class="{ 'error': errors.email }">
                <input type="password" class="inputLogin" name="pswd" placeholder="Password"
                    v-model="formulario.password" required="" :class="{ 'error': errors.password }">
                <button class="buttonLogin" @click="login()">Login</button>
                <button class="buttonLogin" @click="logout()">logout</button>
            </div>
        </div>
    </div>
</template>
<script>
/* import axios from "axios"; */  /* Ya no se importa */
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { Buffer } from 'buffer'
import { cerrarSesion, iniciarSesion, registroUsuario } from "../services/authService.js";
import { useRouter } from "vue-router";

export default {
    setup() {
        const registro = ref({});
        const errors = ref({});
        const formulario = ref({});
        const router = useRouter()
        const registrar = async () => {
            errors.value = {};
            try {
                const { data } = await  registroUsuario(registro.value) /* await axios.post(`${urlBase}usuario`, registro.value) */
                console.log(data);
                Swal.fire({
                        icon: "success",
                        title: "Bien...",
                        text: data.message,
                    });
            } catch (error) {
                if (error.response.status == 422) {
                    errors.value = error.response.data.errors
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.message,
                    });
                } else {
                    console.log(error);
                }
            }
        }
        const login = async () =>{
            errors.value = {};
            try {
                const {data} = await iniciarSesion(formulario.value);    /* await axios.post(`${urlBase}login`, formulario.value) */
                console.log(data);
                const tokenEncrypt = Buffer.from(data.access_token).toString("base64");
                localStorage.setItem('token', tokenEncrypt);
                let objeto = {
                    nombre: data.user.name,
                    email: data.user.email,
                    imege: data.user.foto_perfil,
                    id: data.user.id
                };
                localStorage.setItem('usuario', JSON.stringify(objeto));
                router.push({path: '/dashboard'})
            } catch (error) {
                if (error.response.status == 422) {
                    errors.value = error.response.data.errors
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data.message,
                    });
                } else {
                    console.log(error);
                }
            }
        }
        const logout = async () => {
            try {
                const {data} = await cerrarSesion();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        onMounted(() => {

        }); /* xdx */

        return {
            registro,
            errors,
            formulario,
            registrar,
            login,
            logout

        };
    },
};
</script>
<style>
@import '../../assets/login.css';
/* llamamos a los estilos css */
</style>