const fs = require("fs");
const path = require("path");

exports.handler = async (event,context) => {
    if (event.httpMethod !== "POST") {
        return new Response("Method Not Allowed",{ statusCode: 405});
    }

    try {
        const { name, number } = JSON.parse(event.body);

        if (!name || !/^\d{4}$/.test(number)) {
            return new Response({ statusCode: 400, body: "잘못된 입력값입니다." });
        }

        const filePath = path.join(__dirname, "../data.csv");
        const data = fs.readFileSync(filePath, "utf8").trim();
        const rows = data.split("\n").map(row => row.split(","));

        const foundRow = rows.find(row => row[0] === name && row[1] === number);
        
        if (foundRow) {
            return new Response({
                statusCode: 200,
                body: JSON.stringify({ status: "제출완료", description: foundRow[2] || "설명 없음" }),
            });
        } else {
            return new Response({ statusCode: 404, body: JSON.stringify({ status: "정보 없음" }) });
        }
    } catch (error) {
        return new Response({ statusCode: 500, body: "서버 오류" });
    }
};
