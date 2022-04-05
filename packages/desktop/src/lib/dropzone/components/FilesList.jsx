import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import { CONSTANTS } from 'src/constants'
import { Flex } from 'ui/flex/Flex'
import { DeleteButton } from 'ui/icon_buttons/DeleteButton'
import { Icon } from 'ui/icons/Icon'
import { Clickable } from 'ui/links/Clickable'
import { Tooltip } from 'ui/tooltips/Tooltip'
import { Text } from 'ui/typography/Text'
import { Utils } from 'utils/Utils'

const StyledText = styled.div`
  overflow: auto;

  margin-right: ${CONSTANTS.spacing.xs};
`

const FilesList = ({ files, deleteFileAtIndex }) => {
  const files_html = useMemo(
    () =>
      files.map((document, index) => {
        let delete_link
        if (deleteFileAtIndex) {
          delete_link = <DeleteButton className="m-l-xs" onClick={() => deleteFileAtIndex(index)} />
        }

        let document_name = <StyledText>{document.name}</StyledText>
        if (document.tooltip)
          document_name = <Tooltip text={document.tooltip}>{document_name}</Tooltip>

        const openDocument = () => {
          let document_url
          if (document.url) document_url = document.url
          else if (document.file && document.file.url) document_url = document.file.url
          else if (document.file instanceof File) document_url = URL.createObjectURL(document.file)
          else if (document instanceof File) document_url = URL.createObjectURL(document)

          if (document_url) Utils.openTab(document_url)
        }

        // download={file.name}
        return (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={index} align_items="center" justify_content="center">
            <Clickable onClick={openDocument}>
              <Text color="primary">
                <Icon name="file_pdf" space_after />
              </Text>
              {document_name}
            </Clickable>
            {delete_link}
          </Flex>
        )
      }),
    [files, deleteFileAtIndex],
  )

  return files_html
}

FilesList.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
}

export { FilesList }
