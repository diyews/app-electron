import { session } from 'electron';

export function setCookies() {
  setZhihuCookies();
}

function setZhihuCookies() {
  ['www', 'api'].forEach(second => {
    session.defaultSession.cookies.set({
      url: `https://${second}.zhihu.com`,
      name: 'z_c0',
      value: '"2|1:0|10:1560414559|4:z_c0|92:Mi4xV2U4dkVBQUFBQUFBa0s5UFNkNlREU1lBQUFCZ0FsVk5YMWZ2WFFBVmZaTE55bThRU1' +
        'ZYb0JfM3lZcXo3UmxpcFBn|8f5b7c1f3b37c7b268906cd3ba48685bb66e6c96352df1cdac54e482f56363c5"',
    });
  });
}
