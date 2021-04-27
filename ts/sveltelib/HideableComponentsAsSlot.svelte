<!--
Copyright: Ankitects Pty Ltd and contributors
License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
-->
<script lang="typescript">
    import type { DynamicSvelteComponent } from "sveltelib/dynamicComponents";
    export let target: DynamicSvelteComponent;
    export let items: DynamicSvelteComponent[];

    function filterHidden({ hidden = false, ...props }) {
        return props;
    }
</script>

<svelte:component this={target.component} {...target}>
    {#each items as button}
        {#if !button.hidden}
            <svelte:component this={button.component} {...filterHidden(button)} />
        {/if}
    {/each}
</svelte:component>
