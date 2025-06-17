class Component extends HTMLElement {

    constructor() { super(); }

    initialize(name) {
        /**
         * @type HTMLTemplateElement
         */
        const template = document.getElementById(name);

        const shadow = this.attachShadow({ mode: 'open' });
        this.root = document.importNode(template.content, true);

        for (let script of this.root.querySelectorAll('script')) {
            let evaluatedScript = document.createElement('script');
            evaluatedScript.textContent = script.textContent;
            if (script.src) evaluatedScript.src = script.src;
            if (script.type) evaluatedScript.type = script.type;
            shadow.appendChild(evaluatedScript);
        }

        shadow.appendChild(this.root);
    }
}

async function load(component) {
    const response = await fetch(`/web-components/components/${component}/${component}.html`);
    const content = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    for (const child of doc.head.children) {
        if (child instanceof HTMLScriptElement) {
            let evaluatedScript = document.createElement('script');
            evaluatedScript.src = child.src;
            evaluatedScript.type = child.type;
            evaluatedScript.textContent = child.textContent;
            document.body.appendChild(evaluatedScript);
        } else {
            const clone = document.importNode(child, true);
            document.body.appendChild(clone);
        }
    }
}

load('main');