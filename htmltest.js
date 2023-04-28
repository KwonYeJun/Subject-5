import http from "http";
import fs from "fs";
function htmlCreate(title,boolean) {
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>`;

if (boolean) {
  html += `
      <div id="root">
        <p> 성고ㅓㅇ</p>
      </div>`;
} else {
  html += `
      <p> $실패</p>`;
}

html += `
    </body>
  </html>
`;

return html;
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", "charset": "utf8" });
  res.write(htmlCreate('테스트',false));
  res.end();
});

server.listen(2222, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('서버 접속 성공');
});
