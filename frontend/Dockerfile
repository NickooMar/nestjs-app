FROM oven/bun

WORKDIR /app

# Copy the lock and package file
COPY bun.lockb . 
COPY package.json . 

# Install dependencies
RUN bun install --frozen-lockfile

# Copy your source code
COPY . .

CMD ["bun" "run dev"]