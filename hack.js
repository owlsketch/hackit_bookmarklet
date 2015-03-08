var EdTivrusky = {} //global var
EdTivrusky.width = window.innerWidth;
EdTivrusky.height = window.innerHeight;

EdTivrusky.velocityX = 9;
EdTivrusky.velocityY = 9;


EdTivrusky.count = 0;
EdTivrusky.blinkCount = 0;

//Since our bookmarklet isn't run immediatly, function doesn't need to wait
//for DOM to be loaded
EdTivrusky.init = function () {

    var F4C3 = document.createElement('canvas');
    F4C3.id = "F4C3";
    F4C3.height = 120;
    F4C3.width = 120;
    F4C3.onclick = EdTivrusky.onClickMain;
    F4C3.style.cursor = "pointer";
    F4C3.style.cursor = "hand";
    F4C3.style.position = "absolute";
    F4C3.style.zIndex = "1000000";
    F4C3.style.visibility = "visible";
    
    //intial position
    F4C3.style.left = EdTivrusky.width/6 + "px";
    F4C3.style.top = EdTivrusky.height/4 + "px";
    
    EdTivrusky.lastCheckedXpos = Math.round(EdTivrusky.width/6); 
    EdTivrusky.lastCheckedYpos = Math.round(EdTivrusky.height/4);


    var cntx = F4C3.getContext("2d");
    
    //loading all the images we'll need
    
    EdTivrusky.leftImg = new Image();
    EdTivrusky.leftImg.src = 'img/side_left.svg';

    EdTivrusky.leftImgBlink = new Image();
    EdTivrusky.leftImgBlink.src = 'img/side_left_blink.svg';


    EdTivrusky.rightImg = new Image();
    EdTivrusky.rightImg.src = 'img/side_right.svg';

    EdTivrusky.rightImgBlink = new Image();
    EdTivrusky.rightImgBlink.src = 'img/side_right_blink.svg';


    EdTivrusky.smileImg = new Image();
    EdTivrusky.smileImg.src = 'img/smile.svg';

    EdTivrusky.messageImg = new Image();
    EdTivrusky.messageImg.src = 'img/message.svg';
    


    EdTivrusky.blinkImg = new Image();
    EdTivrusky.blinkImg.src = 'img/first_blink.svg';

    EdTivrusky.source = new Image();
    EdTivrusky.source.src = 'img/main.svg';
    EdTivrusky.source.onload = function(){ //draw the image once it actually loads
        cntx.drawImage(EdTivrusky.source,0,0);
    }

    document.body.appendChild(F4C3);
    window.requestAnimationFrame(EdTivrusky.draw);
};

EdTivrusky.onClickMain = function() {
    console.log("OW");
}

EdTivrusky.determineSpeed = function(originX, originY, destinationX, destinationY) {
   var yDist = destinationY - originY; //determining y displacement 
   var xDist = destinationX - originX;

   if(xDist < 0) {
        EdTivrusky.velocityX = -(EdTivrusky.velocityX);
   }
   if(yDist < 0) {
        EdTivrusky.velocityY = -(EdTivrusky.velocityY);
   }

   //getting frames it would take for each
   var yFrames = Math.abs(Math.round(yDist/EdTivrusky.velocityY));
   var xFrames = Math.abs(Math.round(xDist/EdTivrusky.velocityX));

   if(yFrames > xFrames){
       EdTivrusky.velocityX = Math.round(xDist/yFrames);
       return yFrames;
   }
   else { //xFrames is greater
       EdTivrusky.velocityY = Math.ceil(yDist/xFrames);
       return xFrames;
   }
}

EdTivrusky.initScene = function(canvas, cntx, scene, img, destX, destY) {
    if(EdTivrusky.count == EdTivrusky.nextFrame && EdTivrusky.scene == scene)
    {
        //go from current position, to next position
        //
        //get current coordinates
        EdTivrusky.lastCheckedXpos = parseInt(canvas.style.left, 10);
        EdTivrusky.lastCheckedYpos = parseInt(canvas.style.top, 10)
        //1st determine number of frames it will take
        EdTivrusky.frames = EdTivrusky.determineSpeed(EdTivrusky.lastCheckedXpos, EdTivrusky.lastCheckedYpos, destX,destY);
        //our x and y velocities should be set now too
        // now drawing the new face
        cntx.clearRect(0,0,canvas.width, canvas.height);
        cntx.drawImage(img,0,0); //change the image for the movement!
    }

}

EdTivrusky.deleteElement = function() {
    console.log("TEST");
}

EdTivrusky.frames = 0; //frames for current animation
EdTivrusky.scene = 0; //maintains order of when next animation should occur and allows update of frames
EdTivrusky.startTime = 35;
EdTivrusky.nextFrame = EdTivrusky.startTime;
EdTivrusky.draw = function() {
    var used = false;
    var canvas = document.getElementById("F4C3");
    cntx = canvas.getContext("2d");
    
    //At frame 20 GOING FROM 1st Position to 2nd
    EdTivrusky.initScene(canvas, cntx, 0, EdTivrusky.rightImg, Math.round(EdTivrusky.width/1.5), Math.round(EdTivrusky.height/2.5));

    if(EdTivrusky.count >= EdTivrusky.startTime && EdTivrusky.count < ( EdTivrusky.startTime + EdTivrusky.frames) && EdTivrusky.scene == 0)
    {
    //have # of frames needed and appropriate velocities
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;
    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.startTime + EdTivrusky.frames - 1 ) //if at last "loop"
    {
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.startTime + EdTivrusky.frames + 35; //30 frames after this animation completed, execute second scene
    }
    }

    //////SECOND SCENE

    EdTivrusky.initScene(canvas, cntx, 1, EdTivrusky.leftImg, Math.round(EdTivrusky.width/3.75), Math.round(EdTivrusky.height/1.5));

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 1)
    {
    //have # of frames needed and appropriate velocities
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;
    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 ) //if at last "loop"
    {
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 30; //again have a 30 second wait.
    }
    }



    //////THIRDD SCENE GOING TO CENTER 
    EdTivrusky.initScene(canvas, cntx, 2, EdTivrusky.rightImg, Math.round(EdTivrusky.width/2), Math.round(EdTivrusky.height/2));

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 2)
    {
    //have # of frames needed and appropriate velocities
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;
    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 ) //if at last "loop"
    {
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 3; //wait for 3 frames
    }
    }


    //////FOURTH SCENE SMILE AND MESSAGE! "1M 601N6 2 H4CK U MOTHERF*&$#@!"
    if(EdTivrusky.scene == 3 && EdTivrusky.count == EdTivrusky.nextFrame)
    {
        //go from current position, to next position
        //
        //get current coordinates
        EdTivrusky.lastCheckedXpos = parseInt(canvas.style.left, 10);
        EdTivrusky.lastCheckedYpos = parseInt(canvas.style.top, 10)
        //1st determine number of frames it will take
        EdTivrusky.frames = EdTivrusky.determineSpeed(EdTivrusky.lastCheckedXpos, EdTivrusky.lastCheckedYpos, Math.round(EdTivrusky.width/2),Math.round(EdTivrusky.height/2));
        //our x and y velocities should be set now too
        
        // now drawing the new face
        cntx.clearRect(0,0,canvas.width, canvas.height);
        cntx.drawImage(EdTivrusky.smileImg,0,0); //change the image for the movement!
        
        var message = document.createElement('canvas');
        message.id = "m3ssag3";
        message.height = 80;
        message.width = 120;
        message.style.position = "absolute";
        message.style.zIndex = "1000000";
        message.style.visibility = "visible";
        
        //intial position
        message.style.left = EdTivrusky.width/2 - 125 + "px";
        message.style.top = EdTivrusky.height/2 - 30 + "px";
    
    
        var cntx = message.getContext("2d");
        cntx.drawImage(EdTivrusky.messageImg,0,0);

        document.body.appendChild(message);
    }
    

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 3)
    {
    //have # of frames needed and appropriate velocities
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;
    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 ) //if at last "loop"
    {
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 140;
    }
    }

    /////////FIFTH, REMOVE
    if(EdTivrusky.scene == 4 && EdTivrusky.count == EdTivrusky.nextFrame)
    {
        document.getElementById("m3ssag3").remove();

    }
    

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 4)
    {
    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 ) //if at last "loop"
    {
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 4;
    }
    }

    /////////SIXTH, REMOVE SOMETHING
    if(EdTivrusky.scene == 5 && EdTivrusky.count == EdTivrusky.nextFrame)
    {

        var body = document.body;
        var childnodes = body.childNodes;
        childnodes[1].remove();
    }
    

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 5)
    {
    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 ) //if at last "loop"
    {
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 20;
    }
    }



    if(!used)
    {
    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    }
    window.requestAnimationFrame(EdTivrusky.draw);
}

EdTivrusky.init();

