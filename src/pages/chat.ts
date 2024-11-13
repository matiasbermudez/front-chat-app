import { Router } from '@vaadin/router'
import { state } from '../state';

type Mensajes = {
    from : string,
    menssage: string
}
class Chat extends HTMLElement{
    nombreUsuario = state.getNombreUsuario();
    connectedCallback(){
        state.subscribe(()=>{
            const currentState = state.getState();
            this.messages = currentState.messages;
            this.render();
        })
        this.render();
        
    }
    messages :[] = [];
    //SI NO HAGO ESTE METODO Y LO INICIALIZO LUEGO DEL INNER NO SE VUELVE A ENGANCHAR EL EVENTLISTENER
    addListener(){
        const formEl = this.querySelector('.form');
        this.messages = state.getState();
        formEl.addEventListener('submit', (e)=>{
            e.preventDefault();
            const eventTarget = e.target as any;
            state.pushMessages(eventTarget.mensaje.value);
        })
    }
    render(){
        console.log('MessageS: ', this.messages)
        console.log(this.nombreUsuario)
        this.innerHTML = `
            <h1 class="h1__bienvenido">Chat</h1>
            <div class="chat__contenedor">
            ${ this.messages.map(m => 
                { return `<div class="${(m.nombre).trim() === this.nombreUsuario ? 'usurio_local' : 'usuario_visitante'}">${m.message} : ${m.nombre}</div>`}).join(' ')}
            </div>
            <form class="form">
                <input class="input_text" name="mensaje">
                <button class="boton">Enviar</button>
            </form>
        `;
        this.addListener();
    }
}
customElements.define('chat-page', Chat)