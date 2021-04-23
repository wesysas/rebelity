import * as validate from 'validator'
import { path, assocPath, reject, prop } from 'ramda'
import { FormikErrors } from 'formik'
import { ObjectWithStrings } from '../data/coreTypes'

export interface IValidationRule {
  rule: string
  message?: string
  messages?: ObjectWithStrings
  options?: {}
}

export interface IValidation {
  fieldPath: Array<string | number>
  rules: IValidationRule[]
}

export const runValidation = (validationRule: IValidationRule, value?: string): string | void => {
  if (validationRule.rule === 'required') {
    if (!value) return validationRule.message
    return
  }

  if (validationRule.rule === 'isPassword') {
    const {
      invalidFormatMessage = 'Invalid password format. Password must contain at least one uppercase and one lowercase letter',
      invalidCharactersMessage = 'Invalid characters in password',
      invalidLengthMessage = 'Invalid password length. Password length must be between 8 and 100 characters'
    } = validationRule.messages || {}
    const regexpOneUpperAndOneLowerCase = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])[a-zA-Zа-яА-Я\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~0-9].*$/g
    const regexpValidCharacters = /^[a-zA-Zа-яА-Я\s!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~0-9]*$/gi
    const regexpValidPasswordLength = /^.{8,100}$/g

    if (value && !value.match(regexpValidCharacters)) return invalidCharactersMessage
    if (value && !value.match(regexpOneUpperAndOneLowerCase)) return invalidFormatMessage
    if (value && !value.match(regexpValidPasswordLength)) return invalidLengthMessage
    return
  }

  if (validationRule.rule === 'isPhone') {
    const regexpValidPhoneNumber = /^[+]?[0-9()-]*$/g

    if (value && !value.match(regexpValidPhoneNumber)) return validationRule.message
    return
  }

  if (validationRule.rule === 'isNotOnlySpaces') {
    if (value && !value.replace(/\s/g, '').length) return validationRule.message
    return
  }

  if (!value) return

  if (validationRule.rule === 'maxNumber') {
    if (validationRule.options && value > (validationRule.options as any).max) {
      return validationRule.message
    }
  }

  if (validationRule.rule === 'isUrl') {
    const regexpValidUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    if (!value.match(regexpValidUrl)) return validationRule.message
    return
  }

  const method = prop<any, any>(validationRule.rule, validate)

  if (method && !method(String(value), validationRule.options)) {
    return validationRule.message
  }

  return
}

export const validator = <T>(validations: IValidation[], form: {}): FormikErrors<T> => {
  let errors = {}

  validations.forEach((validation: IValidation) => {
    const value = path(validation.fieldPath, form) as string
    const errorList = validation.rules.map(rule => runValidation(rule, value))

    if (errorList.length) {
      const filteredErrors = reject((e: any) => !e, errorList)
      const joinedErrors = filteredErrors.join()

      if (joinedErrors.length) {
        errors = assocPath(validation.fieldPath, joinedErrors, errors)
      }
    }
  })

  return errors
}

export const handleCapsLock = (
  e: React.FormEvent<HTMLInputElement>,
  warnings: ObjectWithStrings = {},
  fieldName: string = 'password'
) => {
  const event = e!.nativeEvent as any
  const kc = event.keyCode || event.which
  const isUp = (kc >= 65 && kc <= 90) ? true : false // uppercase
  const isShift = (event.shiftKey) ? event.shiftKey : ((kc == 16) ? true : false) // shift is pressed

  if ((isUp && !isShift)) {
    warnings[fieldName] = 'Caps Lock is ON'
  } else {
    delete warnings[fieldName]
  }
}

export const parseErrorMessage = (errorData: any) => {
  const body = errorData.response.body
  let errorList: String = ''
  if (body && body.errors) {
    for (let error of body.errors) {
      errorList = errorList.concat(error.defaultMessage + '\n')
    }
    return errorList
  } else {
    return errorData.message
  }
}
