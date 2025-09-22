import { Icon } from '@iconify/react'
import type { IconProps } from '@iconify/react'

const KitIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon style={{ pointerEvents: 'none' }} icon={icon} fontSize='1.375rem' {...rest} />
}

export default KitIcon
