const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const {sync}=require('./scripts/sync.cjs');
const root=__dirname;
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png'};
function createServer() {return http.createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost');
  if(!/^(?:127\.0\.0\.1|localhost):\d+$/.test(req.headers.host||'')){res.writeHead(403);res.end('Local access only');return;}
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://assets.tarkov.dev; connect-src 'self'; object-src 'none'; frame-ancestors 'self'");
  const mode=['regular','pve','pvp-season'].includes(url.searchParams.get('mode'))?url.searchParams.get('mode'):'regular';
  if(url.pathname==='/api/data') {try {const ref=JSON.parse(fs.readFileSync(path.join(root,'data/reference.json'),'utf8'));const live=path.join(root,'data',`live-${mode}.json`);const data=fs.existsSync(live)?{...ref,...JSON.parse(fs.readFileSync(live,'utf8'))}:{...ref,meta:{...ref.meta,gameMode:`Legacy regular reference (requested ${mode})`}};res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));}catch(e){res.writeHead(500);res.end('Run npm run prepare-data first');}return;}
  if(url.pathname==='/api/sync'&&req.method==='POST') {const origin=req.headers.origin;if(origin&&origin!==`http://${req.headers.host}`){res.writeHead(403);res.end();return;}try {const meta=await sync(mode);res.setHeader('Content-Type','application/json');res.end(JSON.stringify(meta));}catch(e){res.writeHead(502,{'Content-Type':'application/json'});res.end(JSON.stringify({error:e.message}));}return;}
  if(url.pathname==='/advanced-core.js'){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(path.join(root,'advanced-core.cjs')));return;}
  if(url.pathname==='/core.js'){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(path.join(root,'core.cjs')));return;}
  if(url.pathname==='/planner-core.js'){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(path.join(root,'planner-core.cjs')));return;}
  if(url.pathname==='/map-logic.js'){res.setHeader('Content-Type','text/javascript');res.end(fs.readFileSync(path.join(root,'map-logic.cjs')));return;}
  let relative;try {relative=decodeURIComponent(url.pathname);}catch{res.writeHead(400);res.end();return;}
  const base=relative.startsWith('/maps/')?path.join(root,'maps'):root;
  if(relative.startsWith('/maps/')) relative=relative.slice(5);
  if(relative==='/')relative='/index.html';
  const file=path.resolve(base,'.'+relative);
  if(!file.startsWith(base+path.sep)||!['.html','.css','.js','.json','.svg','.png'].includes(path.extname(file))||relative.includes('/node_modules/')||relative.includes('/scripts/')){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,buffer)=>{if(error){res.writeHead(404);res.end('Not found');return;}res.setHeader('Content-Type',mime[path.extname(file)]);res.end(buffer);});
});}
if(require.main===module) createServer().listen(4317,'127.0.0.1',()=>console.log('Tarkov Companion: http://127.0.0.1:4317'));
module.exports={createServer};
