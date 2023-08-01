import { ForwardedRef, forwardRef } from 'react'
import { TextareaProps } from './TextArea.props'
import styles from './Textarea.module.css'
import cn from 'classnames'

export const Textarea = forwardRef(
  (
    { className, error, ...props }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(styles.textAreaWrapper, className)}>
        <textarea
          className={cn(styles.input, {
            [styles.error]: error,
          })}
          ref={ref}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
