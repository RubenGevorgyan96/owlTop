import { IReviewSentResponse, ReviewFormProps } from './ReviewForm.props'
import cn from 'classnames'
import CloseIcon from './close.svg'
import { Input } from '../Input/Input'
import { Rating } from '../Raiting/Rating'
import { Textarea } from '../Textarea/Textarea'
import { Button } from '../Button/Button'
import styles from './ReviewForm.module.css'
import { useForm, Controller } from 'react-hook-form'
import { IReviewForm } from './ReviewForm.interface'
import axios from 'axios'
import { API } from '../../helpers/api'
import { useState } from 'react'

export const ReviewForm = ({
  productId,
  className,
  ...props
}: ReviewFormProps): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IReviewForm>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(
        API.review.createDemo,
        { ...formData, productId }
      )
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError('Something went wrong')
      }
    } catch (e: any) {
      setError(e.message)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register('name', {
            required: { value: true, message: 'field is required' },
          })}
          placeholder="Имя"
          error={errors.name}
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: {
              value: true,
              message: 'field is required',
            },
          })}
          className={styles.title}
          placeholder="Заголовок отзыва"
          error={errors.title}
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: {
                value: true,
                message: 'rate is required',
              },
            }}
            render={({ field }) => (
              <Rating
                rating={field.value}
                isEditable
                setRating={field.onChange}
                // ref={field.ref}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: {
              value: true,
              message: 'fiels is required',
            },
          })}
          className={styles.description}
          placeholder="Заголовок отзыва"
          error={errors.description}
          aria-label="Заголовок отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button onClick={() => clearErrors()} appearance="primary">
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)} role="alert">
          <div className={styles.successTitle}>Done..</div>
          <div>Thanks for your rate..</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label="close the notification"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)} role="alert">
          {'Something went wrong'}
          <button
            onClick={() => setError(undefined)}
            className={styles.close}
            aria-label="close the notification"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  )
}
