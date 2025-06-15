// import "./c-main.html";

class CMain extends HTMLElement {
    constructor() {
        super();

        /**
         * @type HTMLTemplateElement
         */
        const template = document.getElementById('c-main');

        const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('c-main', CMain);
