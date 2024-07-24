import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Badge from '@mui/material/Badge'
import Fab from '@mui/material/Fab'

import { VTLExpressionError, VTLInterpretationError } from '@inseefr/lunatic'
import { useState } from 'react'
import { useLoggerErrors } from '../errorStore'

export const VtlDevTools = () => {
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
            Console VTL
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
              <h3>Liste des erreurs d'exécution VTL</h3>

              <Button
                iconId="fr-icon-delete-line"
                onClick={resetErrors}
                priority="primary"
                title="Vider les erreurs"
              >
                Vider les erreurs
              </Button>
            </div>
            <div className={fr.cx('fr-table__wrapper')}>
              <div className={fr.cx('fr-table__container')}>
                <div className={fr.cx('fr-table__content')}>
                  <table className={fr.cx('fr-cell--multiline')}>
                    <caption>Liste des erreurs VTL</caption>
                    <thead>
                      <tr>
                        <th scope="col">Expression</th>
                        <th scope="col">Bindings</th>
                        <th scope="col">Message</th>
                        <th scope="col">Page</th>
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

const hasBindings = (
  error: VTLExpressionError
): error is VTLInterpretationError => {
  return error instanceof VTLInterpretationError
}
