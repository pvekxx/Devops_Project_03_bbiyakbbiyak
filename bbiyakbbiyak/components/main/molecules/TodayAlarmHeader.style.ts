import { StyleSheet } from "react-native";
import { GlobalTheme } from "../../../constants/theme";

export const TodayAlarmHeaderStyles = StyleSheet.create({
  // listHeaderContainer: {

  //   minHeight: 210,
  //   marginHorizontal: 20,
  //   marginTop: 12,
  //   paddingHorizontal: 14,
  //   paddingVertical: 20,
  //   borderRadius: 20,
  //   backgroundColor: '#fff',
  // },
  alarmCategoryContainer: {
    paddingBottom: 12,
  },
  alarmCategory: {
    fontSize: 22,
    fontFamily: 'pretendard-bold'
  },
  dateContainer: {
    paddingBottom: 10
  },
  dateText: {
    fontFamily: 'pretendard'
  },
  dateTextOfCalendar: {
    fontSize: 18,
    fontFamily: 'pretendard-bold',
    color: GlobalTheme.colors.accent500
  },
  daysText: {
    fontFamily: 'pretendard',
    color: '#999'
  },
  daysTextOfCalendar: {
    fontSize: 18,
    fontFamily: 'pretendard-bold',
    color: '#999',

  },
  countText: {
    color: '#999',
    fontSize: 12
  }
});