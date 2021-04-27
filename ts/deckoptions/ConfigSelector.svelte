<!--
Copyright: Ankitects Pty Ltd and contributors
License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
-->
<script lang="ts">
    import * as tr from "lib/i18n";
    import StickyBar from "sveltelib/StickyBar.svelte";
    import type { DeckOptionsState, ConfigListEntry } from "./lib";
    import ButtonGroup2 from "sveltelib/ButtonGroup2.svelte";
    import SelectButton from "sveltelib/SelectButton.svelte";
    import OptionsDropdown from "./OptionsDropdown.svelte";

    export let state: DeckOptionsState;
    let configList = state.configList;

    function configLabel(entry: ConfigListEntry): string {
        const count = tr.deckConfigUsedByDecks({ decks: entry.useCount });
        return `${entry.name} (${count})`;
    }

    const options = $configList.map((entry) => ({
        value: entry.idx,
        selected: entry.current,
        label: configLabel(entry),
    }));

    function blur(this: HTMLSelectElement) {
        state.setCurrentIndex(parseInt(this.value));
    }
</script>

<StickyBar>
    <div>{tr.actionsOptionsFor({ val: state.currentDeck.name })}</div>

    <ButtonGroup2 id="configSelector" className="justify-content-between" size={35}>
        <ButtonGroup2 className="flex-basis-75">
            <!-- we could perhaps change that to on:change as well? -->
            <SelectButton {options} className="flex-basis-100" onChange={blur} />
        </ButtonGroup2>
        <OptionsDropdown {state} />
    </ButtonGroup2>
</StickyBar>
