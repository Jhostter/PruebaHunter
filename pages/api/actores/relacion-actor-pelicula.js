import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {
    if(request.method == "POST")
    { 
        const _db =  await db();
        await _db.query`insert into actores_peliculas(pelicula_id, actor_id) values(${request.body.pelicula_id}, ${request.body.actor_id})` ;
        response.status(200).json({});
    }
    else {
        response.status(402).json({
            error: "HTTP METODO INVALIDO"
        });
    }
}