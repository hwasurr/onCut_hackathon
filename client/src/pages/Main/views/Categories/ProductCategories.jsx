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
    url: '/pngs/main/productCategory1.gif',
    isText: true,
    title: 'Highlight',
    subTitle: '편집을 돕습니다',
    description: '온컷은 좋은 편집을 하기 위한 시간을 단축시킵니다.',
    width: '34%',
    // height: 300,
  },
  {
    url: '/pngs/main/productCategory2.gif',
    isText: true,
    title: '재미있는 부분을',
    subTitle: '분석을 통해',
    description: '다양한 분석방법을 통해 "재미있는" 구간을 찾아드립니다.',
    width: '33%',
  },
  {
    url: '/pngs/main/productCategory3.gif',
    isText: true,
    title: '크리에이터와',
    subTitle: '함께합니다.',
    description: '더욱더 방송에 집중할 수 있도록 돕습니다.',
    width: '33%',
  },
  {
    url: '/pngs/main/productCategory4.gif',
    isText: true,
    title: 'ONCUT을',
    subTitle: '무료로 만나세요',
    description: 'FreeTier 로 시작하세요!',
    width: '60%',
  },
  {
    url: '/pngs/main/productCategory5.gif',
    isText: true,
    title: '오픈베타가',
    subTitle: '기다리고 있습니다.',
    description: '2020.02.',
    width: '40%',
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
