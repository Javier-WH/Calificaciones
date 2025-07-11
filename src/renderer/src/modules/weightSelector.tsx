import { JSX } from 'react'
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber'
import { FloatLabel } from 'primereact/floatlabel'

interface WeightSelectorProps {
  width?: string // Ancho opcional del componente, por defecto '100%'
  weight: number | null // El peso actual en kilogramos (puede ser null si no hay valor)
  setWeight: (value: number | null) => void // Función para actualizar el peso en el componente padre
  min?: number // Peso mínimo permitido (por defecto 0 kg)
  max?: number // Peso máximo permitido (por defecto 300 kg)
  step?: number // Incremento/decremento del valor (por defecto 0.1 kg)
  showButtons?: boolean // Muestra u oculta los botones de incremento/decremento (por defecto true)
  disabled?: boolean // Deshabilita el input (por defecto false)
}

/**
 * Componente selector de peso en kilogramos utilizando PrimeReact.
 * Permite al usuario introducir un peso numérico con un formato específico.
 */
export default function WeightSelector({
  width = '100%',
  weight,
  setWeight,
  min = 0,
  max = 300,
  step = 0.1, // Por defecto, permite incrementos de 0.1 kg
  showButtons = true,
  disabled = false
}: WeightSelectorProps): JSX.Element {
  /**
   * Maneja el cambio de valor en el InputNumber.
   * Actualiza el estado del peso en el componente padre.
   * @param e Evento de cambio del InputNumber.
   */
  const handleChange = (e: InputNumberValueChangeEvent): void => {
    // Si e.value es null o undefined (cuando el campo está vacío), pasamos null.
    // De lo contrario, aseguramos que el valor sea un número.
    setWeight(e.value === null || e.value === undefined ? null : Number(e.value))
  }

  return (
    <div style={{ width, height: '90px', position: 'relative' }}>
      <FloatLabel>
        <InputNumber
          id="weight-input" // ID para la etiqueta y accesibilidad
          value={weight} // El valor actual del input
          onValueChange={handleChange} // Función que se llama al cambiar el valor
          min={min} // Valor mínimo permitido
          max={max} // Valor máximo permitido
          step={step} // Incrementos (ej. 0.1 para gramos o 1 para kilogramos enteros)
          suffix=" kg" // Sufijo que se muestra después del número (ej. "75.5 kg")
          showButtons={showButtons} // Controla la visibilidad de los botones
          disabled={disabled} // Controla si el input está deshabilitado
          mode="decimal" // Asegura que el input maneje números decimales
          maxFractionDigits={2} // Permite hasta 2 decimales (ej. para 75.50 kg)
          style={{ width: '100%' }} // Estilo para que ocupe todo el ancho disponible
        />
        <label htmlFor="weight-input">Peso</label> {/* Etiqueta del campo */}
      </FloatLabel>
    </div>
  )
}
