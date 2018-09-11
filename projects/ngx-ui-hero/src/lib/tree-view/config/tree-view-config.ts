export interface TreeViewConfig {
    showIcons?: boolean;
    expandAllOnInit?: boolean;
    emptyResultsMessage?: string;
    styles?: TreeViewStylesConfig;
}

export class TreeViewStylesConfig {
    normalItemIconClass?: string;
    collapsableClosedItemIconClass?: string;
    collapsableOpennedItemIconClass?: string;
}
