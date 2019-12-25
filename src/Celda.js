import React from 'react'
import './Celda.css'

export default function Celda(props) {
  let clase;
  if (props.valor === "X") {
    clase = "Celda X"
  } else if (props.valor === "O") {
    clase = "Celda O"
  } else {
    clase = "Celda"
  }
  return (
    <div className={clase} onClick={
      () => {
        props.dibujarTabla(props.coords.i, props.coords.j, props.player)
        props.buscarGanador();
      }
    }>
      {props.valor}
    </div>
  )
}
