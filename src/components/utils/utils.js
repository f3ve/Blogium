// import React from 'react'
import {format as formatDate} from 'date-fns'

export function translateDate(date, format='MMMM do') {
  return formatDate(date, format)
}