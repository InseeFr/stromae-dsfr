import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import {
  defaultData,
  defaultSource,
  monthAndYearData,
  monthAndYearSource,
  questionSource,
  readonlyData,
  readonlySource,
  yearData,
  yearSource,
} from './sources'

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
  args: { source: defaultSource, data: defaultData },
} satisfies Story

export const Readonly = {
  args: { source: readonlySource, data: readonlyData },
} satisfies Story

export const MonthAndYear = {
  args: { source: monthAndYearSource, data: monthAndYearData },
} satisfies Story

export const YearOnly = {
  args: { source: yearSource, data: yearData },
} satisfies Story

export const Question = {
  args: { source: questionSource },
} satisfies Story
