import BaseModel from "./BaseModel";

  
  export interface Question {
    id: number;
    questionnaireId: number;
    text: string;
    isRequired: boolean;
    priority: number;
    type: string;
    options: string;
    isEnabled: boolean;
    createdAt: string;
    updatedAt: string;
  }

export interface QuestionnaireData {
    id: number;
    uniqueIdentifier: string;
    questionnaireName: string;
    questionnaireDescription: string;
    image: string | null;
    expiry: string;
    channels: string | null;
    createdAt: string;
    updatedAt: string;
    questions: Question[];
  }
  
  export interface QuestionnaireResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: QuestionnaireData[];
    err: null;
  }

  export interface OneQuestionnaireResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: QuestionnaireData;
    err: null;
  }

  export interface SubmitPayload extends BaseModel {
    questionnaireDescription?: string;
    questionnaireName: string;
    channels?: string;
    image?: string;
    expiry?: string;
    questions: Array<{
      text: string;
      type: string;
      isRequired?: boolean;
      isEnabled?: boolean;
      priority?: number;
      options?: string;
      option1?: string,
      option2?: string,
      option3?: string,
      option4?: string,
    }>;
  };

  export interface SubmitPayloadResponse extends BaseModel {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: QuestionnaireData;
    err: null;
  }
  
  export interface SubmitAnswerPayloadResponse {
    success: boolean;
    message: string;
  }
  