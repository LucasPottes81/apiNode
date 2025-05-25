# Etapa base
FROM node:22-slim

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
COPY . .

# Instala dependências
RUN npm install

# Expõe a porta da aplicação
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "start"]
