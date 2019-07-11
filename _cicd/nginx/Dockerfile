# Pull nginx image
FROM nginx:alpine

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# Start up nginx server
CMD ["nginx", "-g", "daemon off;"]
