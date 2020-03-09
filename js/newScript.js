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
});
$("#delete").click(function() {
  currentTool = "delete";
});
$("#rename").click(function() {
  currentTool = "rename";
});
$("#matrix").click(function() {
  //Some code
});

//Main Function
function onMouseUp(event) {
  var myCircle = createCircle(event);
  if (collides(myCircle) === false) {
    if (currentTool === "add") {
      crearNodo(event,myCircle);
    }
    else if(currentTool === "delete"){

    }
  }
  else{
      if(currentTool === "delete"){
          deleteNode(event);
      }
  }
}

//deleteNodo
function deleteNode(event){
    var del = isContained(event.point);
    var pos = nodes.indexOf(del)
    del.circle.remove();
    del.text.remove();
    nodes.splice(pos,1);
}

//addNodo
function crearNodo(event, myCircle){
    myCircle.fillColor = "red";
    //obtención nombre
    var texto = prompt("Ingrese el nombre del nodo: ");
    //get text file
    var textIt = textItem(event, texto);
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

function getNodo(nodo) {
  for (var i = 0; i < nodos.length; i++) {
    if (nodos[i] === nodo) {
      return i;
    }
  }
}
