const url = "http://localhost:8080/api/mesas";

const getMesa = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getMesa;