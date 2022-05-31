export interface ILoadingState {
  message: string;
  isLoading: boolean;
}
export interface ILoadingContext {
  state: ILoadingState;
  actions: {
    show: (message?: string, className?: string) => void;
    hide: () => void;
  };
}
export interface ILoadingProps {
  overrydeRender?: (state: ILoadingState) => JSX.Element;
}
