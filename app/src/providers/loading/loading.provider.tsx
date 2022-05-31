import * as React from 'react';
import { LoadingContext, ILoadingProps, ILoadingState } from './';

const defaultMessageText = 'Loading...';

export const LoadingProvider = (props: React.PropsWithChildren<ILoadingProps>): JSX.Element => {
  const [loadingState, setLoadingState] = React.useState({
    message: defaultMessageText,
    isLoading: true
  } as ILoadingState);

  const show = React.useCallback((message?: string, className?: string) => {
    setLoadingState({
      message: message || defaultMessageText,
      isLoading: true
    });
  }, []);

  const hide = React.useCallback(() => {
    setLoadingState({
      message: '',
      isLoading: false
    });
  }, []);

  const value = {
    state: loadingState,
    actions: { show, hide }
  };

  return <LoadingContext.Provider value={value}>{props.children}</LoadingContext.Provider>;
};
