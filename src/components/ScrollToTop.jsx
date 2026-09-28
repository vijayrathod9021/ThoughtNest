import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const location = useLocation();

    useLayoutEffect(() => {
        if (!location.state?.restoreScroll) {
            window.scrollTo(0, 0);
        }
    }, [location.key]);

    return null;
}

export default ScrollToTop;