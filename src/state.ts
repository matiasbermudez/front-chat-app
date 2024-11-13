import { rtdb } from "./rtdb";
import {onValue, ref} from "firebase/database";
import map from "lodash/map"

const API_BASE_URL = "http://localhost:3000";
type Mensajes = {
  from: string,
  menssage: string
}
const state = {
  data: {
    nombre: "",
    messages: [],
  },
  idSala: "",
  listeners: [], // los callbacks
  Init() {
    //ME ENGANCHO A LA RTDB
    const starCountRef = ref(rtdb, 'chatrooms/general');
    const currentState = this.getState();
    onValue(starCountRef, (snapShot) => {
      const data = snapShot.val();
      
      //MAPEO CON LODASH PARA HACERLO UN ARRAY DE OBJETOS
      const mensajeArray = map(data.messages);
      currentState.messages = mensajeArray;
      console.log("current state" ,currentState )
      this.setState(currentState)
    });

  },
  getState() {
    return this.data;
  },
  setState(newState) {
    this.data = newState;
    console.log("El estado cambio: ", this.getState())
    for (const cb of this.listeners) {
      cb()
    }
  },
  subscribe(callback: (any) => any) {
    this.listeners.push(callback)
  },
  setSala() {
    fetch(API_BASE_URL + "/chatroom", {
      method: "post"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      this.idSala = data.uuId;
      console.log(this.idSala)
    })
  },
  setNombre(nombre: string) {
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },
  pushMessages(message: string) {
   const nombreDelState = this.data.nombre;
    fetch(API_BASE_URL + "/chatrooms/general", {
      method: "post",
      headers: {
        "content-type": "application/json"},
      body: JSON.stringify({
        nombre : nombreDelState,
        message: message
      }),
    })
  },
  getMsjs() {

    fetch(API_BASE_URL + `/chatrooms/general`, {
      method: "get"
    }).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data)
    })
  },
  getNombreUsuario(){
    const dataCompleta = this.getState();
    const nombreUsuario = (dataCompleta.nombre).trim();
    return nombreUsuario
  }
}

export { state }
