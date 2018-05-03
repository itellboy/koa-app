const fs = require('fs.promised');
const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');



const app = new Koa();
const router = new Router();

let lessonData = [];



router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.response.body = await fs.readFile('html/index.html', 'utf8');
});

router.post('/lessons', async (ctx, next) => {
  ctx.type = "json";
  console.log(ctx.request)
  
  ctx.response.body = lessonData;
})


app.use(bodyparser());
app.use(router.routes())
app.use(router.allowedMethods());

(async function(){
  lessonData.concat(lessonData,await fs.readFile('mock/imooc.json', 'utf-8'));
  lessonData.concat(lessonData,await fs.readFile('mock/icourse163.json', 'utf-8'));
  lessonData.concat(lessonData,await fs.readFile('mock/keQq.json', 'utf-8'));
  lessonData.concat(lessonData,await fs.readFile('mock/study163.json', 'utf-8'));
  lessonData.concat(lessonData,await fs.readFile('mock/xuetangx.json', 'utf-8'));
  // lessonData = await fs.readFile('mock/xuetangx.json', 'utf-8');
  lessonData = JSON.parse(lessonData);

  await console.log(lessonData.length)
})()


