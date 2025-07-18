import { useId } from 'react'

import { Input as InputDSFR } from '@codegouvfr/react-dsfr/Input'
import type { LunaticSlotComponents } from '@inseefr/lunatic'

import { useQuestionId } from './Question'
import { getErrorStates } from './utils/errorStates'

export const Input: LunaticSlotComponents['Input'] = (props) => {
  const {
    value,
    onChange,
    disabled,
    required,
    maxLength,
    label,
    description,
    errors,
    readOnly,
  } = props

  const id = useId()
  const questionId = useQuestionId()
  /**
   * Note that the error message ID follows the format `${id}-desc-error` because this is the convention used by the underlying library react-dsfr
   * See: https://github.com/codegouvfr/react-dsfr/blob/4c41367febcb78307f261df1b761fedb52c8a905/src/Input.tsx#L103
   */
  const errorMessageId = `${id}-desc-error`

  const { state, stateRelatedMessage } = getErrorStates(errors)

  if (readOnly) {
    return <p>{value}</p>
  }

  return (
    <InputDSFR
      label={label}
      disabled={disabled}
      nativeInputProps={{
        id,
        maxLength: maxLength,
        value: value ?? '',
        required: required,
        onChange: (e) => onChange(e.target.value),
        readOnly,
        title: value ?? '',
        style: {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        },
        onBlur: (e) => {
          e.target.setSelectionRange(0, 0)
        },
        'aria-labelledby': questionId,
        ...(state === 'error'
          ? { 'aria-invalid': true, 'aria-errormessage': errorMessageId }
          : {}),
      }}
      hintText={description}
      state={state}
      stateRelatedMessage={stateRelatedMessage}
    />
  )
}
