import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import Script from 'next/script'
import Layout from './layout'
import moment from 'moment'

export default function Home() {


  const [ actores, setActores ] = useState([]);

  const obtenerActores = ()=>{
    fetch('api/actores/obtener_todos', {
      method:'GET'
    }).then((x)=>x.json()).then(x=>{
      setActores(x);
    });
  }
  
  return (

    <div>
      <Layout>
        <ListadoActores />
      </Layout>
    </div>


  )
}

class ListadoActores extends React.Component
{
  state = {
    actores :[],
    actor_buscado: []
  };

  componentDidMount() {
    fetch('api/actores/obtener_todos', {
      method:'GET'
    }).then((x)=>x.json()).then(resultado=>{
      this.setState({ actores : resultado });
    });

  }

  buscar_actores=() => {
    fetch(`api/actores/buscar?nombre_actor=${this.state.actor_buscado}`, {
      method:'GET'
    }).then((x)=>x.json()).then(resultado=>{
      this.setState({ actores : resultado });
    });

  }

  render() {
    return (
    <div className='container'>
      <h1>Actores</h1>
      <a className='btn btn-primary btn-lg' href='peliculas'>Peliculas</a>
        <a className='btn btn-primary btn-lg' href='crear_actor'>Crear Actor</a>
      <div>
        <div className='row'>
<div className='col-8'>
          <input type='text' className='form-control' onChange={(e)=>{
          this.setState({actor_buscado:e.target.value})
        }}></input>
        </div>
        <div className='col-4'>
        <button className='btn btn-secondary' onClick={this.buscar_actores}> buscar</button>
        </div>
        </div>
        
      </div>
      <table className='table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Nacimiento</th>
          <th>Sexo</th>
        </tr>
      </thead>
      <tbody>
        {this.state.actores.map(x=><tr key={x.id}>
          <td>{x.id}</td>
          <td>{x.nombre}</td>
          <td>{moment(x.nacimiento).format('LL')}</td>
          <td>{x.sexo}</td>
          <td>
            <a className='btn btn-secondary' href={`/peliculas-actor?actor_id=${x.id}`}>
              Peliculas asociadas
            </a>
          </td>
          <td>
            <a className='btn btn-success' href={`/editar-actor?actor_id=${x.id}`}>
              Editar
            </a>
          </td>
        </tr>
        )}
      </tbody>
    </table>
    
    </div>

    ) 
  }
}
