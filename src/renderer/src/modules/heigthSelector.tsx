import { JSX } from 'react'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { FloatLabel } from 'primereact/floatlabel'

interface HeightSelectorProps {
  width?: string // Ancho opcional del componente, por defecto '100%'
  height: number | null // La altura actual en metros (puede ser null para indicar sin selección)
  setHeight: (value: number | null) => void // Función para actualizar la altura en el componente padre
  min?: number // Altura mínima permitida (por defecto 0 metros)
  max?: number // Altura máxima permitida (por defecto 3 metros)
  showButtons?: boolean // Muestra u oculta los botones de incremento/decremento (por defecto true)
  disabled?: boolean // Deshabilita el input (por defecto false)
}

/**
 * Componente selector de altura en metros utilizando PrimeReact.
 * Permite al usuario introducir una altura numérica con un formato específico.
 */
export default function HeightSelector({
  width = '100%',
  height,
  setHeight,
  min = 0,
  max = 3,
  showButtons = true,
  disabled = false
}: HeightSelectorProps): JSX.Element {
  /**
   * Maneja el cambio de valor en el InputNumber.
   * Actualiza el estado de la altura en el componente padre.
   * @param e Evento de cambio del InputNumber.
   */
  const handleChange = (e: InputNumberValueChangeEvent): void => {
    // Si e.value es null o undefined (cuando el campo está vacío), pasamos null.
    // De lo contrario, aseguramos que el valor sea un número.
    setHeight(e.value === null || e.value === undefined ? null : Number(e.value))
  }

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <InputNumber
          id="height-input" // ID para la etiqueta y accesibilidad
          value={height} // El valor actual del input
          onValueChange={handleChange} // Función que se llama al cambiar el valor
          min={min} // Valor mínimo permitido
          max={max} // Valor máximo permitido
          step={0.01} // Incrementos de 0.01 (1 centímetro)
          suffix=" m" // Sufijo que se muestra después del número (ej. "1.75 m")
          showButtons={showButtons} // Controla la visibilidad de los botones
          disabled={disabled} // Controla si el input está deshabilitado
          mode="decimal" // Asegura que el input maneje números decimales
          maxFractionDigits={2} // Permite hasta 2 decimales (para centímetros)
          style={{ width: '100%' }} // Estilo para que ocupe todo el ancho disponible
        />
        <label htmlFor="height-input">Altura</label> {/* Etiqueta del campo */}
      </FloatLabel>
    </div>
  )
}
