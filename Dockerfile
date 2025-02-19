FROM node:22.14.0-alpine
ARG USERNAME=nodejs
ARG USER_UID=1001
ARG USER_GID=$USER_UID

#create our new user
RUN addgroup -g ${USER_UID} -S ${USERNAME} && \
    adduser -S --ingroup ${USERNAME} --uid ${USER_UID} ${USERNAME}
USER $USERNAME
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=$USERNAME package*.json ./
RUN npm install --omit=dev
# If you are building your code for production
# RUN npm ci --omit=dev
# Bundle app source
COPY --chown=$USERNAME . .
CMD [ "node", "./index.js" ]