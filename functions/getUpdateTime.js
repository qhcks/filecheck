export const handler = async (req, context) => {
    try {
      const updateUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSSIVQjWfRo62KOZgwv7OaOpikRj4JF0r1NhZ7ozsP1BDWgsr5B2FeY3qW2yqZlsdDJx-64nyc_V8BK/pub?gid=1503598801&single=true&output=csv"; // 실제 URL로 변경
      const response = await fetch(updateUrl);
      let updateTime = "";
      if (response.ok) {
        updateTime = await response.text();
      } else {
        updateTime = "업데이트 시간 정보를 가져올 수 없음";
      }
      return {
        statusCode: 200,
        body: JSON.stringify({ updateTime })
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      };
    }
  };
  