import { Rings } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrapper>
      <Rings height={80} width={80} />
    </LoaderWrapper>
  );
};
