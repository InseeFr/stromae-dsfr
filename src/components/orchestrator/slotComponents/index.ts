import type { LunaticSlotComponents } from '@inseefr/lunatic'

import { Accordion } from './Accordion'
import { CheckboxBoolean } from './CheckboxBoolean'
import { CheckboxGroup } from './CheckboxGroup'
import { ComponentWrapper } from './ComponentWrapper'
import { Datepicker } from './Datepicker'
import { Declarations } from './Declarations'
import { Dropdown } from './Dropdown'
import { Duration } from './Duration/Duration'
import { Input } from './Input'
import { InputNumber } from './InputNumber'
import { Loop } from './Loop'
import { MarkdownLink } from './MarkdownLink'
import { Question } from './Question'
import { RadioGroup } from './RadioGroup'
import { Roundabout } from './Roundabout'
import { Sequence } from './Sequence'
import { Subsequence } from './Subsequence'
import { Suggester } from './Suggester'
import { SummaryResponses, SummaryTitle } from './Summary'
import { Table, Td, Tr } from './Table'
import { Textarea } from './Textarea'

export const slotComponents = {
  Question,
  Suggester,
  Dropdown,
  Input,
  InputNumber,
  CheckboxGroup,
  CheckboxBoolean,
  RadioGroup,
  Datepicker,
  Duration,
  Roundabout,
  Sequence,
  Subsequence,
  SummaryResponses,
  SummaryTitle,
  Textarea,
  Declarations,
  Table,
  Tr,
  Td,
  ComponentWrapper,
  Loop,
  MarkdownLink,
  Accordion,
} as Partial<LunaticSlotComponents> satisfies Partial<LunaticSlotComponents>
//We must remove `as Partial<LunaticSlotComponents>` when summary refactored
