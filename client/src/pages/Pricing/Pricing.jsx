import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppAppBar from '../Main/views/Layout/AppAppBar';
import withRoot from '../Main/withRoot';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      marginTop: theme.spacing(8),
      backgroundColor: theme.palette.common.white,
    },
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    title: 'Free',
    subheader: '시도해보세요!',
    price: '0',
    description: ['하이라이트 구간 추출 월5건 가능', '트렌드 분석 기반 컨텐츠 추천 기능', '데이터 업로드 시 분석 가능', '이메일 고객센터'],
    buttonText: '회원가입 하러가기',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '10,000',
    description: [
      '하이라이트 구간 추출 월 30건',
      '트렌드 분석 기반 컨텐츠 추천 기능',
      '데이터 업로드 시 분석 가능',
      '이메일 고객센터',
    ],
    buttonText: '시작해보기',
    buttonVariant: 'contained',
  },
  {
    title: 'Business',
    price: '50,000',
    description: [
      '하이라이트 구간 추출 무제한',
      '개인 채널 특화 분석 시스템',
      '구독자 케어',
      '비정형 데이터 분석을 통한 예측결과 제공',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '문의',
    description: [
      '하이라이트 구간 추출 무제한',
      'MCN 단체 사용 가능',
      '자세한 사항은 문의',
      '적극적 고객 응대',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];


export default withRoot((props) => {
  const { history } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppAppBar />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          요금안내
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          OnCut은 당신의 시간을 소중히 여깁니다. 더 많은 혜택을 누려보세요. 무료로 체험할 수 있습니다!
          PRO요금제는 정기적으로 매 주 방송을 진행하는 크리에이터님께 적합합니다.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="ms" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={3}>
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ￦
                      {tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /월
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map(line => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                    style={tier.buttonVariant === 'contained' ? { color: '#fff' } : {}}
                    onClick={() => { history.push('/dashboard/main'); }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}

      {/* End footer */}
    </React.Fragment>
  );
});
