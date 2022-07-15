const url = "http://localhost:8080/api/pedidos";

const ingresarPedido = async (body, token) =>{
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

const actualizarPedido = async (body, token, id) =>{
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

const eliminarPedido = async (token, id) => {
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
    ingresarPedido, 
    actualizarPedido, 
    eliminarPedido
};