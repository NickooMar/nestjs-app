export default {
  translations: {
    general: {
      loading: "Loading...",
    },
    home: {
      signin: "Sign in",
    },
    signin: {
      title: "Sign in",
      email: {
        title: "Email",
        required: "Email is required",
        invalid: "Email is not valid",
        placeholder: "name@company.com",
      },
      password: {
        title: "Password",
        required: "Password is required",
      },
      forgot_password: "Forgot your password?",
      login: "Sign in",
      not_registered: "Don't have an account?",
      create_account: "Create an account",
      messages: {
        success: {},
        errors: {
          unathorized: "Invalid credentials",
          internal_server_error: "Internal server error",
        },
      },
    },
    signup: {
      title: 'Sign Up',
      email: {
        title: 'Email',
        required: 'Email is required',
        invalid: 'Email is invalid',
        placeholder: 'name@example.com',
      },
      username: {
        title: 'Username',
        required: 'Username is required',
        min_length: 'Username must be at least 4 characters long',
        max_length: 'Username must be at most 20 characters long',
        invalid: 'Username is invalid',
        placeholder: 'Username',
      },
      password: {
        title: 'Password',
        required: 'Password is required',
        min_length: 'Password must be at least 8 characters long',
        max_length: 'Password must be at most 20 characters long',
        pattern:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
      confirm_password: {
        title: 'Confirm Password',
        required: 'Password is required',
        not_match: 'Passwords do not match',
        min_length: 'Password must be at least 8 characters long',
        max_length: 'Password must be at most 20 characters long',
        pattern:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
      create: 'Create Account',
      messages: {
        success: {
          account_created: 'Account created successfully',
        },
        errors: {
          passwords_do_not_match: 'Passwords do not match',
          internal_server_error: 'Internal server error',
          user_already_exists: 'User already exists',
        },
      },
    },
  },
};
