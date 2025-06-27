import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import {
  defaultSource,
  detailSource,
  questionSource,
  readonlySource,
} from './sources'

const meta = {
  title: 'Components/CheckboxOne',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'The CheckboxOne is a deprecated component, it returns Radio component.',
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

export const Question = { args: { source: questionSource } } satisfies Story
