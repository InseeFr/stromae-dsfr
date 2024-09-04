import { ZodError, type ZodIssue } from 'zod'

export type ZodErrorName = 'metadata'

export class ZodErrorWithName extends ZodError {
  name: ZodErrorName

  constructor(issues: ZodIssue[], name: ZodErrorName) {
    super(issues)
    this.name = name
  }
}
