# Usar una imagen oficial de Node.js como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Crear la compilación de la aplicación React
RUN npm run build

# Exponer el puerto 3000 para el servidor
EXPOSE 5174

# Definir el comando de inicio para la aplicación
CMD ["npm", "start"]
