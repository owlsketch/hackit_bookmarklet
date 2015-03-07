//Since our bookmarklet isn't run immediatly, function doesn't need to wait
//for DOM to be loaded
var R4D1C4L = function () {
    var F4C3 = document.createElement('canvas');
    F4C3.height = 100;
    F4C3.width = 100;
    F4C3.style.position = "absolute";
    F4C3.style.zIndex = "1000000";
    F4C3.style.visibility = "visible";
    F4C3.style.left = "10px";
    F4C3.style.top = "10px";


    var cntx = F4C3.getContext("2d");
    cntx.fillRect(5,5,90,90);
    document.body.appendChild(F4C3);
};

R4D1C4L();

