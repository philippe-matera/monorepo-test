import { COLORS } from '@matera-tech/utils'
import filesize from 'filesize'
import PropTypes from 'prop-types'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import _ from 'underscore'

import { useAlert } from 'hooks/useAlert'
import useTranslation from 'hooks/useTranslation'
import { DragActive } from 'lib/dropzone/components/DragActive'
import { FilesList } from 'lib/dropzone/components/FilesList'
import { Instructions } from 'lib/dropzone/components/Instructions'
import { DropzoneDragContext as DragContext } from 'lib/dropzone/static/DropzoneDragContext'
import { DropzoneUtils } from 'lib/dropzone/static/DropzoneUtils'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { Block } from 'ui/wrappers/Block'

// prettier-ignore
const StyledDropzone = styled.div`
  background: ${COLORS.gray[100]};

  padding: 24px;
  border: 2px dashed ${COLORS.gray[300]};
  box-sizing: border-box;
  border-radius: 16px;

  text-align: center;

  outline: none;

  ${({isDragActive}) => isDragActive &&
    `
    border-color: ${COLORS.primary.normal}
    color: ${COLORS.primary.normal}
  `}
`

const FILE_TYPE = {
  PDF: ['application/pdf'],
  IMAGES: ['image/*'],
  CSV: ['text/csv'],
  EXCEL: [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
  WORD: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  POWERPOINT: [
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-pps',
    'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    'application/vnd.apple.keynote',
    'application/vnd.oasis.opendocument.presentation',
  ],
}

const TranslatedDropzone = ({
  multiple,
  instructions,
  maxSize,
  files,
  onDrop,
  deleteFileAtIndex,
  small,
  pdf,
  images,
  excel,
  csv,
  word,
  button_color,
  powerpoint,
}) => {
  const { t } = useTranslation('general')
  const { errorAlert } = useAlert()
  const {
    isDragActive: isGlobalDragActive,
    isDragOverDropzone,
    setIsDragOverDropzone,
  } = useContext(DragContext)
  const translation_scope = useMemo(() => (multiple ? 'multiple' : 'simple'), [multiple])
  const size = filesize.partial({
    bits: false,
    round: 0,
    symbols: {
      B: t('general:dropzone.file_sizes.B'),
      KB: t('general:dropzone.file_sizes.KB'),
      MB: t('general:dropzone.file_sizes.MB'),
    },
  })

  const accept = useMemo(() => {
    const mime_types = []

    if (pdf) mime_types.push(...FILE_TYPE.PDF)
    if (images) mime_types.push(...FILE_TYPE.IMAGES)
    if (excel) mime_types.push(...FILE_TYPE.EXCEL)
    if (csv) mime_types.push(...FILE_TYPE.CSV)
    if (word) mime_types.push(...FILE_TYPE.WORD)
    if (powerpoint) mime_types.push(...FILE_TYPE.POWERPOINT)

    if (!mime_types.length) mime_types.push(FILE_TYPE.PDF, FILE_TYPE.IMAGES)

    return mime_types.join(', ')
  }, [pdf, images, excel, csv, word, powerpoint])

  const onDocumentDrop = useCallback(
    (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        onDrop(acceptedFiles)
      } else if (rejectedFiles.length > 0) {
        if (rejectedFiles[0].size > maxSize) {
          errorAlert(t(`general:dropzone.${translation_scope}.errors.size`, { max: size(maxSize) }))
        } else {
          errorAlert(
            t(`general:dropzone.${translation_scope}.errors.format`, {
              formats_list: DropzoneUtils.formats(accept),
            }),
          )
        }
      }
    },
    [onDrop, maxSize, translation_scope, size, accept, t, errorAlert],
  )

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDrop: onDocumentDrop,
    multiple,
    accept,
    noClick: true,
  })

  useEffect(() => setIsDragOverDropzone(isDragActive), [isDragActive, setIsDragOverDropzone])

  const files_formatted = useMemo(() => _.compact(Array.isArray(files) ? files : [files]), [files])
  const drag_active = useMemo(
    () => isGlobalDragActive && (isDragActive || !isDragOverDropzone),
    [isGlobalDragActive, isDragActive, isDragOverDropzone],
  )

  const content = useMemo(() => {
    if (drag_active) return <DragActive />

    return (
      <Instructions
        open={open}
        maxSize={maxSize}
        accept={accept}
        instructions={instructions}
        multiple={multiple}
        small={small}
        button_color={button_color}
      />
    )
  }, [drag_active, open, maxSize, accept, instructions, multiple, small, button_color])

  return (
    <StyledDropzone {..._.omit(getRootProps(), ['onClick'])} isDragActive={drag_active}>
      <input {...getInputProps()} />
      {content}
      {files_formatted.length > 0 && (
        <Block all="s">
          <FilesList files={files_formatted} deleteFileAtIndex={deleteFileAtIndex} />
        </Block>
      )}
    </StyledDropzone>
  )
}

TranslatedDropzone.propTypes = {
  multiple: PropTypes.bool,
  maxSize: PropTypes.number,
  files: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object), PropTypes.object]), // eslint-disable-line react/forbid-prop-types
  onDrop: PropTypes.func,
  deleteFileAtIndex: PropTypes.func,
  instructions: PropTypes.string,
  small: PropTypes.bool,
  pdf: PropTypes.bool,
  images: PropTypes.bool,
  excel: PropTypes.bool,
  csv: PropTypes.bool,
  word: PropTypes.bool,
  powerpoint: PropTypes.bool,
  button_color: PropTypes.string,
}

TranslatedDropzone.defaultProps = {
  multiple: false,
  maxSize: 52428800,
  pdf: false,
  images: false,
  excel: false,
  csv: false,
  word: false,
  powerpoint: false,
}

const Dropzone = withBaseTranslationContext(TranslatedDropzone)
export { Dropzone }
