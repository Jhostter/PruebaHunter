import db from '../../../aplicacion/db/conexion';

export default async function handler(request, response) {
    if(request.method == "POST")
    { 
        const _db =  await db();
        await _db.query`update peliculas set  titulo= ${request.body.titulo}, genero= ${request.body.genero}, fecha_estreno= ${request.body.fecha_estreno}, foto=${request.body.foto} where 
        id = ${request.body.id} ` ;
        response.status(200).json({});
    }
    else {
        response.status(402).json({
            error: "HTTP METODO INVALIDO"
        });
    }
}