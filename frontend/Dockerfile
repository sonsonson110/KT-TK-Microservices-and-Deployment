FROM node:18-alpine

# copy the production code
COPY ./build ./build
# library handle the rest
RUN npm install -g serve
# the command which runs every time a container starts, match the copied folder name
CMD ["serve", "-s", "build"]