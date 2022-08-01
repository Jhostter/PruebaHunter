import React from "react";
import Layout from "./layout";
import Swal from 'sweetalert2';
import moment from "moment";

class editar_actor extends React.Component {
    state = {
        Actores: {},
        Peliculas: [],
        Pelicula_seleccionada: 0,
        Peliculas_del_actor: [],
        actoresGuardados: []
    }

    cambioEstados = (evento) => {

        let variable = evento.target.name;
        let valor = evento.target.value;

        this.setState({ Actores: { ...this.state.Actores, [variable]: valor } })

    }


    cambioEstadosChecked = (evento) => {

        let variable = evento.target.name;
        let valor = evento.target.id;


        this.setState({ Actores: { ...this.state.Actores, [variable]: valor } })

    }



    componentDidMount() {
        const ActorId = location.search.split('=')[1];
        fetch(`api/actores/obtener_act_por_id?actor_id=${ActorId}`, {
            method: 'GET'
        }).then((x) => x.json()).then(resut => {
            this.setState({ Actores: resut[0] })
        })

        fetch(`api/pelicula/obtener_todos`, {
            method: 'GET'
        }).then((x) => x.json()).then(result => {
            this.setState({ Peliculas: result })
        })

        fetch(`api/actores/obtener_peli_por_actor?actor_id=${ActorId}`, {
            method: "GET"
        }).then((x) => x.json().then(result => {
            this.setState({ Peliculas_del_actor: result })

        }))
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
            fetch(`api/actores/editar`, {
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
                // window.alert('Datos actualizados')
            })
        }
        fetch(`api/actores/relacion-actor-pelicula`, {
            method: 'POST',
            body: JSON.stringify({
                pelicula_id: this.state.Pelicula_seleccionada,
                actor_id: this.state.Actores.id
            }),
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

        window.location.reload();
    }

    render() {
        return (
            <Layout>
                <div className="container">
                    <div>
                        <h1>Editar Actor</h1>
                    </div>
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
                        <div className="col-12">
                            <label>Asociar Pelicula</label>
                            <div>
                                <select className="form-control" onChange={(e) => {
                                    this.setState({ Pelicula_seleccionada: e.target.value })
                                }}>
                                    {
                                        this.state.Peliculas.map((x) => {
                                            return <option value={x.id} key={x.id}>
                                                {
                                                    x.titulo
                                                }
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <h2>Lista de peliculas en que ha participado</h2>
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
                                    {this.state.Peliculas_del_actor.map(x => <tr key={x.id}>
                                        <td>{x.id}</td>
                                        <td>{x.genero}</td>
                                        <td>{x.titulo}</td>
                                        <td>{moment(x.fecha_estreno).format('LL')}</td>
                                        <td>{x.foto}</td>

                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <a className="btn btn-success" onClick={this.guardar}>Guardar</a>
                    </div>
                </div>


            </Layout>
        )
    }
}

export default editar_actor;