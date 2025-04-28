import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { data, source } from './default'
import {
  data as dataMonthAndYear,
  source as sourceMonthAndYear,
} from './monthAndYear'
import { source as questionSource } from './question'
import { data as dataYear, source as sourceYear } from './year'

const meta = {
  title: 'Components/DatePicker',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'This component should be used when you want the user to enter a date.',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = {
  args: { source: source, data: data },
} satisfies Story

export const MonthAndYear = {
  args: { source: sourceMonthAndYear, data: dataMonthAndYear },
}

export const YearOnly = { args: { source: sourceYear, data: dataYear } }

export const Question = {
  args: { source: questionSource },
} satisfies Story
