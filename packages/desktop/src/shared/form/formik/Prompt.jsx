import { useFormikContext } from 'formik'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Prompt as BasePrompt, useHistory } from 'react-router-dom'

import { useAlert } from 'hooks/useAlert'

const Prompt = ({ alert }) => {
	const { initialValues, isSubmitting, values } = useFormikContext()
	const { warningAlert } = useAlert()
	const history = useHistory()
	const [any_unsaved_changes, setUnsavedChanges] = useState(false)

	const unsaved_changes_trigger = Object.keys(values).some(
		key => values[key] !== initialValues[key],
	)

	useEffect(() => {
		setUnsavedChanges(unsaved_changes_trigger && !isSubmitting)
	}, [unsaved_changes_trigger, setUnsavedChanges, isSubmitting])

	return (
		<BasePrompt
			message={location => {
				if (!any_unsaved_changes) return true
				warningAlert(alert.title, alert.subtitle, alert.continue, alert.cancel).then(event => {
					if (event.result) {
						setUnsavedChanges(!any_unsaved_changes)
						history.push(location)
					}
				})

				return false
			}}
		/>
	)
}

Prompt.propTypes = {
	alert: PropTypes.shape({
		title: PropTypes.string.isRequired,
		subtitle: PropTypes.string.isRequired,
		continue: PropTypes.string.isRequired,
		cancel: PropTypes.string.isRequired,
	}).isRequired,
}

export { Prompt }
