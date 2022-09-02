import FilesContainer from "./FilesContainer.js";
const productsPath = 'src/res/readable/products.json'

export default class products extends FilesContainer {
    constructor(){
        super(productsPath)
    }
}