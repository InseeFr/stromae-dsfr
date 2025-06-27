import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { defaultSource, questionSource } from './sources'

const meta = {
  title: 'Components/MDLink',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component: 'A simple demo of MDLink in a input component',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source: defaultSource } } satisfies Story
export const Question = { args: { source: questionSource } } satisfies Story
