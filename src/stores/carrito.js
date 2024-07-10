import { computed, onMounted, ref } from 'vue';
import { defineStore } from 'pinia'
export const usecarritostore = defineStore('carritoMovimiento', () => {
    const carritoCompras = ref([]);
    const carritoVentas = ref([]);
 /*    const total = ref(0);
    const total2 = ref(0); */
    let totalCompras = computed(() =>{
        return carritoCompras.value.reduce((suma, elemento) => {return suma + elemento.precio_total}, 0)
    }); /* Se puede usar en cualquierr  */
    let totalVentas = computed(() => {
        return carritoVentas.value.reduce((suma, elemento) => {return suma + elemento.precio_total}, 0)
    })
    const addCarritoCompras = (param) => {
        /*  if (!validarProducto(param)) { */
        if (!comprobarProducto(param.id)) {
            let objeto = {
                producto_id: param.id,
                nombre: param.nombre,
                codigo: param.codigo,
                cantidad: 1,
                precio_unitario: parseFloat(param.precio_compra),
                precio_total: parseFloat(param.precio_compra)
            }
            carritoCompras.value.push(objeto);

        }else {
            const posicion = carritoCompras.value.findIndex(elemento => elemento.producto_id ==param.id);
           /*  console.log(posicion); */
            carritoCompras.value[posicion].precio_total+= parseFloat(param.precio_compra);
            carritoCompras.value[posicion].cantidad++;
           
        }
        /* totalCompras.value = sumaTotalCompras() */
       /*  console.log(totalCompras.value); */

        /*     } else {
                alert('El producto ya se encuentra registrado en el carrito')
            }
             */
    }
   /*  const obtenerTotal = () => {
        total.value = 0;
        carritoCompras.value.forEach(param => {
            total.value += param.precio_total
        });
    }; */
  /*   const sumaTotalCompras = ()=>{
        let total = carritoCompras.value.reduce((suma, elemento) => {return suma + elemento.precio_total}, 0)
        return total;
    
    } */
    const eliminarCarritoCompra = (param)=>{
        carritoCompras.value.splice(param, 1);
    }
  /*   const validarProducto = param => {
        console.log(param);
        let existe = false;
        carritoCompras.value.forEach(elemento => {

            if (param.id === elemento.producto_id) {
                existe = true;
            }
        });
        return existe;
    } */
    const comprobarProducto = (param) => {
        const existe = carritoCompras.value.some(elemento => elemento.producto_id === param) /* es un metodo de iteracion sirve para comprobar si existe un elemento igual que existen se a cargar con true y si son diferentes te tira false*/
        return existe;
    }
    const addCarritoVentas = (param) => {
        if (parseFloat(param.cantidad) > 0) {
            if (!comprobarProductoVenta(param.id)) {
                let objeto = {
                    producto_id: param.id,
                    nombre: param.nombre,
                    codigo: param.codigo,
                    cantidad: 1,
                    precio_unitario: parseFloat(param.precio_compra),
                    precio_total: parseFloat(param.precio_compra),
                    stock: param.cantidad
                }
                carritoVentas.value.push(objeto);
            } else {
               /*  alert('El producto ya se encuentra registrado en el carrito') */
               
                const posicion = carritoVentas.value.findIndex(elemento => elemento.producto_id ==param.id);
                if (carritoVentas.value[posicion].stock > carritoVentas.value[posicion].cantidad) {
                    carritoVentas.value[posicion].precio_total+= parseFloat(param.precio_compra);
                    carritoVentas.value[posicion].cantidad++;
                } else {
                    Swal.fire({
                        title: 'Advertencia!',
                        text: 'La cantidad Solicitada es mayo a la cantidad en Stock',
                        icon: 'warning'
                    });
                }
                
            }
        } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'El producto seleccionado tiene un stock de 0',
                    icon: 'error'
                });            
             }
        
    }
    const comprobarProductoVenta = (param) => {
        const existe = carritoVentas.value.some(elemento => elemento.producto_id === param) /* es un metodo de iteracion sirve para comprobar si existe un elemento igual que existen se a cargar con true y si son diferentes te tira false*/
        return existe;
    }
    const eliminarCarritoVenta = (param)=>{
        carritoVentas.value.splice(param, 1);
    }







 /*    const obtenerTotalVentas = () => {
        total.value = 0;
        carritoVentas.value.forEach(param => {
            total2.value += param.precio_total
        });
    };
    const validarProducto2 = param => {
        let existe = false;
        carritoVentas.value.forEach(elemento => {
            if (param.id === elemento.producto_id) {
                existe = true;
            }
        });
        return existe;
    } */


    return {
        carritoCompras,
        carritoVentas,
        addCarritoCompras,
        /* obtenerTotal, */
       /*  validarProducto, */
        addCarritoVentas,
        totalCompras,
        eliminarCarritoCompra,
        totalVentas,
        eliminarCarritoVenta
        

    }
})