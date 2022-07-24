let readyPlayers = []
let readyPlayersCount = 0
let avaiableMoves = 9
let win = false
let xMoves, oMoves
let room
/*
GRID:
  a b c
  d e f
  g h i

columns:
  a d g,
  b e h,
  c f i,

rows:
  a b c,
  b e f,
  g h i,

diagonals:
  a e i,
  c e g,
*/

const handleMove = moveData => {
    const { playerValue, movePosition } = moveData;

    const saveMoveAndCheckForWin = (move, arr) => {
        arr.push(move)
        if(arr.length === 3) 
            win = true
    }

    const setMove = (move, positions) => {
        const { columns, rows, diagonals } = positions;
        switch(move) {
            case 'a':
                saveMoveAndCheckForWin(move, columns[0])
                saveMoveAndCheckForWin(move, rows[0])
                saveMoveAndCheckForWin(move, diagonals[0])
                break;
            case 'b':
                saveMoveAndCheckForWin(move, columns[1])
                saveMoveAndCheckForWin(move, rows[0])
                break;
            case 'c':
                saveMoveAndCheckForWin(move, columns[2])
                saveMoveAndCheckForWin(move, rows[0])
                saveMoveAndCheckForWin(move, diagonals[1])
                break;
            case 'd':
                saveMoveAndCheckForWin(move, columns[0])
                saveMoveAndCheckForWin(move, rows[1])
                break;
            case 'e':
                saveMoveAndCheckForWin(move, columns[1])
                saveMoveAndCheckForWin(move, rows[1])
                saveMoveAndCheckForWin(move, diagonals[0])
                saveMoveAndCheckForWin(move, diagonals[1])
                break;
            case 'f':
                saveMoveAndCheckForWin(move, columns[2])
                saveMoveAndCheckForWin(move, rows[1])
                break;
            case 'g':
                saveMoveAndCheckForWin(move, columns[0])
                saveMoveAndCheckForWin(move, rows[2])
                saveMoveAndCheckForWin(move, diagonals[1])
                break;
            case 'h':
                saveMoveAndCheckForWin(move, columns[1])
                saveMoveAndCheckForWin(move, rows[2])
                break;
            case 'i':
                saveMoveAndCheckForWin(move, columns[2])
                saveMoveAndCheckForWin(move, rows[2])
                saveMoveAndCheckForWin(move, diagonals[0])
                break;        
        }         
    }

    playerValue === 'X' ?
        setMove(movePosition, xMoves)
    :
        setMove(movePosition, oMoves)
}

const listen = io => {
    io.on('connection', socket => { 
        console.log('a user connected', socket.id)
    
        socket.on('ready', () => {
            room = Math.floor(readyPlayersCount / 2)            
            console.log('Player ready', socket.id, 'room:', room)
    
            readyPlayersCount ++
            readyPlayers.push(socket.id);
    
            socket.join(room)
    
            if(readyPlayers.length === 2) {
                io.in(room).emit('startGame', { 
                    firstPlayer: readyPlayers[0],
                    secondPlayer: readyPlayers[1]
                })
                readyPlayers = []
                avaiableMoves=9
                win = false
                xMoves = {
                    columns: [ [], [], [] ],
                    rows: [ [], [], [] ],
                    diagonals: [ [], [] ]
                }
                oMoves = {
                    columns: [ [], [], [] ],
                    rows: [ [], [], [] ],
                    diagonals: [ [], [] ]
                }
                console.log('game started') 
            }
        }) 

        socket.on('quit', () => {
            readyPlayersCount--
            readyPlayers.pop()
            socket.leave(room)
        })
     
        socket.on('move', moveData => {
            avaiableMoves--
            handleMove(moveData)
            if(win) {
                io.in(room).emit('playerWon', moveData.playerValue)
            }             
            
            avaiableMoves > 0 ?
                socket.to(room).emit('move', moveData)
            :
                io.in(room).emit('gameOver', moveData)
        })
    
        socket.on('disconnect', reason => {
            console.log(`Client ${socket.id} disconnected: ${reason}`)
        })
    })  
}

module.exports = {
    listen
}