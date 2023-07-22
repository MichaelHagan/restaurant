import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FaRegSadTear } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(8),
  },
  icon: {
    fontSize: '4rem',
    color: 'text-gray-600',
    marginBottom: theme.spacing(2),
  },
  message: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: 'text-gray-600',
  },
}));

const NoFoodComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FaRegSadTear className={classes.icon} />
      <div className={classes.message}>
        Oops! There is no food available in this category.
      </div>
    </div>
  );
};

export default NoFoodComponent;
