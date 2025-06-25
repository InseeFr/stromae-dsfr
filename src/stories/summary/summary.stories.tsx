import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { data, source } from './default'

const meta = {
  title: 'Components/Summary',
  component: Orchestrator,
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source, data } } satisfies Story
