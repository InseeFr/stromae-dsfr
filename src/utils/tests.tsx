import { RouterProvider } from '@tanstack/react-router'
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'

import i18n from '@/libs/i18n'
import { router } from '@/router/__mocks__'

export const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {/* @ts-ignore: we should have a better router mock */}
      <RouterProvider router={router} defaultComponent={() => component} />
    </I18nextProvider>,
  )
}

export const renderWithi18n = (component: React.ReactElement) => {
  return render(<I18nextProvider i18n={i18n}>{component}</I18nextProvider>)
}
