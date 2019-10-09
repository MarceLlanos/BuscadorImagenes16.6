import React, { Component } from 'react';
import Header from './components/Header';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {

  state = { 
    termino: '',
    imagenes: [],
    pagina: '',
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;

    const url = `https://pixabay.com/api/?key=13868013-0658ade3a0477a9cff0c75d2e&q=${termino}&per_page=30&page=${pagina}`;

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}))

  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  paginaAnterior = () => {
    //leemos el state
    let pagina = this.state.pagina;

    // si es la pagina 1 ya no se puede retroceder
    if(pagina === 1) return null;

    //restar a la pagina actual
    pagina -=1;

    // agregar al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  paginaSiguiente = () => {
    // leemos el state
    let pagina = this.state.pagina;

    // sumar a la pagina actual
    pagina +=1;

    //agregamos al state
    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    })
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('auto', 'start');
  }

  render() { 
    return ( 
      <div className="app container justify-content-center">
        <div className="jumbotron">
          <Header title="Buscador de Imagenes"/>
          <Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes = {this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}
 
export default App;
