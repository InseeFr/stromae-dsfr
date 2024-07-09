import { assert } from 'tsafe/assert'
import type { Extends } from 'tsafe/Extends'
import type { SurveyUnitMetadata } from './api'

type Logo = {
  label: string
  url: string
}

type Logos = {
  main: Logo
  secondaries?: Logo[]
}
export type Metadata = {
  context: 'household' | 'business'
  label: string
  logos?: Logos
  objectives: string
  personalization?: { name: string; value: string }[]
  variables?: { name: string; value?: unknown }[] //value is not optional but an issue with zod https://github.com/colinhacks/zod/issues/2966
}

assert<Extends<SurveyUnitMetadata, Metadata>>() //Must be replaced by Equals when zod solve issue
