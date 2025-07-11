import { JSX, useState, useEffect } from 'react'
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext' // Necesario para el campo "Otro (especificar)"

// Definimos la interfaz para una opción de problema de salud
export interface HealthProblemOption {
  name: string // El nombre del problema de salud (ej. "Alergias")
  code: string // Un código único para el problema (puede ser el mismo nombre o un ID)
}

interface HealthProblemSelectorProps {
  width?: string // Ancho opcional del componente, por defecto '100%'
  selectedProblem: HealthProblemOption | null // El problema de salud seleccionado actualmente (puede ser null)
  setSelectedProblem: (value: HealthProblemOption | null) => void // Función para actualizar el problema seleccionado
  otherProblemText: string // Texto ingresado cuando se selecciona "Otro"
  setOtherProblemText: (value: string) => void // Función para actualizar el texto de "Otro"
  disabled?: boolean // Deshabilita el selector completo
}

/**
 * Componente selector de problemas de salud comunes para estudiantes.
 * Incluye una lista predefinida y una opción "Otro" para especificar.
 */
export default function HealthProblemSelector({
  width = '100%',
  selectedProblem,
  setSelectedProblem,
  otherProblemText,
  setOtherProblemText,
  disabled = false
}: HealthProblemSelectorProps): JSX.Element {
  // Lista predefinida de problemas de salud comunes
  const commonHealthProblems: HealthProblemOption[] = [
    { name: 'Alergias', code: 'ALERG' },
    { name: 'Asma', code: 'ASMA' },
    { name: 'Diabetes', code: 'DIAB' },
    { name: 'Epilepsia', code: 'EPILEP' },
    { name: 'Problemas de Visión', code: 'VISION' },
    { name: 'Problemas de Audición', code: 'AUDICION' },
    { name: 'Condición Cardíaca', code: 'CARD' },
    { name: 'Hipertensión', code: 'HIPERT' },
    { name: 'Trastorno de Déficit de Atención (TDAH)', code: 'TDAH' },
    { name: 'Dislexia', code: 'DISLEX' },
    { name: 'Problemas Renales', code: 'RENAL' },
    { name: 'Otro', code: 'OTHER' } // ¡La opción clave para especificar!
  ]

  const [filteredProblems, setFilteredProblems] = useState<HealthProblemOption[]>([])

  // Este useEffect se asegura de limpiar el texto de "Otro" si la selección cambia y ya no es "Otro"
  useEffect(() => {
    if (selectedProblem?.code !== 'OTHER') {
      setOtherProblemText('') // Limpia el texto si no se ha seleccionado "Otro"
    }
  }, [selectedProblem, setOtherProblemText])

  /**
   * Filtra las sugerencias del AutoComplete basándose en la entrada del usuario.
   * @param event Evento de autocompletado de PrimeReact.
   */
  const searchProblems = (event: AutoCompleteCompleteEvent): void => {
    const query = event.query.toLowerCase()
    const _filteredProblems = commonHealthProblems.filter((problem) =>
      problem.name.toLowerCase().includes(query)
    )
    setFilteredProblems(_filteredProblems)
  }

  /**
   * Maneja el cambio de valor en el AutoComplete.
   * Si el usuario escribe y no selecciona de la lista, permite que el valor sea reconocido.
   * @param e Evento de cambio del AutoComplete.
   */
  const handleAutoCompleteChange = (e): void => {
    if (typeof e.query === 'object') {
      // Si se selecciona un objeto (una de las opciones de la lista)
      setSelectedProblem(e.query as HealthProblemOption)
    } else if (typeof e.query === 'string') {
      // Si el usuario escribe un texto que no coincide con una opción,
      // o borra el texto, el valor es un string.
      // Aquí podrías decidir si quieres permitir texto libre O requerir una selección de la lista.
      // Para este caso, vamos a intentar ver si coincide con "Otro" o si se borró.
      const foundProblem = commonHealthProblems.find(
        (p) => p.name.toLowerCase() === e.query.toLowerCase()
      )
      if (foundProblem) {
        setSelectedProblem(foundProblem)
      } else if (e.query === '') {
        setSelectedProblem(null) // Si el texto está vacío, no hay selección
      } else {
        // Opcional: Si escriben algo que no está en la lista y no es "Otro",
        // puedes decidir qué hacer. Por ahora, lo ignoramos o podrías
        // establecerlo como "Otro" y poner el texto en `otherProblemText`.
        // Para simplificar, si no es una opción de la lista, lo tratamos como `null`
        // a menos que el usuario escriba algo muy parecido a una opción.
        // La propiedad `forceSelection` más abajo ayudará a forzar la selección de la lista.
        setSelectedProblem({ name: e.query, code: '' }) // Podría ser un problema "no listado" temporalmente
      }
    }
  }

  return (
    <div
      style={{
        width,
        marginBottom: '20px',
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: `${width} ${width}`,
        columnGap: '20px'
      }}
    >
      <FloatLabel>
        <AutoComplete
          id="health-problem-input"
          value={selectedProblem ? selectedProblem.name : ''}
          suggestions={filteredProblems}
          completeMethod={searchProblems}
          field="name"
          onChange={handleAutoCompleteChange}
          onSelect={(e) => setSelectedProblem(e.value as HealthProblemOption)}
          dropdown // Muestra el botón de dropdown para ver todas las opciones
          forceSelection // Fuerza al usuario a seleccionar una de las sugerencias
          style={{ width: '100%' }}
          disabled={disabled}
        />
        <label htmlFor="health-problem-input">Problema de Salud</label>
      </FloatLabel>

      {/* Campo de texto adicional que aparece SOLO si "Otro" está seleccionado */}
      {selectedProblem?.code === 'OTHER' && (
        <div style={{}}>
          <FloatLabel>
            <InputText
              id="other-problem-text"
              value={otherProblemText}
              onChange={(e) => setOtherProblemText(e.target.value)}
              disabled={disabled}
              style={{ width: '100%' }}
            />
            <label htmlFor="other-problem-text">Otro (especifique)</label>
          </FloatLabel>
        </div>
      )}
    </div>
  )
}
