import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess } from '../_util';

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};
export default [
  {
    url: '/sys-api/user/perm',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(fakeCodeList['1'], { msg: 'success' });
    },
  },
  // mock user login example
  // {
  //   url: '/sys-api/user/login',
  //   timeout: 200,
  //   method: 'post',
  //   response: ({ body }) => {
  //     const { username, password } = body;
  //     const checkUser = createFakeUserList().find(
  //       (item) => item.username === username && password === item.password,
  //     );
  //     if (!checkUser) {
  //       return resultError('Incorrect account or password！');
  //     }
  //     const { userId, username: _username, token, realName, desc, roles } = checkUser;
  //     return resultSuccess({
  //       roles,
  //       userId,
  //       username: _username,
  //       token,
  //       realName,
  //       desc,
  //     });
  //   },
  // },
] as MockMethod[];
