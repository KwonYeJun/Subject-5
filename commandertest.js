import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";

program
  .name("program-name")
  .option("-t, --title <title>", "HTML 파일의 제목을 입력하세요")
  .option("-p, --p <p>", "P 태그 안에 들어갈 내용을 입력하세요")
  .option("-r, --root", "body 태그의 자식으로서 최상위 div #root 태그 사용 유무")
  .parse(process.argv);

inquirer
  .prompt([
    { type: "input", name: "name", message: "생성할 HTML 이름:" },
    { type: "input", name: "title", message: "HTML 파일의 제목을 입력하세요" },
    {
      type: "confirm",
      name: "root",
      message: "body 태그의 자식으로서 최상위 div #root 태그 사용 유무",
    },
    { type: "input", name: "p", message: "P 태그 안에 들어갈 내용을 입력하세요" },
  ])
  .then((answers) => {
    program.name(answers.name);
    program.title = answers.title;
    program.root = answers.root;
    program.p = answers.p;

    console.log(`생성할 HTML 이름은 ${program.name()}`);
    console.log(`HTML 파일 제목은 ${program.title}`);
    console.log(`#root 태그 사용 여부는 ${program.root}`);
    console.log(`내용은 ${program.p}`);

    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${program.title}</title>
        </head>
        <body>`;

    if (answers.root) {
      html += `
          <div id="root">
            <p>${program.p}</p>
          </div>`;
    } else {
      html += `
          <p>${program.p}</p>`;
    }

    html += `
        </body>
      </html>
    `;

    const outputPath = `result/${program.name()}.html`;

    fs.writeFile(outputPath, html, (err) => {
      if (err) {
        console.error("파일 쓰기 오류:", err);
      } else {
        console.log(`HTML 파일 생성 완료: ${outputPath}`);
      }
    });
  });
