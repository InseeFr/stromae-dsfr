import type { LunaticLogger } from 'shared/components/Orchestrator/utils/lunaticType'

export const lunaticError: ErrorMessage[] = []

export const lunaticLogger: LunaticLogger = (msg) => {
  if (msg.type === 'ERROR') {
    lunaticError.push(msg)
  }
  console.log(msg)
}

type LoggerMessage = Parameters<typeof lunaticLogger>[0]

type ErrorMessage = Extract<LoggerMessage, { type: 'ERROR' }>
