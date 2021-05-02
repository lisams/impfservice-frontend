export class Popup {
  headline: string;
  text: string;
  buttontext: string;
  isVisible: boolean;
  link: string;

  constructor(headline, text, buttontext) {
    this.headline = headline;
    this.text = text;
    this.buttontext = buttontext;
    this.isVisible = false;
    this.link = null;
  }
}
