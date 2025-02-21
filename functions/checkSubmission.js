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

    // 상수 리스트로 제출 데이터를 정의 (data.csv 대신 사용)
    const submissions = [
        { name: '홍길동', number: '1234', description: '서류 제출 완료' },
        { name: '이몽룡', number: '5678', description: '심사 중' },
        { name: '성춘향', number: '9876', description: '최종 합격' }
    ];

    // 입력값과 일치하는 항목 검색
    const found = submissions.find(entry => entry.name === name && entry.number === number);

    if (found) {
        return {
        statusCode: 200,
        body: JSON.stringify({ message: "제출완료" , description: found.description })
        };
    } else {
        return {
        statusCode: 404,
        body: JSON.stringify({ message: '정보 없음' })
        };
    }
    } catch (error) {
        return { statusCode: 500, body: error.message };
    }
};
