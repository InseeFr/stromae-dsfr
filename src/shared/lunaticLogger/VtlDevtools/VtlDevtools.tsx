import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Badge from '@mui/material/Badge'
import Fab from '@mui/material/Fab'

import { useState } from 'react'

const sampleData = [
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: 'Format attendu : un nombre entre 1 et 20',
      variableName: 'Format',
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: 'Format attendu : un nombre entre 1 et 20',
      variableName: 'Format',
    },
  },
  {
    type: 'ERROR',
    error: {
      expression: '(SU1 <> "1" & SU2BIS <> "1")',
      bindings: {
        SU1: null,
        SU2BIS: null,
      },
    },
  },
]
export const VtlDevTools = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const togglePanel = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <div
        className={fr.cx('fr-pr-4v', 'fr-pb-4v')}
        style={{ flexDirection: 'row-reverse', display: 'flex' }}
      >
        <Badge badgeContent={sampleData.length} color="error">
          <Fab variant="extended" onClick={togglePanel}>
            VTL Error tools
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
          //boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1300,
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <div style={{ flexDirection: 'row-reverse', display: 'flex' }}>
          <Button
            iconId="ri-arrow-down-line"
            title="Minimize dev tools"
            onClick={() => setIsOpen(false)}
            priority="secondary"
          />
        </div>
        <div className={fr.cx('fr-container')}>
          <div className={fr.cx('fr-table')}>
            <div className={fr.cx('fr-table__wrapper')}>
              <div className={fr.cx('fr-table__container')}>
                <div className={fr.cx('fr-table__content')}>
                  <table>
                    <caption>Liste des différentes erreurs VTL</caption>
                    <thead>
                      <tr>
                        <th scope="col">Type d'erreur</th>
                        <th scope="col">expression</th>
                        <th scope="col">bindings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((e) => (
                        <tr>
                          <td>{e.type}</td>
                          <td>{e.error.expression ?? e.error.variableName}</td>
                          <td>{JSON.stringify(e.error.bindings)}</td>
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
