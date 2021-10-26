import axios from 'axios';

const urlIframelyIframe = 'https://iframe.ly/api/iframely';

export class IFramelyService {
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  getData(url: any): any {
    return axios
      .get(`${urlIframelyIframe}?url=${url}&api_key=${this.apiKey}`)
      .then((response) => response)
      .catch((error: Error) => {
        if (error) throw error;
      });
  }
}
