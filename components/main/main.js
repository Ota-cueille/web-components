import { Component } from "/web-components/components.js";

class CMain extends Component {

    constructor() {
        super("c-main", CMain);

        const button = this.root.querySelector("button");

        button.onclick = function() {
            console.log("Button Has been Clicked !");
        }
    }

}