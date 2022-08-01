import React from "react";
import Layout from "./layout";
import moment from "moment";
import Swal from "sweetalert2";

class editar_actor extends React.Component{ 
    state={
        Pelicula :{},
        actores:[],
        Pelicula_guardada:[]
    }

    cambioEstados =(evento)=>{

        let variable  = evento.target.name;
        let valor = evento.target.value;

        this.setState({Pelicula:{...this.state.Pelicula,[variable]: valor}})

    }

    
    cambioEstadosChecked =(evento)=>{
   
        let variable  = evento.target.name;
        let valor = evento.target.id;


        this.setState({Pelicula:{...this.state.Pelicula,[variable]: valor}})

    }

 
   
    componentDidMount(){
        const PeliculaId = location.search.split('=')[1];
        fetch(`api/pelicula/obtener_peli_por_id?pelicula_id=${PeliculaId}`,{
            method:'GET'
        }).then((x)=>x.json()).then(resut =>{
            this.setState({Pelicula : resut[0]})
        })
        fetch('api/pelicula/obtener_todos', {
            method: 'GET'
        }).then((x) => x.json()).then(result => {
            this.setState({ Pelicula_guardada: result })
        })
        this.cargar_actores();
    }

    guardar = ()=>{
        const existePelicula = this.state.Pelicula_guardada.find(x => x.titulo === this.state.Pelicula.titulo);
        if (existePelicula) {
            Swal.fire(
                'Ya existe esta pelicula',
                '',
                'error'
              )
        } else {
        fetch(`api/pelicula/editar`, {
            method:'POST',
            body: JSON.stringify(this.state.Pelicula),
            headers: {
                'Content-Type': 'application/json'
            }

        }).then((x)=>{
            Swal.fire(
                'Datos actualizados',
                '',
                'success'
              )
        })
    }
    }

    cargar_actores = ()=>{
        const PeliculaId = location.search.split('=')[1];

        fetch(`api/pelicula/obtener_act_por_pelicula?pelicula_id=${PeliculaId}`, {
            method:'GET'
          }).then((x)=>x.json()).then(resultado=>{
            this.setState({ actores : resultado });
          });

    }

    render(){
        return(
            <Layout>
                 <div>
                    <h1>Editar Pelicula</h1>
                </div>
                <div className="row">
                <div className="col-6">
                    <label>Titulo</label>
                    <input type='text' name="titulo"  className="form-control" value={this.state.Pelicula.titulo} onChange={this.cambioEstados}></input>
                </div>
                <div className="col-6">
                    <label>Genero</label>
                    <input type='text' className="form-control" name="genero" value={this.state.Pelicula.genero} onChange={this.cambioEstados}></input>
                </div>
                <div className="col-6">
                    <label>fecha estreno</label>
                    <div>
                    <input type='text' placeholder="2002/07/02" className="form-control" name="fecha_estreno" value={this.state.Pelicula.fecha_estreno} onChange={this.cambioEstados}></input> 
                    </div>
                </div>
                <a className="btn btn-success" onClick={this.guardar}>Guardar</a>
            </div>
            <div>
            <table className='table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Nacimiento</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {this.state.actores.map(x=><tr key={x.id}>
          <td>{x.id}</td>
          <td>{x.nombre}</td>
          <td>{moment(x.nacimiento).format('LL')}</td>
          <td>{x.Sexo}</td>
          <td>
            <a className='btn btn-secondary' href={`/peliculas-actor?actor_id=${x.id}`}>
              Ver peliculas id
            </a>
          </td>
        </tr>
        )}
      </tbody>
    </table>
            </div>
            </Layout>
        )
    }
}

export default editar_actor;