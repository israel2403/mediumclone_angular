/**
 * This file contains an HTTP interceptor that will add an Authorization header
 * to all the outgoing HTTP requests with a token from the local storage.
 *
 * The interceptor is a function that takes two parameters: the request and the next
 * function. The request is the outgoing HTTP request and the next function is the
 * function that will be called with the modified request.
 *
 * The interceptor first gets the token from the local storage using the PersistanceService.
 * If the token is not null, it clones the request and adds an Authorization header
 * with the token. Then it calls the next function with the modified request.
 *
 * If the token is null, it simply calls the next function with the original request.
 */

import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { PersistanceService } from './persistance.service'

export const authInterceptors: HttpInterceptorFn = (request, next) => {
  // Get the token from the local storage
  const persistanceService = inject(PersistanceService)
  const token = persistanceService.get('accessToken')

  // If the token is not null, add an Authorization header to the request
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Token ${token}`,
      },
    })
  }

  // Call the next function with the modified request
  return next(request)
}
