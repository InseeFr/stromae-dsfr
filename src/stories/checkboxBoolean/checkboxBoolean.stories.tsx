import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import { defaultSource, questionSource, readonlySource } from './sources'

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

export const Default = { args: { source: defaultSource } } satisfies Story
export const Readonly = { args: { source: readonlySource } } satisfies Story
export const Question = { args: { source: questionSource } } satisfies Story
