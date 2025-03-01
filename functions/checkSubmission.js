export const handler = async (req, context) => {
    if (req.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    try {
      const { name, number } = JSON.parse(req.body);
      if (!name || !/^\d{4}$/.test(number)) {
        return { statusCode: 400, body: "잘못된 입력값입니다." };
      }
      
      // CSV 파일과 업데이트 시간 URL (실제 URL로 변경하세요)
      const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSIVQjWfRo62KOZgwv7OaOpikRj4JF0r1NhZ7ozsP1BDWgsr5B2FeY3qW2yqZlsdDJx-64nyc_V8BK/pub?output=csv";
      const updateUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSIVQjWfRo62KOZgwv7OaOpikRj4JF0r1NhZ7ozsP1BDWgsr5B2FeY3qW2yqZlsdDJx-64nyc_V8BK/pub?gid=1503598801&single=true&output=csv";
      
      // CSV 파일 fetch
      const csvResponse = await fetch(csvUrl);
      if (!csvResponse.ok) {
        return { statusCode: 500, body: "CSV 파일을 가져오는 데 실패했습니다." };
      }
      const csvText = await csvResponse.text();
      const rows = csvText.split("\n").map(row => row.trim().split(","));
      
      // 입력값과 일치하는 행들을 필터링 (여러 항목 대응)
      const matches = rows.filter(row => row[0] === name && row[1] === number);
      
      // 별도의 URL에서 최종 업데이트 시간 fetch
      let updateTime = "";
      try {
        const updateResponse = await fetch(updateUrl);
        if (updateResponse.ok) {
          updateTime = await updateResponse.text();
        } else {
          updateTime = "업데이트 시간 정보를 가져올 수 없음";
        }
      } catch (e) {
        updateTime = "업데이트 시간 정보를 가져올 수 없음";
      }
      
      if (matches.length > 0) {
        const descriptions = matches.map(row => row[2] || "설명 없음");
        return {
          statusCode: 200,
          body: JSON.stringify({ 
            message: "제출완료", 
            descriptions,
            updateTime
          })
        };
      } else {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: "정보 없음", updateTime })
        };
      }
    } catch (error) {
      return { statusCode: 500, body: error.message };
    }
  };
  