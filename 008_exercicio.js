let usuario = "admin";
let senha = "1234";

if(usuario == "admin" && senha == "1234"){
    console.log("usuario logado");
}else if (usuario != "admin"){
    console.log('usuario invalido'); 
}else if (senha != "1234"){
    console.log('senha invalida');
}else{
    console.log('usuario e senha invalido');
}