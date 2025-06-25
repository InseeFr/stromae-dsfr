import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { defaultSource, questionSource } from '../subsequence/sources'

const meta = {
  title: 'Components/Sequence',
  component: Orchestrator,
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source: defaultSource } } satisfies Story
export const Question = { args: { source: questionSource } } satisfies Story
