var nodos = [];
var attr = [];

var mode1 = -1;
var mode2 = -1;

var pos = 1;

currentTool = "add";

//selectMode


$('#add').click(function(){
  currentTool = "add";
});
$('#delete').click(function(){
  currentTool = "delete";
});
$('#move').click(function(){
  currentTool = "move";
});
$('#rename').click(function(){
  currentTool ="rename";
});
$('#matrix').click(function(){
  //Some code
});
//Add Nodes and Arrows
function onMouseUp(event){
    var myCircle = new Path.Circle({
      center: event.point,
      radius: 70
    });
  
    if (collides(myCircle) === true) {
      event.stop();
    } else {
      if(currentTool = "add"){
        
      }
      myCircle.strokeColor = "black";
      myCircle.fillColor = "red";
  
      //añadir texto
      var texto = prompt("Ingrese el nombre del nodo: ");
      $("#myCanvas").trigger("click");
  
      var text = new PointText(new Point(event.point.x, event.point.y - 45));
      text.justification = "center";
      text.fillColor = "white";
      text.fontSize = 25;
      text.content = texto;
  
      myCircle.onDoubleClick = function(event) {
        var i = getNodo(myCircle);
        nodos[i].fillColor = "green";
        if (mode1 < 0 && mode2 < 0) {
          mode1 = i;
        } else {
          if (mode1 >= 0 && mode2 < 0) {
            mode2 = i;
            nodos[mode1].fillColor = "red";
            nodos[mode2].fillColor = "red";
            var pmx = ((nodos[mode1].position.x+nodos[mode2].position.x+(500*pos))/2);
            var pmy = ((nodos[mode1].position.y+nodos[mode2].position.y)/2);
            var pm = new Point(pmx,pmy);
  
            
            if(nodos[mode1].position != nodos[mode2].position) {
              var path = new Path.Arc(
                nodos[mode1].position,
                pm,
                nodos[mode2].position);
                pt = new Point((nodos[mode1].position.x+nodos[mode2].position.x)/2, pmy-(120*pos));
            }
            else{
              if(pos === 1){
                pm.x -= 350;
              }
              else{
                pm.x += 350;
              }
              var path = new Path.Arc(
                nodos[mode1].position,
                pm,
                nodos[mode2].position+2);
                pt = new Point((nodos[mode1].position.x+nodos[mode2].position.x)/2, pmy-(150*pos*-1));
              
            }
  
            var colorcito = Color.random();
            path.strokeColor = colorcito;
            path.strokeWidth = 4;
          
            var texto = prompt("Ingrese el valor del attr: ");
            
          
            var text = new PointText(pt);
            text.justification = "center";
            text.fillColor = colorcito;
            text.fontSize = 25;
            text.content = texto;
            var vector  = path.getPointAt(path.length) - path.getPointAt(path.length-25); 
                      var arrowVector = vector.normalize(18);
                      var path2 = new Path({
                        segments: [path.getPointAt(path.length) + arrowVector.rotate(145), path.getPointAt(path.length), path.getPointAt(path.length) + arrowVector.rotate(-145)],
                        fillColor: colorcito,
                        strokeWidth: 6,              
                      });
            
            attr.push(path);
              
            pos *= -1;
            mode1 = -1;
            mode2 = -1;
          }
        }
      };
  
      nodos.push(myCircle);
    }
  }



function collides(nodo) {
  for (var i = 0; i < nodos.length; i++) {
    var collision = nodo.getIntersections(nodos[i]);
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

function puntoMedio(pos1,pos2){
  return new Point(((pos1.x+pos2.x+100)/2),((pos1.y+pos2.y)/2))
}
