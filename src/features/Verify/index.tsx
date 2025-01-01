import { verifyMailToken } from '@/api/auth';
import { Quadrilateral } from '@/components/skeleton';
import { CheckIcon } from '@/icons';
import { Center, Icon, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import Cookies from 'universal-cookie';

type TVerifyProps = {};

export const Verify = (props: TVerifyProps) => {
  const router = useRouter();
  const { token } = router.query;
  const cookies = new Cookies();
  //   verify by send email-verify-token to server
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: 'verify',
    queryFn: async () => {
      const res = await verifyMailToken({ email_verify_token: token[0] });
      return res;
    },
    enabled: !!router.isReady,
    onSuccess: async (data) => {
      console.log(data?.result.access_token);
      console.log('data', data);
      await cookies.set('Authorization', data.result.access_token, {
        path: '/',
      });
    },
    onError: (error) => {
      console.log(error);
      
    }
  });
  console.log(data);
  const render = () => {
    if (!isSuccess) {
      return (
        <Quadrilateral
          isLoading={isLoading}
          h="50%"
          w="50%"
          paddingX={52}
          paddingY={14}
        />
      );
    } else {
      return (
        <>
          <VStack
            rounded="xl"
            color="white"
            paddingX={52}
            paddingY={14}
            spacing={6}
            bg="green.600"
          >
            <Text fontSize="2xl" fontWeight="bold">
              Email has been Verified
            </Text>
            <Icon
              as={CheckIcon}
              bg="white"
              p={2}
              color="green.700"
              rounded="full"
              fontSize="60px"
            />
            <Text fontSize="md" fontWeight="bold">
              Please comback and process
            </Text>
            <Text>@RecyAI-Website</Text>
          </VStack>
        </>
      );
    }
  };

  return (
    <Center bg="green.700" h="100vh">
      {render()}
    </Center>
  );
};
