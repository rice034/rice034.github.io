import * as utils from "/utils.js";
import { getContentHeight, minContentHeight} from "/template.js";
var root = getComputedStyle(document.documentElement);

/* GUI related */

var g;
var bi;
var imgsToLoad = [];
var itms = [];
window.page_init = function(){
    utils.xhr_fetch("./imglist.txt", function(err, txt){
        if(err){return;}
        var list = txt.split(/\r?\n/).filter(function(line){return line.trim()!==""});
        for(let src of list){
            if(src.split("/").contains("burgersim")){
                utils.loadImg(src);
            }
        }
        for(var i=0; i<imgsToLoad.length; i++){
            utils.loadImg(imgsToLoad[i]);
        }
    });
    document.querySelectorAll("#pantry li").forEach(function(item){
        item.addEventListener("click", function(){
            getFromPantry(item.textContent);
        });
    });
    bi = document.getElementById("mainCanvas");
    g = utils.imgGetGraphics(bi);
    setInterval(tick, 100);
    document.querySelectorAll("li, button").forEach(function(btn){
        btn.addEventListener("click", function(){
            if(btn.textContent){clickHandler(btn.textContent);}
            else{clickHandler(btn.id);}
        });
    });
    bi.addEventListener("mousedown", function(event){
        var rect = bi.getBoundingClientRect();
        var x = Math.floor((event.clientX-rect.left)*bi.width/rect.width);
        var y = Math.floor((event.clientY-rect.top)*bi.height/rect.height);
        x = Math.min(Math.max(0,x),Math.floor(bi.width)-1);
        y = Math.min(Math.max(0,y),Math.floor(bi.height)-1);
        canvasHandler("click", x, y);
    });
    bi.addEventListener("mouseup", function(event){
        var rect = bi.getBoundingClientRect();
        var x = Math.floor((event.clientX-rect.left)*bi.width/rect.width);
        var y = Math.floor((event.clientY-rect.top)*bi.height/rect.height);
        x = Math.min(Math.max(0,x),Math.floor(bi.width)-1);
        y = Math.min(Math.max(0,y),Math.floor(bi.height)-1);
        canvasHandler("release", x, y);
    });
    g = utils.imgGetGraphics(bi);
}

window.page_resize = function(){
    var wrapperDiv = document.getElementById("wrapperDiv");
    wrapperDiv.style.height="1px";
    wrapperDiv.style.height="calc("+document.getElementById("pageContent").scrollHeight+"px - 4em)";
    mainCanvas.width = 800;
    mainCanvas.height = 800*mainCanvas.getBoundingClientRect().height/mainCanvas.getBoundingClientRect().width;
    document.getElementById("info_bottom").style.height = 30/mainCanvas.height*mainCanvas.getBoundingClientRect().height+"px";
    bi = document.getElementById("mainCanvas");
    g = utils.imgGetGraphics(bi);
    refresh();
}

window.clickHandler = function(str){
    str=str.toLowerCase();
    console.log("'"+str+"' clicked");
    switch(str){
        case "brioche": case "potato bun": case "sourdough bread":
        case "white bread slice": case "pretzel bun": case "pineapple bun":
            break;
    }
}
window.canvasHandler = function(type,x,y){
    console.log("mouse "+type+" ("+x+","+y+")");
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
    utils.drawImg(g, plateImg, {x:1,y:bi.height-50}, 150, null);
}

function tick(){
    refresh();
}

function getFromPantry(str){
    str=str.trim().replaceAll(" ","");
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