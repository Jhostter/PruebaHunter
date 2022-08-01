import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {

        const _db =  await db();
        const actor = await _db.query`select * from peliculas` ;
        response.status(200).json(actor.recordset);

 
}