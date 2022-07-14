const url = "http://localhost:8080/api/menus";

const getMenus = async () =>{
    const data = await fetch(url);
    const resp = await data.json();
    return resp;
}

export default getMenus;
