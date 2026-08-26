import { useEffect } from "react";
import posthog from "posthog-js";

console.log('PostHog key:', import.meta.env.VITE_POSTHOG_KEY)
console.log('PostHog host:', import.meta.env.VITE_POSTHOG_HOST)

function PostHog() {
    useEffect(() => {
        const key = import.meta.env.VITE_POSTHOG_KEY;
        const host = import.meta.env.VITE_POSTHOG_HOST;

        if (!key || !host) {
            console.warn("PostHog environment variables are missing.");
            return;
        }

        posthog.init(key, {
            api_host: host,
            defaults: "2026-01-30",
            capture_pageview: false,
        });

        posthog.capture("$pageview");
    }, []);

    return null;
}

export default PostHog;