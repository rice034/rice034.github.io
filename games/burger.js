import * as utils from "/utils.js";
import { getContentHeight, minContentHeight } from "/template.js";
var root = getComputedStyle(document.documentElement);

/* GUI related */

var g;
window.page_init = function(){
    document.querySelectorAll("#pantry li").forEach(function(item){
        item.addEventListener("click", function(){
            getFromPantry(item.textContent);
        });
    });
    g = utils.imgGetGraphics(document.getElementById("mainCanvas"));
    setInterval(tick, 1000); //updates per 1000ms i.e. 1s
}
window.page_resize = function(){
    var wrapperDiv = document.getElementById("wrapperDiv");
    mainCanvas.width = mainCanvas.getBoundingClientRect().width;
    mainCanvas.height = mainCanvas.getBoundingClientRect().height;
    utils.clear(g);
}

function tick(){}

function getFromPantry(str){
    str=str.trim().replaceAll(" ","");
}

window.clearCounter = function(){
    
}

class Ingredient{
    constructor(id, img){
        this.id = id;
        this.img = img;
    }
}

class Burger{
    constructor(arr){
        this.ingredients = [];
        for(var i of arr){
            this.ingredients.push(i);
        }
    }
    pop(){this.ingredients.pop();}
}