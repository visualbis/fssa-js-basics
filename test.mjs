
import { Datarounder } from "./datarounder.mjs";

const initialHeader = ['Name', 'Age'];
const initialValues = [['John', 25.3456], ['Jane', 30]];

class Main {
    constructor() {
        this.obj = new Datarounder(initialHeader, initialValues);
    }
    
}
const mainInstance = new Main();
console.log(mainInstance.obj);
