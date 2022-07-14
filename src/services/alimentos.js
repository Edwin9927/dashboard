const url = "http://localhost:8080/api/alimentos";

const ingresarAlimento = async (body, token) =>{
    const data = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token.tipoToken} ${token.tokenAcceso}`,
        },
        body: JSON.stringify(body),
    });
    return data;
}

export default ingresarAlimento;