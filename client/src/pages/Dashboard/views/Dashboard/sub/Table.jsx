import React from 'react';
import PropTypes from 'prop-types';
import Table from '../../../components/Table/Table';

function usePageNationTable(data) {
  // 충전 및 환불 페이지네이션
  const [page, setPage] = React.useState(0); // 테이블 페이지
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // 테이블 페이지당 행
  const emptyRows = rowsPerPage - Math.min(
    rowsPerPage, data.length - page * rowsPerPage,
  );

  // page handler
  function handleChangeTablePage(event, newPage) {
    setPage(newPage);
  }
  // page per row handler
  function handleChangeTableRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return {
    emptyRows,
    rowsPerPage,
    page,
    handleChangeTablePage,
    handleChangeTableRowsPerPage,
  };
}

export default function TableChartTab(props) {
  const { tableData } = props;
  // for Table
  const {
    emptyRows, rowsPerPage, page,
    handleChangeTablePage, handleChangeTableRowsPerPage,
  } = usePageNationTable(tableData);

  return (
    <div>
      {tableData.payload !== null
        && (
          <Table
            tableHeaderColor="danger"
            tableHead={tableData.payload.columns}
            tableData={tableData.payload.data}
            pagination
            handleChangeTablePage={handleChangeTablePage}
            handleChangeTableRowsPerPage={handleChangeTableRowsPerPage}
            emptyRows={emptyRows}
            rowsPerPage={rowsPerPage}
            page={page}
          />
        )}
    </div>

  );
}

TableChartTab.propTypes = {
  tableData: PropTypes.object.isRequired,
};
