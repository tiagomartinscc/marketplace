import { ComponentProps, useState } from 'react'
import {
  Text,
  Input as GluestackInput,
  InputField,
  FormControl,
  FormControlErrorText,
  FormControlError,
  InputSlot,
  InputIcon,
  Icon
} from '@gluestack-ui/themed'

import { 
  Mail, 
  KeyRound, 
  EyeIcon,
  EyeOffIcon,
  User,
  Phone,
  Search
} from 'lucide-react-native'

export type InputTypeIconProps = 'mail' | 'key-round' | 'user' | 'phone' | 'search'

function getIcon(icon: InputTypeIconProps, isInvalid: boolean) {
  let color = '$gray300'
  if (isInvalid) {
    color = '$danger'
  }

  if (icon === 'search') {
    return <Icon color={color} as={Search} size='md' />
  }  

  if (icon === 'user') {
    return <Icon color={color} as={User} size='sm' />
  }
  
  if (icon === 'phone') {
    return <Icon color={color} as={Phone} size='sm' />
  }

  if (icon === 'mail') {
    return <Icon color={color} as={Mail} size='sm' />
  }

  if (icon === 'key-round') {
    return <Icon color={color} as={KeyRound} size='sm'/>
  }  
}

type Props = ComponentProps<typeof InputField> & {
  label?: string
  icon?: InputTypeIconProps
  errorMessage?: string | null
  isInvalid?: boolean
  isReadOnly?: boolean
}

export function Input ({
  label = '',
  icon,
  secureTextEntry,
  isReadOnly = false, 
  errorMessage = null,
  isInvalid = false,
  ...rest}: Props
) {
  const invalid = !!errorMessage || isInvalid
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }  

  return (
    <FormControl isInvalid={invalid} mb="$4" w="$full">
      { label && 
          <Text 
            textTransform='uppercase'
            fontFamily='$heading'
            color='$gray300'
            fontSize="$xs"
            fontWeight="$normal"
          >
          {label}
        </Text>
      }
      <GluestackInput 
        isInvalid={invalid}
        h="$12"
        variant="underlined"
        
        $focus={{
          borderColor: invalid ? '$danger' : '$orangeBase'
        }}
        $invalid={{
          borderColor: '$danger'
        }}
        isReadOnly={isReadOnly}
        opacity={isReadOnly ? 0.5 : 1}
      >
        {
          icon && (
            <InputSlot>
              <InputIcon>{getIcon(icon, isInvalid)}</InputIcon>
            </InputSlot>        
          )
        }
        <InputField
          px="$4"
          bg="$gray700"
          color='$gray200'
          fontFamily='$body'
          placeholderTextColor="$gray200"
          secureTextEntry={!showPassword}
          {...rest} 
        />
        {
          secureTextEntry  && (
            <InputSlot pr="$3" onPress={handleState}>
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color="$gray200"
              size='sm'
            />
            </InputSlot>        
          )
        }
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color='$red500'>
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  )
}