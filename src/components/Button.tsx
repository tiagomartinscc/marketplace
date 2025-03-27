import { ComponentProps } from 'react'
import { Button as GlueStackButton, ButtonSpinner, Icon, InputSlot, InputIcon, ButtonText, ButtonIcon } from '@gluestack-ui/themed'

import { ArrowRight } from 'lucide-react-native'

type VariantProp = 'solid' | 'outline'
type IconProp = 'arrow-right'

type Props = ComponentProps<typeof GlueStackButton> & {
  title: string
  icon: IconProp
  variant?: VariantProp
  isLoading?: boolean
}

function getIcon(icon: IconProp, variant: VariantProp) {
  const color = variant === 'solid' ? '$white': '$orangeBase'
  if (icon === 'arrow-right') {
    return <ButtonIcon size='xl' color={color} as={ArrowRight} />
  }
  console.log('nenhuma opção válida', icon)
}

export function Button ({title, isLoading=false, variant='solid', icon, ...rest}: Props) {
  return (
    <GlueStackButton
      w="$full"
      h="$16"
      bg={variant === 'solid' ? '$orangeBase' : 'transparent' }
      borderWidth={variant === 'solid' ? '$0' : '$1' }
      borderColor='$orangeBase'
      rounded="$xl"
      $active-bg={variant === 'solid' ? '$orangeDark' : '$white'}
      disabled={isLoading}
      justifyContent='space-between'
      {...rest}
    >
      {isLoading ? <ButtonSpinner color={variant === 'solid' ? '$white' : '$orangeBase'} /> : (
        <>
          <ButtonText
            color={variant === 'solid' ? '$white' : '$orangeBase'}
            fontFamily='$heading'
            fontSize='$lg'
          >
            {title}
          </ButtonText>
          { icon && getIcon(icon, variant)}
        </>
      )}
    </GlueStackButton>
  )
}