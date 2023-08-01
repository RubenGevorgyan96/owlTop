import { ButtonProps } from './Button.props'
import styles from './Button.module.css'
import cn from 'classnames'
import ArrowIcon from './arrow.svg'
import { motion, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

export const Button = ({
  appearance,
  children,
  className,
  arrow = 'none',
  ...props
}: ButtonProps): JSX.Element => {
  const scale = useMotionValue(1)


  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearance == 'primary',
        [styles.ghost]: appearance == 'ghost',
      })}
      style={{ scale }}
      {...props}
    >
      {children}
      {arrow != 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow == 'down',
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  )
}
