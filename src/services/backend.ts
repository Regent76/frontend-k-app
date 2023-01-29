import { authorList } from '../data/Author';
import { quoteList } from '../data/Quote';
import {
  authorSuccessResponseType,
  authSuccessResponseType,
  infoSuccessResponseType,
  quoteSuccessResponseType,
  userInfoSuccessResponseType
} from '../models/Interface';

const backendMock = {
  getInfo: async function (): Promise<infoSuccessResponseType> {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        const successResponse = {
          success: true,
          data: {
            info: 'Some information about the <b>company</b>.'
          }
        };
        resolve(successResponse);
      }, 1000);
    });
  },
  doAuth: async function (email: string, password: string): Promise<authSuccessResponseType> {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        const successResponse = {
          'success': true,
          'data': {
            'token': 'fb566635a66295da0c8ad3f467c32dcf'
          }
        };

        if (email === 'alexey@klaim.ai' && password === 'password1') {
          resolve(successResponse);
        } else {
          reject({
            'success': false,
            'data': {
              'message': 'Access denied.'
            }
          });
        }
      }, 1000);
    });
  },
  getUserInfo: async function (token: string): Promise<userInfoSuccessResponseType> {
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        const successResponse = {
          success: true,
          data: {
            fullname: 'Alexey Kornilov',
            email: 'alexey@klaim.ai'
          }
        };

        if (token === 'fb566635a66295da0c8ad3f467c32dcf') {
          resolve(successResponse);
        } else {
          reject({
            success: false,
            message: 'User not found.'
          });
        }
      }, 1000);
    });
  },
  getAuthor: async function (): Promise<authorSuccessResponseType> {
    return new Promise(function (resolve, reject) {
      const randomAuthor = authorList[Math.floor(Math.random() * authorList.length)];
      setTimeout(() => resolve({
        success: true,
        data: randomAuthor
      }), 5000);
    });
  },
  getQuoteByAuthorId: async function (authorId: number): Promise<quoteSuccessResponseType> {
    return new Promise(function (resolve, reject) {
      const authorQuotes = quoteList.filter((quote) => {
        return quote.authorId === authorId;
      });
      const randomAuthorQuote = authorQuotes[Math.floor(Math.random() * authorQuotes.length)];
      setTimeout(() => resolve({
        success: true,
        data: randomAuthorQuote
      }), 5000);
    });
  }
};

export { backendMock };