var EdTivrusky = {} //global var
EdTivrusky.width = window.innerWidth;
EdTivrusky.height = window.innerHeight;

EdTivrusky.velocityX = 11;
EdTivrusky.velocityY = 11;


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
    EdTivrusky.leftImg.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/side_left.svg';

    EdTivrusky.leftImgBlink = new Image();
    EdTivrusky.leftImgBlink.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/side_left_blink.svg';


    EdTivrusky.rightImg = new Image();
    EdTivrusky.rightImg.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/side_right.svg';

    EdTivrusky.rightImgBlink = new Image();
    EdTivrusky.rightImgBlink.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/side_right_blink.svg';


    EdTivrusky.smileImg = new Image();
    EdTivrusky.smileImg.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/smile.svg';

    EdTivrusky.messageImg = new Image();
    EdTivrusky.messageImg.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/message.svg';
    
    EdTivrusky.angryImg = new Image();
    EdTivrusky.angryImg.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/img/angry.svg';

    EdTivrusky.angryMessage = new Image();
    EdTivrusky.angryMessage.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/img/angry_message.svg';

    EdTivrusky.blinkImg = new Image();
    EdTivrusky.blinkImg.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/first_blink.svg';

    EdTivrusky.source = new Image();
    EdTivrusky.source.src = 'https://owlsketch.github.io/hackit_bookmarklet/img/main.svg';
    EdTivrusky.source.onload = function(){ //draw the image once it actually loads
        cntx.drawImage(EdTivrusky.source,0,0);
    }

    document.body.appendChild(F4C3);
    window.requestAnimationFrame(EdTivrusky.draw);
};

EdTivrusky.onClickClone = function(){
        this.remove();

}

EdTivrusky.clone = function() {

        var clone = document.createElement('canvas');
        clone.id = "C10N3";
        clone.height = 100;
        clone.width = 100;
        clone.onclick = EdTivrusky.onClickClone;
        clone.style.cursor = "pointer";
        clone.style.cursor = "hand";
        clone.style.position = "absolute";
        clone.style.zIndex = "1000000";
        clone.style.visibility = "visible";

        //since position is top left corner, need to account for size of face
        clone.style.left = Math.random()*(EdTivrusky.width-100) + "px";
        clone.style.top = Math.random()*(EdTivrusky.height-100) + "px";
    
    
        var cntx = clone.getContext("2d");
        cntx.drawImage(EdTivrusky.smileImg,0,0);

        document.body.appendChild(clone);

}

EdTivrusky.clickedCount = 0;
EdTivrusky.onClickMain = function() {
    var canvas = document.getElementById("F4C3");
    var cntx = canvas.getContext("2d");
    cntx.clearRect(0,0,canvas.width, canvas.height);

    cntx.drawImage(EdTivrusky.blinkImg, 0, 0);
    EdTivrusky.count = EdTivrusky.count + 1;
    
    EdTivrusky.clickedCount = EdTivrusky.clickedCount + 1;
    if(EdTivrusky.clickedCount > 10) //if clicked on 10 times, then do the following
    {
        cntx.clearRect(0,0,canvas.width, canvas.height);

        cntx.drawImage(EdTivrusky.angryImg, 0, 0);
        
        var message = document.createElement('canvas');
        message.id = "M4Dm3ssag3";
        message.height = 120;
        message.width = 200;
        message.style.position = "absolute";
        message.style.zIndex = "1000000";
        message.style.visibility = "visible";

        //get main face position:
        var maincanvas = document.getElementById('F4C3');

        //intial position
        //message.style.left = parseInt(maincanvas.style.left,10);
        //message.style.top = parseInt(maincanvas.style.top, 10);
        message.style.left = maincanvas.offsetLeft -200 + "px";
        message.style.top = maincanvas.offsetHeight + "px";
    
    
        var cntx = message.getContext("2d");
        cntx.drawImage(EdTivrusky.angryMessage,0,0);

        document.body.appendChild(message);


       //wait a thousand milli seconds before ddos attack!
       setTimeout(function() {
        for(var i = 0; i < 200; i++)
        {
        EdTivrusky.clone();
        EdTivrusky.count = EdTivrusky.count + 1;
        }
        }, 2000 );
        EdTivrusky.clickedCount = 0;
    }
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
        EdTivrusky.pastImage = img;//technically present image here,
        //but we need this in order to toggle between onclick image
        //and original image
        cntx.clearRect(0,0,canvas.width, canvas.height);
        cntx.drawImage(img,0,0); //change the image for the movement!
    }

}


EdTivrusky.frames = 0; //frames for current animation
EdTivrusky.scene = 0; //maintains order of when next animation should occur and allows update of frames
EdTivrusky.startTime = 35;
EdTivrusky.nextFrame = EdTivrusky.startTime;
EdTivrusky.pastImage = EdTivrusky.source;
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

    if(EdTivrusky.count == EdTivrusky.startTime + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
        //now reset velocities for next calculations
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;
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

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

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

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

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

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

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

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 4;
    }
    }

    /////////SIXTH, REMOVE SOMETHING
    if(EdTivrusky.scene == 5 && EdTivrusky.count == EdTivrusky.nextFrame)
    {

        var body = document.body;
        EdTivrusky.childnodes = body.childNodes;
        var rect = EdTivrusky.childnodes[EdTivrusky.scene - 4].getBoundingClientRect();
        var nodeX = rect.left; //x and y coordinates of our element
        var nodeY = rect.top;
        
        EdTivrusky.lastCheckedXpos = parseInt(canvas.style.left, 10);
        EdTivrusky.lastCheckedYpos = parseInt(canvas.style.top, 10)
        //1st determine number of frames it will take
        EdTivrusky.frames = EdTivrusky.determineSpeed(EdTivrusky.lastCheckedXpos, EdTivrusky.lastCheckedYpos, nodeX,nodeY);

    }
    

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 5)
    {
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;

    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

       EdTivrusky.childnodes[EdTivrusky.scene-4].remove(); //finally reach now delete
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 60;
    }
    }


    ///////////////another
    if(EdTivrusky.scene == 6 && EdTivrusky.count == EdTivrusky.nextFrame)
    {

        var body = document.body;
        EdTivrusky.childnodes = body.childNodes;
        var rect = EdTivrusky.childnodes[2].getBoundingClientRect();
        var nodeX = rect.left; //x and y coordinates of our element
        var nodeY = rect.top;

        
        EdTivrusky.lastCheckedXpos = parseInt(canvas.style.left, 10);
        EdTivrusky.lastCheckedYpos = parseInt(canvas.style.top, 10)
        //1st determine number of frames it will take
        EdTivrusky.frames = EdTivrusky.determineSpeed(EdTivrusky.lastCheckedXpos, EdTivrusky.lastCheckedYpos, nodeX,nodeY);

    }
    

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 6)
    {
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;

    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

       EdTivrusky.childnodes[2].remove(); //finally reach now delete
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 60;
    }
    }

    ///////////////another
    if(EdTivrusky.scene == 7 && EdTivrusky.count == EdTivrusky.nextFrame)
    {

        var body = document.body;
        EdTivrusky.childnodes = body.childNodes;
        var rect = EdTivrusky.childnodes[3].getBoundingClientRect();
        var nodeX = rect.left; //x and y coordinates of our element
        var nodeY = rect.top;

        
        EdTivrusky.lastCheckedXpos = parseInt(canvas.style.left, 10);
        EdTivrusky.lastCheckedYpos = parseInt(canvas.style.top, 10)
        //1st determine number of frames it will take
        EdTivrusky.frames = EdTivrusky.determineSpeed(EdTivrusky.lastCheckedXpos, EdTivrusky.lastCheckedYpos, nodeX,nodeY);

    }
    

    if(EdTivrusky.count >= EdTivrusky.nextFrame && EdTivrusky.count < (EdTivrusky.nextFrame + EdTivrusky.frames) && EdTivrusky.scene == 7)
    {
    var yPos = parseInt(canvas.style.top,10) + EdTivrusky.velocityY; //add 1 to top dist
    var xPos = parseInt(canvas.style.left,10) + EdTivrusky.velocityX;

    canvas.style.top = yPos + "px";
    canvas.style.left = xPos + "px";

    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    used = true;

    if(EdTivrusky.count == EdTivrusky.nextFrame + EdTivrusky.frames - 1 || EdTivrusky.frames == 1) //if at last "loop"
    {
       EdTivrusky.velocityY = 11;
       EdTivrusky.velocityX = 11;

       EdTivrusky.childnodes[3].remove(); //finally reach now delete
       EdTivrusky.scene = EdTivrusky.scene + 1; 
       //since EdTivrusky.frames is no longer needed, can now use for next indicator
       EdTivrusky.nextFrame = EdTivrusky.nextFrame + EdTivrusky.frames + 60;
    }
    }
    if(!used)
    {
    EdTivrusky.count = EdTivrusky.count + 1; //counts frames given
    }
    window.requestAnimationFrame(EdTivrusky.draw);
}

EdTivrusky.init();

