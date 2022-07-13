const url = "http://localhost:8080/api/pedidos";

const getPedido = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getPedido;