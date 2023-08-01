import { ProductProps } from './Product.props'
import styles from './Product.module.css'
import cn from 'classnames'
import { Card } from '../Card/Card'
import { Rating } from '../Raiting/Rating'
import { Tag } from '../Tag/Tag'
import { Button } from '../Button/Button'
import { declOfNum, priceRu } from '../../helpers/helpers'
import { Divider } from '../Divider/Divider'
import Image from 'next/image'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import { Review } from '../Review/Review'
import { ReviewForm } from '../ReviewForm/ReviewForm'
import { motion } from 'framer-motion'

export const Product = motion(
  forwardRef(
    (
      { product, className, ...props }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)
      const reviewRef = useRef<HTMLDivElement>(null)

      const variants = {
        visible: {
          display: 'block',
          heigth: 'auto',
          transition: {
            staggerChildren: 1,
          },
        },
        hidden: {
          display: 'none',
          heigth: 0,
        },
      }

      const scrollToReview = () => {
        setIsReviewOpened(true)
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
                width={70}
                height={70}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span>
                <span className="visually-hidden">цена</span>
                {priceRu(product.price)}
              </span>
              {product.oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  <span className="visually-hidden">СКИДКА</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visually-hidden">кредит</span>
              {priceRu(product.credit)}/
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visually-hidden">
                {'Рейтинг' + product.reviewAvg ?? product.initialRating}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((c) => (
                <Tag key={c} className={styles.category} color="ghost">
                  {c}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              в кредит
            </div>
            <div className={styles.rateTitle}>
              {product.reviewCount}
              {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </div>
            <div className={styles.hr}>
              <Divider />
            </div>
            <div className={styles.description}>{product.description}</div>

            <div className={styles.feature}>
              {product.characteristics.map((c) => (
                <div className={styles.characteristic} key={Math.random()}>
                  <span className={styles.characteristicsName}>{c.name}</span>
                  <span className={styles.characteristicsDots}></span>
                  <span className={styles.characteristicsValue}>{c.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div> {product.advantages}</div>
                </div>
              )}
              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div> {product.disadvantages}</div>
                </div>
              )}
            </div>
            <div className={cn(styles.hr, styles.hr2)}>
              <Divider />
            </div>
            <div className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isReviewOpened ? 'down' : 'right'}
                className={styles.reviewButton}
                onClick={() => setIsReviewOpened((pre) => !pre)}
                aria-expanded={isReviewOpened}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>

          <Card
            variants={variants}
            animate={isReviewOpened ? 'visible' : 'hidden'}
            initial={isReviewOpened ? 'visible' : 'hidden'}
            color="blue"
            className={cn(styles.reviews)}
            ref={reviewRef}
            tabIndex={0}
          >
            {product.reviews.map((r) => (
              <div key={r._id}>
                <Review review={r} />
                <Divider />
              </div>
            ))}
            <ReviewForm productId={product._id} />
          </Card>
        </div>
      )
    }
  )
)
