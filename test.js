import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";

program
  .option("-t, --title <title>", "HTML 파일의 제목을 입력하세요")
  .option("-c, --area <area>", "HTML 파일의 내용을 입력하세요")
  .option("-o, --path <path>", "HTML 파일의 출력 경로를 입력하세요")
  .parse(process.argv);

if (!program.title || !program.area || !program.path) {
  console.error("필수 옵션을 입력해주세요");
  program.help();
}

inquirer
  .prompt([
    { type: "input", name: "title", message: "tite 제목을 작성 해주세요" },
    {
      type: "input",
      name: "area",
      message: "P태그 안에 들어갈 내용을 작성해주세요",
    },
    { type: "input", name: "path", message: "경로를 작성해 주세요" },
  ])
  .then((answers) => {
    program.title = answers.title;
    program.area = answers.area;
    program.path = answers.path;

    // 이후에 다른 명령어를 실행할 때 program.parse()를 호출하면 변경된 값을 사용할 수 있습니다.
    program.parse(process.argv);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${options.title}</title>
        </head>
        <body>
          ${options.area}
        </body>
      </html>
    `;

    fs.writeFile(options.output, html, (err) => {
      if (err) {
        console.error("파일 쓰기 오류:", err);
      } else {
        console.log(`HTML 파일 생성 완료: ${options.output}`);
      }
    });
  });
