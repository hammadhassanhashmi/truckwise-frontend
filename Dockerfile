# Base Image 
FROM nginx:1.27.5-alpine-slim

# Need this to run the whole gulp process properly
RUN apk add git
RUN apk add --update nodejs npm

# Directory mkdir
RUN mkdir -p /home/node/truckwise-webapp/node_modules 
WORKDIR /home/node/truckwise-webapp

# Copy in the source files
COPY package*.json ./
COPY ./gulpfile.js ./
COPY ./src/ ./

# Just here so I can quickly know what kind of garbage is in the node-modules
RUN cat package.json

# Install a lot of javascript malware
RUN npm install
RUN npm install gulp-cli

# Build the distribution ver of the app
RUN ./node_modules/.bin/gulp build

# Copy it to where nginx is listening
COPY ./dist/ /usr/share/nginx/html

# This is a hack; the source code frequently refers to assets in (hardcoded) PROJECT_ROOT/src/assets/path/to/asset.png 
# instead of PROJECT_ROOT/assets/path/to/asset.png so dist depends on src to load images
RUN mkdir /usr/share/nginx/html/src && cp -r /usr/share/nginx/html/assets /usr/share/nginx/html/src

# RUN
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]