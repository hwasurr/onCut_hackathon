import React, {
  useState, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons
import ListAlt from '@material-ui/icons/ListAlt';
import BarChart from '@material-ui/icons/BarChart';

// material core
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from '../../../../utils/axios';

// core ../../../components
import dashboardStyle from '../../assets/jss/onad/views/dashboardStyle';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import CustomTabs from '../../components/CustomTabs/CustomTabs';
import Table from '../../components/Table/Table';
import HighlightChart from './HighlightChart';
// Typography
import HOST from '../../../../config';
// 상수
const WAIT_BANNER_STATE = 1; // 대기중 배너 스테이트

// data Fetch hooks
function useFetchData(url, dateRange) {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // get data function
  const callUrl = useCallback(async () => {
    try {
      const res = await axios.get(url, {
        params: { dateRange },
      });
      if (res.data.length !== 0) {
        setPayload(res.data);
      } else {
        // setPayload(res.data);
        setError('데이터가 없습니다.');
        // throw new Error('데이터가 존재하지   않습니다');
      }
    } catch {
      setError('오류입니다.');
    } finally {
      setLoading(false);
    }
  }, [dateRange, url]);

  useEffect(() => {
    callUrl();
  }, [callUrl]);

  return { payload, loading, error };
}

function useAdStartDialog() {
  const [DialogOpen, setDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState({});

  function handleDialogOpen(img) {
    setSelectedBanner(img);
    setDialogOpen(true);
  }

  function handleDialogClose() {
    setDialogOpen(false);
  }

  return {
    DialogOpen, handleDialogOpen, handleDialogClose, selectedBanner,
  };
}

const tableData = {
  payload: {
    columns: ['col1', 'col2', 'col3'],
    data: [
      ['1', '2', '3'],
      ['1', '2', '3'],
    ],
  },
};

const Dashboard = (props) => {
  const { classes, history } = props;

  // const tableData = useFetchData(`${HOST}/api/dashboard/marketer/creatorList`);

  // 충전 및 환불 페이지네이션
  const [page, setPage] = React.useState(0); // 테이블 페이지
  const [rowsPerPage, setRowsPerPage] = React.useState(7); // 테이블 페이지당 행
  const emptyRows = rowsPerPage - Math.min(
    rowsPerPage, tableData.length - page * rowsPerPage,
  );

  // page handler
  function handleChangeTablePage(event, newPage) {
    setPage(newPage);
  }
  // page per row handler
  function handleChangeTableRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
  }

  return (
    <div>
      {/* 광고 될 크리에이터 목록 */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={12}>
          { !tableData.loading && tableData.payload
          && (
          <CustomTabs
            headerColor="blueGray"
            tabs={[
              {
                tabName: '하이라이트 포인트',
                tabIcon: ListAlt,
                tabContent: (
                  tableData.loading && !tableData.payload ? (
                    <div style={{ textAlign: 'center' }}><CircularProgress /></div>
                  ) : (
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
                  )
                ),
              },
              {
                tabName: '워드클라우드',
                tabIcon: BarChart,
                tabContent: <HighlightChart />,
              },
            ]}
          />
          )
        }
        </GridItem>
      </GridContainer>
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
