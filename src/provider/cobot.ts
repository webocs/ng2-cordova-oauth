import { OAuthProvider, IOAuthOptions } from "../provider";

/*
 * Configuration options for using Facebook oauth
 */
export interface ICobotOptions extends IOAuthOptions {
    authType?: string;
    customDomain?:string;
}

export class Cobot extends OAuthProvider {

    options: ICobotOptions;
    protected authUrl: string = 'https://'+ this.options.customDomain +'/oauth';
    protected defaults: Object = {
      responseType: 'token'
    };

    constructor(options: ICobotOptions = {}) {
        super(options);

        if (!options.appScope || options.appScope.length <= 0) {
            throw new Error(`A ${this.name} app scope must exist`);
        }
    }

    protected optionsToDialogUrl(options) {
      let url = super.optionsToDialogUrl(options);

      if (options.authType) {
          url += `&auth_type=${options.authType}`;
      }

      return url;
    }

}
