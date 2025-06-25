import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import {
  defaultSource,
  detailSource,
  horizontalSource,
  questionSource,
  readonlySource,
} from './sources'

const meta = {
  title: 'Components/CheckboxGroup',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'The CheckboxGroup component provides a way for users to select one or multiple answers from a list of options.',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = { args: { source: defaultSource } } satisfies Story
export const Readonly = { args: { source: readonlySource } } satisfies Story

export const withDetail = {
  args: { source: detailSource, detailAlwaysDisplayed: false },
  argTypes: {
    detailAlwaysDisplayed: {
      table: { disable: false },
    },
  },
} satisfies Story

export const Horizontal = { args: { source: horizontalSource } } satisfies Story

export const Question = { args: { source: questionSource } } satisfies Story
