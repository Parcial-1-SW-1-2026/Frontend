export const QUERY_STALE_TIME = 1000 * 60 * 5;

export const AUTH_TOKEN_KEY = "auth_token";

export const JITSI = {
  TOOLBAR_BUTTONS: [
    "microphone",
    "camera",
    "desktop",
    "chat",
    "raisehand",
    "tileview",
    "hangup",
  ],
  DEFAULT_ROOM_PREFIX: "supervision-session",
  IFRAME_CONTAINER_ID: "jitsi-container",
} as const;

export const PRUEBAS = {
  TIPOS: [
    "cuestionario_teorico",
    "caso_practico",
    "ejercicio_codigo",
    "prueba_psicologica",
  ] as const,
  TIPO_LABELS: {
    cuestionario_teorico: "Cuestionario Teórico",
    caso_practico: "Caso Práctico",
    ejercicio_codigo: "Ejercicio de Código",
    prueba_psicologica: "Prueba Psicológica",
  } as const,
  TIPO_BADGE: {
    cuestionario_teorico: "info",
    caso_practico: "warning",
    ejercicio_codigo: "success",
    prueba_psicologica: "neutral",
  } as const,
  // Tabla
  COL_TITULO: "Título",
  COL_TIPO: "Tipo",
  COL_DURACION: "Duración",
  COL_PUNTAJE: "Puntaje máximo",
  COL_ESTADO: "Estado",
  COL_ACCIONES: "Acciones",
  EMPTY: "No hay pruebas registradas",
  ERROR: "Error al cargar las pruebas",
  // Acciones
  BTN_NUEVA: "Nueva prueba",
  BTN_VER: "Ver",
  BTN_EDITAR: "Editar",
  BTN_ACTIVAR: "Activar",
  BTN_DESACTIVAR: "Desactivar",
  BTN_ELIMINAR: "Eliminar",
  BTN_CREAR: "Crear prueba",
  BTN_GUARDAR: "Guardar cambios",
  BTN_CANCELAR: "Cancelar",
  BTN_CERRAR: "Cerrar",
  // Modal
  MODAL_CREAR_TITLE: "Nueva prueba",
  MODAL_EDITAR_TITLE: "Editar prueba",
  MODAL_DETALLE_TITLE: "Detalle de prueba",
  // Formulario
  LABEL_TITULO: "Título",
  LABEL_TIPO: "Tipo de prueba",
  LABEL_DESCRIPCION: "Descripción",
  LABEL_CONTENIDO: "Contenido",
  LABEL_PUNTAJE: "Puntaje máximo",
  LABEL_DURACION: "Duración (minutos)",
  // Detalle
  DETAIL_MINUTOS: "min",
  DETAIL_PUNTOS: "pts",
  // Estado
  ACTIVA: "Activa",
  INACTIVA: "Inactiva",
  // Filtro
  FILTER_TODOS: "Todos los tipos",
  // Confirmación
  CONFIRM_DELETE: "¿Estás seguro de que deseas eliminar esta prueba?",
  // Validación
  VALIDATION_REQUIRED: "Este campo es requerido",
  VALIDATION_POSITIVE: "El valor debe ser mayor a 0",
} as const;

export const USUARIOS = {
  ROL_LABELS: {
    administrador: "Administrador",
    evaluador: "Evaluador",
  } as const,
  // Tabla
  COL_NOMBRE: "Nombre completo",
  COL_EMAIL: "Email",
  COL_ROL: "Rol",
  COL_ESTADO: "Estado",
  COL_ACCIONES: "Acciones",
  EMPTY: "No hay usuarios registrados",
  ERROR: "Error al cargar los usuarios",
  // Acciones
  BTN_NUEVO: "Nuevo usuario",
  BTN_EDITAR: "Editar",
  BTN_ACTIVAR: "Activar",
  BTN_DESACTIVAR: "Desactivar",
  BTN_ELIMINAR: "Eliminar",
  BTN_CREAR: "Crear usuario",
  BTN_GUARDAR: "Guardar cambios",
  BTN_CANCELAR: "Cancelar",
  // Modal
  MODAL_CREAR_TITLE: "Nuevo usuario",
  MODAL_EDITAR_TITLE: "Editar usuario",
  // Formulario
  LABEL_NOMBRE: "Nombre",
  LABEL_APELLIDO: "Apellido",
  LABEL_EMAIL: "Email",
  LABEL_PASSWORD: "Contraseña",
  LABEL_ROL: "Rol",
  // Estado
  ACTIVO: "Activo",
  INACTIVO: "Inactivo",
  // Confirmación
  CONFIRM_DELETE: "¿Estás seguro de que deseas eliminar a este usuario?",
  // Validación
  VALIDATION_REQUIRED: "Este campo es requerido",
  VALIDATION_EMAIL: "Ingresa un email válido",
} as const;

export const DASHBOARD = {
  // Saludo
  GREETING: "Bienvenido",
  GREETING_SUBTITLE: "Aquí tienes el resumen del sistema",
  // Métricas
  METRIC_USUARIOS: "Total usuarios",
  METRIC_PRUEBAS: "Total pruebas",
  METRIC_ENTREVISTAS: "Total entrevistas",
  METRIC_SESIONES_HOY: "Sesiones hoy",
  METRIC_SESIONES_ACTIVAS_AHORA: "activas ahora",
  // Actividad
  ACTIVIDAD_TITLE: "Actividad reciente",
  ACTIVIDAD_EMPTY: "Sin actividad reciente",
  ACTIVIDAD_ERROR: "Error al cargar la actividad",
  // Accesos rápidos
  ACCESOS_TITLE: "Accesos rápidos",
  ACCESO_USUARIOS: "Gestionar usuarios",
  ACCESO_PRUEBAS: "Gestionar pruebas",
  ACCESO_ENTREVISTAS: "Gestionar entrevistas",
} as const;

export const ENTREVISTAS = {
  AREAS: ["juridico", "comercial", "desarrollador"] as const,
  AREA_LABELS: {
    juridico: "Jurídico",
    comercial: "Comercial",
    desarrollador: "Desarrollador",
  } as const,
  AREA_BADGE: {
    juridico: "info",
    comercial: "warning",
    desarrollador: "success",
  } as const,
  // Tabla
  COL_TITULO: "Título",
  COL_AREA: "Área",
  COL_TOTAL_PRUEBAS: "Pruebas",
  COL_ESTADO: "Estado",
  COL_ACCIONES: "Acciones",
  EMPTY: "No hay entrevistas registradas",
  ERROR: "Error al cargar las entrevistas",
  // Acciones
  BTN_NUEVA: "Nueva entrevista",
  BTN_VER: "Ver",
  BTN_EDITAR: "Editar",
  BTN_ELIMINAR: "Eliminar",
  BTN_CREAR: "Crear entrevista",
  BTN_GUARDAR: "Guardar cambios",
  BTN_CANCELAR: "Cancelar",
  BTN_CERRAR: "Cerrar",
  BTN_ASIGNAR_PRUEBA: "Asignar prueba",
  BTN_REMOVER: "Remover",
  // Modales
  MODAL_CREAR_TITLE: "Nueva entrevista",
  MODAL_EDITAR_TITLE: "Editar entrevista",
  MODAL_DETALLE_TITLE: "Detalle de entrevista",
  MODAL_ASIGNAR_TITLE: "Asignar prueba",
  // Formulario
  LABEL_TITULO: "Título",
  LABEL_AREA: "Área",
  LABEL_DESCRIPCION: "Descripción",
  LABEL_PRUEBA: "Prueba",
  LABEL_ORDEN: "Orden",
  LABEL_OBLIGATORIA: "Obligatoria",
  LABEL_PESO: "Peso (%)",
  // Estado
  ACTIVA: "Activa",
  INACTIVA: "Inactiva",
  // Filtro
  FILTER_TODAS: "Todas las áreas",
  // Detalle
  DETAIL_PRUEBAS_TITLE: "Pruebas asignadas",
  DETAIL_PESO_TOTAL: "Peso total",
  DETAIL_OBLIGATORIA: "Obligatoria",
  DETAIL_ORDEN: "Orden",
  DETAIL_PESO: "Peso",
  DETAIL_NO_PRUEBAS: "Sin pruebas asignadas aún",
  DETAIL_PESO_DISPONIBLE: "Peso disponible",
  // Confirmación
  CONFIRM_DELETE: "¿Estás seguro de que deseas eliminar esta entrevista?",
  CONFIRM_REMOVER_PRUEBA: "¿Remover esta prueba de la entrevista?",
  // Validación
  VALIDATION_REQUIRED: "Este campo es requerido",
  VALIDATION_POSITIVE: "El valor debe ser mayor a 0",
  VALIDATION_PESO_RANGE: "El peso debe estar entre 1 y 100",
  VALIDATION_PESO_MAX: "El peso supera el disponible",
} as const;

export const UI = {
  APP_NAME: "Supervisión App",
  HOME_TITLE: "Supervisión Remota de Exámenes",
  HOME_SUBTITLE: "Crea una sesión para iniciar la videollamada de supervisión",
  CREATE_SESSION_BUTTON: "Crear nueva sesión",
  SESSION_TITLE: "Sesión en curso",
  LEAVE_BUTTON: "Salir de la sesión",
  LOADING_JITSI: "Conectando a la videollamada...",
  // Auth
  LOGIN_TITLE: "Iniciar Sesión",
  LOGIN_SUBTITLE: "Ingresa tus credenciales para continuar",
  LOGIN_EMAIL_LABEL: "Correo electrónico",
  LOGIN_EMAIL_PLACEHOLDER: "correo@ejemplo.com",
  LOGIN_PASSWORD_LABEL: "Contraseña",
  LOGIN_PASSWORD_PLACEHOLDER: "••••••••",
  LOGIN_BUTTON: "Ingresar",
  LOGIN_ERROR_DEFAULT: "Credenciales incorrectas. Intenta de nuevo.",
  // Páginas
  DASHBOARD_TITLE: "Dashboard",
  USUARIOS_TITLE: "Gestionar Usuarios",
  PRUEBAS_TITLE: "Gestionar Pruebas",
  ENTREVISTAS_TITLE: "Gestionar Entrevistas",
} as const;
