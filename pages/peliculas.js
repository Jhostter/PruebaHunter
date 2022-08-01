import React from "react";
import Layout from "./layout";
import moment from "moment";

class Peliculas extends React.Component {

  state = {
    Peliculas: [],
    Pelicula_buscada: []
  }

  componentDidMount() {
    fetch('api/pelicula/obtener_todos', {
      method: 'GET'
    }).then((x) => x.json()).then(result => {
      this.setState({ Peliculas: result })
    })
  }
  buscar_peliculas = () => {
    fetch(`api/pelicula/buscar?titulo_pelicula=${this.state.Pelicula_buscada}`, {
      method: 'GET'
    }).then((x) => x.json()).then(resultado => {
      this.setState({ Peliculas: resultado });
    });

  }
  render() {
    return (
      <Layout>
        <div className="container">
          <h1>Peliculas</h1>
          <a href='/' className="btn btn-primary">Volver</a>
          <a href='crear_pelicula' className="btn btn-primary">Crear Pelicula</a>
          <div>
            <input type='text' className='form-control' onChange={(e) => {
              this.setState({ Pelicula_buscada: e.target.value })
            }}></input>
            <button className='btn btn-secondary' onClick={this.buscar_peliculas}> buscar</button>
          </div>
          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>genero</th>
                <th>titulo</th>
                <th>Fecha de Estreno</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.Peliculas.map(x => <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.genero}</td>
                <td>{x.titulo}</td>
                <td>{moment(x.fecha_estreno).format('LL')}</td>
                <td>{x.foto}</td>
                <td><a className='btn btn-secondary' href={`/actor-pelicula?pelicula_id=${x.id}`}>
                  Ver actores
                </a></td>
                <td><a className='btn btn-secondary' href={`/editar-pelicula?pelicula_id=${x.id}`}>
                  Editar
                </a></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </Layout>

    )
  }
}

export default Peliculas;
