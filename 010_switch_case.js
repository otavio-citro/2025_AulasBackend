let diaSemana = 'sexta';

switch (diaSemana){
    case 'segunda': //if dia da semana = segunda
        console.log('hj tem senai');
        break;
    case 'terça': //else if (diaSemana == 'terça')
        console.log('hj tem senai');
        break;
    case 'quarta':
    case 'quinta':
    case 'sexta':
        console.log('hj tem sesi');
        break;
    default:
        console.log('hj nao tem aula');
        break;
        

}