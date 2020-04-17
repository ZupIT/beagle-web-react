/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { ActionHandler, XHRAction } from './types'

interface ParsedResponse {
  data: any,
  status: number,
  statusText: string,
}

const xhr: ActionHandler<XHRAction> = async ({
  action,
  handleAction,
  eventContextHierarchy,
  ...otherParameters
}) => {
  const { url, method, data, onSuccess, onError, onFinish } = action

  function handleSuccess(parsedResponse: ParsedResponse) {
    if (!onSuccess) return

    handleAction({
      action: onSuccess,
      eventContextHierarchy: [{ id: 'onSuccess', value: parsedResponse }, ...eventContextHierarchy],
      handleAction,
      ...otherParameters,
    })
  }

  function handleError(error: any) {
    if (!onError) return

    handleAction({
      action: onError,
      eventContextHierarchy: [{ id: 'onError', value: error }, ...eventContextHierarchy],
      handleAction,
      ...otherParameters,
    })
  }

  function handleFinish() {
    if (!onFinish) return

    handleAction({
      action: onFinish,
      eventContextHierarchy,
      handleAction,
      ...otherParameters,
    })
  }

  try {
    const response = await fetch(url, { method, body: JSON.stringify(data) })
    if (response.status >= 400) throw response
    const resultText = await response.text()
    const resultData = resultText && JSON.parse(resultText)
    handleSuccess({
      data: resultData,
      status: response.status,
      statusText: response.statusText,
    })
  } catch (error) {
    console.error(error)
    handleError(error)
  } finally {
    handleFinish()
  }
}

export default xhr
