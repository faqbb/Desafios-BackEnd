import MemoryContainer from "./MemoryContainer.js";

const productList = [
    {
      _id: "63069ca6724aa388732da7ec",
      name: 'pescado',
      price: 120,
      url: 'defaulturl1'
    },
    {
      _id: "63069d03724aa388732da7ed",
      name: 'carne',
      price: 170,
      url: 'defaulturl2'
    },
    {
      _id: "63069d28724aa388732da7ee",
      name: 'papas',
      price: 200,
      url: 'defaulturl3'
    },
    {
      _id: "63069d41724aa388732da7ef",
      name: 'mariscos',
      price: 700,
      url: 'defaulturl4'
    }]

export default class products extends MemoryContainer {
    constructor(){
        super(productList)
    }
}