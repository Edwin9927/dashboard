const url = "http://localhost:8080/api/alimentos";

const ingresarAlimento = async (body, token) =>{
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

const actualizarAlimento = async (body, token, id) =>{
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

const eliminarAlimento = async (token, id) => {
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
    ingresarAlimento, 
    actualizarAlimento, 
    eliminarAlimento
};