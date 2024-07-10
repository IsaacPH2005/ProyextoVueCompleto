import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/auth/Login.vue'
import Dashboard from '@/views/general/Dashboard.vue'
import Proveedores from '@/views/general/Proveedores.vue'  /* @ va directo a la raiz */
import LayoutApp from '@/layout/LayoutApp.vue'
import ProveedoresForm from '@/views/general/Proveedores-form.vue'
import Clientes from '@/views/general/Clientes.vue'
import ClientesForm from '@/views/general/Clientes-form.vue'
import Productos from '@/views/general/Productos.vue'
import ProductosForm from '@/views/general/Productos-form.vue'
import Compras from '@/views/movimientos/Compras.vue'
import ComprasFormulario from '@/views/movimientos/Compras-formulario.vue'
import Ventas from '@/views/movimientos/Ventas.vue'
import VentasFormulario from '@/views/movimientos/Ventas-formulario.vue'
import Publicaciones from '@/views/general/Publicaciones.vue'
import Perfil from '@/views/administracion/perfil.vue'
const router = createRouter({
  history: createWebHistory('#'),
  routes: [
    {
      path: '/login',
      component: Login
    },

    {
      path: '/',
      component: LayoutApp,
      children: [   /* children hijos son los que heredan los estiloos de component */
        {
          path: '/dashboard',
          component: Dashboard
        },
        {
          path: '/proveedores',
          component: Proveedores
        },
        {
          path: '/proveedor-formulario/:idProveedor?',
          component: ProveedoresForm
        },
        {
          path: '/clientes',
          component: Clientes
        },
        {
          path: '/cliente-formulario/:idCliente?',
          component: ClientesForm
        },
        {
          path: '/productos',
          component: Productos
        },
        {
          path: '/productos-form/:idProducto?',
          component: ProductosForm
        },
        {
          path: '/compras',
          component: Compras
        },
        {
          path: '/compras-formulario',
          component: ComprasFormulario
        },
        {
          path: '/ventas',
          component: Ventas
        },
        {
          path: '/ventas-formulario',
          component: VentasFormulario
        },
        {
          path: '/publicaciones/:idPublicacion?',
          component: Publicaciones
        },
        {
          path: '/perfil',
          component: Perfil
        }

      ]
    },

    {
      path: '/:catchAll(.*)',
      redirect: '/login'    /* 404 crear componente  */
    },
  
  ]
})

export default router
