function getNumberCellBackgroundColor(number){
    switch(number){
        case 2: return "rgb(233,150,122)"; break;
        case 4: return "rgb(250,128,114)"; break;
        case 8: return "rgb(255,160,122)"; break;
        case 16: return "rgb(255,165,0)"; break;
        case 32: return "rgb(255,140,0)"; break;
        case 64: return "rgb(255,127,80)"; break;
        case 128: return "rgb(240,128,128)"; break;
        case 256: return "rgb(255,99,71)"; break;
        case 512: return "rgb(255,0,0)"; break;
        case 1024: return "rgb(238,130,238)"; break;
        case 2048: return "rgb(255,215,0)"; break;
    }
    return "black";
}

function getNumberCellNumberColor(number){
   if(number <= 4){
       return "rgb(245,222,179)";
   }
   else{
    return "white";
   }
    
}

function noSpace(board){
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}

function canMoveLeft(board){
    for(var i = 0;i < 4;i++){
        for(var j = 1;j < 4;j++){
            if(board[i][j] != 0){
                if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}


function canMoveRight(board){
    for(var i = 0;i < 4;i++){
        for(var j = 2;j >= 0;j--){
            if(board[i][j] != 0){
                if(board[i][j + 1] == 0 || board[i][j+1] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board){
    for(var j = 0;j < 4;j++){
        for(var i = 1;i < 4;i++){
            if(board[i][j] != 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board){
    for(var j = 0;j < 4;j++){
        for(var i = 2;i >= 0;i--){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockVerticalUp(i,j,l,board){
    for(var t = i - 1;t > l ;t--){
        if(board[t][j] != 0){
            return false;
        }
    }
    return true;
}

function noBlockVerticalDown(row1,col,row2,board){
    for(var l = row1 + 1;l < row2 ;l++){
        if(board[l][col] != 0){
            return false;
        }
    }
    return true;
}

function noBlockHorizentalLeft(row,col2,col1,board){
    for(var l = col1 + 1;l < col2;l++){
        if(board[row][l] != 0){
            return false;
        }
    }
    return true;
}


function noBlockHorizentalRight(row,col2,col1,board){
    for(var l = col2 + 1;l < col1;l++){
        if(board[row][l] != 0){
            return false;
        }
    }
    return true;
}

function noMove(board){
    if(!canMoveDown(board) && !canMoveLeft(board) && !canMoveRight(board) && !canMoveUp(board)){
        return true;
    }

    return false;
}