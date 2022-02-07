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
        if( localStorage.getItem("Accion") && localStorage.getItem("Accion") !== undefined )
            this.accion =  localStorage.getItem("Accion")
        else
            this.accion = 'Inicio'
            
        if( localStorage.getItem("Principio") && localStorage.getItem("Principio") !== undefined )    
            this.principio = new Date(localStorage.getItem("Principio")) 
        else 
            this.principio = undefined
            
        if( localStorage.getItem("Final") && localStorage.getItem("Final") !== undefined )
            this.final =  new Date(localStorage.getItem("Final")) 
        else
            this.final = undefined

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
                localStorage.setItem("Final", this.final);
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
                localStorage.removeItem("Diferencia");
                this.principio=undefined
                localStorage.removeItem("Principio");
                this.final=undefined
                localStorage.removeItem("Final" );
            }
        },
        resetearClicked(){
            localStorage.removeItem("Entradas")
            localStorage.removeItem("Principio");
            localStorage.removeItem("Final");
            localStorage.removeItem("Diferencia");
            localStorage.removeItem("Accion");
            localStorage.removeItem("Acumulado");
            this.accion = 'Inicio'
            this.principio = undefined
            this.final = undefined
            this.diferencia = 0
            this.acumulado = 0
            this.entradas = []
        }
    }
})

app.mount('#myApp')