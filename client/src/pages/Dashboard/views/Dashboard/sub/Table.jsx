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
  const { data } = props;
  // for Table
  const {
    emptyRows, rowsPerPage, page,
    handleChangeTablePage, handleChangeTableRowsPerPage,
  } = usePageNationTable(data);

  return (
    <div>
      {data.payload !== null
        && (
          <Table
            tableHeaderColor="danger"
            tableHead={data.tableData.columns}
            tableData={data.tableData.data}
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
  data: PropTypes.object.isRequired,
};
