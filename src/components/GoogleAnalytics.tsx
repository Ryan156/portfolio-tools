import { useEffect } from "react";

function GoogleTagManager() {
    useEffect(() => {
        const loadGTM = () => {
            if ((window as any).__gtm_loaded) return;

            (window as any).__gtm_loaded = true;

            (window as any).dataLayer =
                (window as any).dataLayer || [];

            (window as any).dataLayer.push({
                "gtm.start": new Date().getTime(),
                event: "gtm.js",
            });

            const firstScript =
                document.getElementsByTagName("script")[0];

            const gtmScript =
                document.createElement("script");

            gtmScript.async = true;
            gtmScript.src =
                "https://www.googletagmanager.com/gtm.js?id=GTM-PCT7WTLF";

            firstScript.parentNode?.insertBefore(
                gtmScript,
                firstScript
            );
        };

        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(loadGTM, {
                timeout: 3000,
            });
        } else {
            setTimeout(loadGTM, 2000);
        }
    }, []);

    return null;
}

export default GoogleTagManager;