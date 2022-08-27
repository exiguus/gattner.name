const NAME = 'gitlab-fetch'

export default class Helper {
  public static throwError(message: string, source: string) {
    throw new Error(`${NAME}: ${message} in ${source}`)
  }
}
