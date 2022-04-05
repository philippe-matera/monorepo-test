import * as React from "react"
import {I18nextProvider} from "react-i18next"

export const withTranslationContext = (i18n: any) => (WrappedComponent: any) => (props: any): any => (
  <I18nextProvider i18n={i18n}>
    <WrappedComponent {...props} />
  </I18nextProvider>
)
