//현재 날짜를 YYYY-MM-DD로
const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 포맷
    const day = String(today.getDate()).padStart(2, '0'); // 두 자리로 포맷
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
export const currentDate = getCurrentDate();