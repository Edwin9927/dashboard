const url = "http://localhost:8080/api/menus";

const getMenu = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}
/*
const ingresarMenu = async (body, token) =>{
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

const actualizarMenu = async (body, token, id) =>{
    const data = await fetch(url+"/"+id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    return data;
}*/



export default  getMenu;
/*
         ingresarMenu,
         actualizarMenu
        }*/