import { getOneRequestHistoryFromDB, getUserRequestsHistoryFromDB } from "@/repository/userRequestsHistory";
import { RequestHistory } from "@/types/apiResponseTypes";

export const getRequestsHistory = async (page: number, limit: number) => {
  const userHistory = await getUserRequestsHistoryFromDB(page, limit);
  return userHistory;
};

export const getOneRequestsHistory = async (id: RequestHistory['_id']): Promise<RequestHistory> => {
  const historyRecord = await getOneRequestHistoryFromDB(id);
  return historyRecord;
};
