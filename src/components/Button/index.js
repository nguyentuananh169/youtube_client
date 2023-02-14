import { Link } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Button.module.css';
function Button({
    children,
    href = false,
    to = false,
    loading = false,
    disabled = false,
    ...props
}) {
    let Tags = 'button';
    if (href && !loading && !disabled) {
        Tags = 'a';
        props.href = href;
    } else if (to && !loading && !disabled) {
        Tags = Link;
        props.to = to;
    }
    const classes = clsx(styles.wrapper, {
        [styles.loading]: loading,
        [styles.disabled]: disabled,
    });
    if (disabled || loading) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    return (
        <Tags className={classes} {...props}>
            {loading ? (
                <>
                    <i className="fa-solid fa-spinner"></i>
                    {loading && typeof loading === 'string' ? loading : 'Loading...'}
                </>
            ) : (
                children
            )}
        </Tags>
    );
}

export default Button;
