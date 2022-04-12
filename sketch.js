
let gui;
let noiseScale=0.02;
// create toggle variable
let t;




function setup() {
    createCanvas(400, 400);
    function setup() {

	var clientHeight = document.getElementById('about').clientHeight;
	var clientWidth = document.getElementById('about').clientWidth;

	var cnv = createCanvas(clientWidth, clientHeight);
	cnv.parent("about");
        
	background(0);
}
 // fill(0);
 // frameRate(30);
 // createLoop({duration:3, gif:false});
  // initialize gui
    gui = createGui();
  
  // create toggle
    t = createToggle("Off", 245, 50, 130, 40);
    
  
  // Create Slider.
  // The last two optional arguments define the min and max (minimum and maximum) values.
  // The default min and max values are 0 and 1, respectively.
  s = createSlider("Slider", 60, 10, 300, 32, 100, 300);
//  s2 = createSlider("LeftSlider", 0, 50, 30, 300, 10, 30);

  //set random colors for sketch
  r = random(0, 255)
  g = random(0,255)
  b = random(0,255)
  rcolor = (r,g,b)
}

function draw() {
    background(255)
  //const radius = height / 3
 // const x = cos(animLoop.theta) * radius
 // onst y = sin(animLoop.theta) * radius
  //ellipse(x, y, 50, 50)
  
  
  // creates gui, prints toggle value
    drawGui();
  
  // configures toggle; reports toggle status
    if (t.isPressed) {
    // Print a message when Toggle is pressed
    // that displays its value.
  }
  
  if (t.val) {
    // Draw an ellipse when Toggle is true.
    t.labelOn = "On";
    t.labelOff = "Off";
    fill(rcolor);
    for (let x=0; x < width; x++) {
      let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
      stroke(noiseVal*255);
      line(x, mouseY+noiseVal*80, x, height);
  }
    
    
  if (s.isChanged) {
      // Use Slider's value to determine where the ellipse is drawn.
    noiseScale=map(s.val,0,100,width/2,height/2);
    fill(s.val);
    ellipse(s.val, 300, 100);
}
  }  
}
