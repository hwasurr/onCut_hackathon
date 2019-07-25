import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
// for chart
import { Line } from 'react-chartjs-2';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
// material core
// import Typography from '@material-ui/core/Typography';
import Settings from '@material-ui/icons/Settings';
import Add from '@material-ui/icons/Add';
// core ../../../components
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import setChartjsData from '../../variables/charts';
import dashboardStyle from '../../assets/jss/onad/views/dashboardStyle';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardIcon from '../../components/Card/CardIcon';
import CardBody from '../../components/Card/CardBody';

import TwitchVod from './sub/TwitchVod';
import Table from './sub/Table';
import HighlightSlider from './sub/HighlightSlider';
import DatePicker from './sub/DatePicker';
import PercentageSelect from './sub/PercentageSelect';
// import PercentagePicker from './sub/PercentagePicker';
// settings
import axios from '../../../../utils/axios';

// 상수
const data = {
  tableData: {
    columns: ['하이라이트 시간', '채팅빈도', '재미점수'],
    data: [
      ['20:50:00', '24', '21'],
      ['20:51:00', '26', '44'],
      ['21:41:00', '32', '23'],
      ['22:56:00', '45', '37'],
      ['23:25:00', '21', '21'],
      ['01:53:00', '22', '31'],
      ['02:25:00', '21', '44'],
      ['02:26:00', '19', '12'],
      ['02:27:00', '17', '23'],
      ['03:05:00', '15', '34'],
    ],
  },
  wordcloud: [
    '2019-02-02 20_50_00_yapyap30',
    '2019-02-02 20_51_00_yapyap30',
    '2019-02-02 21_41_00_yapyap30',
    '2019-02-02 22_56_00_yapyap30',
    '2019-02-02 23_25_00_yapyap30',
    '2019-02-02 01_53_00_yapyap30',
    '2019-02-02 02_26_00_yapyap30',
    '2019-02-02 02_27_00_yapyap30',
    '2019-02-02 03_05_00_yapyap30',
    '2019-02-02 02_25_00_yapyap30',
  ],
};

const videoIds = [
  '456375670',
  '456617624',
  '457705610',
  '455854721',
];

const chartData = {
  labels: [1, 2, 3, 4, 5],
  totalIncomeData: [12, 12, 12, 13, 14],
};

function useVideoId() {
  // *******************************************
  // video Id
  const [videoId, setVideoId] = useState(videoIds[0]);
  const handleVideo = () => {
    videoIds.forEach((value, index) => {
      console.log('videoId: ', videoId, '테이블밸류: ', value);
      if (videoId === value) {
        console.log('videoId === value');
        if (videoIds.length >= index + 1) {
          setVideoId(videoIds[index + 1]);
        } else {
          setVideoId(videoIds[0]);
        }
      }
    });
  };
  // *******************************************

  return { videoId, handleVideo };
}

function useDatePicker(handleVideo) {
  // *******************************************
  // date 수정시 함수
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-07-25'));
  function handleDateChange(date) {
    setSelectedDate(date);
    handleVideo();
  }
  // *******************************************
  return { selectedDate, handleDateChange };
}

const Dashboard = (props) => {
  const { classes, history } = props;
  const { videoId, handleVideo } = useVideoId();
  const { selectedDate, handleDateChange } = useDatePicker(handleVideo);

  /**
   * threshold 설정
   */

  // ****************************************

  return (
    <div>
      {/* 광고 될 크리에이터 목록 */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={8}>

          <GridItem xs={12} sm={6} md={12}>
            <Card>
              {videoId === null ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 150,
                  marginBottom: 150,
                }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <TwitchVod
                  videoId={videoId}
                />
              )}
            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={12}>
            {/* <Typography variant="h5">슬라이더를 통해 하이라이트 포인트를 구현</Typography> */}
            <Tooltip title="하이라이트 포인트를 선택하세요!" placement="left-start">
              <HighlightSlider />
            </Tooltip>
          </GridItem>

        </GridItem>

        <GridItem xs={12} sm={6} md={4}>
          <GridItem xs={12} sm={6} md={12}>
            <Card>
              <CardHeader color="blueGray" stats icon>
                <CardIcon color="blueGray">
                  <Settings />
                </CardIcon>
                <p className={classes.cardTitle}>상세한 설정</p>
                <h4 className={classes.cardTitle}>설정</h4>
              </CardHeader>
              <CardBody>
                <DatePicker selectedDate={selectedDate} handleDateChange={handleDateChange} />
                <PercentageSelect />
              </CardBody>

            </Card>
          </GridItem>

          <GridItem xs={12} sm={6} md={12}>
            <Card>
              <CardHeader color="blueGray" stats icon>
                <CardIcon color="blueGray">
                  <Add />
                </CardIcon>
                <p className={classes.cardTitle}>해당 포인트의 시간대</p>
                <h4 className={classes.cardTitle}>시간 정보</h4>
              </CardHeader>
              <CardBody>
                <h4>selectedTime ~ selectedTime</h4>
              </CardBody>

            </Card>
          </GridItem>
        </GridItem>

      </GridContainer>


      <GridContainer>
        {/* 테이블 및 차트 */}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>세부 정보</h4>
              <p className={classes.cardTitleWhite}>
                하이라이트 포인트의 세부 정보입니다
              </p>
            </CardHeader>
            <CardBody>
              { !data.loading && data.tableData
                && (
                  <Table data={data} />
                )}
            </CardBody>
          </Card>
        </GridItem>

        {/* 워드클라우드 */}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>구간의 단어빈도</h4>
              <p className={classes.cardTitleWhite}>
                썸네일 생성에 도움을 줄 수 있습니다.
              </p>
            </CardHeader>
            <CardBody>
              <img
                src={`/pngs/wordcloud/${data.wordcloud[0]}.png`}
                width="100%"
                height="343vh"
                alt=""
              />
            </CardBody>
          </Card>
        </GridItem>

        {/* 차트 */}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>하이라이트 구간 차트</h4>
              <p className={classes.cardTitleWhite}>
                해당 방송의 시간대별 점수입니다.
              </p>
            </CardHeader>
            <CardBody>
              <Line
                data={setChartjsData(chartData.labels, chartData.totalIncomeData)}
                options={{ tooltips: { mode: 'index', intersect: false } }}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>하이라이트 구간 차트</h4>
              <p className={classes.cardTitleWhite}>
                해당 방송의 시간대별 점수입니다.
              </p>
            </CardHeader>
            <CardBody>
              <Line
                data={setChartjsData(chartData.labels, chartData.totalIncomeData)}
                options={{ tooltips: { mode: 'index', intersect: false } }}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(Dashboard);
