class Component extends HTMLElement {

    constructor(name, Class) {
        customElements.define(name, Class);

        /**
         * @type HTMLTemplateElement
         */
        const template = document.getElementById(name);

        const shadow = this.attachShadow({ mode: 'open' });
        this.root = document.importNode(template.content, true);
        shadow.appendChild(this.root);
    }

}

async function load(component) {
    const response = await fetch(`/web-components/components/${component}/${component}.html`);
    const content = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    for (const child of doc.head.children) {
        const clone = document.importNode(child, true);
        document.body.appendChild(clone);
    }
}

load('c-main');

import "/web-components/components/main/main.js";
