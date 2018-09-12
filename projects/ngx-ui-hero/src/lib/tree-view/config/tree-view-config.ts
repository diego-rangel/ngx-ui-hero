export interface TreeViewConfig {
    showIcons?: boolean;
    expandAllOnInit?: boolean;
    emptyResultsMessage?: string;
    styles?: TreeViewStylesConfig;
}

export class TreeViewStylesConfig {
    enableLabelLinkStyle?: boolean;
    normalItemIconClass?: string;
    collapsableClosedItemIconClass?: string;
    collapsableOpennedItemIconClass?: string;
}
