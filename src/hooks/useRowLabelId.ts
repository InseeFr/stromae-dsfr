import { createContext, useContext } from 'react'

export const RowLabelContext = createContext<string | undefined>(undefined)

export const useRowLabelId = () => useContext(RowLabelContext)
