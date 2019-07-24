import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Grid } from '@material-ui/core';
import Typography from '../../components/Typography';
import ImageModal from './ImageModal';

const styles = theme => ({
  imageWrapper: {
    position: 'relative',
    display: 'block',
    padding: 0,
    borderRadius: 0,
    height: '28vh',
    transitionDelay: '2s',
    [theme.breakpoints.down('sm')]: {
      width: '100% !important',
      height: 150,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.1,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.01,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    width: '100%',
    marginLeft: 15,
    padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 14px`,
    fontWeight: 'bold',
  },
  imageSubTitle: {
    position: 'relative',
    marginRight: 20,
  },
});

const ProductCategoriesDetail = (props) => {
  const {
    classes, image, matches,
  } = props;
  const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);

  function handleModalOpen() {
    setIsImageModalOpen(true);
  }

  return (
    <React.Fragment>
      <ButtonBase
        key={image.title}
        className={classes.imageWrapper}
        onClick={handleModalOpen}
        style={{
          width: image.width,
          height: image.height,
        }}
      >
        <div
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${image.url})`,
          }}
        />
        <div
          className={classes.imageBackdrop}
          style={{ opacity: image.opacity }}
        />
        { image.isText ? (
          <div className={classes.imageButton}>
            <Typography
              variant="h5"
              color="inherit"
              className={classes.imageTitle}
            >
              {image.title}
              <br />
              {image.subTitle}
            </Typography>

            { matches && (
            <Grid container>
              <Typography
                variant="h5"
                color="inherit"
                className={classes.imageSubTitle}
              >
                {image.description}
              </Typography>
            </Grid>
            )}

          </div>
        ) : null}
      </ButtonBase>

      <ImageModal
        isImageModalOpen={isImageModalOpen}
        setIsImageModalOpen={setIsImageModalOpen}
        image={image}
      />

    </React.Fragment>
  );
};


ProductCategoriesDetail.propTypes = {
  classes: PropTypes.object,
  image: PropTypes.object.isRequired,
  matches: PropTypes.bool.isRequired,
};

ProductCategoriesDetail.defaultProps = {
  classes: {},
};
export default withStyles(styles)(ProductCategoriesDetail);
