import React, { useState } from 'react';
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

import timeFunc from '../../../../utils/timeFunc';
import TwitchVod from './sub/TwitchVod';
import Table from './sub/Table';
import HighlightSlider from './sub/HighlightSlider';
import DatePicker from './sub/DatePicker';
import PercentageSelect from './sub/PercentageSelect';

// datesets
import constantVariables from '../../variables/constantVariables';

const {
  data, videoIds, marks, chartData, sentimentalChartData,
} = constantVariables;

function useVideoId() {
  // *******************************************
  // video Id
  const [videoId, setVideoId] = useState(videoIds[0]);
  const [targetTime, setTargetTime] = useState(null);
  const handleVideo = () => {
    videoIds.forEach((value, index) => {
      if (videoId === value) {
        if (videoIds.length >= index + 1) {
          setVideoId(videoIds[index + 1]);
        }
      }
    });
  };

  const handleVideoByTime = (target) => {
    setTargetTime(target);
  };

  return {
    videoId, handleVideo, targetTime, handleVideoByTime,
  };
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

function useSelectedTime() {
  const [selectedTime, setSelectedTime] = React.useState(data.tableData.data[0][0]);

  const handleSelectedTime = (newTime) => {
    setSelectedTime(newTime);
  };

  return { selectedTime, handleSelectedTime };
}

function useSlider(videoByTime, handleSelectedTime, handleWordCloudChange) {
  const [sliderValue, setSliderValue] = React.useState(18);

  const sliderHandleChange = (event, newValue) => {
    setSliderValue(newValue);
    handleWordCloudChange();
    // newValue 가 marks 의 몇번째 인덱스인지 파악
    let target;
    marks.forEach((mark, index) => {
      if (newValue === mark.value) {
        // tableData의 해당 인덱스
        const t = data.tableData.data[index][0];
        const splitedT = t.split(':');
        target = `${splitedT[0]}h${splitedT[1]}m${splitedT[2]}s`;
        handleSelectedTime(t);
      }
    });

    videoByTime(target);
  };

  return { sliderValue, sliderHandleChange };
}

function useWordCloud() {
  const [wordCloud, setWordCloud] = React.useState(data.wordcloud[0]);

  function handleWordCloudChange() {
    data.wordcloud.forEach((value, index) => {
      if (value === wordCloud) {
        if (data.wordcloud.length >= index + 1) {
          setWordCloud(data.wordcloud[index + 1]);
          console.log(wordCloud);
        }
      }
    });
  }
  return { wordCloud, handleWordCloudChange };
}

const Dashboard = (props) => {
  const { classes, history } = props;
  const {
    videoId, handleVideo, targetTime, handleVideoByTime,
  } = useVideoId();
  const { selectedTime, handleSelectedTime } = useSelectedTime();
  const { wordCloud, handleWordCloudChange } = useWordCloud();
  const { selectedDate, handleDateChange } = useDatePicker(handleVideo);
  const {
    sliderValue, sliderHandleChange,
  } = useSlider(handleVideoByTime, handleSelectedTime, handleWordCloudChange);

  return (
    <div>
      {/* 광고 될 크리에이터 목록 */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={8}>

          {/* Twitch VOD */}
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
                  time={targetTime}
                />
              )}
            </Card>
          </GridItem>

          {/* 하이라이트 포인트 바 */}
          <GridItem xs={12} sm={6} md={12}>
            {/* <Typography variant="h5">슬라이더를 통해 하이라이트 포인트를 구현</Typography> */}
            <Tooltip title="하이라이트 포인트를 선택하세요!" placement="left-start">
              <HighlightSlider
                sliderValue={sliderValue}
                sliderHandleChange={sliderHandleChange}
                marks={marks}
              />
            </Tooltip>
          </GridItem>

        </GridItem>

        <GridItem xs={12} sm={6} md={4}>

          {/* 날짜 및 개수 설정 */}
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
                <DatePicker
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}

                />
                <PercentageSelect />
              </CardBody>

            </Card>
          </GridItem>

          {/* 해당 포인트의 시간대 */}
          <GridItem xs={12} sm={6} md={12}>
            <Card>
              <CardHeader color="blueGray" stats icon>
                <CardIcon color="blueGray">
                  <Add />
                </CardIcon>
                <p className={classes.cardTitle}>해당 포인트의 시간대</p>
                <h4 className={classes.cardTitle}>시간 정보</h4>
              </CardHeader>
              <CardBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h3>{`${selectedTime}  ~ ${timeFunc.addTime(selectedTime, 600)}`}</h3>
              </CardBody>

            </Card>
          </GridItem>
        </GridItem>

      </GridContainer>


      <GridContainer>
        {/* 하이라이트 포인트 테이블 */}
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
              <h4 className={classes.cardTitleWhite}>해당구간의 단어 빈도</h4>
              <p className={classes.cardTitleWhite}>
                썸네일 생성에 도움을 줄 수 있습니다.
              </p>
            </CardHeader>
            <CardBody>
              <img
                src={`/pngs/wordcloud/${wordCloud}.png`}
                width="100%"
                height="343vh"
                alt=""
              />
            </CardBody>
          </Card>
        </GridItem>

        {/* 10분 단위 시청자 수 추이 차트1 */}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>10분단위 시청자 수 추이</h4>
              <p className={classes.cardTitleWhite}>
                해당 방송의 시청자 수 추이입니다.
              </p>
            </CardHeader>
            <CardBody>
              {chartData && (
                <Line
                  data={setChartjsData(chartData.labels,
                    chartData.totalIncomeData)}
                  options={{ tooltips: { mode: 'index', intersect: false } }}
                />
              )}
            </CardBody>
          </Card>
        </GridItem>

        {/* 10분 단위 감정 분석 차트2 */}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>10분 단위 감성 점수</h4>
              <p className={classes.cardTitleWhite}>
                해당 방송의 10분 단위의 감성 점수입니다.
              </p>
            </CardHeader>
            <CardBody>
              <Line
                data={setChartjsData(sentimentalChartData.labels,
                  sentimentalChartData.totalIncomeData,
                  '감성 점수')}
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
