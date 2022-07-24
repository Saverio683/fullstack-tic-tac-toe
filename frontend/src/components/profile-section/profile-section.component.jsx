import { useSelector } from 'react-redux'

import './profile-section.styles.scss';
import profileImage from './profile.jpg';

const ProfileSection = () => {
    const { username, gamesPlayed, gamesWon, gamesLost, draws } = useSelector(state => state.user)

    return (
        <div className='profile-section'>
            <img src={profileImage} alt='profile' className='profile-image'/>
            <span className='profile-name'>{ username || 'GUEST' }</span>
            <div className='stats'>
                <span className='stat'>PLAYED: { gamesPlayed || '0' }</span>
                <span className='stat'>WON: { gamesWon || '0' }</span>
                <span className='stat'>LOST: { gamesLost || '0' }</span>
                <span className='stat'>DRAWS: { draws || '0' }</span>  
            </div>
        </div>
    )
}

export default ProfileSection;