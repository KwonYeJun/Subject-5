// import { program } from "commander";
// import inquirer from "inquirer";
// import fs from "fs";

// program
//   .name(program.name)
//   .option("-t, --title <title>", "HTML 파일의 제목을 입력하세요")
//   // .option("-c, --area <area>", "HTML 파일의 내용을 입력하세요")
//   // .option("-o, --path <path>", "HTML 파일의 출력 경로를 입력하세요")
//   .parse(process.argv);

// // if (!program.title || !program.area || !program.path) {
// //   console.error("필수 옵션을 입력해주세요");
// //   program.help();
// // }

// inquirer
//   .prompt([
//     { type: "input", name: "name", message: "cli name:" },
//     { type: "input", name: "title", message: "tite 제목을 작성 해주세요" },
//     // {
//     //   type: "input",
//     //   name: "area",
//     //   message: "P태그 안에 들어갈 내용을 작성해주세요",
//     // },
//     // { type: "input", name: "path", message: "경로를 작성해 주세요" },
//   ])
//   .then((answers) => {
//     program.name = answers.name;
//     program.title = answers.title;
//     program.parse(process.argv);
//     // program.area = answers.area;
//     // program.path = answers.path;

//     // 이후에 다른 명령어를 실행할 때 program.parse()를 호출하면 변경된 값을 사용할 수 있습니다.

//     // const html = `
//     //   <!DOCTYPE html>
//     //   <html>
//     //     <head>
//     //       <title>${options.title}</title>
//     //     </head>
//     //     <body>
//     //       ${options.area}
//     //     </body>
//     //   </html>
//     // `;

//     // fs.writeFile(options.output, html, (err) => {
//     //   if (err) {
//     //     console.error("파일 쓰기 오류:", err);
//     //   } else {
//     //     console.log(`HTML 파일 생성 완료: ${options.output}`);
//     //   }
//     // });
//   });
import { program } from "commander";
import inquirer from "inquirer";
import fs from "fs";

program
  .command('asd')
  .name("program-name")
  .option("-t, --title <title>", `${program.title}`)
  .option("-p, --p <p>", `${program.p}`)
  .option("-r, --root", `${program.root}`)
  .parse(process.argv);

inquirer
  .prompt([
    { type: "input", name: "name", message: "생성할 HTML 이름:" },
    { type: "input", name: "title", message: "tite 제목을 작성 해주세요" },
    {
      type: "confirm",
      name: "root",
      message: "body 태그의 자식으로서 최상위 div #root 태그 사용 유무",
    },
    { type: "input", name: "p", message: "p태그에 들어갈 내용 정하기" },
  ])
  .then((answers) => {
    program.name(answers.name);
    program.title = answers.title;
    program.root = answers.root;
    program.p = answers.p;

    program.parse(process.argv);

    console.log(`생성할 HTML 이름: ${program.name()}`);
    console.log(`HTML 파일 제목: ${program.title}`);
    console.log(`#root 태그 사용 여부: ${program.root}`);
    console.log(`내용: ${program.p}`);

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
          <p> ${program.p}</p>
        </div>`;
  } else {
    html += `
        <p> ${program.p}</p>`;
  }

  html += `
      </body>
    </html>
  `;


    const outputPath = `result/${program.name()}.html`;
    // 파일 경로 수정

    fs.writeFile(outputPath, html, (err) => {
      if (err) {
        console.error("파일 쓰기 오류:", err);
      } else {
        console.log(`HTML 파일 생성 완료: ${outputPath}`);
      }
    });
  });
