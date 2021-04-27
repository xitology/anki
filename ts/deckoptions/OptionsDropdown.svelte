<!--
Copyright: Ankitects Pty Ltd and contributors
License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html
-->
<script lang="ts">
    import * as tr from "lib/i18n";
    import type { DeckOptionsState } from "./lib";
    import ButtonGroup2 from "sveltelib/ButtonGroup2.svelte";
    import LabelButton from "sveltelib/LabelButton.svelte";
    import DropdownMenu from "sveltelib/DropdownMenu.svelte";
    import { textInputModal } from "./textInputModal";
    import { dropdownItem, dropdownDivider } from "sveltelib/dynamicComponents";
    import type { ToolbarItem } from "sveltelib/types";

    export let state: DeckOptionsState;

    function addConfig(): void {
        textInputModal({
            title: "Add Config",
            prompt: "Name:",
            onOk: (text: string) => {
                const trimmed = text.trim();
                if (trimmed.length) {
                    state.addConfig(trimmed);
                }
            },
        });
    }

    function renameConfig(): void {
        textInputModal({
            title: "Rename Config",
            prompt: "Name:",
            startingValue: state.getCurrentName(),
            onOk: (text: string) => {
                state.setCurrentName(text);
            },
        });
    }

    function removeConfig(): void {
        // show pop-up after dropdown has gone away
        setTimeout(() => {
            if (state.defaultConfigSelected()) {
                alert(tr.schedulingTheDefaultConfigurationCantBeRemoved());
                return;
            }
            // fixme: move tr.qt_misc schema mod msg into core
            // fixme: include name of deck in msg
            const msg = state.removalWilLForceFullSync()
                ? "This will require a one-way sync. Are you sure?"
                : "Are you sure?";
            if (confirm(msg)) {
                try {
                    state.removeCurrentConfig();
                } catch (err) {
                    alert(err);
                }
            }
        }, 100);
    }

    function save(applyToChildDecks: boolean): void {
        state.save(applyToChildDecks);
    }

    let menuItems: ToolbarItem[] = [
        dropdownItem({
            label: "Add Config",
            onClick: addConfig,
        }),
        dropdownItem({
            label: "Rename Config",
            onClick: renameConfig,
        }),
        dropdownItem({
            label: "Remove Config",
            onClick: removeConfig,
        }),
        dropdownDivider({}),
        dropdownItem({
            label: "Save to All Children",
            onClick: () => save(true),
        }),
    ];
</script>

<ButtonGroup2 id="optionsDropdown">
    <LabelButton label="Save" theme="primary" onClick={() => save(false)} />
    <LabelButton dropdownToggle={true} />
    <DropdownMenu items={menuItems} />
</ButtonGroup2>
