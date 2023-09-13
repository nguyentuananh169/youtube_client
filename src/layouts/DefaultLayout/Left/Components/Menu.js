import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import useStore from '../../../../hook/useStore';
import DotMenu from '../../../../components/DotMenu';
import { setIsToggleNavBar } from '../../../../store/actions';
import NoAvatar from '../../../../components/NoAvatar';
import styles from './Menu.module.css';
function Menu({ isMobile, isToggleNavbar, data }) {
    const [, dispatch] = useStore();
    return (
        <div
            className={clsx(styles.wrapper, {
                [styles.toggle]: isToggleNavbar,
                [styles.mobile]: isMobile,
            })}
        >
            {data.map((item, index) => (
                <ul key={index} className={clsx({ [styles.hidden]: item.isHidden })}>
                    {item.title && <h3 className={clsx(styles.title)}>{item.title}</h3>}
                    {item.title2 && <span className={clsx(styles.title2)}>{item.title2}</span>}
                    {item.menu.map((item2, index2) => (
                        <Fragment key={index2}>
                            {item2?.component ? (
                                <div className={clsx(styles.login)}>{item2.component}</div>
                            ) : (
                                <li
                                    className={clsx({
                                        [styles.visible]: item2.isVisible,
                                        [styles.hidden]: item2.isHidden,
                                    })}
                                >
                                    <NavLink
                                        to={item2.path}
                                        className={(nav) => clsx({ [styles.active]: nav.isActive })}
                                        end
                                    >
                                        {item2.type === 'channel' ? (
                                            item2.avatar ? (
                                                <img
                                                    className={clsx(styles.avatar)}
                                                    src={item2.avatar}
                                                />
                                            ) : (
                                                <div className={clsx(styles.noAvatar)}>
                                                    <NoAvatar userName={item2.text} />
                                                </div>
                                            )
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
                            )}
                        </Fragment>
                    ))}
                </ul>
            ))}
            <div className={clsx(styles.moreBtn)} onClick={() => dispatch(setIsToggleNavBar())}>
                <DotMenu />
            </div>
        </div>
    );
}

export default Menu;
