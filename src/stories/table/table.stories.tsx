import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { defaultSource, questionSource, rosterSource } from './sources'

const meta = {
  title: 'Components/Table',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'The Table presents information in a structured format of rows and columns. The data is displayed in a user-friendly, quick-to-scan and interactive way, enabling users to efficiently identify patterns, edit data, and gather insights.',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source: defaultSource } } satisfies Story
export const Roster = { args: { source: rosterSource } } satisfies Story
export const Question = { args: { source: questionSource } } satisfies Story
