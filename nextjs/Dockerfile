# Etapa base
FROM oven/bun:1 AS base

# Definir directorio de trabajo
WORKDIR /usr/src/app

# Copiar código fuente y package.json
COPY . .

# Instalar dependencias
RUN bun install

# Ejecutar la aplicación en modo desarrollo
CMD ["bun", "run", "dev"]
