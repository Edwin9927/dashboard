const url = "http://localhost:8080/api/venta";

const getVenta = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getVenta;