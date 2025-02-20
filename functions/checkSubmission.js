const fs = require("fs");
const path = require("path");

exports.handler = async (event,context) => {
    if (event.httpMethod !== "POST") {
        return new Response("Method Not Allowed",{ statusCode: 405});
    }

    try {
        const { name, number } = JSON.parse(event.body);

        if (!name || !/^\d{4}$/.test(number)) {
            return new Response("잘못된 입력값입니다.",{ statusCode: 400});
        }

        const filePath = path.join(__dirname, "../data.csv");
        const data = fs.readFileSync(filePath, "utf8").trim();
        const rows = data.split("\n").map(row => row.split(","));

        const foundRow = rows.find(row => row[0] === name && row[1] === number);
        
        if (foundRow) {
            return new Response(JSON.stringify({ status: "제출완료", description: foundRow[2] || "설명 없음" }),
                                {statusCode: 200});
        } else {
            return new Response(JSON.stringify({ status: "정보 없음" }), { statusCode: 404});
        }
    } catch (error) {
        return new Response("서버 오류",{ statusCode: 500});
    }
};
