import { useNavigate } from 'react-router-dom';

import ProfileSection from '../../components/profile-section/profile-section.component';
import Ranking from '../../components/ranking/ranking.component';
import { socket } from '../..';

import './home.styles.scss';

const HomePage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/game', { replace: true })
        socket.emit('ready')
        console.log('Connected as ', socket.id)          
    }

    return (
        <div className='home-container'>
            <Ranking />
            <div className='button-container'>
                <div className='wrapper'>
                    <button onClick={handleClick}>
                        NEW GAME
                    </button>
                    <button onClick={() => navigate('/register', { replace: true })}>
                        REGISTER
                    </button>
                    <button>SETTINGS</button>
                </div>
            </div>
            <ProfileSection />
        </div>
    )
}

export default HomePage;