import { Slide, ToastContainer as ToastContainerUtils, toast } from 'react-toastify'

import { Flex } from '../ui/flex/Flex'
import { Icon } from '../ui/icons/Icon'
import { Clickable } from '../ui/links/Clickable'

// eslint-disable-next-line import/no-unassigned-import
import '../scss/main.scss'

export class ToastUtils {
  static success(content, options) {
    return toast.success(content, options)
  }

  static info(content, options) {
    return toast.info(content, options)
  }

  static error(content, options) {
    return toast.error(content, options)
  }

  static warning(content, options) {
    return toast.warn(content, options)
  }
}

export const ToastContainer = () => (
  <ToastContainerUtils
    closeButton={({ closeToast }) => (
      <Flex align_items="center" justify_content="center">
        <Clickable onClick={closeToast}>
          <Icon name="close" />
        </Clickable>
      </Flex>
    )}
    transition={Slide}
    autoClose={3000}
    draggable={false}
    closeOnClick={false}
    hideProgressBar
    position="top-center"
    limit={4}
  />
)
