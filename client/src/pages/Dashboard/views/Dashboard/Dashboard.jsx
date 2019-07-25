import React, { useState } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core
import withStyles from '@material-ui/core/styles/withStyles';
// material core
// import Typography from '@material-ui/core/Typography';
import Settings from '@material-ui/icons/Settings';
import Add from '@material-ui/icons/Add';
// core ../../../components
import Tooltip from '@material-ui/core/Tooltip';
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
import HOST from '../../../../config';
// 상수
const tableData = {
  payload: {
    columns: ['하이라이트 시간', '채팅빈도', '재미점수'],
    data: [
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
      ['19:01:12', '2', '3'],
    ],
  },
};

const Dashboard = (props) => {
  const { classes, history } = props;

  const [creatorName, setCreatorName] = useState(null);

  function valuetext(value) {
    return `${value}°C`;
  }

  return (
    <div>
      {/* 광고 될 크리에이터 목록 */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={8}>

          <GridItem xs={12} sm={6} md={12}>
            <Card>
              <TwitchVod
                creatorName="handongsuk"
              />
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
                <p className={classes.cardCategory}>상세한 설정</p>
                <h4 className={classes.cardTitle}>설정</h4>
              </CardHeader>
              <CardBody>
                <DatePicker />
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
                <p className={classes.cardCategory}>하이라이트 포인트의</p>
                <h4 className={classes.cardTitle}>상세 정보</h4>
              </CardHeader>
              <CardBody>
                <DatePicker />
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
              <p className={classes.cardCategoryWhite}>
                하이라이트 포인트의 세부 정보입니다
              </p>
            </CardHeader>
            <CardBody>
              { !tableData.loading && tableData.payload
                && (
                  <Table tableData={tableData} />
                )}
            </CardBody>
          </Card>
        </GridItem>

        {/* 워드클라우드 */}
        <GridItem xs={12} sm={6} md={6}>
          <Card>
            <CardHeader color="blueGray">
              <h4 className={classes.cardTitleWhite}>구간의 단어빈도</h4>
              <p className={classes.cardCategoryWhite}>
                썸네일 생성에 도움을 줄 수 있습니다.
              </p>
            </CardHeader>
            <CardBody>
              <img
                src="/pngs/wordcloud/2019-02-02 20_51_00_yapyap30.png"
                width="100%"
                height="343vh"
                alt=""
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
