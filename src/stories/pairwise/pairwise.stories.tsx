import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { defaultData, defaultSource } from './sources'

const meta = {
  title: 'Components/Pairwise',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component: 'This component allows you to pass symetric links.',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = {
  args: { source: defaultSource, data: defaultData },
} satisfies Story
