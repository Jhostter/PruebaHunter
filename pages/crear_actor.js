import React from "react";
import Layout from "./layout";
import Swal from 'sweetalert2'

class editar_actor extends React.Component {
    state = {
        Actores: {},
        actoresGuargados: []
    }
    componentDidMount() {
        fetch('api/actores/obtener_todos', {
            method: 'GET'
        }).then((x) => x.json()).then(result => {
            this.setState({ actoresGuargados: result })
        })
    }

    cambioEstados = (evento) => {
        debugger
        let variable = evento.target.name;
        let valor = evento.target.value;

        this.setState({ Actores: { ...this.state.Actores, [variable]: valor } })

    }


    cambioEstadosChecked = (evento) => {
        debugger
        let variable = evento.target.name;
        let valor = evento.target.id;


        this.setState({ Actores: { ...this.state.Actores, [variable]: valor } })

    }


    guardar = () => {
        const existeActor = this.state.actoresGuargados.find(x => x.nombre === this.state.Actores.nombre);
        if (existeActor) {
            Swal.fire(
                'Ya existe esta pelicula',
                '',
                'error'
              )
        } else {
        fetch(`api/actores/crear`, {
            method: 'POST',
            body: JSON.stringify(this.state.Actores),
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
                    <a href='/' className="btn btn-primary">Volver</a>

                    <h1>Crear Actor</h1>
                    <div className="row">
                        <div className="col-6">
                            <label>Nombre</label>
                            <input type='text' name="nombre" className="form-control" value={this.state.Actores.nombre} onChange={this.cambioEstados}></input>
                        </div>
                        <div className="col-6">
                            <label>Fecha de Nacimiento</label>
                            <input type='text' placeholder="2002/07/02" className="form-control" name="nacimiento" value={this.state.Actores.nacimiento} onChange={this.cambioEstados}></input>
                        </div>
                        <div className="col-6">
                            <label>Sexo</label>
                            <div>
                                <input type='radio' value="m" id="m" name="sexo" checked={this.state.Actores.sexo == "m"} onChange={this.cambioEstadosChecked}></input>M__
                                <input type='radio' value="f" id="f" name='sexo' checked={this.state.Actores.sexo == "f"} onChange={this.cambioEstadosChecked}></input>F
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