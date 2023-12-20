export interface SelectProps {
  label?: string
  options: OptionType[]
  name: string
}

export interface OptionType {
  label: string
  value: string
}
