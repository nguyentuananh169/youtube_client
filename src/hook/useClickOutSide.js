import { useEffect, useRef, useState } from 'react';

function useClickOutSide(init = false) {
    const [isShow, setShow] = useState(init);
    const elementRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (elementRef.current && !elementRef.current.contains(event.target) && !isShow) {
                setShow(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [elementRef]);

    return [elementRef, isShow, setShow];
}

export default useClickOutSide;
