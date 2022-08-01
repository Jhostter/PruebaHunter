import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {
    if(request.method == "POST")
    { 
        const _db =  await db();
        await _db.query`insert into peliculas(genero,titulo,fecha_estreno,foto) values(${request.body.genero}, ${request.body.titulo}, 
            ${request.body.fecha_estreno}, ${request.body.foto})` ;
        response.status(200).json({});
    }
    else {
        response.status(402).json({
            error: "HTTP METODO INVALIDO"
        });
    }
}