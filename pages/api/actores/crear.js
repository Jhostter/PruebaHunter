import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {
    if(request.method == "POST")
    { 
        const _db =  await db();
        await _db.query`insert into actores(nombre,nacimiento,sexo,foto) values(${request.body.nombre}, ${request.body.nacimiento}, ${request.body.sexo}, ${request.body.foto})` ;
        response.status(200).json({});
    }
    else {
        response.status(402).json({
            error: "HTTP METODO INVALIDO"
        });
    }
}