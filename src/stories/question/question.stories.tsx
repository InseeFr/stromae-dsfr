import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { oneSource, twoSource } from './sources'

const meta = {
  title: 'Components/Question',
  component: Orchestrator,
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const OneComponent = { args: { source: oneSource } } satisfies Story
export const TwoComponents = { args: { source: twoSource } } satisfies Story
