import { connect, getIn } from 'formik'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import _ from 'underscore'

import { Dropzone as BaseDropzone } from 'lib/dropzone/Dropzone'
import { ErrorMessage } from 'shared/form/formik/ErrorMessage'

const ConnectedDropzone = ({ name, multiple, formik, ...props }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      if (props.onDrop) {
        props.onDrop(name, acceptedFiles)
      } else if (multiple) {
        const files = [...getIn(formik.values, name)]
        acceptedFiles.forEach(file => {
          if (!_.find(files, { name: file.name })) files.push({ name: file.name, file })
        })
        formik.setFieldValue(name, files)
      } else if (acceptedFiles.length > 0) {
        formik.setFieldValue(name, acceptedFiles[0])
      }
    },
    [formik, multiple, name, props],
  )

  const deleteFileAtIndex = useCallback(
    index => {
      if (props.deleteFileAtIndex) {
        props.deleteFileAtIndex(index)
      } else if (multiple) {
        const files = [...getIn(formik.values, name)]
        files.splice(index, 1)
        formik.setFieldValue(name, files)
      } else {
        formik.setFieldValue(name, null)
      }
    },
    [formik, multiple, name, props],
  )

  return (
    <>
      <BaseDropzone
        {...props}
        multiple={multiple}
        files={getIn(formik.values, name)}
        onDrop={onDrop}
        deleteFileAtIndex={deleteFileAtIndex}
      />
      <ErrorMessage name={name} />
    </>
  )
}

ConnectedDropzone.propTypes = {
  name: PropTypes.string,
  multiple: PropTypes.bool,

  formik: PropTypes.shape({
    values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setFieldValue: PropTypes.func.isRequired,
  }).isRequired,

  deleteFileAtIndex: PropTypes.func,
  onDrop: PropTypes.func,
}

ConnectedDropzone.defaultProps = {
  multiple: false,
}

const Dropzone = connect(ConnectedDropzone)
export { Dropzone }
