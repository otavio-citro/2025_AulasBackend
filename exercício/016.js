const piAnonima = function (){
    return 3.1415;
}
const piArrow =  () => {
    return 3.1415;
}

function raioCircuferencia(Circunferencia){
    return Circunferencia / (2 * pi());
   }

const raioCircuferenciaAnonima = function (Circunferencia){
    return Circunferencia / (2 * piAnonima());
   }

const raioCircuferenciaArrow =  (Circunferencia) => {
    return Circunferencia / (2 * piArrow());
   }
   