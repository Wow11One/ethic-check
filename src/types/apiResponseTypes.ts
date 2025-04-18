import { CheckParams } from "./formTypes";

export interface RequestHistory {
  _id: string;
  email: string;
  siteUrl: string;
  country: string;
  requestParams: CheckParams;
  geminiResponse: {
    content: String;
  }[];
}

export interface PresentationResponse {
  result: Slide[];
};

export interface Slide {
  title: string;
  content: string;
}
