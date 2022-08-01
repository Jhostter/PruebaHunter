import React from "react";
import Layout from "./layout";
import moment from "moment";

class PeliculasActor extends React.Component
{

    state ={
        peliculas: []
    }


    componentDidMount()
    {
        // peliculas-actor?actor_id=1
        // ['peliculas-actor?actor_id', '1']
        const peliculaId = location.search.split('=')[1];

        fetch(`api/pelicula/obtener_act_por_pelicula?pelicula_id=${peliculaId}`, {
            method:"GET"
        }).then((x)=>x.json().then(result =>{
            this.setState({peliculas : result})

        }))

    }

    render() {
        return (
            <Layout>
                <h1>Actores por pelicula</h1>
                <a href='/' className="btn btn-primary">Volver</a>
            <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>nombre</th>
                <th>nacimiento</th>
                <th>sexo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.peliculas.map(x=><tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.nombre}</td>
                <td>{moment(x.nacimiento).format('LL')}</td>
                <td>{x.sexo}</td>
                <td>{x.foto}</td>
                
              </tr>)}
            </tbody>
          </table>
          
          </Layout>
        );
    }
}

export default PeliculasActor;