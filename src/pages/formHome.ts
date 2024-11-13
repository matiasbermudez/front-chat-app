import { Router } from '@vaadin/router'
import { state } from '../state';
class Home extends HTMLElement{
    connectedCallback(){
        this.render();
        const formEl = this.querySelector('.form')
        formEl.addEventListener('submit', (e)=>{
            e.preventDefault();
            const eventTarget = e.target as any;
            console.log(eventTarget.nombre.value);
            state.setNombre(eventTarget.nombre.value);
            Router.go('/chat')
        })
    }
    render(){
        this.innerHTML = `
            <h1 class="h1__bienvenido">Bienvenido</h1>
            <form class="form">
            <div class="div__label__text">
                <label class="label__text">Tu nombre</label>
            </div>
            <input class="input_text" name="nombre">
            <button class="boton">Comenzar</button>
            </form>
           
        `
       
    }
}
customElements.define('home-page', Home)