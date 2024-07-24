import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import { VTLExpressionError, VTLInterpretationError } from '@inseefr/lunatic'
import Badge from '@mui/material/Badge'
import Fab from '@mui/material/Fab'
import { useTranslation } from 'i18n'
import { declareComponentKeys } from 'i18nifty'
import { useState } from 'react'
import { useLoggerErrors } from './VtlErrorStore'

export const VtlDevTools = () => {
  const { t } = useTranslation({ VtlDevTools })

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { errors, resetErrors } = useLoggerErrors()

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div
        className={fr.cx('fr-pr-4v', 'fr-pb-4v')}
        style={{ flexDirection: 'row-reverse', display: 'flex' }}
      >
        <Badge badgeContent={errors.length} color="error">
          <Fab variant="extended" onClick={togglePanel}>
            {t('fab button')}
          </Fab>
        </Badge>
      </div>

      <div
        style={{
          background:
            fr.colors.decisions.background.contrastOverlap.grey.default,
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1300,
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          maxHeight: '50vh',
          overflow: 'auto',
        }}
      >
        <div
          style={{
            flexDirection: 'row-reverse',
            display: 'flex',
          }}
        >
          <Button
            iconId="ri-arrow-down-line"
            title="Minimize dev tools"
            onClick={() => setIsOpen(false)}
            priority="secondary"
          />
        </div>
        <div className={fr.cx('fr-container')}>
          <div
            className={fr.cx(
              'fr-table',
              'fr-table--lg',
              'fr-table--no-caption'
            )}
          >
            <div className={fr.cx('fr-table__header')}>
              <h3>{t('table title')}</h3>

              <Button
                iconId="fr-icon-delete-line"
                onClick={resetErrors}
                priority="primary"
                title="Vider les erreurs"
              >
                {t('clean error')}
              </Button>
            </div>
            <div className={fr.cx('fr-table__wrapper')}>
              <div className={fr.cx('fr-table__container')}>
                <div className={fr.cx('fr-table__content')}>
                  <table className={fr.cx('fr-cell--multiline')}>
                    <caption>{t('table title')}</caption>
                    <thead>
                      <tr>
                        <th scope="col">{t('table header expression')}</th>
                        <th scope="col">{t('table header bindings')}</th>
                        <th scope="col">{t('table header message')}</th>
                        <th scope="col">{t('table header page')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {errors?.map((e) => (
                        <tr key={e.id}>
                          <td>{e.error.expression}</td>
                          <td>
                            {hasBindings(e.error)
                              ? JSON.stringify(e.error.bindings)
                              : ''}
                          </td>
                          <td>{e.error.message}</td>
                          <td>{e.pageTag}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const { i18n } = declareComponentKeys<
  | 'table title'
  | 'fab button'
  | 'clean error'
  | 'table header bindings'
  | 'table header message'
  | 'table header page'
  | 'table header expression'
>()({ VtlDevTools })

export type I18n = typeof i18n

const hasBindings = (
  error: VTLExpressionError
): error is VTLInterpretationError => {
  return error instanceof VTLInterpretationError
}
