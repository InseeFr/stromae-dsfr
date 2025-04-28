import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../../Orchestrator'
import { data, source } from './default'

const meta = {
  title: 'Questionnaire/Paste',
  component: Orchestrator,
  parameters: {
    controls: {
      include: ['initialPage', 'source', 'data', 'autoSuggesterLoading'],
    },
    docs: {
      description: {
        component: 'You can paste your questionnaire here to test it.',
      },
    },
  },
  argTypes: {
    initialPage: {
      table: { disable: false },
    },
    autoSuggesterLoading: {
      table: { disable: false },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = {
  args: {
    source,
    data,
  },
} satisfies Story
