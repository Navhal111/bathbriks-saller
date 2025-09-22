
  
  export interface QuestionnaireAnswerResponse {
    status: number;
    responseCode: number;
    success: boolean;
    message: string;
    data: QuestionnaireAnswerData;
    err: null;
  }

  export interface QuestionnaireAnswerData {
    count: number;
    rows: QuestionnaireAnswer[];
  }

  export interface QuestionnaireAnswer {
    id: number;
    questionnaireId: number;
    questionId: number;
    userId: string;
    anonymousId: string;
    answer: string;
    image_path: string | null;
    review: string | null;
    stars: number | null;
    createdAt: string;
    updatedAt: string;
    question: Question;
  };

  export interface Question  {
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
    questionnaire: Questionnaire;
  };

  
  export interface Questionnaire {
    id: number;
    uniqueIdentifier: string;
    questionnaireName: string;
    questionnaireDescription: string;
    image: string | null;
    expiry: string;
    channels: string;
    createdAt: string;
    updatedAt: string;
  };
  