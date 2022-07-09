import { createContext, useState } from 'react';

export const GameContext = createContext({
    currentPlayer: undefined,
    setCurrentPlayer: () => null,
    move: {},
    setMove: () => null,
    turn: undefined,
    setTurn: () => null
}) 

export const GameProvider = ({ children }) => {
    const [currentPlayer, setCurrentPlayer] = useState(undefined)
    const [move, setMove] = useState({})
    const [turn, setTurn] = useState(undefined)

    const value = { 
        currentPlayer, 
        setCurrentPlayer, 
        move,
        setMove,
        turn,
        setTurn
     };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )  
}