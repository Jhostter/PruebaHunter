import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {
   
        const _db =  await db();
        const pelicula = await _db.query`select * from peliculas where titulo like '%'+${request.query.titulo_pelicula}+'%'` ;
        response.status(200).json(pelicula.recordset);

}

