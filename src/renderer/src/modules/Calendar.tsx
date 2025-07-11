import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { Nullable } from 'primereact/ts-helpers'
import { FloatLabel } from 'primereact/floatlabel'
import { JSX } from 'react/jsx-runtime'

export default function CustomCalendar({
  date,
  setDate,
  width = '100%',
  label,
  error,
  message
}: {
  date: Nullable<Date>
  setDate: (value: Nullable<Date>) => void
  width?: string
  label: string
  error: boolean
  message: string
}): JSX.Element {
  addLocale('es', {
    firstDayOfWeek: 1,
    dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
    dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
    dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    monthNames: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ],
    monthNamesShort: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic'
    ],
    today: 'Hoy',
    clear: 'Limpiar'
  })

  const today = new Date()
  const tenYearsAgo = new Date(today.setFullYear(today.getFullYear() - 10))
  return (
    <div style={{ width: width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <Calendar
          value={date}
          onChange={(e) => setDate(e.value)}
          locale="es"
          dateFormat="dd/mm/yy"
          showIcon
          showButtonBar
          style={{ width: '100%' }}
          invalid={error}
          viewDate={tenYearsAgo}
          maxDate={new Date()}
          readOnlyInput
        />
        <label htmlFor="birth_date">{label}</label>
      </FloatLabel>
      <small id="username-help" className={error ? 'p-error' : ''}>
        {message}
      </small>
    </div>
  )
}
