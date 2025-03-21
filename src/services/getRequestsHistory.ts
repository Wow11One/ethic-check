import { getUserRequestsHistoryFromDB } from "@/repository/userRequestsHistory";

export const getRequestsHistory = async (page: number, limit: number) => {
  const userHistory = await getUserRequestsHistoryFromDB(page, limit);
  return userHistory;
};
