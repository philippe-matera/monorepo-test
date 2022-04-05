import { Text } from '../atoms'
import { TextInput } from '../molecules'

export const FormInput = () => {
  const lol = ''

  return (
    <>
      <Text>Label</Text>
      <TextInput />
      <Text>Optionnel {lol}</Text>
    </>
  )
}
