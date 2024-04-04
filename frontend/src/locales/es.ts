export default {
  translations: {
    general: {
      loading: 'Cargando...',
    },
    home: {
      signin: 'Ingresar',
    },
    signin: {
      title: 'Iniciar sesión',
      email: {
        title: 'Correo electrónico',
        required: 'El correo electrónico es requerido',
        invalid: 'El correo electrónico no es válido',
        placeholder: 'nombre@empresa.com',
      },
      password: {
        title: 'Contraseña',
        required: 'La contraseña es requerida',
      },
      forgot_password: '¿Olvidaste tu contraseña?',
      not_registered: '¿No tienes una cuenta?',
      create_account: 'Crear una cuenta',
      messages: {
        success: {},
        errors: {
          unathorized: 'Credenciales inválidas',
          internal_server_error: 'Error interno del servidor',
        },
      },
    },
    signup: {
      title: 'Registrarse',
      email: {
        title: 'Correo electrónico',
        required: 'El correo electrónico es requerido',
        invalid: 'El correo electrónico no es válido',
        placeholder: 'nombre@empresa.com',
      },
      username: {
        title: 'Nombre de usuario',
        required: 'El nombre de usuario es requerido',
        min_length: 'El nombre de usuario debe tener al menos 4 caracteres',
        max_length: 'El nombre de usuario debe tener como máximo 20 caracteres',
        invalid: 'El nombre de usuario no es válido',
        placeholder: 'Nombre de usuario',
      },
      password: {
        title: 'Contraseña',
        required: 'La contraseña es requerida',
        min_length: 'La contraseña debe tener al menos 8 caracteres',
        max_length: 'La contraseña debe tener como máximo 20 caracteres',
        pattern:
          'La contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial',
      },
      confirm_password: {
        title: 'Confirme su contraseña',
        required: 'La contraseña es requerida',
        not_match: 'Las contraseñas no coinciden',
      },
      create: 'Crear cuenta',
      messages: {
        success: {
          account_created: 'Cuenta creada exitosamente',
        },
        errors: {
          passwords_do_not_match: 'Las contraseñas no coinciden',
          internal_server_error: 'Error interno del servidor',
          user_already_exists: 'El usuario ya existe',
        },
      },
    },
  },
};
