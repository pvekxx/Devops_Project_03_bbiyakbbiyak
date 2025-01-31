interface IDateForm {
  dateString: string,
  day: number,
  month: number,
  timestamp: number,
  year: number
}

export const formatDate = (date: Date): IDateForm => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
  const day = date.getDate() - 1;
  const timestamp = date.getTime(); // 타임스탬프 (밀리초)

  // YYYY-MM-DD 형태의 문자열 생성
  const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  return {
    dateString: dateString,
    day: day,
    month: month,
    timestamp: timestamp,
    year: year
  };
}