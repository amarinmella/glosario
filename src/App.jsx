import React, { useState, useMemo } from 'react';
import { Search, Book, Brain, Edit3, ShieldCheck, Zap, Info, ChevronRight, X } from 'lucide-react';

const GLOSSARY_DATA = [
  {
    module: 1,
    title: "Fundamentos de la Comunicación con la IA",
    icon: <Zap className="w-5 h-5" />,
    color: "bg-blue-500",
    terms: [
      { t: "LLM (Large Language Model)", d: "Modelos de lenguaje natural con los que el docente se comunica para generar materiales." },
      { t: "Ingeniería de Prompt", d: "Disciplina técnica centrada en el diseño de instrucciones para optimizar la interacción con la IA." },
      { t: "Predicción", d: "Naturaleza probabilística de la IA que anticipa la siguiente palabra en lugar de 'saber' hechos de forma consciente." },
      { t: "Prompt", d: "Instrucción o conjunto de reglas entregadas a un modelo de lenguaje para obtener un resultado específico." },
      { t: "Anatomía del Prompt", d: "Estructura técnica obligatoria que incluye Rol, Contexto, Tarea, Restricciones y Formato." },
      { t: "Rol", d: "Elemento del prompt que define la identidad o personalidad que debe adoptar la IA (ej. 'Actúa como profesor')." },
      { t: "Contexto", d: "Información de fondo proporcionada a la IA para situar la tarea en un escenario educativo real." },
      { t: "Tarea", d: "La acción específica que se le solicita realizar a la IA (ej. crear una planificación)." },
      { t: "Restricciones", d: "Límites o parámetros impuestos a la IA para guiar su respuesta (ej. 'no uses tecnicismos')." },
      { t: "Formato de Salida", d: "La estructura visual o técnica deseada para la respuesta (tablas, Markdown, etc.)." },
      { t: "Ambigüedad", d: "Error común de falta de precisión en el prompt que genera resultados vagos o mediocres." },
      { t: "Sobrecarga Cognitiva", d: "Saturación de información en la instrucción que puede causar que la IA 'olvide' partes del prompt." },
      { t: "Ventana de Contexto", d: "Espacio de memoria del modelo donde se prioriza la información relevante para evitar alucinaciones." },
      { t: "Iteración", d: "Proceso de diálogo continuo para refinar y mejorar los resultados obtenidos de la IA." },
      { t: "Refinamiento (Refining)", d: "Protocolo técnico para pulir la respuesta de la IA mediante instrucciones secuenciales." }
    ]
  },
  {
    module: 2,
    title: "Técnicas Avanzadas de Prompting",
    icon: <Brain className="w-5 h-5" />,
    color: "bg-purple-500",
    terms: [
      { t: "Zero-shot", d: "Técnica de solicitar una tarea a la IA sin proporcionarle ejemplos previos de referencia." },
      { t: "Few-shot", d: "Técnica que consiste en entregar ejemplos de estilo o formato a la IA antes de pedirle el resultado final." },
      { t: "Chain of Thought", d: "Estrategia para obligar a la IA a razonar paso a paso, reduciendo errores lógicos." },
      { t: "Markdown", d: "Formato de texto ligero utilizado para que la IA genere tablas o estructuras visuales claras." },
      { t: "CSV/JSON", d: "Formatos de salida técnicos para integrar los resultados de la IA en plataformas LMS." },
      { t: "Programación Semántica", d: "Enfoque de comunicación con la IA basado en el significado y la lógica del lenguaje." },
      { t: "Consistencia Editorial", d: "Capacidad de mantener un mismo estilo y tono pedagógico en todos los recursos generados." },
      { t: "Marco Metodológico", d: "Teoría o autor de referencia que se le indica a la IA para guiar su creación pedagógica." },
      { t: "Escenarios de Aprendizaje", d: "Situaciones o casos ficticios generados por IA para el trabajo en el aula." },
      { t: "ABP (Aprendizaje Basado en Proyectos)", d: "Metodología que la IA ayuda a diseñar mediante lluvia de ideas interdisciplinarias." },
      { t: "Co-diseño Pedagógico", d: "Integración de la IA como un 'copiloto' creativo en el diseño del currículo." },
      { t: "Diferenciación", d: "Adaptación de un mismo contenido para distintos niveles de competencia lectora o cognitiva." },
      { t: "Lluvia de Ideas Creativa", d: "Uso de la IA para explorar múltiples enfoques didácticos de un mismo tema." },
      { t: "Scaffolding (Andamiaje)", d: "Uso de prompts secuenciales para desglosar objetivos complejos en micro-habilidades." },
      { t: "Explicación Conceptual", d: "Recurso didáctico simplificado generado por la IA para facilitar la comprensión de temas difíciles." }
    ]
  },
  {
    module: 3,
    title: "IA en Planificación y Diseño",
    icon: <Book className="w-5 h-5" />,
    color: "bg-emerald-500",
    terms: [
      { t: "Planificación de Unidad", d: "Documento curricular completo generado y refinado mediante el uso de prompts." },
      { t: "DUA (Diseño Universal para el Aprendizaje)", d: "Enfoque de personalización masiva de recursos mediante IA." },
      { t: "Guía Multinivel", d: "Recurso generado por IA con versiones para niveles de acceso, estándar y profundización." },
      { t: "Prompts Anidados", d: "Secuencia lógica de instrucciones que dependen una de la otra para construir un recurso complejo." },
      { t: "Diferenciación Simultánea", d: "Generación de múltiples versiones de un recurso en una sola ejecución de la IA." },
      { t: "Creatividad Divergente", d: "Uso de la IA para romper moldes tradicionales en el diseño de actividades." },
      { t: "Secuencia Didáctica", d: "Orden lógico de actividades diseñadas con apoyo de la IA." },
      { t: "Analogía Didáctica", d: "Comparación creada por la IA para explicar conceptos abstractos a los estudiantes." },
      { t: "Diseño Instruccional Online", d: "Marco general del curso para crear experiencias de aprendizaje en entornos virtuales." },
      { t: "E-learning Asincrónico", d: "Modalidad del curso donde el aprendizaje se realiza de forma autónoma con apoyo tutorial." },
      { t: "Currículum Nacional", d: "Referente obligatorio con el que se deben alinear los productos generados por la IA." },
      { t: "Competencia Técnica", d: "Habilidad del docente para redactar prompts efectivos y complejos." },
      { t: "Competencia Pedagógica", d: "Capacidad de integrar la IA validando su alineación con objetivos de aprendizaje." },
      { t: "Aprendizaje Basado en Casos", d: "Actividad donde se analizan errores o 'hallazgos' producidos por la IA." },
      { t: "Laboratorio de Prompting", d: "Espacio práctico donde el docente experimenta y arregla prompts deficientes." }
    ]
  },
  {
    module: 4,
    title: "Evaluación y Retroalimentación",
    icon: <Edit3 className="w-5 h-5" />,
    color: "bg-orange-500",
    terms: [
      { t: "Ingeniería de Evaluación", d: "Uso de la IA para transformar la evaluación subjetiva en datos procesables." },
      { t: "Rúbrica Analítica", d: "Matriz de evaluación generada por IA con descriptores de desempeño graduales." },
      { t: "Rúbrica Holística", d: "Instrumento de evaluación global creado mediante prompts estructurados." },
      { t: "Taxonomía de Bloom", d: "Marco educativo utilizado para alinear los niveles cognitivos de las evaluaciones generadas." },
      { t: "Taxonomía de Marzano", d: "Sistema de clasificación alternativa para el diseño de ítems de evaluación con IA." },
      { t: "Reactivos", d: "Preguntas o ítems de evaluación generados automáticamente por el modelo." },
      { t: "Distractores Plausibles", d: "Opciones de respuesta incorrectas en pruebas de selección múltiple justificadas por la IA." },
      { t: "Feedback Automatizado", d: "Uso de la IA para detectar patrones de error y generar retroalimentación constructiva." },
      { t: "Simulación de Feedback", d: "Actividad donde el docente pide a la IA evaluar un trabajo ficticio para criticar su juicio." },
      { t: "Editor de Criterios", d: "Rol del docente al supervisar y ajustar los parámetros de evaluación propuestos por la IA." },
      { t: "Meta-evaluación", d: "Evaluación del proceso de evaluación realizado por la máquina." },
      { t: "Lista de Cotejo", d: "Instrumento de verificación binaria generado mediante prompts específicos." },
      { t: "Calibración de Instrumentos", d: "Ajuste fino de rúbricas y pruebas para que midan exactamente lo deseado." },
      { t: "Taller de Peer Review", d: "Dinámica de co-evaluación apoyada por herramientas de la plataforma Moodle." },
      { t: "Evaluación Formativa", d: "Estrategia de evaluación de proceso que pondera un 40% del curso." }
    ]
  },
  {
    module: 5,
    title: "Ética y Futuro",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "bg-red-500",
    terms: [
      { t: "Alucinación", d: "Fenómeno donde la IA genera información falsa o datos inexistentes con total confianza." },
      { t: "Sesgo Algorítmico", d: "Prejuicios heredados por la IA en temas de género, cultura o raza según entrenamiento." },
      { t: "Privacidad de Datos", d: "Protocolos para evitar compartir información sensible o PII con modelos de IA." },
      { t: "PII (Personally Identifiable Information)", d: "Datos que permiten identificar a un estudiante y que deben ser excluidos." },
      { t: "Validación Forense", d: "Análisis crítico y exhaustivo de los resultados de la IA para garantizar veracidad." },
      { t: "Verificación Cruzada", d: "Técnica para identificar datos inventados mediante el contraste con fuentes externas." },
      { t: "RAG (Retrieval-Augmented Generation)", d: "Técnica para que la IA responda basándose solo en documentos específicos." },
      { t: "Grounding", d: "Proceso de 'aterrizar' a la IA obligándola a usar solo fuentes de confianza (PDFs propios)." },
      { t: "NotebookLM", d: "Herramienta avanzada para gestionar external fuentes y eliminar el 'ruido' de internet." },
      { t: "Auditor Crítico", d: "El nuevo rol del profesor como supervisor ético de los contenidos generados." },
      { t: "Higiene de Datos", d: "Prácticas de seguridad para mantener la integridad de la información." },
      { t: "Precisión Factual", d: "Estándar de calidad que exige que el material de la IA sea veraz." },
      { t: "Integridad Ética", d: "Competencia para neutralizar sesgos y respetar la privacidad." },
      { t: "Reflexión Crítica", d: "Análisis humano sobre las correcciones manuales realizadas al output de la IA." },
      { t: "Portafolio del Prompt", d: "Proyecto final integrador (60%) que evidencia la competencia total." }
    ]
  }
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState(null);
  const [activeTerm, setActiveTerm] = useState(null);

  const filteredData = useMemo(() => {
    let results = GLOSSARY_DATA;
    if (selectedModule !== null) {
      results = results.filter(m => m.module === selectedModule);
    }
    
    return results.map(module => ({
      ...module,
      terms: module.terms.filter(term => 
        term.t.toLowerCase().includes(searchTerm.toLowerCase()) || 
        term.d.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(module => module.terms.length > 0);
  }, [searchTerm, selectedModule]);

  const totalResults = filteredData.reduce((acc, curr) => acc + curr.terms.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-slate-900 text-white py-8 px-4 shadow-lg sticky top-0 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Ingeniería de Prompt</h1>
              <p className="text-slate-400 text-sm">Glosario Técnico para Profesores</p>
            </div>
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar términos o definiciones..."
                className="w-full bg-slate-800 border-none rounded-lg py-2.5 pl-11 pr-10 focus:ring-2 focus:ring-blue-500 transition-all text-white placeholder:text-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Module Selector */}
        <div className="flex flex-wrap gap-2 mb-8 items-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Módulos:</span>
          <button
            onClick={() => setSelectedModule(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedModule === null 
              ? 'bg-slate-900 text-white' 
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            Todos
          </button>
          {GLOSSARY_DATA.map(m => (
            <button
              key={m.module}
              onClick={() => setSelectedModule(m.module)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                selectedModule === m.module 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${m.color.replace('bg-', 'bg-opacity-80 bg-')}`}></span>
              Módulo {m.module}
            </button>
          ))}
        </div>

        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Mostrando <span className="font-bold text-slate-900">{totalResults}</span> términos
          </p>
          {searchTerm && (
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
              Búsqueda: "{searchTerm}"
            </span>
          )}
        </div>

        {/* Content Grid */}
        {filteredData.length > 0 ? (
          <div className="space-y-12">
            {filteredData.map((module) => (
              <section key={module.module} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-200">
                  <div className={`${module.color} p-2 rounded-lg text-white`}>
                    {module.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 leading-tight">
                      Módulo {module.module}: {module.title}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {module.terms.map((item, idx) => (
                    <div 
                      key={idx}
                      className="group [perspective:1000px] w-full cursor-pointer"
                      onClick={() => setActiveTerm(activeTerm === item.t ? null : item.t)}
                    >
                      <div 
                        className={`grid w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                          activeTerm === item.t ? '[transform:rotateY(180deg)]' : ''
                        }`}
                      >
                        {/* Lado Frontal: Término */}
                        <div className="col-start-1 row-start-1 bg-white rounded-xl p-6 border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-blue-300 [backface-visibility:hidden] flex flex-col items-center justify-center text-center min-h-[180px]">
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors mb-4">
                            {item.t}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full mt-auto border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                            <Info className="w-3.5 h-3.5" />
                            <span>Ver definición</span>
                          </div>
                        </div>

                        {/* Lado Reverso: Definición */}
                        <div className="col-start-1 row-start-1 bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col min-h-[180px]">
                          <div className="flex justify-between items-start mb-3 border-b border-slate-800 pb-2">
                            <h4 className="font-bold text-sm text-blue-400 truncate pr-4">{item.t}</h4>
                            <X className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
                          </div>
                          <p className="text-sm leading-relaxed text-slate-300 flex-grow">
                            {item.d}
                          </p>
                          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase">M{module.module}</span>
                            <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 group-hover:text-white transition-colors">
                              Volver <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No se encontraron términos</h3>
            <p className="text-slate-500 mt-1">Intenta con otros criterios de búsqueda o selecciona "Todos"</p>
            <button 
              onClick={() => {setSearchTerm(""); setSelectedModule(null);}}
              className="mt-6 text-blue-600 font-medium hover:underline"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm mb-2">
            Desarrollado para el Diplomado en Diseño Instruccional
          </p>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">
            © 2024 Ingeniería de Prompt para Profesores
          </p>
        </div>
      </footer>
    </div>
  );
}
