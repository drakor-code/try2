export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

// Mock user data for testing when backend is not available
const mockUsers = [
  {
    id: '1',
    email: 'admin@debtiq.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2', 
    email: 'user@debtiq.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

// Mock login function
export const mockLogin = (email: string, password: string): Promise<{
  data: {
    user: User;
    token: string;
  };
  success: boolean;
  message: string;
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple mock authentication
      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === 'password') {
        const token = `mock-jwt-token-${user.id}-${Date.now()}`;
        resolve({
          data: {
            user,
            token,
          },
          success: true,
          message: 'Login successful',
        });
      } else {
        reject({
          message: 'Invalid credentials',
          code: 'INVALID_CREDENTIALS',
        });
      }
    }, 1000); // Simulate network delay
  });
};

// Mock register function
export const mockRegister = (userData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{
  data: {
    user: User;
    token: string;
  };
  success: boolean;
  message: string;
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      const existingUser = mockUsers.find(u => u.email === userData.email);
      
      if (existingUser) {
        reject({
          message: 'User already exists',
          code: 'USER_EXISTS',
        });
        return;
      }
      
      // Create new mock user
      const newUser: User = {
        id: `${mockUsers.length + 1}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      
      mockUsers.push(newUser);
      const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;
      
      resolve({
        data: {
          user: newUser,
          token,
        },
        success: true,
        message: 'Registration successful',
      });
    }, 1000);
  });
};

// Mock Google login function
export const mockGoogleLogin = (token: string): Promise<{
  data: {
    user: User;
    token: string;
  };
  success: boolean;
  message: string;
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple mock Google authentication
      if (token && token.length > 10) {
        const user: User = {
          id: '3',
          email: 'google@debtiq.com',
          firstName: 'Google',
          lastName: 'User',
          role: 'user',
          createdAt: new Date().toISOString(),
        };

        
        const jwtToken = `mock-jwt-token-google-${Date.now()}`;
        
        resolve({
          data: {
            user,
            token: jwtToken,
          },
          success: true,
          message: 'Google login successful',
        });
      } else {
        reject({
          message: 'Invalid Google token',
          code: 'INVALID_TOKEN',
        });
      }
    }, 1000);
  });
};
