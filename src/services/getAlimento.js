const url = "http://localhost:8080/api/alimentos";

const getAlimento = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getAlimento;