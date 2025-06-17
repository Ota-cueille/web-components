class Component extends HTMLElement {

    constructor(name) {
        /**
         * @type HTMLTemplateElement
         */
        const template = document.getElementById(name);

        const shadow = this.attachShadow({ mode: 'open' });
        this.root = document.importNode(template.content, true);
        shadow.appendChild(this.root);
    }

}

async function load(T, component) {
    customElements.define(component, T);

    const response = await fetch(`/web-components/components/${component}/${component}.html`);
    const content = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    for (const child of doc.head.children) {
        const clone = document.importNode(child, true);
        document.body.appendChild(clone);
    }
}

class CMain extends Component {
    constructor() {
        super("c-main", CMain);

        const button = this.root.querySelector("button");

        button.onclick = function() {
            console.log("Button Has been Clicked !");
        }
    }
}

load(CMain, 'c-main');
