import { Skeleton, SkeletonProps } from '@chakra-ui/react';

export interface TQuadrilateralProps extends SkeletonProps {
  isLoading: boolean;
}

export const Quadrilateral = ({
  w,
  h,
  isLoading,
  ...rest
}: TQuadrilateralProps) => {
  return <Skeleton w={w} h={h} isLoaded={!isLoading} {...rest}></Skeleton>;
};
