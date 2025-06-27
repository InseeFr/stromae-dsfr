import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import {
  defaultSource,
  questionSource,
  readonlyData,
  readonlySource,
} from './sources'

const meta = {
  title: 'Components/Input',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'This component should be used when you want the user to enter a string. You can add a maxLength property if you want to restrict the number of characters the user can enter.',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source: defaultSource } } satisfies Story
export const Readonly = {
  args: { data: readonlyData, source: readonlySource },
} satisfies Story
export const Question = { args: { source: questionSource } } satisfies Story
