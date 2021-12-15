function showNumberWithAnimation(x,y,n){
    var nc = document.getElementById(`nc-${x}-${y}`);
    nc.style.backgroundColor = getNumberCellBackgroundColor(n);
    nc.style.color = getNumberCellNumberColor(n);
   
    nc.innerHTML = n;

    var d = 0;
    var show = setInterval(frame,1);
    function frame(){
        if (d == 100){
            clearInterval(show);
        }
        else{
            d += 10;
            nc.style.width = `${d}px`;
            nc.style.height = `${d}px`;
            nc.style.top = `${20 + 120 * x}px`;
            nc.style.left = `${20 + 120 * y}px`;
        }
    }
}

function showMoveAnimationHorizental(fromx,fromy,tox,toy){
    var nc = document.getElementById(`nc-${fromx}-${fromy}`);
    

    var dx = 0;
    var dy = 120 * (toy - fromy);

    var ix = 0;
    var iy = (dy / 10);

    console.log(ix);
    console.log(iy);

    var lx = 0;
    var ly = 0;

    var show = setInterval(frame,20);
    function frame(){
        if( ly == dy){
            clearInterval(show);
        }
        else{
            lx += ix;
            ly += iy;

            xCordinate = 20 + 120 * fromx + lx;
            yCordinate = 20 + 120 * fromy + ly;

            nc.style.position ="absolute";
            nc.style.width = "100px";
            nc.style.height = "100px";
            nc.style.top = `${xCordinate}px`;
            nc.style.left = `${yCordinate}px`;   

            console.log(`xCordinate = ${xCordinate}`);
            
            
        
        }
    }
}

function showMoveAnimationVertical(fromx,fromy,tox,toy){
    var nc = document.getElementById(`nc-${fromx}-${fromy}`);
    

    var dx = 120 * (tox - fromx);
    var dy = 120 * (toy - fromy);

    var ix = (dx / 10);
    var iy = 0;

    console.log(ix);
    console.log(iy);

    var lx = 0;
    var ly = 0;

    var show = setInterval(frame,20);
    function frame(){
        if( lx == dx){
            clearInterval(show);
        }
        else{
            lx += ix;
            ly += iy;

            xCordinate = 20 + 120 * fromx + lx;
            yCordinate = 20 + 120 * fromy + ly;

            nc.style.position ="absolute";
            nc.style.width = "100px";
            nc.style.height = "100px";
            nc.style.top = `${xCordinate}px`;
            nc.style.left = `${yCordinate}px`;   

            console.log(`xCordinate = ${xCordinate}`);
            
            
        
        }
    }
}


function updateScore(score){
    document.getElementById("score").innerHTML = score;
}