import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {

        const _db =  await db();
        const actor = await _db.query`select * from actores a
        join actores_peliculas ap on a.id=ap.actor_id
        where ap.pelicula_id=${request.query.pelicula_id}` ;
        response.status(200).json(actor.recordset);

 
}