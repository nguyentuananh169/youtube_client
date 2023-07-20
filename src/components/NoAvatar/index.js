import clsx from 'clsx';
import styles from './NoAvatar.module.css';
function NoAvatar({ userName = '', customStyles = {} }) {
    let text = '';
    if (userName !== '') {
        const textToArray = userName.split(' ');
        text = textToArray[textToArray.length - 1].slice(0, 1);
    }
    return (
        <div className={clsx(styles.wrapper)} style={customStyles}>
            <span>{text}</span>
        </div>
    );
}

export default NoAvatar;
