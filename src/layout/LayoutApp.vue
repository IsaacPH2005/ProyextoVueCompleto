<template>
      <nav class="navbar navbar-expand-lg bg-primary-subtle">
        <div class="container-fluid">
            <RouterLink class="navbar-brand" to="/dashboard"><img src="https://tiendalotengo.com/media/logo/default/logo.png"
                    width="120px" alt=""></RouterLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link"  to="/dashboard">Inicio</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/publicaciones">Publicaciones</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/productos">Productos</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/proveedores">Proveedores</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/clientes">Clientes</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/compras">Compras</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/ventas">Ventas</RouterLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            <img :src="userStore.usuario.image != null ? urlBaseAsset + 'imagenes/' + userStore.usuario.image : 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'"
                                width="40px" height="40px" class="rounded-circle" alt="">{{ userStore.usuario.nombre }}</a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button @click="perfil()"  class="dropdown-item">Ver perfil</button>
                            </li>
                            <li>
                                <button type="button" class="dropdown-item" @click="logout()">Cerrar sesión</button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
          <RouterView />
</template>
<script>
import { useUserStore } from '@/stores/usuario';
import { cerrarSesion } from '@/views/services/authService';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import { urlBaseAsset } from '@/views/services/Http';
import { onMounted } from 'vue';
export default {
    
    setup() {
        const userStore = useUserStore();
        const router = useRouter();
        const logout = async ()=> {
            try {
                const {data} = await cerrarSesion();
                localStorage.clear();
                router.push({path: '/login'})
            } catch (error) {
                console.log(error);
            }
        }
        const perfil = ()=>{
            router.push({path: '/perfil'})
        }
        onMounted(() => {
            console.log(urlBaseAsset + 'imagenes/' + userStore.usuario.image);
        })
        
        return{
            logout,
            perfil,
            userStore,
            urlBaseAsset
        }
    }
}
</script>
<style>
    .nav-link.router-link-active{
        background-color: rgb(67, 150, 206);
        color: white;
        border-radius: 30px;
    }
</style>