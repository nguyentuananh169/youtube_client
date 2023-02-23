import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Menu.module.css';
function Menu({ data, isToggleGuide, guideType }) {
    return (
        <div
            className={clsx(styles.wrapper, { [styles.toggle]: isToggleGuide })}
            data-type={guideType}
        >
            {data.map((item, index) => (
                <ul key={index}>
                    {item.title && <h3 className={clsx(styles.title)}>{item.title}</h3>}
                    {item.menu.map((item2, index2) => (
                        <li key={index2} className={clsx({ [styles.visible]: item2.isVisible })}>
                            <NavLink
                                to={item2.path}
                                className={(nav) => clsx({ [styles.active]: nav.isActive })}
                                end
                            >
                                {item2.type === 'channel' ? (
                                    <img className={clsx(styles.avatar)} src={item2.avatar} />
                                ) : (
                                    <>
                                        <span className={clsx(styles.icon, styles.ic1)}>
                                            {item2.icon1}
                                        </span>

                                        <span className={clsx(styles.icon, styles.ic2)}>
                                            {item2.icon2 || item2.icon1}
                                        </span>
                                    </>
                                )}
                                <span className={clsx(styles.text)}>{item2.text}</span>
                                {item2.type === 'channel' && item2.online && (
                                    <span className={clsx(styles.online)}></span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
}

export default Menu;
