import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { source } from './default'
import { source as questionSource } from './question'

const meta = {
  title: 'Components/Subsequence',
  component: Orchestrator,
} satisfies Meta<typeof Orchestrator>

export default meta
type Story = StoryObj<typeof Orchestrator>

export const Default = {
  args: { source },
} satisfies Story

export const Question = {
  args: { source: questionSource },
} satisfies Story
