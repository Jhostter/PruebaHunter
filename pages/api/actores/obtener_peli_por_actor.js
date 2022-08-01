
import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {

        const _db =  await db();
        const actor = await _db.query`select p.* from peliculas p
        join actores_peliculas ap on p.id=ap.pelicula_id
        where ap.actor_id=${request.query.actor_id}` ;
        response.status(200).json(actor.recordset);

 
}