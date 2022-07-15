const url = "http://localhost:8080/api/usuarios";

const getUsuario = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

const ingresarUsuario = async (body, token) =>{
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

const actualizarUsuario = async (body, token, id) =>{
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

const eliminarUsuario = async (token, id) => {
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
    getUsuario,
    ingresarUsuario,
    actualizarUsuario,
    eliminarUsuario,
};