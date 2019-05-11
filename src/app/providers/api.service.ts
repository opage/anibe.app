import axios, { AxiosInstance } from 'axios';

/**
 * @private
 * @description содержит ссылку на api
 * @type {string}
*/
export const baseURL = 'https://api.anibe.ru';

export interface AxiosSettings {
  auth?: {
    username: string,
    password: string,
  };
}

/**
 * Класс обертка для быстрой смены способоа запросов
 * @param {AxiosSettings} settings параметры для установки
 * @class
 */
export class API {
  /**
   * @private
   * @description параметры для установки http соединения
   * @type {AxiosSettings}
   */
  private settings: AxiosSettings;
  /**
   * @private
   * @description переменная для хранения экземпляра класса для работы с http
   * @type {HTTP}
   */
  private http: AxiosInstance;
  /**
   * @private
   * @description тип содержимого ответа и запроса
   */
  private responseType = 'json';

  /**
   * @constructor
   * @param {AxiosSettings} settings параметры для соединения через HTTP
   */
  constructor(
    settings: AxiosSettings
  ) {
    this.settings = settings;
    this.http = axios.create({
      baseURL: baseURL,
      timeout: 1000,
      responseType: this.responseType,
      ...settings
    });
  }

  /**
   * Выполняет POST с авторизацией
   * @async
   * @param url ссылка
   * @param data тело запроса
   * @returns {Promise<any>}
   */
  public auth(url: string, username: string, password: string): Promise<any> {
    return this.http.post(url, {
      auth: {
        username,
        password
      }
    });
  }

  /**
   * Выполняет GET запрос к серверу апи
   * @async
   * @param {string} url ссылка на метод без учета базы
   * @returns {Promise<any>}
   */
  public get(url: string, params: any): Promise<any> {
    return this.http.get(url, {
      params,
    });
  }
  /**
   * Выполняет PUT запрос к серверу апи
   * @async
   * @param url ссылка
   * @param data тело запроса
   * @returns {Promise<any>}
   */
  public put(url: string, data: any, params: any): Promise<any> {
    return this.http.put(url, {
      data,
      params
    });
  }
  /**
   * Выполняет POST запрос к серверу апи
   * @async
   * @param url ссылка
   * @param data тело запроса
   * @returns {Promise<any>}
   */
  public post(url: string, data: any, params: any): Promise<any> {
    return this.http.post(url, {
      data,
      params
    });
  }
  /**
   * Выполняет PATCH запрос к серверу апи
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public patch(url: string, data: any, params: any): Promise<any> {
    return this.http.patch(url, {
      data,
      params
    });
  }
  /**
   * Выполняет DELETE запрос к серверу апи
   * @async
   * @param url ссылка
   * @returns {Promise<any>}
   */
  public delete(url: string, params: any): Promise<any> {
    return this.http.patch(url, {
      method: 'delete',
      params
    });
  }

  /**
   * Выполняет PUT запрос к серверу апи и загружает файл по ссылке
   * @async
   * @param url ссылка
   * @param body тело запроса
   * @returns {Promise<any>}
   */
  public putFile(url: string, params: any, file: string): Promise<any> {
    return this.http.post(url, {
      params
    });
  }
}
