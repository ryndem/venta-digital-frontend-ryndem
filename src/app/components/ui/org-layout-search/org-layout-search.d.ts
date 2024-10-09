export type OptionItem = {
    value: string | number | undefined,
    label: string | undefined
}

export type OptionsGroup  = {
    title: string,
    items: OptionItem[]
}