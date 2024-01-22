export default class AviasalesService {
  baseURL = 'https://aviasales-test-api.kata.academy/';
  searchId;

  getResource = async (url) => {
    const link = `${this.baseURL}${url}`;
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  };

  getSearchId = async () => {
    const response = await this.getResource('search');
    this.searchId = response.searchId;
  };

  getTickets = async () => {
    if (this.searchId) {
      const response = await this.getResource(`tickets?searchId=${this.searchId}`);
      return response;
    } else await this.getSearchId(), await this.getTickets();
  };
}

export const aviasalesService = new AviasalesService();
