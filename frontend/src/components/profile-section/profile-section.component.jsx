import './profile-section.styles.scss';
import profileImage from './profile.jpg';

const ProfileSection = ({name, played, won, lost, draws}) => {

    return (
        <div className='profile-section'>
            <img src={profileImage} alt='profile' className='profile-image'/>
            <span className='profile-name'>PROFILE NAME</span>
            <div className='stats'>
                <span className='stat'>PLAYED: 0</span>
                <span className='stat'>WON: 0</span>
                <span className='stat'>LOST: 0</span>
                <span className='stat'>DRAWS: 0</span>  
            </div>
        </div>
    )
}

export default ProfileSection;