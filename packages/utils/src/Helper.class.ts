import { isError } from './validation'

export enum ConsoleColors {
  Reset = '\x1b[0m',
  Bright = '\x1b[1m',
  Dim = '\x1b[2m',
  Underscore = '\x1b[4m',
  Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  Hidden = '\x1b[8m',
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  BackgroundBlack = '\x1b[40m',
  BackgroundRed = '\x1b[41m',
  BackgroundGreen = '\x1b[42m',
  BackgroundYellow = '\x1b[43m',
  BackgroundBlue = '\x1b[44m',
  BackgroundMagenta = '\x1b[45m',
  BackgroundCyan = '\x1b[46m',
  BackgroundWhite = '\x1b[47m',
}

export class Helper {
  public sourceName: string
  private readonly name: string

  constructor(options: { name: string }) {
    this.name = options.name
    this.sourceName = `default \`${this.name}\``
  }

  public throwError(error: string | Error | unknown) {
    const message = `[${this.name}]: ${
      isError(error) ? error.message : error
    } from (${this.sourceName})`
    throw isError(error) ? { ...error, message } : new Error(message)
  }

  public log(
    message: string,
    wrapped = false,
    type: 'info' | 'log' | 'error' = 'info'
  ) {
    const prefixMessage = `${ConsoleColors.BackgroundMagenta}${ConsoleColors.Black}${ConsoleColors.Dim}[${this.name}]${ConsoleColors.Reset}${ConsoleColors.Yellow}${ConsoleColors.Dim}: ${ConsoleColors.Reset}`
    const postfixMessage = `${ConsoleColors.Yellow}${ConsoleColors.Dim} from (${this.sourceName})${ConsoleColors.Reset}`
    const mainMessage = `${ConsoleColors.Yellow}${
      wrapped
        ? message
            ?.split(`[${this.name}]: `)?.[1]
            ?.split(` from (${this.sourceName})`)?.[0]
        : message
    }${ConsoleColors.Reset}`

    console[type === 'error' ? 'info' : type](
      prefixMessage + mainMessage + postfixMessage
    )
  }
}
