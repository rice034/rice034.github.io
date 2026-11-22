import * as utils from "/utils.js";
import { getContentHeight, minContentHeight} from "/template.js";
var root = getComputedStyle(document.documentElement);

/* GUI related */

var g;
var bi;
var imgsToLoad = ["/imgs/gallery/burgersim/plate.png"];
window.page_init = function(){
    document.querySelectorAll("#pantry li").forEach(function(item){
        item.addEventListener("click", function(){
            getFromPantry(item.textContent);
        });
    });
    for(var i=0; i<imgsToLoad.length; i++){
        utils.loadImg(imgsToLoad[i]);
    }
    bi = document.getElementById("mainCanvas");
    g = utils.imgGetGraphics(bi);
    var tmpG = document.getElementById("info_bottom").getContext("2d");
    utils.setDrawingColour(tmpG, '#963');
    utils.fillRect(tmpG, 0, 0, 100, 30);
    utils.setDrawingColour(tmpG, 'saddlebrown');
    utils.drawRect(tmpG, 0, 0, 100, 30);
    setInterval(tick, 100);

}

window.page_resize = function(){
    var wrapperDiv = document.getElementById("wrapperDiv");
    wrapperDiv.style.height="1px";
    wrapperDiv.style.height="calc("+document.getElementById("pageContent").scrollHeight+"px - 4em)";
    //wrapperDiv.style.maxHeight = "90vh";
    mainCanvas.width = mainCanvas.parentElement.width;
    mainCanvas.height = "auto";
    mainCanvas.width = mainCanvas.getBoundingClientRect().width;
    mainCanvas.height = mainCanvas.getBoundingClientRect().height;
    refresh();
}

var loaded = false;
function refresh(){
    if(!loaded){
        if(utils.imgsLoaded()<imgsToLoad.length){
            return;
        }else{
            loaded=true;
            document.getElementById("wrapperDiv").style.display = "";
            document.getElementById("loadingLbl").style.display = "none";
            page_resize();
        }
    }
    utils.clear(g);
    utils.setDrawingColour(g, '#963');
    utils.fillRect(g, 0, bi.height-30, bi.width, 30);
    utils.setDrawingColour(g, 'saddlebrown');
    utils.drawRect(g, 0, bi.height-30, bi.width, 30);
    var plateImg = utils.getImg("/imgs/gallery/burgersim/plate.png");
    utils.drawImg(g, plateImg, {x:1,y:bi.height-bi.width*.06}, bi.width*.2, null);
}

function tick(){
    refresh();
}

function getFromPantry(str){
    str=str.trim().replaceAll(" ","");
}

window.clearCounter = function(){
    
}

class Ingredient{
    constructor(id, img){
        this.id = id;
        this.img = img;
        this.tags = [];
    }
    setTag(arg, val){
        for(var i=0; i<this.tags.length; i++){
            if(tags[i].arg==arg){
                tags[i].val=val;
                return;
            }
        }
        this.tags.push({arg:arg, val:val});
    }
    getTag(arg){
        for(var i=0; i<this.tags.length; i++){
            if(tags[i].arg==arg){
                return tags[i].val;
            }
        }
        return null;
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