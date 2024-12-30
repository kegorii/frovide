<script lang="ts">
    import LogOut from "lucide-svelte/icons/log-out";
    import House from "lucide-svelte/icons/house";
    import Inbox from "lucide-svelte/icons/inbox";
    import CircleUserRound from "lucide-svelte/icons/circle-user-round";
    import * as Sidebar from "$lib/components/ui/sidebar/index";
    import { toggleMode } from "mode-watcher";
    import { Button } from "$lib/components/ui/button/index.js";
    import Sun from "lucide-svelte/icons/sun";
    import Moon from "lucide-svelte/icons/moon";
    // Menu items.
    const items = [
        {
            title: "대시보드",
            url: "/dashboard",
            icon: House,
        },
        {
            title: "프로필수정",
            url: "/profile",
            icon: CircleUserRound,
        },        {
            title: "이메일인증",
            url: "/verify-email",
            icon: Inbox,
        },
        {
            title: "로그아웃",
            url: "/logout",
            icon: LogOut,
        },
    ];
</script>

<Sidebar.Root>
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each items as item (item.title)}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton>
                                {#snippet child({ props })}
                                    <a href={item.url} {...props}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </a>
                                {/snippet}

                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                    <Button onclick={toggleMode} variant="outline" size="icon">
                        <Sun
                                class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                        />
                        <Moon
                                class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                        />
                        <span class="sr-only">Toggle theme</span>
                    </Button>
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
</Sidebar.Root>