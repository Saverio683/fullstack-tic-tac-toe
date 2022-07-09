import { useContext, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { socket } from '../..';
import { GameContext } from '../../contexts/game/game.context';
import Grid from '../../components/grid/grid.component';

import './game.styles.scss';      

const GamePage = () => {
    const navigate = useNavigate();
    const { currentPlayer, setCurrentPlayer, turn, setTurn } = useContext(GameContext);

    const setCurrentPlayerAndTurn = (player, turn) => {
        setCurrentPlayer(player)
        setTurn(turn)
    }

    socket.off('startGame').on('startGame', readyPlayers => {
        socket.id === readyPlayers.firstPlayer ?
            setCurrentPlayerAndTurn('X', true)
        :
            setCurrentPlayerAndTurn('O', false)                
    })

    socket.off('gameOver').on('gameOver', () => {
        alert('Game over')
        navigate('/', {replace: true})        
    })

    socket.off('playerWon').on('playerWon', winner => {
        currentPlayer === winner ?
            alert('You won!')
        :
            alert('You lose')
        navigate('/', {replace: true})
    })

    return (
        <div className='game-page'>   
        {
            currentPlayer ? 
            (
                <Fragment>
                    <span className='current-turn'>
                        {
                            turn ?
                                "It's your turn"
                            :
                                "Opponent's turn"                            
                        }
                    </span>
                    <Grid />               
                </Fragment>
            ) : (
                <Fragment>
                    <span>Finding opponents...</span>                   
                    <button onClick={() => {
                        socket.emit('quit')
                        navigate('/', {replace: true})
                    }}>
                        go back
                    </button>   
                </Fragment>
            )
        }           
        </div>
    )
}

export default GamePage;