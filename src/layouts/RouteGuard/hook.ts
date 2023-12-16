import { PROJECT_AUTH_TOKEN } from '@/constants';
import { LocalStorage } from '@/services/localStorage';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Path, publicPaths } from './data';
import _isEmpty from 'lodash/isEmpty';
import { useAuth } from '@/stores';

export const useAuthCheck = () => {
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const profileStore = useAuth((state) => state.profile);
  const profile = LocalStorage.get(PROJECT_AUTH_TOKEN);

  const checkAuthorization = useCallback(
    async (url: string) => {
      const path = url.split('?')[0];
      const isPublicPath = publicPaths.includes(path as Path);

      // if (path === Path.LOGIN || path === Path.SIGN_UP) {
      //   setAuthorized(true);
      //   return;
      // }
      // if (
      //   (path === Path.LOGIN || path === Path.SIGN_UP || path === Path.FEED) &&
      //   !_isEmpty(profile)
      // ) {
      //   redirectToFeed();
      //   return;
      // }

      if (path === Path.LOGIN || path === Path.SIGN_UP) {
        if (!_isEmpty(profile)) {
          redirectToFeed();
        }
        setAuthorized(true);
      }
      if (isPublicPath) {
        setAuthorized(true);
        return;
      }

      if (path.includes('/auth/new-password') || path.includes('/auth/verify')) {
        setAuthorized(true);
        return;
      }

      if (_isEmpty(profile)) {
        redirectToLogin();
        return;
      }

      if (_isEmpty(profileStore)) {
        setAuthorized(false);
        return;
      }

      setAuthorized(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile, pathname]
  );

  const redirectToLogin = () => {
    setAuthorized(false);
    router.push('/auth/sign-in');
  };

  const redirectToFeed = () => {
    // setAuthorized(false);
    router.push('/feed');
  };

  return { checkAuthorization, authorized };
};
