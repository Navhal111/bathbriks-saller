import { API_VERSION, customRequest, fetchAll, fetchOne } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import { OneQuestionnaireResponse, QuestionnaireResponse, SubmitAnswerPayloadResponse, SubmitPayload, SubmitPayloadResponse } from '@/kit/models/questionnaire'
import { QuestionnaireAnswerResponse } from '@/kit/models/QuestionnaireAnswer'
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll'
import useSWRImmutable from 'swr/immutable'
import useSWRCreateOne from './swr/useSWRCreateOne'
import { useSWRUpdateOne } from './swr/useSWRUpdateOne'

const QUESTIONAIRE_PATH = 'admin/questionnaire'
const QUESTIONAIREANSWER_PATH = 'admin/questionnaire/answer/get-all'
const QUESTIONAIREANSWERSUBMIT_PATH = 'admin/answer/submit'

const useGetAllQuestionnaire = (params?: Params) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR<QuestionnaireResponse, CustomError[]>(
    [`${API_VERSION}/${QUESTIONAIRE_PATH}`, params],
    (): Promise<QuestionnaireResponse> => fetchAll(`${QUESTIONAIRE_PATH}`, params),
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      keepPreviousData: true
    }
  )

  return {
    questionnaire: data,
    questionnaireError: error,
    isQuestionnaireLoading: isLoading,
    isValidatingQuestionnaire: isValidating,
    refreshQuestionnaire: mutate
  }
}

const useGetOneQuestionnaire = (id = '', params?: Params) => {
  const { mutate, data, error, isLoading, isValidating } = useSWRImmutable<OneQuestionnaireResponse, CustomError[]>(
    id ? [`${QUESTIONAIRE_PATH}/${id}`, params] : null,
    (): Promise<OneQuestionnaireResponse> => fetchOne(QUESTIONAIRE_PATH, id, params),
    {
      revalidateOnMount: true,
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  return {
    data,
    isLoading,
    error,
    mutate,
    isValidating
  }
}

const useCreateonQustionnaire = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<SubmitPayloadResponse>({
    path: QUESTIONAIRE_PATH
  })
  const typedCreate = create as (data: SubmitPayload) => Promise<SubmitPayloadResponse>;

  return {
    data,
    error,
    isMutating,
    reset,
    create: typedCreate,
  }
}

const useUpdateQustionnaire = (id = '') => {
  const { data, error, isMutating, reset, update } = useSWRUpdateOne<SubmitPayload>({
    path: QUESTIONAIRE_PATH,
    id
  })

  return {
    data,
    error,
    isUpdating: isMutating,
    reset,
    update
  }
}

const useGetAllQuestionnaireAnswer = (questionnaireId: number | null) => {
  const shouldFetch = !!questionnaireId;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    shouldFetch ? [QUESTIONAIREANSWER_PATH, questionnaireId] : null,
    ([name, id]) => {
      return customRequest<QuestionnaireAnswerResponse, QuestionnaireAnswerResponse>({
        name,
        method: 'GET',
        params: {
          questionnaireId: id,
          search: "",
        },
        apiVersion: API_VERSION
      });
    },
    {
      revalidateOnMount: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  );

  return {
    questionnaireAnswer: data,
    questionnaireAnswerError: error,
    isLoadingQuestionnaireAnswer: isLoading,
    isQuestionnaireAnswerValidating: isValidating,
    refreshQuestionnaireAnswer: mutate
  };
};

const useDeleteQuestionnaire = (id = '') => {
  const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<SubmitPayloadResponse>({
    path: QUESTIONAIRE_PATH,
    id
  })

  return {
    data,
    error,
    isDeleting,
    reset,
    deleteRecord
  }
}

const useCreateAnswerOnQuestionnaire = () => {
  const { data, error, isMutating, reset, create } = useSWRCreateOne<SubmitPayloadResponse>({
    path: `${QUESTIONAIREANSWERSUBMIT_PATH}`,
  });
  const typedCreate = create as (data: FormData) => Promise<SubmitAnswerPayloadResponse>;

  return {
    data,
    error,
    isMutating,
    reset,
    create: typedCreate,
  };
};

export {
  useGetAllQuestionnaire,
  useGetAllQuestionnaireAnswer,
  useGetOneQuestionnaire,
  useCreateonQustionnaire,
  useUpdateQustionnaire,
  useDeleteQuestionnaire,
  useCreateAnswerOnQuestionnaire
}
