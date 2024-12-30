<script lang="ts">
	import '../app.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit'
	let { children } = $props();
    import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
    import { dev } from '$app/environment';

    injectSpeedInsights();
    injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

{@render children()}
