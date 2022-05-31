import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { ILoadingProps, LoadingContext } from '.';

export const Loading = (props: ILoadingProps): JSX.Element => {
  const { state } = React.useContext(LoadingContext);
  const { overrydeRender } = props;

  if (!state.isLoading) {
    return <></>;
  }

  if (overrydeRender) {
    return overrydeRender(state);
  }

  return (
    <Stack spacing={2} justifyContent='center' alignItems='center'>
      <div>
        <CircularProgress />
      </div>
      <div>
        <Typography variant='h6' gutterBottom component='div'>
          {state.message}
        </Typography>
      </div>
    </Stack>
  );
};
