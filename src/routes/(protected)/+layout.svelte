<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/custom/AppSidebar/app-sidebar.svelte";
    import { Toaster } from "$lib/components/ui/sonner/index.js";
    import { ModeWatcher } from "mode-watcher";
    let { children } = $props();
</script>
<Toaster />
<ModeWatcher />
<Sidebar.Provider>
    <AppSidebar />

    <main>
        <Sidebar.Trigger />
        <div style="padding: 20px">{@render children?.()}</div>

    </main>
</Sidebar.Provider>