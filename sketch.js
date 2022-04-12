
var mouseloc = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// idea: draw a person and have serial inputs 
function draw() {
  background(200);
  var loc = {
    x: mouseX,
    y: mouseY
  }
  // push mouse location into array, updating location
  mouseloc.push(loc)
  
  if (mouseloc.length > 20) {
    mouseloc.splice(1,2);
  }
  
  //draws effect
  for (var i = 0; i < mouseloc.length; i++) {
     // Draw an ellipse for each element in the arrays. 
     // Color and size are tied to the loop's counter: i.
    noStroke();
    fill(255-i*5);
    ellipse(mouseloc[i].x,mouseloc[i].y,i,i);
  }
}
