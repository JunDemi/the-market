//YYYY-MM-DD 포매터
export const getDateTimeFormat = (datetime?: number) => {
  if (datetime) {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1, 두 자리로 포맷
    const day = String(date.getDate()).padStart(2, "0"); // 두 자리로 포맷
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedTime = `${year}-${month}-${day} ( ${hours}시${minutes}분 )`;
    return formattedTime;
  }
};
//0시 00분의 밀리초 값 구하기 5일전 ~ 오늘
export const getPastTime = (
  type: "오늘" | "1일전" | "2일전" | "3일전" | "4일전" | "5일전" | "6일전"
) => {
  const now = new Date();
  if (type === "오늘") {
    now.setDate(now.getDate() + 1); //내일 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  } else if (type === "1일전") {
    now.setDate(now.getDate()); //오늘 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  } else if (type === "2일전") {
    now.setDate(now.getDate() - 1); //1일 전 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  } else if (type === "3일전") {
    now.setDate(now.getDate() - 2); //2일 전 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  } else if (type === "4일전") {
    now.setDate(now.getDate() - 3); //3일 전 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  } else if (type === "5일전") {
    now.setDate(now.getDate() - 4); //4일 전 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  }else if (type === "6일전") {
    now.setDate(now.getDate() - 5); //5일 전 0시 00분
    now.setHours(0, 0, 0, 0);
    return now.getTime();
  }
};
