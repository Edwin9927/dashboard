const url = "http://localhost:8080/api/usuarios";

const getUsuario = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getUsuario;