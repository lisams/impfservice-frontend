export class ErrorMessage {
  constructor (
    public forControl: string,
    public forValidator: string,
    public text : string
  ) {}
}

export const LoginErrorMessages = [

  new ErrorMessage('email', 'required', 'Es muss eine Email-Adresse eingegeben werden'),
  new ErrorMessage('email', 'email', 'Die Email-Adresse muss im Email-Format angegeben werden'),

  new ErrorMessage('password', 'pattern', 'Die Email-Adresse muss im Email-Format angegeben werden'),
  new ErrorMessage('password', 'pattern', 'Das Passwort muss Klein-, Großbuchstaben, mind. eine Zahl und ein Sonderzeichen beinhalten'),
]


