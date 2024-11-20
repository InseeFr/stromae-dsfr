import { fr } from '@codegouvfr/react-dsfr'
import { Skeleton } from '@mui/material'

export const ContentSkeleton = () => {
  return (
    <div className={fr.cx('fr-container')}>
      <div className={fr.cx('fr-grid-row', 'fr-grid-row--center')}>
        <div className={fr.cx('fr-col-12', 'fr-my-10v', 'fr-container')}>
          <h1>
            <Skeleton variant="rectangular" />
          </h1>
          <p>
            <Skeleton />
          </p>
        </div>
      </div>
    </div>
  )
}
