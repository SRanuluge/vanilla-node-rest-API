const fs = require("fs");

function writeDataToFile(path, content) {
  fs.writeFileSync(path, JSON.stringify(content));
}

function getPostData(req) {
  return new Promise((resolve, rejects) => {
    try {
      let body = "";
      req
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", () => {
          resolve(JSON.parse(body));
        });
    } catch (error) {
      rejects(error);
    }
  });
}

module.exports = { writeDataToFile, getPostData };
