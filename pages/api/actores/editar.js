import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {
    if(request.method == "POST")
    { 
        const _db =  await db();
        await _db.query`update actores set nombre = ${request.body.nombre}, nacimiento= ${request.body.nacimiento}, sexo= ${request.body.sexo}, foto=${request.body.foto} where 
        id = ${request.body.id} ` ;
        response.status(200).json({});
    }
    else {
        response.status(402).json({
            error: "HTTP METODO INVALIDO"
        });
    }
}