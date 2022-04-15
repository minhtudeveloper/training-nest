/**
  2xx
  OK 200 OK
  CREATED 201 Created
  NO_CONTENT 204 No Content

  4xx
  BAD_REQUEST 400 Bad Request
  UNAUTHORIZED 401 Unauthorized
  FORBIDDEN 403 Forbidden
  NOT_FOUND 404 Not Found
  REQUEST_TIMEOUT 408 Request Timeout
  METHOD_FAILURE 420 Method Failure

  5xx
  INTERNAL_SERVER_ERROR 500 Server Error
  NOT_IMPLEMENTED 501 Not Implemented
  BAD_GATEWAY 502 Bad Gateway
  GATEWAY_TIMEOUT 504 Gateway Timeout
*/

// FP

/**
 * Usage: requestSuccess(res, 200, "hello")({ a: 4 })
 * @returns { code: 200, message: "hello", data: { a: 4 } }
 */

const requestSuccess =
  (res: any, code = 200, message = "OK") =>
    (data: any = null) => {
      const response = {
        code,
        message,
        data,
      };
      res.status(code).json(response);
      return {
        ...response,
        isSuccess: true,
      };
    };

/**
 * Usage: requestError(res, 400, "failed")({ a: 4 })
 * @returns { code: 400, message: "failed", errors: { a: 4 } }
 *
 * Usage: requestError(res, 400, "failed")(new Error("Failed"))
 * @returns { code: 400, message: "failed", errors: "Failed" }
 */
const requestError =
  (res: any, code = 400, message = "Error") =>
    (errors: any = null) => {
      const response = {
        code: code,
        message,
        errors: errors instanceof Error ? errors.message : errors,
      };

      res.status(code).json(response);
      return {
        ...response,
        isSuccess: false,
      };
    };

const tokenError =
  (res: any, errors: string = 'Token is wwrong', code = 403, message = "Error") => {
    const response = {
      code: code,
      message,
      errors
    };
    res.status(code).json(response);
    return {
      ...response,
      isSuccess: false,
    };
  }


export { requestSuccess, requestError, tokenError };
