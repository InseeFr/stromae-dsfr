import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { source } from './default'
import { source as questionSource } from './question'

const meta = {
  title: 'Components/CheckboxBoolean',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'The CheckboxBoolean component allows users to select or deselect a single option. ',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source } } satisfies Story

export const Question = {
  args: { source: questionSource },
} satisfies Story
