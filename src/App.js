import React, { Component } from 'react'
import Celda from './Celda';

import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tateti: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      juegoTerminado: false,
      mensaje: "",
      player: 1,
      turnos: 1
    }
    this.buscarGanador = this.buscarGanador.bind(this);
    this.dibujarTabla = this.dibujarTabla.bind(this);
    this.reiniciarJuego = this.reiniciarJuego.bind(this);
  }


  //BUSCAR DISTINTAS COMBINACIONES PARA UN POSIBLE GANADOR
  buscarGanador() {
    const tablero = this.state.tateti.slice();
    let juegoTerminado = false;
    let mensaje;

    for (let i = 0; i < 3; i++) {

      if (tablero[i][0] === tablero[i][1] && tablero[i][1] === tablero[i][2]) {
        if (tablero[i][0] !== "") {
          mensaje = `JUGADOR ${this.state.player} GANA!`;
          juegoTerminado = true;
        }
      }

      if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i]) {
        if (tablero[0][i] !== "") {
          mensaje = `JUGADOR ${this.state.player} GANA!`;
          juegoTerminado = true;
        }
      }
    }


    if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2]) {
      if (tablero[0][0] !== "") {
        mensaje = `JUGADOR ${this.state.player} GANA!`;
        juegoTerminado = true;
      }
    }

    if (tablero[0][2] === tablero[1][1] && tablero[1][1] === tablero[2][0]) {
      if (tablero[0][2] !== "") {
        mensaje = `JUGADOR ${this.state.player} GANA!`;
        juegoTerminado = true;
      }
    }

    //SI LOS TURNOS LLEGAN A 9 Y NO HAY UN GANADOR, ES EMPATE
    if (juegoTerminado === false && this.state.turnos === 9) {
      mensaje = "EMPATE!"
      juegoTerminado = true;
    }

    this.setState({ juegoTerminado, mensaje })
  }

  //REINICIAR EL JUEGO
  reiniciarJuego() {
    this.setState({
      tateti: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
      ],
      juegoTerminado: false,
      mensaje: "",
      player: 1,
      turnos: 1
    })
  }

  //DIBUJAR EL SIMBOLO (X)/(0) EN EL LUGAR DONDE SE HAGA CLICK
  //SIEMPRE Y CUANDO SEA UN ESPACIO VACIO
  dibujarTabla(i, j, player) {
    if (this.state.juegoTerminado === false) {
      let tateti = this.state.tateti.slice();
      let valor;
      let turnos = this.state.turnos;
      player === 1 ? valor = "X" : valor = "O";
      if (tateti[i][j] === "") {
        tateti[i][j] = valor;
        if (turnos + 1 <= 9) {
          turnos++;
        }
        player === 1 ? player = 2 : player = 1;
        this.setState({
          tateti,
          player,
          turnos
        })
      }
    }

  }

  render() {
    let simbolo = this.state.player === 1 ? "X" : "O"
    let mensaje = this.state.juegoTerminado ? this.state.mensaje : `TURNO DEL JUGADOR ${this.state.player} [ ${simbolo} ]`;
    return (
      <div className="App">
        <h1>TA-TE-TI</h1>
        <p>{mensaje}</p>
        <div className="tateti-container">
          <div className="tateti">
            {this.state.tateti.map((arr, i) => {
              return arr.map((celda, j) => {
                return <Celda
                  key={Math.random() * 67}
                  valor={celda}
                  coords={{ i, j }}
                  player={this.state.player}
                  dibujarTabla={this.dibujarTabla}
                  buscarGanador={this.buscarGanador}
                />
              })
            })}
          </div>
          {this.state.juegoTerminado && <button onClick={this.reiniciarJuego}>Jugar de nuevo?</button>}
        </div>
      </div>
    )
  }
}
