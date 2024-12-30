<script lang='ts'>
    import type { PageServerData } from './$types';
    let { data }: { data: PageServerData } = $props();
    import {Button} from "$lib/components/ui/button";
    import { toast } from "svelte-sonner";
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

<h1>어서오세요 {data.user.name}님! 반갑습니다.</h1>
<p>NAME: {data.user.name} </p>
<p>ID: {data.user.id}</p>
<p>ROLE: {data.user.role}</p>
<p>EMAIL: {data.user.email}</p>
<p>...</p>
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