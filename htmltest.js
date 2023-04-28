import http from "http";
import fs from "fs";
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html", "charset": "utf - 8" });
  res.write("hellow");
  res.end();
});

server.listen(2222, (error) => {
  if (error) {
    console.log(error);
  }
  console.log('서버 접속 성공');
});
