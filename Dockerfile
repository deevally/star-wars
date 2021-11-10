FROM node:14-alpine
ENV NODE_ENV=production
ENV PORT=3000
ENV base_url=https://swapi.dev/api
WORKDIR /build/index
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
RUN chown -R node /build/index
USER node
CMD ["npm", "start"]
