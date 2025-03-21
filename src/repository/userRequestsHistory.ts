import connectDB from "@/db/database";
import UserRequestsHistory from "@/models/UserRequestsHistory";
import { CheckParams } from "@/types/formTypes";
import { User, currentUser } from "@clerk/nextjs/server";

export const saveNewRequestToUserHistory = async (
  siteUrl: string,
  country: string,
  checkParams: CheckParams,
  chatGptResponse: {
    content: String;
  }[]
) => {
  const user = await currentUser();

  const newRequest = new UserRequestsHistory({
    email: user?.emailAddresses[0].emailAddress,
    siteUrl,
    country,
    chatGptResponse,
    requestParams: checkParams,
  });

  await newRequest.save();
};

export const getUserRequestsHistoryFromDB = async (
  page: number,
  limit: number
) => {
  const user = await currentUser();

  const history = await UserRequestsHistory.find({
    email: user?.emailAddresses[0].emailAddress,
  })
    .skip(page * limit)
    .limit(limit);
  const historyCount = await UserRequestsHistory.countDocuments({
    email: user?.emailAddresses[0].emailAddress,
  });

  return {
    history,
    count: historyCount,
  };
};
