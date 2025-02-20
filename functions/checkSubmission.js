const fs = require("fs");
const path = require("path");

export const handler = async (req,context) => {
    if (req.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { name, number } = JSON.parse(req.body);

        if (!name || !/^\d{4}$/.test(number)) {
            return { statusCode: 400, body: "잘못된 입력값입니다." };
        }

        const filePath = path.join(__dirname, "../data.csv");
        const data = fs.readFileSync(filePath, "utf8").trim();
        const rows = data.split("\n").map(row => row.split(","));

        const foundRow = rows.find(row => row[0] === name && row[1] === number);
        
        if (foundRow) {
            return {
                statusCode: 200,
                body: JSON.stringify({ status: "제출완료", description: foundRow[2] || "설명 없음" }),
            };
        } else {
            return { statusCode: 404, body: JSON.stringify({ status: "정보 없음" }) };
        }
    } catch (error) {
        return { statusCode: 500, body: error.JSON };
    }
};
