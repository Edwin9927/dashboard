const url = "http://localhost:8080/api/mesas";

const ingresarMesa = async (body, token) =>{
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    return data;
}

const actualizarMesa = async (body, token, id) =>{
    const data = await fetch(url+"/"+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    return data;
}

const eliminarMesa = async (token, id) => {
    const data = await fetch(url + "/" + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    return data;
}

export {
    ingresarMesa, 
    actualizarMesa, 
    eliminarMesa
};