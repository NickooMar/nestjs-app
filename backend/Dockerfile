FROM oven/bun:1 as base

WORKDIR /backend

# Copy the lock and package file
COPY bun.lockb . 
COPY package.json . 

# Install dependencies
RUN bun install --frozen-lockfile

# Copy your source code
# If only files in the src folder changed, this is the only step that gets executed!
COPY . .

COPY .env .env.example ./

EXPOSE 3000

CMD ["bun", "run", "start:dev"]
