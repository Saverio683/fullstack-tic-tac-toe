import { useState, useContext, useEffect } from 'react';

import { socket } from '../../';
import { GameContext } from '../../contexts/game/game.context';

import './cell.styles.scss';

const Cell = ({ cellPosition }) => {
    const { 
        currentPlayer, 
        move,
        setMove,
        turn,
        setTurn
    } = useContext(GameContext)
    const [cellValue, setCellValue] = useState('')
    const [isClicked, setIsClicked] = useState(false)

    const handleClick = () => {
        if(!isClicked && turn) {            
            setCellValue(currentPlayer)    
            setIsClicked({ isClickedManyTimes: false })     
        }         
    }

    useEffect(() => {
        if(isClicked && !isClicked.isClickedManyTimes) {
            socket.emit('move', {
                movePosition: cellPosition,
                playerValue: currentPlayer
            })                         
            setIsClicked({ isClickedManyTimes: true })
            setTurn(false)
        }
    }, [isClicked, cellPosition, currentPlayer, setTurn])

    socket.off('move').on('move', moveData => { 
        const { movePosition, playerValue } = moveData
        setMove({ movePosition, playerValue})
        setTurn(true)
    })    

    useEffect(() => {        
        if(move.movePosition === cellPosition) {
            setCellValue(move.playerValue)
            setIsClicked({ isClickedManyTimes: true })         
        }
    }, [move, cellPosition])
 
    return (
        <button 
            className={`cell ${cellPosition}`}
            onClick={() => handleClick()}
        >
            {cellValue}
        </button>
    )
}

export default Cell;