import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../../Orchestrator'
import { source as sourceQuestion } from './question'
import { source as sourceSequence } from './sequence'

const meta = {
  title: 'Questionnaire/Pagination',
  component: Orchestrator,
  parameters: {},
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Question = {
  args: { source: sourceQuestion },
} satisfies Story

export const Sequence = {
  args: { source: sourceSequence },
} satisfies Story
