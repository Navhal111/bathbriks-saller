import type {
  GetOneResponse,
  GetAllResponse,
  CreateOneResponse,
  UpdateOneResponse,
  DeleteOneResponse,
} from "@/kit/models/_generic";
import type BaseModel from "@/kit/models/BaseModel";
import API, { type Headers, type Params } from "@/kit/services/axiosService";
import CategoryAPI from '@/kit/services/axiosCategoryService'

export const API_VERSION = "api";
export const API_VERSION_V2 = "v2";

const fetchAll = async <T = any>(
  name: string,
  params?: Params,
  headers?: Headers,
  apiVersion: string = API_VERSION,
  isCategoryAPI: boolean = false
): Promise<T> => {
  const path = `/${apiVersion}/${name}`;

  if (isCategoryAPI) {
    return CategoryAPI.get(path, params, headers)
  } else {
    return API.get(path, params, headers)
  }
};

const fetchOne = async <T>(
  name: string,
  id: string,
  params?: Params,
  headers?: Headers,
  apiVersion: string = API_VERSION
): Promise<T> => {
  const path = `/${apiVersion}/${name}/${id}`;
  return API.get(path, params, headers);
};

const createOne = async <T extends BaseModel>(
  name: string,
  body: Partial<T>,
  params?: Params,
  headers?: Headers,
  apiVersion: string = API_VERSION,
  isCategoryAPI: boolean = false
): Promise<CreateOneResponse<T>> => {
  const path = `/${apiVersion}/${name}`

  if (isCategoryAPI) {
    return CategoryAPI.post(path, body, params, headers)
  } else {
    return API.post(path, body, params, headers)
  }
}

const updateOne = async <T extends BaseModel>(
  name: string,
  id: string,
  body: Partial<T>,
  params?: Params,
  headers?: Headers,
  apiVersion: string = API_VERSION,
  isCategoryAPI: boolean = false
): Promise<UpdateOneResponse<T>> => {
  const path = `/${apiVersion}/${name}/${id}`

  if (isCategoryAPI) {
    return CategoryAPI.post(path, body, params, headers)
  } else {
    return API.patch(path, body, params, headers)
  }
}

const deleteOne = async (
  name: string,
  id?: string,
  params?: Params,
  headers?: Headers,
  apiVersion?: string,
  isCategoryAPI: boolean = false
): Promise<DeleteOneResponse> => {
  const apiVer = apiVersion || API_VERSION
  const path = id ? `/${apiVer}/${name}/${id}` : `/${apiVer}/${name}`

  if (isCategoryAPI) {
    return CategoryAPI.post(path, params, headers)
  } else {
    return API.remove(path, params, headers)
  }
}

const customRequest = async <T, R>({
  name,
  method,
  id,
  payload,
  params,
  headers,
  apiVersion = API_VERSION,
}: {
  name: string;
  method: "POST" | "PATCH" | "GET" | "DELETE";
  id?: string;
  payload?: Partial<T>;
  params?: Params;
  headers?: Headers;
  apiVersion?: string;
}): Promise<R> => {
  const path = id ? `/${apiVersion}/${name}/${id}` : `/${apiVersion}/${name}`;
  return API.request({
    path,
    method,
    payload,
    params,
    headers,
  });
};

const fetcher = async <T>(url: string, params?: string): Promise<T> => {
  const response = await fetch(`${url}?${params}`);

  return await response.json();
};

export {
  fetchOne,
  fetchAll,
  createOne,
  updateOne,
  deleteOne,
  customRequest,
  fetcher,
};
