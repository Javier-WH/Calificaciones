import { Calendar } from 'primereact/calendar'
import { addLocale } from 'primereact/api'
import { Nullable } from 'primereact/ts-helpers'
import { FloatLabel } from 'primereact/floatlabel'
import { JSX } from 'react/jsx-runtime'

export default function CustomCalendar({
  date,
  setDate,
  width = '100%'
}: {
  date: Nullable<Date>
  setDate: (value: Nullable<Date>) => void
  width?: string
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
        />
        <label htmlFor="birth_date">Fecha de nacimiento (dia/mes/año)</label>
      </FloatLabel>
    </div>
  )
}
