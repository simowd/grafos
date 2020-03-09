//create Classes
function nodo(nom, text, circle) {
    this.nom = nom;
    this.text = text;
    this.circle = circle;
    out = [];
    inp = [];
}

function flecha(attr, text, path, path2, init, end) {
    this.attr = attr;
    this.text = text;
    this.path = path;
    this.path2 = path2;
    this.init = init;
    this.end = end;
}

//variables

var nodes = [];
var arrows = [];
var currentTool = "add";
var mod1 = -1;
var mod2 = -1;
var pos = 1;

//menu

$("#add").click(function() {
    currentTool = "add";
    $("#add").addClass("selected");
    $("#delete").removeClass();
    $("#rename").removeClass();
    $("#move").removeClass();
});
$("#delete").click(function() {
    currentTool = "delete";
    $("#delete").addClass("selected");
    $("#add").removeClass();
    $("#rename").removeClass();
    $("#move").removeClass();
});
$("#rename").click(function() {
    currentTool = "rename";
    $("#rename").addClass("selected");
    $("#delete").removeClass();
    $("#add").removeClass();
    $("#move").removeClass();
});
$("#move").click(function() {
    currentTool = "move";
    $("#move").addClass("selected");
    $("#delete").removeClass();
    $("#add").removeClass();
    $("#rename").removeClass();
});
$("#matrix").click(function() {
    //Some code
});

//Main Function
function onMouseUp(event) {
    var myCircle = createCircle(event);
    if (collides(myCircle) === false) {
        if (currentTool === "add") {
            crearNodo(event, myCircle);
            
        }
    } else {
        if (currentTool === "delete") {
            deleteNode(event);
        }
    }
    console.log(nodes);
}

//deleteNodo
function deleteNode(event) {
    var del = isContained(event.point);
    var pos = nodes.indexOf(del);
    del.circle.remove();
    del.text.remove();
    nodes.splice(pos, 1);
}

//addNodo
function crearNodo(event, myCircle) {
    myCircle.fillColor = "red";
    //obtención nombre
    var texto = prompt("Ingrese el nombre del nodo: ");
    //get text file
    var textIt = textItem(event, texto);

    //move parameter
    myCircle.onMouseDrag = function(event) {
        if (currentTool === "move") {
            myCircle.position = event.point;
            textIt.position = new Point(event.point.x, event.point.y - 45);
        }
    };
    //rename node
    myCircle.onMouseDown = function(event) {
        if (currentTool === "rename") {
            var newText = prompt("Ingrese el nuevo nombre");
            textIt.content = newText;
            var pos = getNodo(event.point);
            nodes[pos].nom = newText;
        }
    };

    myCircle.onDoubleClick = function(event){
        if(currentTool === "add"){
            if(mod1 < 0 && mod2 < 0){
                mod1 = getNodo(event.point);
                nodes[mod1].circle.fillColor = "green";
            }
            else if (mod1 >= 0 && mod2 < 0){
                mod2 = getNodo(event.point);
                generarFlecha(mod1,mod2);
                nodes[mod1].circle.fillColor = "red";
                mod1 = -1;
                mod2 = -1;
            }
        }
    }
    //create Object
    nodeObj = new nodo(texto, textIt, myCircle);
    nodes.push(nodeObj);
}

//Generate Arrow
function generarFlecha(mod1,mod2){
    var puntoIni = nodes[mod1].circle.position;
    var puntoFini = nodes[mod2].circle.position;
    a = drawArrow(puntoIni,puntoFini);
    var arrow = new flecha(a[3],a[2],a[0],a[1],nodes[mod1].nom,nodes[mod2].nom);
    arrows.push(arrow);
}

//additional functions

function textItem(event, texto) {
    var text = new PointText(new Point(event.point.x, event.point.y - 45));
    text.justification = "center";
    text.fillColor = "white";
    text.fontSize = 25;
    text.content = texto;
    return text;
}

function createCircle(event) {
    var myCircle = new Path.Circle({
        center: event.point,
        radius: 70
    });
    return myCircle;
}

function collides(nodo) {
    for (var i = 0; i < nodes.length; i++) {
        var myCircle = nodes[i].circle;
        var collision = nodo.getIntersections(myCircle);
        if (collision.length !== 0) {
            return true;
        }
    }
    return false;
}

function isContained(point) {
    for (var i = 0; i < nodes.length; i++) {
        var myCircle = nodes[i].circle;
        var isContain = myCircle.contains(point);
        if (isContain) {
            return nodes[i];
        }
    }
}

function getNodo(point) {
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].circle.contains(point)) {
            return i;
        }
    }
}

//arrow code

function drawArrow(begin, end) {
    if(begin == end){
        end = end + new Size(50,50);
    }
    var pathL = new Path.Line(begin, end);
    var offset = (5 / 10) * pathL.length;
    var point = pathL.getPointAt(offset);
    var mult = 125*pos;
    var normal = pathL.getNormalAt(offset) * 125;
    pos = pos * -1;
    var middlePoin = point + normal;
    var path = new Path.Arc(begin, middlePoin, end);
    path.strokeColor = "red";

    //var line = new Path.Line(point, point + (normal*1.1));
    //line.strokeColor = "black";

    var colorcito = Color.random();
    path.strokeColor = colorcito;
    path.strokeWidth = 3;
    var vector =
        path.getPointAt(path.length) - path.getPointAt(path.length - 25);
    var arrowVector = vector.normalize(18);
    var path2 = new Path({
        segments: [
            path.getPointAt(path.length) + arrowVector.rotate(145),
            path.getPointAt(path.length),
            path.getPointAt(path.length) + arrowVector.rotate(-145)
        ],
        fillColor: colorcito,
        strokeWidth: 6
    });

    //generar atributo
    var attr = prompt("Ingrese el valor atributo:");
    var text = new PointText(point+(normal*1.2));
    text.justification = "center";
    text.fillColor = colorcito;
    text.fontSize = 25;
    text.content = attr;

    text.onMouseDown = function(event) {
        if (currentTool === "rename") {
            var newText = prompt("Ingrese el nuevo atributo");
            text.content = newText;
            var pos = getFlecha(event.point);
            arrows[pos].attr = newText;
        }
    };

    var paths = [path,path2,text,attr];
    return paths;
}

//punto medio
function puntoMedio(pos1, pos2) {
    return new Point((pos1.x + pos2.x + 100) / 2, (pos1.y + pos2.y) / 2);
}

function getFlecha(point){
    for (var i = 0; i < arrows.length; i++) {
        if (arrows[i].text.contains(point)) {
            return i;
        }
    }
}
