// const host = "http://cmdb.bkjk-inc.com";
const host = "http://127.0.0.1:8080";

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'false';

export default noProxy ? {} : {
  'GET /api/(.*)': `${host}/api`,
  'POST /api/(.*)': `${host}/api`,
  'DELETE /api/(.*)': `${host}/api`,
  'PUT /api/(.*)': `${host}/api`,
};
