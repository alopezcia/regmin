const app = Vue.createApp({
    data() {
        return {
            dia: new Date(),
            accion: 'Inicio',
            principio:  undefined,
            final: undefined,
            diferencia:  0,
            acumulado:  0,
            entradas: [],
        }
    },
    mounted(){
        this.accion =  localStorage.getItem("Accion") ? localStorage.getItem("Accion") : 'Inicio'
        this.principio =  localStorage.getItem("Principio") ? new Date(localStorage.getItem("Principio")) : undefined
        this.final = localStorage.getItem("Final") ? new Date(localStorage.getItem("Final")) : undefined
        this.diferencia = localStorage.getItem("Diferencia") ? parseInt(localStorage.getItem("Diferencia")) : 0
        this.acumulado = localStorage.getItem("Acumulado") ? parseInt(localStorage.getItem("Acumulado")) : 0
        this.entradas = localStorage.getItem("Entradas") ? JSON.parse(localStorage.getItem("Entradas")) : []
    },
    methods: {
        accionClicked(){
            if( this.accion === 'Inicio' ){
                this.principio = new Date()
                localStorage.setItem("Principio", this.principio);
                this.final = undefined
                localStorage.removeItem("Final")
                this.accion = 'Final'
                localStorage.setItem("Accion", this.accion);

            } else {
                this.final = new Date()
                localStorage.setItem("Final", this.Final);
                this.diferencia = Math.round(Math.abs(this.final - this.principio)/60000)
                localStorage.setItem("Diferencia", this.diferencia);
                this.acumulado += this.diferencia
                localStorage.setItem("Acumulado", this.acumulado)
                this.accion = 'Inicio'
                localStorage.setItem("Accion", this.accion);
            }
        },
        acumularClicked(){
            if( this.accion === 'Inicio' && this.diferencia > 0 )
            {
                const e = { 
                    fecha: this.dia.toLocaleString(), 
                    inicio: this.principio.toLocaleTimeString(),
                    final: this.final.toLocaleTimeString(),
                    diferencia: this.diferencia 
                }
                this.entradas.push(e)
                localStorage.setItem("Entradas", JSON.stringify(this.entradas))
                this.diferencia=0
                localStorage.setItem("Diferencia", this.diferencia);
                this.principio=undefined
                localStorage.setItem("Principio", this.principio);
                this.final=undefined
                localStorage.setItem("Final", this.Final);
            }
        },
        resetearClicked(){
            this.entradas = []
            localStorage.removeItem("Entradas")

        }
    }
})

app.mount('#myApp')