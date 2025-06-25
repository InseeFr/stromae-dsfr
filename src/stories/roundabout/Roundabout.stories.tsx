import type { Meta, StoryObj } from '@storybook/react'

import { Orchestrator } from '../Orchestrator'
import {
  controlSource,
  defaultData,
  defaultSource,
  lockedData,
  lockedSource,
} from './sources'

const meta = {
  title: 'Components/Roundabout',
  component: Orchestrator,
  parameters: {
    docs: {
      description: {
        component:
          'This component is a loop, with a starting page that allows access to any iteration and displays its level of completion.',
      },
    },
  },
} satisfies Meta<typeof Orchestrator>

export default meta

type Story = StoryObj<typeof Orchestrator>

export const Default = {
  parameters: {
    docs: {
      description: {
        story:
          'If the locked props is set to true then the user cannot reenter in an iteration that has been completed.',
      },
    },
  },
  args: { source: defaultSource, data: defaultData },
} satisfies Story

export const RoundaboutWithLocked = {
  parameters: {
    docs: {
      description: {
        story:
          'If the locked props is set to true then the user can not reenter in an iteration after that has been completed',
      },
    },
  },
  args: { source: lockedSource, data: lockedData },
} satisfies Story

export const RoundaboutWithControl = {
  parameters: {
    docs: {
      description: {
        story:
          'Display the control that consolidates and presents both global and item-specific errors',
      },
    },
  },
  args: { source: controlSource },
} satisfies Story
