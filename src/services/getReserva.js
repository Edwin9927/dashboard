const url = "http://localhost:8080/api/reservas";

const getReserva = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getReserva;