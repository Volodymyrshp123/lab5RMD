import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Зберігаємо зареєстрованих користувачів у пам'яті (Mock DB)
  const [usersDb, setUsersDb] = useState([]);

  const login = (email, password) => {
    // Шукаємо користувача з таким email та паролем
    const existingUser = usersDb.find(u => u.email === email && u.password === password);
    
    if (existingUser) {
      setIsAuthenticated(true);
      setUser({ email: existingUser.email, name: existingUser.name });
      return true;
    }
    return false; // Неправильний логін або пароль
  };

  const register = (email, password, name) => {
    if (email && password && name) {
      // Перевіряємо, чи вже є такий email
      const userExists = usersDb.some(u => u.email === email);
      if (userExists) {
        alert("Користувач з таким email вже існує");
        return false;
      }
      
      // Додаємо нового користувача до нашої "бази"
      const newUser = { email, password, name };
      setUsersDb([...usersDb, newUser]);
      
      // Відразу авторизуємо після реєстрації
      setIsAuthenticated(true);
      setUser({ email, name });
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
