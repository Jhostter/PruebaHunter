import React from "react";
import Layout from "./layout";
import Swal from "sweetalert2";

class editar_actor extends React.Component {
    state = {
        Pelicula: {},
        Pelicula_guardada: []
    }

    componentDidMount() {
        fetch('api/pelicula/obtener_todos', {
            method: 'GET'
        }).then((x) => x.json()).then(result => {
            this.setState({ Pelicula_guardada: result })
        })
    }

    cambioEstados = (evento) => {
        const variable = evento.target.name;
        const valor = evento.target.value;

        this.setState({ Pelicula: { ...this.state.Pelicula, [variable]: valor } })
    }

    cambioEstadosChecked = (evento) => {
        let variable = evento.target.name;
        let valor = evento.target.id;

        this.setState({ Pelicula: { ...this.state.Pelicula, [variable]: valor } })
    }

    guardar = () => {
        const existePelicula = this.state.Pelicula_guardada.find(x => x.titulo === this.state.Pelicula.titulo);
        if (existePelicula) {
            Swal.fire(
                'Ya existe esta pelicula',
                '',
                'error'
              )
        } else {
            fetch(`api/pelicula/crear`, {
                method: 'POST',
                body: JSON.stringify(this.state.Pelicula),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then((x) => {
                Swal.fire(
                    'Datos actualizados',
                    '',
                    'success'
                )
            })
        }

    }

    render() {
        return (
            <Layout>
                <div className="container">
                <a href='/peliculas' className="btn btn-primary">Volver</a>

                    <h1>Crear Pelicula</h1>

                <div className="row">
                    <div className="col-6">
                        <label>Titulo</label>
                        <input type='text' name="titulo" className="form-control" value={this.state.Pelicula.titulo} onChange={this.cambioEstados}></input>
                    </div>
                    <div className="col-6">
                        <label>Genero</label>
                        <input type='text' className="form-control" name="genero" value={this.state.Pelicula.genero} onChange={this.cambioEstados}></input>
                    </div>
                    <div className="col-6">
                        <label>fecha Estreno</label>
                        <div>
                            <input type='text' className="form-control" placeholder="2002/07/02" name="fecha_estreno" value={this.state.Pelicula.fecha_estreno} onChange={this.cambioEstados}></input>
                        </div>
                    </div>
                    <a className="btn btn-success" onClick={this.guardar}>Guardar</a>
                </div>
                </div>

            </Layout>
        )
    }
}

export default editar_actor;