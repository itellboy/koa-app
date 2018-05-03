const fs = require('fs.promised');
const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
// 所有的课程数据
let lessonData = [];

router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.response.body = await fs.readFile('html/index.html', 'utf8');
});

router.post('/lessons', async (ctx, next) => {
  ctx.type = "json";

  let currentPage = ctx.request.body.currentPage;
  let pageSize = ctx.request.body.pageSize;
  let keywords = ctx.request.body.keywords;

  let targetLessonData = lessonData.filter(i => {
    return i.title.includes(keywords) || (i.desc || '').includes(keywords);
  })
  // 分页信息
  let page = {
    total: targetLessonData.length,
    currentPage,
    pageSize,
  }

  // 响应 
  let response = {
    page,
    code: 1,
    data: targetLessonData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  }

  ctx.response.body = response;
})

app.use(bodyparser());
app.use(router.routes())
app.use(router.allowedMethods());

(async function () {

  let startTime = Date.now();
  let data1 = await fs.readFile('mock/imooc.json', 'utf-8');
  data1 = JSON.parse(data1).data;
  let data2 = await fs.readFile('mock/icourse163.json', 'utf-8');
  data2 = JSON.parse(data2).data;
  let data3 = await fs.readFile('mock/keQq.json', 'utf-8');
  data3 = JSON.parse(data3).data;
  let data4 = await fs.readFile('mock/study163.json', 'utf-8');
  data4 = JSON.parse(data4).data;
  let data5 = await fs.readFile('mock/xuetangx.json', 'utf-8');
  data5 = JSON.parse(data5).data;

  lessonData = lessonData.concat(data1, data2, data3, data4, data5);

  app.listen(5000);

})()


