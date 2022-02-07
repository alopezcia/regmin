const app = Vue.createApp({
    data() {
        return {
            dia: new Date(),
            accion: 'Inicio',
            principio: undefined,
            final: undefined,
            diferencia: 0,
            suma: 0,
            acumulado: localStorage.getItem("Acumulado") ? parseInt(localStorage.getItem("Acumulado")) : 0,
            entradas: localStorage.getItem("Entradas") ? JSON.parse(localStorage.getItem("Entradas")) : [],
        }
    },
    methods: {
        accionClicked(){
            if( this.accion === 'Inicio' ){
                this.principio = new Date()
                this.final = undefined
                this.accion = 'Final'
            } else {
                this.final = new Date()
                this.diferencia = Math.round(Math.abs(this.final - this.principio)/60000)
                this.acumulado += this.diferencia
                this.accion = 'Inicio'
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
                localStorage.setItem("Acumulado", this.acumulado)
                this.diferencia=0
                this.principio=undefined
                this.final=undefined
            }
        }
    }
})

app.mount('#myApp')