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

var nodos = [];
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
    console.log(collides(myCircle));
  var myCircle = createCircle(event);
  if (collides(myCircle) === false) {
    myCircle.fillColor = "red";
    //obtención nombre
    var texto = prompt("Ingrese el nombre del nodo: ");
    //get text file
    var textIt = textItem(event,texto);
  }
}

//additional functions

function textItem(event,texto){
    var text = new PointText(new Point(event.point.x, event.point.y - 45));
      text.justification = "center";
      text.fillColor = "white";
      text.fontSize = 25;
      text.content = texto;
}

function createCircle(event) {
  var myCircle = new Path.Circle({
    center: event.point,
    radius: 70
  });
  return myCircle;
}

function collides(nodo) {
  for (var i = 0; i < nodos.length; i++) {
    var collision = nodo.getIntersections(nodos[i].circle);
    if (collision.length !== 0) {
      return true;
    }
  }
  return false;
}

function getNodo(nodo) {
  for (var i = 0; i < nodos.length; i++) {
    if (nodos[i] === nodo) {
      return i;
    }
  }
}
