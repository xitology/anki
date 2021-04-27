<!--
Copyright: Ankitects Pty Ltd and contributors
License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
-->
<script lang="typescript">
    import type { ToolbarItem } from "sveltelib/types";
    import HideableComponentsAsSlot from "./HideableComponentsAsSlot.svelte";
    import ButtonGroup2 from "./ButtonGroup2.svelte";
    export let items: ToolbarItem[];
</script>

<HideableComponentsAsSlot
    target={{ ...$$restProps, component: ButtonGroup2 }}
    {items} />
