import React from "react";
import Layout from "./layout";
import moment from 'moment';

class PeliculasActor extends React.Component
{

    state ={
        peliculas: []
    }


    componentDidMount()
    {
        // peliculas-actor?actor_id=1
        // ['peliculas-actor?actor_id', '1']
        const idActor = location.search.split('=')[1];

        fetch(`api/actores/obtener_peli_por_actor?actor_id=${idActor}`, {
            method:"GET"
        }).then((x)=>x.json().then(result =>{
            this.setState({peliculas : result})

        }))

    }

    render() {
        return (
            <Layout>
            <h1>Peliculas por Actor</h1>
                <a href='/' className="btn btn-primary">Volver</a>
            <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>genero</th>
                <th>titulo</th>
                <th>Fecha de Estreno</th>
                <th>Foto</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.peliculas.map(x=><tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.genero}</td>
                <td>{x.titulo}</td>
                <td>{moment(x.fecha_estreno).format('LL')}</td>
                <td>{x.foto}</td>

              </tr>)}
            </tbody>
          </table>
          </Layout>
        );
    }
}

export default PeliculasActor;