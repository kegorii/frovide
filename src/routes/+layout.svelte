<script lang="ts">
	import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit'

    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { dev } from '$app/environment';
    let { children } = $props();
    injectSpeedInsights();
    injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

{@render children()}
