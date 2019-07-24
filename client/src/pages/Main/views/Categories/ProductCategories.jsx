import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography';

import ProductCategoriesDetail from './ProductCategoriesDetail';

const styles = theme => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(4),
  },
});

// 이미지 데이터
const images = [
  {
    url: '/pngs/main/category_1.png',
    isText: false,
    title: '1인 방송 마케팅',
    fullDescription: '1인 미디어에 광고를 올리고 싶지만 크리에이터에 대해 모르거나, 일일이 계약하기 힘든 광고주. 광고주를 찾기 힘든 크리에이터 모두에게 광고를 유치하고 집행할 수 있는 기회를 제공합니다.',
    width: '50%',
  },
  {
    url: '/pngs/main/category_2.png',
    isText: false,
    title: '합리적 금액 책정',
    fullDescription: 'OnAD는 시청자 수 및 조회수에 기반힌 광고 집행량에 따라 금액을 산정합니다. 합리적인 방식의 과금체계를 통해 광고 집행으로 발생하는 비용과 수익을 투명하게 확인할 수 있습니다.',
    width: '50%',
  },
  {
    url:
    '/pngs/main/category_3.png',
    isText: false,
    title: '관련성 기반 매칭 시스템',
    fullDescription: '배너의 카테고리 및 특징과 크리에이터의 방송 컨텐츠의 연관성을 분석하여 실시간으로 가장 관련있는 방송에 광고가 들어갈 수 있습니다. 분석은 영상 이미지, 크리에이터의 음성, 시청자 반응등을 토대로 진행됩니다. 예를 들면, 치킨먹방 방송 시, 맥주 배너가 나타나는 것처럼 말이죠.',
    width: '50%',
  },
  {
    url: '/pngs/main/category_4.png',
    isText: false,
    title: '실시간 비용 분석',
    fullDescription: '광고 집행으로 발생하는 비용과 수익을 실시간으로 볼 수 있으며 광고 시간, 노출량 등을 분석을 통해 확인할 수 있습니다.',
    width: '50%',
  },
  {
    url: '/pngs/main/open_beta.png',
    isText: true,
    title: '오픈베타가',
    subTitle: '예정되어있습니다',
    description: '2019.10.',
    fullDescription: 'OnAD는 2019년 10월 중 오픈베타 예정입니다. OnAD 팀원들은 "성장"의 가치를 추구합니다. 지속적으로 기술 발전을 추구하고, 끊임없이 사고합니다. OnAD와 함께 성장하시겠습니까?',
    width: '100%',
    opacity: 0.3,
    // height: 300,
  },
];


class ProductCategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (!this.checked) {
      this.setState({
        checked: true,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { checked } = this.state;

    return (
      <Container
        className={classes.root}
        component="section"
      >
        <Typography variant="h4" marked="center" align="center" component="h2">
        손쉽게 이용할 수 있습니다.
        </Typography>
        <ProductCategoriesDetail
          checked={checked}
          images={images}
        />
      </Container>
    );
  }
}


ProductCategories.propTypes = {
  classes: PropTypes.object,
};

ProductCategories.defaultProps = {
  classes: {},
};

export default withStyles(styles)(ProductCategories);
