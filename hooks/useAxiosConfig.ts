import { apiClient } from '../lib/axios';
import { useToast } from 'native-base';
// redux
import { useDispatch } from 'react-redux';
import { store } from '../lib/redux/store';
import { useEffect, useState } from 'react';

export default function usePusherNotification() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const { token } = store.getState().auth;
  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    const initActionOfTokenExpired = () => {
      // Set auth token
      apiClient.interceptors.request.use((config) => {
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });
      apiClient.interceptors.response.use(
        (response) => {
          if (response?.data?.status === 400) {
            toast.show({
              title: response?.data.message,
              placement: 'top',
            });
          }
          return response;
        },
        (error) => {
          const err = JSON.parse(JSON.stringify(error));
          if (err?.status === 400) {
            toast.show({
              title: err?.message,
              placement: 'top',
            });
          }

          // If API return 401 not authorized error, then sign-out
          // if (error?.response.status == 401) {
          //   dispatch(resetAuthData());
          //   toast.show({
          //     title: 'Phiên dăng nhập hết hạn, vui lòng đăng nhập lại',
          //     placement: 'top',
          //   });
          // }
          // else {
          //   toast.show({
          //     title: 'Dã có lỗi xảy ra, vui lòng thử lại',
          //     placement: 'top',
          //   });
          // }
          return error;
        }
      );
      setLoadingComplete(true);
    };
    initActionOfTokenExpired();
  }, [token]);

  return isLoadingComplete;
}
