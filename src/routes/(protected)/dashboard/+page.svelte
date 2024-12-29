<script lang='ts'>
    import type { PageServerData } from './$types';
    import {Button} from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
    let { data }: { data: PageServerData } = $props();
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);
</script>

<h1>대시보드 : Hi, {data.user.email}!</h1>
<p>Your user ID is {data.user.id}.</p>
<Button href="/logout">logout</Button>
<Button
        variant="outline"
        onclick={() =>
    toast.success(`${data.user.name} 님 로그인 되었습니다.`, {
      description: formattedDate,
      action: {
        label: "Undo",
        onClick: () => console.info("Undo")
      }
    })}
>
    Show Toast
</Button>