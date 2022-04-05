import PropTypes from "prop-types"
import styled from "styled-components"

import {Icon} from "ui/icons/Icon"
import {Text} from "ui/typography/Text"
import {Block} from "ui/wrappers/Block"

const StyledBlock = styled(Block)`
  width: 100%;
  height: 100%;
`

const ZipPreview = ({name}) => (
    <StyledBlock>
      <Text color="primary">
        <Icon space_after name='file' outlined={false} />
      </Text>
      {name}
    </StyledBlock>
  )

  ZipPreview.propTypes = {
  name: PropTypes.string.isRequired,
}

export {ZipPreview}