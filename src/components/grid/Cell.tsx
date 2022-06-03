import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-600':
        !status,
      'border-black dark:border-neutral-100': value && !status,
      'absent shadowed bg-neutral-400 dark:bg-neutral-700 text-white border-neutral-400 dark:border-neutral-700':
        status === 'absent',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-primary-700 text-white border-primary-700':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-warning-700 text-white border-warning-700':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
