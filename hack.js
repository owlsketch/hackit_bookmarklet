//Since our bookmarklet isn't run immediatly, function doesn't need to wait
//for DOM to be loaded
var R4D1C4L = function () {
    var F4C3 = document.createElement('canvas');
    F4C3.height = 100;
    F4C3.width = 100;
    F4C3.style.position = "absolute";
    F4C3.style.zIndex = "1000000";
    F4C3.style.visibility = "visible";
    
    //intial position
    F4C3.style.left = "20px";
    F4C3.style.top = "40px";


    var cntx = F4C3.getContext("2d");

    var source = new Image();
    source.src = 'img/drawing.svg';
    source.onload = function(){
        cntx.drawImage(source,0,0);
    }

    /* This was an attempt to draw the faces with canvas code.
     * Too time consuming. Decided to use svgs instead.
    cntx.fillStyle = 'rgba(245,236,46,1)'; //yellow
    cntx.strokeStyle = 'rgb(14,29,36)'; //dark dark blue
    

    //BODY
    cntx.beginPath();
    cntx.arc(50,50,45, 0, 2*Math.PI, false); //false means flow is clockwise
    cntx.lineWidth = 4;
    cntx.fill();
    cntx.stroke();

    //EYES
    
    //MOUTH
    cntx.beginPath();
    cntx.moveTo(55,60);
    cntx.lineTo(70,70);
    cntx.lineTo(55,80);
    cntx.stroke();

    //BLUSHES
    //BLUSH LEFT
    cntx.save();
    cntx.scale(2.2,1);
    cntx.beginPath();
    cntx.arc(12,55,5, 0, Math.PI * 2, false);
    cntx.restore();

    cntx.fillStyle = 'rgba(237,43,36,1)';
    cntx.fill();

    //BLUSH RIGHT
    cntx.save();
    cntx.scale(2.2,1);
    cntx.beginPath();
    cntx.arc(36,55,5, 0, Math.PI * 2, false);
    cntx.restore();

    cntx.fill();
    */

    document.body.appendChild(F4C3);
};

R4D1C4L();

