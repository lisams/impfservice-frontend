export class ErrorMessage {
  constructor (
    public forControl: string,
    public forValidator: string,
    public text : string

  ) {}

  static safariFormBugfix() {
    if(navigator.userAgent.toLowerCase().indexOf('safari/') > -1) {
      return "Das Datum muss im Format JJJJ-MM-TT eingegeben werden";
    }
    return "Das Datum muss im Format TT.MM.JJJJ eingegeben werden"
  }
}

export const VaccinationFormErrorMessage = [

  new ErrorMessage('date', 'required', 'Es muss ein Datum eingegeben werden'),
  new ErrorMessage('date', 'pattern', ErrorMessage.safariFormBugfix()),
  new ErrorMessage('date', 'checkDate', 'Das Datum muss in der Zukunft liegen'),

  new ErrorMessage('start', 'required', 'Es muss eine Startzeit eingegeben werden'),
  new ErrorMessage('start', 'pattern', 'Die Startzeit muss im Format HH:MM angegeben werden'),

  new ErrorMessage('end', 'pattern', 'Die Endzeit muss im Format HH:MM angegeben werden'),
  new ErrorMessage('end', 'required', 'Es muss eine Endzeit eingegeben werden'),

  new ErrorMessage('max_participants', 'required', 'Es muss eine valide Anzahl eingegeben werden'),
  new ErrorMessage('max_participants', 'pattern', 'Es dürfen nur Nummern eingegeben werden'),

  new ErrorMessage('title', 'required', 'Es muss ein Name der Location eingegeben werden'),

  new ErrorMessage('street_address', 'required', "Es muss eine Adresse eingegeben werden"),

  new ErrorMessage('zip_code', 'required', "Es muss eine Postleitzahl eingegeben werden"),
  new ErrorMessage('zip_code', 'pattern', "Die Postleitzahl muss 4 Nummern beinhalten (Beispiel: 4020)"),

  new ErrorMessage('city', 'required', "Es muss ein Ort bzw. eine Stadt eingegeben werden"),
]


