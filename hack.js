var EdTivrusky = {} //global var
EdTivrusky.width = window.innerWidth;
EdTivrusky.height = window.innerHeight;
EdTivrusky.count = 0;
EdTivrusky.blinkCount = 0;

//Since our bookmarklet isn't run immediatly, function doesn't need to wait
//for DOM to be loaded
EdTivrusky.init = function () {

    var x = 40;
    var F4C3 = document.createElement('canvas');
    F4C3.id = "F4C3";
    F4C3.height = 100;
    F4C3.width = 100;
    F4C3.style.position = "absolute";
    F4C3.style.zIndex = "1000000";
    F4C3.style.visibility = "visible";
    
    //intial position
    F4C3.style.left = EdTivrusky.width/6 + "px";
    F4C3.style.top = EdTivrusky.height/4 + "px";


    var cntx = F4C3.getContext("2d");
    
    EdTivrusky.blinkImg = new Image();
    EdTivrusky.blinkImg.src = 'img/first_blink.svg';

    EdTivrusky.smileImg = new Image();
    EdTivrusky.smileImg.src = 'img/smile.svg';
    
    EdTivrusky.source = new Image();
    EdTivrusky.source.src = 'img/drawing.svg';
    EdTivrusky.source.onload = function(){ //draw the image once it actually loads
        cntx.drawImage(EdTivrusky.source,0,0);
    }

    document.body.appendChild(F4C3);
    window.requestAnimationFrame(EdTivrusky.draw);
};

EdTivrusky.startAnimation = function(canvas) {

    //move to first position
    if(EdTivrusky.count >= 20 && EdTivrusky.count <= 60)
    {
    EdTivrusky.firstPos(canvas);
    }
    //move to second position
    else if(EdTivrusky.count >= 61 && EdTivrusky.count <= 101)
    {
    EdTivrusky.secondPos(canvas);
    }
    else if(EdTivrusky.count >= 140) {
    cntx.drawImage(EdTivrusky.smileImg, 0,0);
    }
    
    //blinking controls
    if(EdTivrusky.count < 140)
    {
    if(EdTivrusky.count % 100 == 0 || EdTivrusky.blinkCount < 6)
    {
    cntx.drawImage(EdTivrusky.blinkImg, 0,0);
    EdTivrusky.blinkCount = EdTivrusky.blinkCount + 1;
        if(EdTivrusky.count % 100 == 0)
        {
            EdTivrusky.blinkCount = 0;
        }
    }
    else {
    cntx.drawImage(EdTivrusky.source, 0, 0);
    }
    }


    EdTivrusky.count = EdTivrusky.count + 1;
}

EdTivrusky.firstPos = function(canvas) {
    //animate here
    var topPos = parseInt(canvas.style.top) + 4; //add 1 to top dist
    var leftPos = parseInt(canvas.style.left) + 6;
    canvas.style.top = topPos + "px";
    canvas.style.left = leftPos + "px";
}

EdTivrusky.secondPos = function(canvas) {
    //animate here
    var topPos = parseInt(canvas.style.top) - 4; //add 1 to top dist
    var leftPos = parseInt(canvas.style.left) + 6;
    canvas.style.top = topPos + "px";
    canvas.style.left = leftPos + "px";
}

EdTivrusky.thirdPos = function(canvas) {
    //animate here
    var topPos = parseInt(canvas.style.top) - 4; //add 1 to top dist
    var leftPos = parseInt(canvas.style.left) + 6;
    canvas.style.top = topPos + "px";
    canvas.style.left = leftPos + "px";
}

EdTivrusky.draw = function() {
    var canvas = document.getElementById("F4C3");
    cntx = canvas.getContext("2d");
   
    EdTivrusky.startAnimation(canvas);
    window.requestAnimationFrame(EdTivrusky.draw);
}

EdTivrusky.init();

