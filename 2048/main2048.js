var board = [];
var score = 0; 
var hasChanged = [];

main();

function main(){
    newGame();
    document.addEventListener("keydown",keyDown);
}

function keyDown(event){
    var event = event || window.event;
    switch(event.keyCode){
        case 37 :  // 左箭头键
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
                iswinner(board);
            }
            break;
        case 39 :  // 右箭头键
            if(moveRight()){
                generateOneNumber();
                isGameOver();
                iswinner(board);
            }
            break;
        case 38 :  // 上箭头键
            if(moveUp()){
                generateOneNumber();
                isGameOver();
                iswinner(board);
            }
            break;
        case 40 :  // 下箭头键
            if(moveDown()){
                generateOneNumber();
                isGameOver();
                iswinner(board);
            }
            break;
    }
}

function newGame(){
    score = 0;
    //初始化棋盘格
    initialize();
    //随机在两个格子生成数字
    generateOneNumber();
    generateOneNumber();
    document.addEventListener("keydown",keyDown);
}

function initialize(){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            var id = `${i}-${j}`;
            document.getElementById(id).style.top = `${20 + 120* i}px`;
            document.getElementById(id).style.left = `${20 + 120* j}px`;
        }
    } 


    for(var i = 0;i < 4;i++){
        board[i]=[];
        for(var j = 0;j < 4;j++){
            board[i][j] = 0;
        }
    }

    for(var i = 0;i < 4;i++){
        hasChanged[i]=[];
        for(var j = 0;j < 4;j++){
            hasChanged[i][j] = false;
        }
    }
    
    score = 0;
    updateBoardView();
}

function updateBoardView(){
    var ncs = document.getElementsByClassName("number-cell");               //删除原有number-cell
    
    for(var i = ncs.length - 1;i >= 0;i--){
        ncs[i].parentNode.removeChild(ncs[i]);
       
        
    }

    for(var i = 0;i < 4;i++){                                              //对于每个board数组里的值，创建一个number-cell
        for(var j = 0;j < 4;j++){
            var nc = document.createElement("div"); 
            nc.className = "number-cell";
            nc.id = `nc-${i}-${j}`;

            if(board[i][j] == 0){
                nc.style.width = "0";
                nc.style.height = "0";
                nc.style.position ="absolute";
                
            }
            else{
                nc.style.display = "block";
                nc.style.width = "100px";
                nc.style.height = "100px";
                nc.style.position ="absolute";
                nc.style.top = `${20 + 120 * i}px`;
                nc.style.left = `${20 + 120 * j}px`;
                nc.style.backgroundColor = getNumberCellBackgroundColor(board[i][j]);
                nc.style.color = getNumberCellNumberColor(board[i][j]);
                nc.innerHTML = board[i][j];
            }
            
            document.getElementById("container").appendChild(nc);

            

            hasChanged[i][j] = false;

        }
    }
}

function generateOneNumber(){
    if(noSpace(board)){
        console.log("noSpace");
        return false;
    }

    //随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    while(true){                                                       //判断随机出来的坐标格子上是否已经有值
        if(board[randomX][randomY] == 0){
            break; 
        }
        var randomX = Math.floor(Math.random() * 4);
        var randomY = Math.floor(Math.random() * 4);
    }
    //随机一个数
    var randomNumber = Math.random() < 0.5 ? 2 : 4;
    //显示
    board[randomX][randomY] = randomNumber;
    //setTimeout( "showNumberWithAnimation(randomX,randomY,randomNumber)",300);
    showNumberWithAnimation(randomX,randomY,randomNumber)

       return true;
}


function iswinner(board){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(board[i][j] == 128){
                alert(`We are the champion!!!`);
                document.removeEventListener("keydown",keyDown);
            }
        }
    }
}

function isGameOver(){
    if(noSpace(board) && noMove(board)){
        gameOver();
    }
    return true;
}



function gameOver(){
    alert(`gameover dude!`);
}


function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }

    console.log("a");

    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if(board[i][j] != 0){
                for(var k = 0;k < j;k++){
                    if(board[i][k] == 0 && noBlockHorizentalLeft(i,j,k,board) && hasChanged[i][k] == false){
                        showMoveAnimationHorizental(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    
                    else if(board[i][k] == board[i][j] && noBlockHorizentalLeft(i,j,k,board) && hasChanged[i][k] == false){
                        showMoveAnimationHorizental(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasChanged[i][k] = true;
                        continue;
                        
                    }
                }
            }
        }
    }
        
            
    setTimeout("updateBoardView()",200);                  
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }

    console.log("d");

    for(var i = 0;i < 4;i++){
        for(var j = 2;j >= 0;j--){
            if(board[i][j] != 0){
                for(var k = 3;k > j;k--){
                    if(board[i][k] == 0 && noBlockHorizentalRight(i,j,k,board) && hasChanged[i][k] == false){
                        showMoveAnimationHorizental(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    
                    else if(board[i][k] == board[i][j] && noBlockHorizentalRight(i,j,k,board) && hasChanged[i][k] == false){
                        showMoveAnimationHorizental(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasChanged[i][k] = true;
                        continue;
                        
                    }
                }
            }
        }
    }
        
            
    setTimeout("updateBoardView()",200);                 
    return true;
}


function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }

    console.log("w");

    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            if(board[i][j] != 0){
                for(var l = 0;l < i;l++){
                    if(board[l][j] == 0 && noBlockVerticalUp(i,j,l,board) && hasChanged[l][j] == false){
                        showMoveAnimationVertical(i,j,l,j);
                        board[l][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                    else if(board[l][j] == board[i][j] && noBlockVerticalUp(i,j,l,board) && hasChanged[l][j] == false){
                        showMoveAnimationVertical(i,j,l,j);
                        board[l][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[l][j];
                        updateScore(score);

                        hasChanged[l][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }

    console.log("s");

    for(var j = 0;j < 4;j++){
        for(var i = 2;i >= 0;i--){
            if(board[i][j] != 0){
                for(var l = 3;l > i;l--){
                    if(board[l][j] == 0 && noBlockVerticalDown(i,j,l,board) && hasChanged[l][j] == false){
                        showMoveAnimationVertical(i,j,l,j);
                        board[l][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }

                    else if(board[l][j] == board[i][j] && noBlockVerticalDown(i,j,l,board) && hasChanged[l][j] == false){
                        showMoveAnimationVertical(i,j,l,j);
                        board[l][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[l][j];
                        updateScore(score);

                        hasChanged[l][j] = true;
                        continue;
                    }
                }
            }
        }
    }

    setTimeout("updateBoardView()",200);
    return true;
}