import PropTypes from 'prop-types'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import _ from 'underscore'

import useTranslation from 'hooks/useTranslation'
import { Empty } from 'resource/data_table/components/Empty'
import { Footer } from 'resource/data_table/components/Footer'
import { Header } from 'resource/data_table/components/Header'
import { Row } from 'resource/data_table/components/Row'
import { DefaultRow } from 'resource/data_table/components/row/DefaultRow'
import { DataTableContext } from 'resource/data_table/static/DataTableContext'
import { CursorNavigator } from 'shared/nav/CursorNavigator'
import { withBaseTranslationContext } from 'shared/withBaseTranslationContext'
import { LoadingWrapper } from 'src/shared/LoadingWrapper'
import { Button } from 'ui/buttons/Button'
import { DownloadCsvButton } from 'ui/icon_buttons/DownloadCsvButton'
import { Block } from 'ui/wrappers/Block'
import { DataUtils } from 'utils/DataUtils'
import { Utils } from 'utils/Utils'

const defaultFilter = (filter, value) =>
  !filter ||
  typeof value !== 'string' ||
  Utils.sanitizeString(value).indexOf(Utils.sanitizeString(filter)) !== -1

const applyFilter = function (filter, row, column) {
  const filter_function = column.filterMethod || defaultFilter

  return filter_function(filter, row[column.key])
}

const Container = styled('div').withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !['loading'].includes(prop) && defaultValidatorFn(prop),
})`
  overflow-x: auto;
  width: 100%;

  ${({ loading }) => loading && 'opacity: 0.5;'}
`

const StyledDataTable = styled.table`
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
`

const TranslatedDataTable = ({ onSort, ...props }) => {
  const { t } = useTranslation('general')
  const [filters, setFilters] = useState({})
  const [filtering, setFiltering] = useState(props.filtering)
  const [sorting, setSorting] = useState({ column: null, direction: null })
  const [activeRowKey, setActiveRowKey] = useState(null)

  const toggleActiveRow = useCallback(
    key => setActiveRowKey(key === activeRowKey ? null : key),
    [activeRowKey],
  )
  const toggleFiltering = useCallback(() => setFiltering(!filtering), [filtering])
  const onClickSortColumn = useCallback(
    column => {
      let newColumn = sorting.column
      let newDirection = sorting.direction
      if (sorting.column === column) {
        if (!sorting.direction) newDirection = 'ASC'
        else if (sorting.direction === 'ASC') newDirection = 'DESC'
        else newDirection = null
      } else {
        newColumn = column
        newDirection = 'ASC'
      }
      setSorting({ column: newColumn, direction: newDirection })
      if (onSort) onSort(newDirection ? { [newColumn]: newDirection } : null)
    },
    [onSort, sorting.column, sorting.direction],
  )
  const updateFilter = useCallback(
    e => setFilters({ ...filters, [e.target.name]: e.target.value }),
    [filters],
  )

  const csvExport = () => {
    const exportColumns = props.columns.filter(column =>
      _.contains(props.exportableColumns, column.key),
    )

    let csvRows = [exportColumns.map(column => column.name).join('\t')]
    csvRows = csvRows.concat(
      props.rows.map(row =>
        exportColumns
          .map(column => {
            let value = row[column.key]
            if (column.type === 'currency') {
              if (!value) value = 0
              if (typeof value === 'string') value = parseFloat(value)
              value = value.toFixed(2)
            }

            return column.exporter ? column.exporter(value) : value
          })
          .join('\t'),
      ),
    )
    const csvContent = `${decodeURIComponent('%EF%BB%BF')}${csvRows.join('\n')}`

    const csvA = new Uint16Array(csvContent.split('').map(k => k.charCodeAt(0)))
    const blob = new Blob([csvA], { type: 'text/csv;charset=UTF-16LE;' })
    const blobUrl = URL.createObjectURL(blob)

    Utils.openTab(blobUrl, { download: `${props.exportFilename}.csv` })
  }

  const datatable_context = useMemo(
    () => ({
      columns: props.columns,
      sorting,
      filters,
      no_border: props.no_border,
      row_renderer: props.row_renderer,
      cellTooltipFormatter: props.cellTooltipFormatter,
    }),
    [props.columns, props.no_border, sorting, filters, props.row_renderer, props.cellTooltipFormatter],
  )

  const rows = useMemo(() => {
    const filtered_rows = props.rows.filter(row => {
      let keep = true
      props.columns.forEach(
        column => (keep = keep && applyFilter(filters[column.key], row, column)),
      )

      return keep
    })

    const column = _.findWhere(props.columns, { key: sorting.column })
    let compare
    if (column && column.sortMethod)
      compare = (a, b) => column.sortMethod(a, b, sorting.direction, sorting.column)
    else
      compare = (a, b) =>
        DataUtils.defaultCompare(a[sorting.column], b[sorting.column], sorting.direction)

    const sorted_rows = !sorting.direction || onSort ? filtered_rows : filtered_rows.sort(compare)

    return sorted_rows.map(row => (
      <Row
        key={row.key}
        row={row}
        active={activeRowKey === (row.id || row.key)}
        detailsFormatter={props.detailsFormatter}
        toggle_details_on_click={props.toggle_details_on_click}
        toggleActiveRow={toggleActiveRow}
        background_color={row.background_color}
        highlight={row.highlight}
      />
    ))
  }, [
    props.rows,
    props.columns,
    props.detailsFormatter,
    props.toggle_details_on_click,
    sorting.column,
    sorting.direction,
    filters,
    activeRowKey,
    toggleActiveRow,
    onSort,
  ])

  if (props.rows.length === 0) {
    if (props.loading) {
      return (
        <Block top="m" bottom="m">
          <LoadingWrapper loading />
        </Block>
      )
    } else if (props.noRowsText || props.empty_state_props?.title) {
      return (
        <Block top="m" left="l" bottom="m" right="l">
          <Empty
            title={props.noRowsText}
            subtitle={props.noRowsSubtitle}
            {...props.empty_state_props}
          />
        </Block>
      )
    }
  }

  let export_cta
  if (!_.isEmpty(props.exportableColumns)) {
    export_cta = (
      <DownloadCsvButton tooltip_text={t('general:data_table.csv_export')} onClick={csvExport} />
    )
  }

  const header = props.headers && (
    <Header
      filtering={filtering}
      filter_placeholder={props.filter_placeholder}
      updateFilter={updateFilter}
      onClickSortColumn={onClickSortColumn}
    />
  )
  const footer = props.footer_rows.length > 0 && <Footer footer_rows={props.footer_rows} />

  let actions_row
  if (_.any(props.columns, { filterable: true })) {
    actions_row = (
      <Button className="pull-right" color="default" xs onClick={toggleFiltering}>
        {t('general:data_table.filter')}
      </Button>
    )
  }

  const table = (
    <DataTableContext.Provider value={datatable_context}>
      {actions_row}
      <Container loading={props.loading}>
        <StyledDataTable>
          {props.additionalHeader}
          {header}
          {rows}
          {footer}
        </StyledDataTable>
      </Container>
      {(props.onNextPage || props.onPreviousPage) && (
        <Block top="m" bottom="s">
          <CursorNavigator onPreviousPage={props.onPreviousPage} onNextPage={props.onNextPage} />
        </Block>
      )}
    </DataTableContext.Provider>
  )

  if (_.isFunction(props.children)) {
    return props.children(table, { export_cta })
  }

  return table
}

TranslatedDataTable.propTypes = {
  headers: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  footer_rows: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  noRowsText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  noRowsSubtitle: PropTypes.string,
  empty_state_props: PropTypes.shape({
    title: PropTypes.string,
    title_size: PropTypes.oneOf(['2', '3', '4', '5', '6']),
    subtitle: PropTypes.string,
    image_src: PropTypes.string,
    image_alt: PropTypes.string,
    children: PropTypes.node,
  }),
  tdClassName: PropTypes.string,
  additionalHeader: PropTypes.element,
  detailsFormatter: PropTypes.func,
  toggle_details_on_click: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  className: PropTypes.string,
  filtering: PropTypes.bool,
  filter_placeholder: PropTypes.string,
  no_border: PropTypes.bool,
  row_renderer: PropTypes.func,
  exportableColumns: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  onPreviousPage: PropTypes.func,
  onNextPage: PropTypes.func,
  onSort: PropTypes.func,
  children: PropTypes.func,
  exportFilename: PropTypes.string,
  cellTooltipFormatter: PropTypes.func
}

TranslatedDataTable.defaultProps = {
  loading: false,
  headers: true,
  className: 'table-hover',
  footer_rows: [],
  filtering: false,
  no_border: false,
  toggle_details_on_click: true,
}

const DataTable = withBaseTranslationContext(TranslatedDataTable)

DataTable.DefaultRow = DefaultRow

export { DataTable, TranslatedDataTable as StorybookDataTable, Empty as EmptyState }
