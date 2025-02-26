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

        { name: '강다영', number: '9034', description: '(보컬)영상 2개 제출 완료' },
        { name: '구본민', number: '4265', description: '(기타)미제출' },
        { name: '김가은', number: '8516', description: '(키보드)미제출' },
        { name: '김동건', number: '8272', description: '(기타)미제출' },
        { name: '김동규', number: '4714', description: '(드럼)영상 1개 제출 완료' },
        { name: '김윤진', number: '5614', description: '(보컬)미제출' },
        { name: '노주완', number: '2479', description: '(드럼)미제출' },
        { name: '박서영', number: '1621', description: '(드럼)영상 2개 제출 완료' },
        { name: '박시은', number: '6065', description: '(보컬)영상 2개 제출 완료' },
        { name: '오도영', number: '6855', description: '(기타)영상 1개 제출 완료' },
        { name: '오주하', number: '1880', description: '(보컬)영상 2개 제출 완료' },
        { name: '원아영', number: '6250', description: '(보컬)미제출' },
        { name: '유다연', number: '5818', description: '(보컬)영상 1개 제출 완료' },
        { name: '유주영', number: '3552', description: '(키보드)미제출' },
        { name: '이정후', number: '0432', description: '(보컬)영상 2개 제출 완료' },
        { name: '임수연', number: '3807', description: '(보컬)영상 2개 제출 완료' },
        { name: '정세윤', number: '6537', description: '(보컬)영상 2개 제출 완료' },
        { name: '조민서', number: '2572', description: '(키보드)영상 1개 제출 완료' },
        { name: '차은호', number: '7627', description: '(기타)영상 1개 제출 완료' },
        { name: '최민서', number: '1293', description: '(기타)영상 2개 제출 완료' },
        { name: '홍희선', number: '3710', description: '(드럼)영상 1개 제출 완료' }

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
