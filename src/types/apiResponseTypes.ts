import { CheckParams } from "./formTypes";

export interface RequestHistory {
  email: string;
  siteUrl: string;
  country: string;
  requestParams: CheckParams;
  geminiResponse: {
    content: String;
  }[];
}
