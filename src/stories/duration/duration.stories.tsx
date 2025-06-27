import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import {
  dateSource,
  questionSource,
  readonlySource,
  timeSource,
} from './sources'

const meta = {
  title: 'Components/Duration',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'This component should be used when you want the user to enter a duration. We support duration in Year and month or Hours and minutes',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const DateFormat = { args: { source: dateSource } } satisfies Story
export const TimeFormat = { args: { source: timeSource } } satisfies Story
export const Readonly = { args: { source: readonlySource } } satisfies Story
export const Question = { args: { source: questionSource } } satisfies Story
