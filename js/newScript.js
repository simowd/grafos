//create Classes
function nodo(nom, text, circle) {
    this.nom = nom;
    this.text = text;
    this.circle = circle;
    out = [];
    inp = [];
}

function flecha(attr, text, path, init, end) {
    this.attr = attr;
    this.text = text;
    this.path = path;
    this.init = init;
    this.end = end;
}

//variables

var nodes = [];
currentTool = "add";

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
    myCircle.onMouseDrag = function(event){
        if(currentTool === "move"){
            myCircle.position = event.point;
            textIt.position = new Point(event.point.x, event.point.y - 45);
        }
    };
    //rename node
    myCircle.onMouseDown = function (event){
        if(currentTool === "rename"){
            var newText = prompt("Ingrese el nuevo nombre");
            textIt.content = newText;
            var pos = getNodo(event.point);
            nodes[pos].nom = newText;
        }
    };
    //create Object
    nodeObj = new nodo(texto, textIt, myCircle);
    nodes.push(nodeObj);
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
