<script lang="ts">
    import * as Card from '$lib/components/ui/card';
    import * as Form from "$lib/components/ui/form/index.js";
    import {Input} from "$lib/components/ui/input/index.js";
    import {Button} from "$lib/components/ui/button";
    import {superForm} from "sveltekit-superforms";
    import SuperDebug from "sveltekit-superforms";
    import {formSchema} from "./schema";
    import {zodClient} from "sveltekit-superforms/adapters";
    import * as Alert from "$lib/components/ui/alert/index.js";
    import {LoaderCircle, CircleAlert} from "lucide-svelte";

    let {data} = $props();
    const form = superForm(data.form, {
        clearOnSubmit: 'errors',
        validators: zodClient(formSchema),
    });
    const {form: formData, enhance, message, errors, delayed} = form;

</script>
<div class="flex h-screen w-full items-center justify-center px-4 ">
    <Card.Root class="mx-auto max-w-sm w-96">
        <form method="POST" use:enhance>
            <Card.Header>
                <Card.Title class="text-xl">
                    <div class="flex">Login</div>
                </Card.Title>
                <!--                <Card.Description>로그인</Card.Description>-->
            </Card.Header>
            <Card.Content>
                <div class="grid gap-2">
                    <Form.Field {form} name="email">
                        <Form.Control>
                            {#snippet children({props})}
                                <Form.Label>이메일</Form.Label>
                                <Input {...props} bind:value={$formData.email}/>
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors/>
                    </Form.Field>
                    <Form.Field {form} name="password">
                        <Form.Control>
                            {#snippet children({props})}
                                <Form.Label>패스워드</Form.Label>
                                <Input {...props} type='password' bind:value={$formData.password}/>
                            {/snippet}
                        </Form.Control>
                        <Form.FieldErrors/>
                    </Form.Field>
                    {#if $message}
                        <Alert.Root variant="destructive">
                            <CircleAlert class="size-4"/>
                            <!--                            <Alert.Title>Error</Alert.Title>-->
                            <Alert.Description>{$message}</Alert.Description>
                        </Alert.Root>
                    {/if}
                </div>
            </Card.Content>
            <Card.Footer class="block">
                <Form.Button class="w-full" disabled={$delayed}>
                    {#if $delayed}
                        <LoaderCircle class="animate-spin"/>
                        처리중..
                    {:else}
                        로그인
                    {/if}
                </Form.Button>
                <Button href="/register" variant="outline" class="w-full mt-4">계정등록</Button>
            </Card.Footer>
<!--            <SuperDebug data={errors}/>-->
<!--            <SuperDebug data={$message}/>-->
        </form>
    </Card.Root>

</div>