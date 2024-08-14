
# Resmi Node.js imajını temel alarak yapıyı oluşturuyoruz. Versiyon olarak uzun vadeli destek (LTS) sürümü olan 18'i kullanıyoruz.
FROM node:18-alpine AS builder

# Çalışma dizinini oluşturuyoruz.
WORKDIR /app

# Paket bağımlılıklarını optimize etmek için package.json ve package-lock.json dosyalarını kopyalıyoruz.
COPY package*.json ./

# Bağımlılıkları yüklüyoruz.
RUN npm install

# Tüm projeyi kopyalıyoruz.
COPY . .

# Next.js uygulamasını build ediyoruz.
RUN npm run build

# `builder` aşamasından küçük ve verimli bir imaj oluşturuyoruz.
FROM node:18-alpine AS runner

# Çalışma dizinini oluşturuyoruz.
WORKDIR /app

# Build dosyalarını ve gerekli yapılandırmaları kopyalıyoruz.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Uygulamanın dışarıya sunulacak portu belirliyoruz.
EXPOSE 3000

# Uygulamanın başlatılmasını sağlıyoruz.
CMD ["npm", "start"]
