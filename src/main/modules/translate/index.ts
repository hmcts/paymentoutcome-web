
export class Translate {

    getLanguage() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('language')
    }

}